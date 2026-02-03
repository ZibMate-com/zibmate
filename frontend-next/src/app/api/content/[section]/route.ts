import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    const { section } = await params;
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM app_content WHERE section_name = ? ORDER BY display_order ASC",
      [section],
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error(`Error fetching content for section ${params}:`, error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
