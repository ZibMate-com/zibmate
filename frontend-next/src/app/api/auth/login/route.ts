import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if user exists
    const [users] = await db.execute<User[]>("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    if (user.role === "admin") {
      const adminToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", {
        expiresIn: "24h",
      });

      const response = NextResponse.json(
        {
          adminToken,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role,
            phone: user.phone,
          },
        },
        { status: 200 },
      );

      response.cookies.set("zibmate_token", adminToken, {
        httpOnly: false, // Set to false to allow client-side access for decoding if needed
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 24 hours
        path: "/",
      });

      return response;
    }

    // Regular user login - return token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "24h" });

    const response = NextResponse.json(
      {
        token,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      },
      { status: 200 },
    );

    response.cookies.set("zibmate_token", token, {
      httpOnly: false, // Set to false to allow client-side access for decoding if needed
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error during login" }, { status: 500 });
  }
}
