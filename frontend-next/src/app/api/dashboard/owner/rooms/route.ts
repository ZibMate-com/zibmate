import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
  try {
    const authUser = verifyAuth(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (authUser.role !== "owner" && authUser.role !== "admin") {
      return NextResponse.json({ message: "Require Owner or Admin Role" }, { status: 403 });
    }

    const ownerId = authUser.id;
    const [rooms] = await db.execute<RowDataPacket[]>(
      `
            SELECT r.*, p.name as pg_name, 
            (SELECT CONCAT(u.first_name, ' ', u.last_name) 
             FROM bookings b 
             JOIN users u ON b.user_id = u.id 
             WHERE b.room_id = r.id AND b.status = 'confirmed' 
             LIMIT 1) as tenant_name
            FROM rooms r 
            JOIN pg_data p ON r.pg_id = p.id 
            WHERE p.owner_id = ?
        `,
      [ownerId],
    );

    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    console.error("GetOwnerRooms error:", error);
    return NextResponse.json({ message: "Server error fetching owner rooms" }, { status: 500 });
  }
}
