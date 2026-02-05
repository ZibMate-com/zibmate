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

    const userId = authUser.id;

    // Current Stay
    const [stays] = await db.execute<RowDataPacket[]>(
      `
            SELECT b.*, p.property_name as pg_name, r.room_number 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            LEFT JOIN rooms r ON b.room_id = r.id
            WHERE b.user_id = ? AND b.status = 'confirmed'
            ORDER BY b.created_at DESC LIMIT 1
        `,
      [userId],
    );

    // Active Tickets
    const [tickets] = await db.execute<RowDataPacket[]>(
      `
            SELECT * FROM tickets WHERE user_id = ? AND status != 'closed'
        `,
      [userId],
    );

    return NextResponse.json(
      {
        currentStay: stays[0] || null,
        activeTickets: tickets,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GetTenantDashboard error:", error);
    return NextResponse.json({ message: "Server error fetching tenant dashboard" }, { status: 500 });
  }
}
