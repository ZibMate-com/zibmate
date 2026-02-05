import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

// Helper to format image URL
const formatImageUrl = (url: string) => {
  if (url && (url.startsWith("http") || url.startsWith("https") || url.startsWith("data:"))) {
    return url;
  }
  // Return relative path for local uploads to support dynamic ports (3000, 3001, etc.)
  // Ensure it starts with /
  return url.startsWith("/") ? url : `/${url}`;
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [pgs] = await db.execute<RowDataPacket[]>(
      `
            SELECT p.*, u.first_name, u.last_name 
            FROM pg_data p 
            JOIN users u ON p.owner_id = u.id 
            WHERE p.id = ?
        `,
      [id],
    );

    if (pgs.length === 0) {
      return NextResponse.json({ message: "PG not found" }, { status: 404 });
    }

    const pg = pgs[0];
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

    return NextResponse.json(pg, { status: 200 });
  } catch (error) {
    console.error("GetPGById error:", error);
    return NextResponse.json({ message: "Server error fetching PG details" }, { status: 500 });
  }
}
