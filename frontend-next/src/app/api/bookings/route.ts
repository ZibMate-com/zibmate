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

    const { pgId, roomId, fullName, email, phone, profession, aadharNumber, checkInDate, roomType, totalAmount } =
      await req.json();
    const userId = authUser.id;

    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO bookings (user_id, pg_id, room_id, full_name, email, phone, profession, aadhar_number, check_in_date, room_type, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        pgId,
        roomId || null,
        fullName,
        email,
        phone,
        profession,
        aadharNumber,
        checkInDate,
        roomType,
        totalAmount,
        "pending",
      ],
    );

    return NextResponse.json(
      { message: "Booking requested successfully", bookingId: result.insertId },
      { status: 201 },
    );
  } catch (error) {
    console.error("CreateBooking error:", error);
    return NextResponse.json({ message: "Server error creating booking" }, { status: 500 });
  }
}
