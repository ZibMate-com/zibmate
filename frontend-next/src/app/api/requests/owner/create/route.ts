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

    if (authUser.role !== "owner") {
      return NextResponse.json({ message: "Require Owner Role" }, { status: 403 });
    }

    const body = await req.json();
    const { full_name, email, phone, city, state } = body;
    const userId = authUser.id;

    if (!full_name || !email || !phone || !city || !state) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const [results] = await db.execute<ResultSetHeader>(
      "INSERT INTO owner_call_requests (user_id, full_name, email, phone, city, state) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, full_name, email, phone, city, state],
    );

    return NextResponse.json(
      {
        message: "Call Request raised successfully",
        requestID: results.insertId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CreateOwnerRequest error:", error);
    return NextResponse.json({ message: "Server error raising call request" }, { status: 500 });
  }
}
