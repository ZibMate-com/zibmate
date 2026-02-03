import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM app_content ORDER BY section_name, display_order ASC",
    );
    // Group by section
    const content = rows.reduce((acc: any, item: any) => {
      if (!acc[item.section_name]) {
        acc[item.section_name] = [];
      }
      acc[item.section_name].push(item);
      return acc;
    }, {});

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error("Error fetching all content:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
