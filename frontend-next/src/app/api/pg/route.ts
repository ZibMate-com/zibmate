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

      // ← No need to format - Cloudinary URLs are already complete
      pg.images = images.map((img: any) => img.image_url);

      // Parse JSON fields (your existing logic)
      try {
        if (typeof pg.facilities === "string") pg.facilities = JSON.parse(pg.facilities);
        if (typeof pg.occupancy === "string") pg.occupancy = JSON.parse(pg.occupancy);
        if (typeof pg.prices === "string") pg.prices = JSON.parse(pg.prices);

        if (pg.prices && typeof pg.prices === "object") {
          const priceValues = Object.values(pg.prices)
            .map((p: any) => Number(p))
            .filter((n) => !isNaN(n));
          pg.price = priceValues.length > 0 ? Math.min(...priceValues) : 0;
        }
      } catch (e) {
        console.error("Error parsing JSON fields for PG:", pg.id, e);
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
    const authUser = verifyAuth(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ CHANGED: Parse JSON body instead of FormData
    const body = await req.json();
    const propertyString = body.property;

    if (!propertyString) {
      return NextResponse.json({ message: "Property data missing" }, { status: 400 });
    }

    const propertyData = typeof propertyString === "string" ? JSON.parse(propertyString) : propertyString;

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
      imageUrls, // ✅ NEW: Cloudinary URLs
    } = propertyData;

    // Validate required fields
    if (!propertyName || !phone) {
      return NextResponse.json(
        { message: "Missing required fields: propertyName and phone are required" },
        { status: 400 },
      );
    }

    const parsedOccupancy = typeof occupancy === "string" ? JSON.parse(occupancy) : occupancy;
    const parsedPrices = typeof prices === "string" ? JSON.parse(prices) : prices;
    const parsedFacilities = typeof facilities === "string" ? JSON.parse(facilities) : facilities;

    // Check/create owner
    const [ownerRows] = await db.execute<RowDataPacket[]>(`SELECT id FROM users WHERE phone = ?`, [phone]);

    let ownerId;
    if (ownerRows.length === 0) {
      const [insertResult] = await db.execute<ResultSetHeader>(
        `INSERT INTO users (phone, role, email, first_name, last_name, password)
         VALUES (?, 'owner', CONCAT(?, '@temp.com'), 'Owner', 'Temp', 'temp_hash')`,
        [phone, phone],
      );
      ownerId = insertResult.insertId;
    } else {
      ownerId = ownerRows[0].id;
      await db.execute("UPDATE users SET role = 'owner' WHERE id = ?", [ownerId]);
    }

    // Insert PG data
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO pg_data (
        property_name, description, house_number, street, landmark,
        city, state, zip, maplink, discount, occupancy, prices,
        facilities, looking_for, owner_id, owner_phone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        phone,
      ],
    );

    const pgId = result.insertId;

    // ✅ CHANGED: Save Cloudinary URLs (no file system operations!)
    if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
      for (const url of imageUrls) {
        await db.execute(`INSERT INTO pg_images (pg_id, image_url) VALUES (?, ?)`, [pgId, url]);
      }
    }

    return NextResponse.json({ message: "PG added successfully", pgId }, { status: 201 });
  } catch (error) {
    console.error("Add PG Error:", error);
    return NextResponse.json(
      {
        message: "Server error adding PG",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
