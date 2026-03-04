import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface AuthUser {
  id: number;
  role: string;
}

export const verifyAuth = (req: NextRequest): AuthUser | null => {
  try {
    // Try to get token from cookies first, then fallback to Authorization header
    const token = req.cookies.get("zibmate_token")?.value || req.headers.get("authorization")?.split(" ")[1];

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;

    // Handle both 'id' and 'userId' payload keys due to project inconsistencies
    const id = decoded.id ?? decoded.userId;

    if (!id) return null;

    return {
      id: Number(id),
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
};
