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

    const [users] = await db.execute<RowDataPacket[]>(
      "SELECT id, first_name, last_name, email, role, phone FROM users WHERE id = ?",
      [authUser.id],
    );

    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(users[0], { status: 200 });
  } catch (error) {
    console.error("GetMe error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
