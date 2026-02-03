import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {
  try {
    const authUser = verifyAuth(req);
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pgId, roomId, issue, description, category, priority } = await req.json();
    const userId = authUser.id;

    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO tickets (pg_id, user_id, room_id, issue, description, category, priority, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [pgId, userId, roomId || null, issue, description, category, priority || "Medium", "open"],
    );

    return NextResponse.json({ message: "Ticket raised successfully", ticketId: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("CreateTicket error:", error);
    return NextResponse.json({ message: "Server error raising ticket" }, { status: 500 });
  }
}
