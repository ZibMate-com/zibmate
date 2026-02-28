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
      query = `SELECT r.*, p.property_name as pg_name
            FROM tenent_call_requests r
            JOIN pg_data p ON r.pg_id = p.id
            ORDER BY r.created_at DESC`;
    } else if (authUser.role === "owner") {
      query = `SELECT r.*, p.property_name as pg_name
            FROM tenent_call_requests r
            JOIN pg_data p ON r.pg_id = p.id
            WHERE p.owner_id = ?
            ORDER BY r.created_at DESC`;
      params = [authUser.id];
    } else {
      // For tenants, show their own requests
      query = `SELECT r.*, p.property_name as pg_name, CONCAT(u.first_name, ' ', u.last_name) as owner_name, p.owner_phone
            FROM tenent_call_requests r
            JOIN pg_data p ON r.pg_id = p.id
            JOIN users u ON p.owner_id = u.id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC`;
      params = [authUser.id];
    }

    const [requests] = await db.execute<RowDataPacket[]>(query, params);

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error("GetTenantRequests error:", error);
    return NextResponse.json({ message: "Failed to fetch requests" }, { status: 500 });
  }
}

