import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Initialize table if it doesn't exist
const initTable = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS saved_pg (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      pg_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pg_id) REFERENCES pg_data(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_user_pg (user_id, pg_id)
    )
  `);
};

export async function GET(req: NextRequest) {
  try {
    const authUser = verifyAuth(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await initTable();

    const [savedPgs] = await db.execute<RowDataPacket[]>(
      `SELECT p.* FROM pg_data p
       JOIN saved_pg s ON p.id = s.pg_id
       WHERE s.user_id = ?`,
      [authUser.id],
    );

    for (let pg of savedPgs) {
      const [images] = await db.execute<RowDataPacket[]>("SELECT image_url FROM pg_images WHERE pg_id = ?", [pg.id]);
      pg.images = images.map((img: any) => img.image_url);

      if (typeof pg.facilities === "string") pg.facilities = JSON.parse(pg.facilities);
      if (typeof pg.occupancy === "string") pg.occupancy = JSON.parse(pg.occupancy);
      if (typeof pg.prices === "string") pg.prices = JSON.parse(pg.prices);
    }

    return NextResponse.json(savedPgs, { status: 200 });
  } catch (error) {
    console.error("GetSavedPGs error:", error);
    return NextResponse.json({ message: "Server error fetching saved PGs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = verifyAuth(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pgId } = await req.json();
    if (!pgId) {
      return NextResponse.json({ message: "PG ID is required" }, { status: 400 });
    }

    await initTable();

    // Check if already saved
    const [existing] = await db.execute<RowDataPacket[]>("SELECT id FROM saved_pg WHERE user_id = ? AND pg_id = ?", [
      authUser.id,
      pgId,
    ]);

    if (existing.length > 0) {
      // If already exists, we toggle it (unsave)
      await db.execute("DELETE FROM saved_pg WHERE user_id = ? AND pg_id = ?", [authUser.id, pgId]);
      return NextResponse.json({ message: "PG removed from saved", saved: false }, { status: 200 });
    }

    await db.execute<ResultSetHeader>("INSERT INTO saved_pg (user_id, pg_id) VALUES (?, ?)", [authUser.id, pgId]);

    return NextResponse.json({ message: "PG saved successfully", saved: true }, { status: 201 });
  } catch (error) {
    console.error("SavePG error:", error);
    return NextResponse.json({ message: "Server error saving PG" }, { status: 500 });
  }
}
