import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { writeFile } from "fs/promises";
import path from "path";

// Helper to format image URL
const formatImageUrl = (url: string) => {
  if (url && (url.startsWith("http") || url.startsWith("https") || url.startsWith("data:"))) {
    return url;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
  // If url already has /uploads, don't prepend it again if we are serving static files
  // But since we are saving as `uploads/filename`, we might need to adjust based on how next/image works or static serving.
  // Ideally, we serve from public/uploads.
  // If url starts with 'uploads/', then baseUrl/uploads/filename is correct if uploads is served.
  // Next.js serves public folder at root. So `baseUrl/uploads/filename` works if `public/uploads` exists.
  return `${baseUrl}/${url}`;
};

export async function GET(req: NextRequest) {
  try {
    const [pgs] = await db.execute<RowDataPacket[]>("SELECT * FROM pg_data");

    for (let pg of pgs) {
      const [images] = await db.execute<RowDataPacket[]>("SELECT image_url FROM pg_images WHERE pg_id = ?", [pg.id]);
      pg.images = images.map((img: any) => formatImageUrl(img.image_url));

      try {
        if (typeof pg.facilities === "string") pg.facilities = JSON.parse(pg.facilities);
        if (typeof pg.occupancy === "string") pg.occupancy = JSON.parse(pg.occupancy);
        if (typeof pg.prices === "string") pg.prices = JSON.parse(pg.prices);

        // Derive min price for compatibility with listing views
        if (pg.prices && typeof pg.prices === "object") {
          const priceValues = Object.values(pg.prices)
            .map((p: any) => Number(p))
            .filter((n) => !isNaN(n));
          pg.price = priceValues.length > 0 ? Math.min(...priceValues) : 0;
        }
      } catch (e) {
        console.error("Error parsing JSON fields for PG:", pg.id, e);
        // Initialize defaults if parsing fails
        if (!pg.facilities) pg.facilities = [];
        if (!pg.occupancy) pg.occupancy = [];
        if (!pg.prices) pg.prices = {};
        pg.price = 0;
      }
    }

    return NextResponse.json(pgs, { status: 200 });
  } catch (error) {
    console.error("GetAllPGs error:", error);
    return NextResponse.json({ message: "Server error fetching PGs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Add detailed auth logging
    console.log("=== AUTH DEBUG START ===");
    const authHeader = req.headers.get("authorization");
    console.log("Authorization header:", authHeader);

    const authUser = verifyAuth(req);
    console.log("Auth user result:", authUser);
    console.log("=== AUTH DEBUG END ===");

    if (!authUser) {
      console.error("Authentication failed - no valid user");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("Authenticated user:", authUser);

    const formData = await req.formData();
    console.log("FormData received");

    const propertyString = formData.get("property");
    console.log("Property string:", propertyString);

    if (!propertyString) {
      return NextResponse.json({ message: "Property data missing" }, { status: 400 });
    }

    const propertyData = typeof propertyString === "string" ? JSON.parse(propertyString) : propertyString;

    console.log("Parsed property data:", propertyData);

    const {
      propertyName,
      description,
      houseNumber,
      street,
      landmark,
      city,
      state,
      zip,
      maplink,
      discount,
      occupancy,
      prices,
      facilities,
      lookingFor,
      phone,
    } = propertyData;

    // Validate required fields
    if (!propertyName || !phone) {
      return NextResponse.json(
        {
          message: "Missing required fields: propertyName and phone are required",
        },
        { status: 400 },
      );
    }

    const parsedOccupancy = typeof occupancy === "string" ? JSON.parse(occupancy) : occupancy;

    const parsedPrices = typeof prices === "string" ? JSON.parse(prices) : prices;

    const parsedFacilities = typeof facilities === "string" ? JSON.parse(facilities) : facilities;

    console.log("Checking owner with phone:", phone);

    // Check if owner exists
    const [ownerRows] = await db.execute<RowDataPacket[]>(
      `SELECT id, first_name, email, phone FROM users WHERE phone = ?`,
      [phone],
    );

    console.log("Owner rows found:", ownerRows.length);

    let ownerId;
    let ownerName;
    let ownerEmail;
    let ownerPhone = phone;

    if (ownerRows.length === 0) {
      console.log("Creating new owner");
      const [insertResult] = await db.execute<ResultSetHeader>(
        `
        INSERT INTO users (phone, role)
        VALUES (?, 'owner')
        ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)
        `,
        [phone],
      );

      ownerId = insertResult.insertId;
      console.log("New owner ID:", ownerId);
      ownerName = "";
      ownerEmail = "";
    } else {
      ownerId = ownerRows[0].id;
      ownerName = ownerRows[0].first_name || "";
      ownerEmail = ownerRows[0].email || "";
      console.log("Existing owner ID:", ownerId);
    }

    console.log("Inserting PG data");

    // Insert PG data
    const [result] = await db.execute<ResultSetHeader>(
      `
      INSERT INTO pg_data (
        property_name,
        description,
        house_number,
        street,
        landmark,
        city,
        state,
        zip,
        maplink,
        discount,
        occupancy,
        prices,
        facilities,
        looking_for,
        owner_id,
        owner_phone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        propertyName,
        description,
        houseNumber,
        street,
        landmark,
        city,
        state,
        zip,
        maplink,
        discount || 0,
        JSON.stringify(parsedOccupancy),
        JSON.stringify(parsedPrices),
        JSON.stringify(parsedFacilities),
        lookingFor || "Any",
        ownerId,
        ownerPhone,
      ],
    );

    const pgId = result.insertId;
    console.log("PG created with ID:", pgId);

    // Handle image uploads
    const images = formData.getAll("images") as any[];
    console.log("Number of images:", images.length);
    if (images.length > 0) {
      console.log("First image type:", typeof images[0]);
      console.log("First image constructor:", images[0]?.constructor?.name);
      console.log("First image keys:", Object.keys(images[0]));
    }

    if (images && images.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      console.log("Upload directory:", uploadDir);

      // Ensure uploads directory exists
      const fs = require("fs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log("Created uploads directory");
      }

      for (const file of images) {
        // Relaxed check for File-like object
        if (file && typeof file === "object" && "arrayBuffer" in file && "name" in file) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const timestamp = Date.now();
          const filename = `${timestamp}-${file.name.replace(/\s/g, "-")}`;

          console.log("Saving image:", filename);
          await writeFile(path.join(uploadDir, filename), buffer);

          const imageUrl = `uploads/${filename}`;
          await db.execute(`INSERT INTO pg_images (pg_id, image_url) VALUES (?, ?)`, [pgId, imageUrl]);
          console.log("Image saved:", imageUrl);
        }
      }
    }

    console.log("PG onboarding completed successfully");
    return NextResponse.json(
      {
        message: "PG added successfully",
        pgId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Add PG Error (detailed):", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return NextResponse.json(
      {
        message: "Server error adding PG",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
