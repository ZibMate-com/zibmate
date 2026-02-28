import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, phone, role } = await req.json();

    // Check if user exists
    const [existingUsers] = await db.execute<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO users (first_name, last_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword, phone, role || "user"],
    );

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: result.insertId,
        email: email,
        role: role || "user",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.insertId,
        token: token,
        user: {
          id: result.insertId,
          firstName,
          lastName,
          email,
          phone,
          role: role || "user",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Server error during signup" }, { status: 500 });
  }
}
