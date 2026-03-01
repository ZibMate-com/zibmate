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

    let query = "";
    let params: any[] = [];

    if (authUser.role === "admin") {
      query = `SELECT * FROM owner_call_requests ORDER BY created_at DESC`;
    } else if (authUser.role === "owner") {
      query = `SELECT * FROM owner_call_requests WHERE user_id = ? ORDER BY created_at DESC`;
      params = [authUser.id];
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const [requests] = await db.execute<RowDataPacket[]>(query, params);

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error("GetOwnerRequests error:", error);
    return NextResponse.json({ message: "Failed to fetch requests" }, { status: 500 });
  }
}
