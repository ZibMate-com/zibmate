import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthUser {
    id: number;
    role: string;
}

export const verifyAuth = (req: NextRequest): AuthUser | null => {
    try {
        const token = req.headers.get('authorization')?.split(' ')[1];
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as AuthUser;
        return decoded;
    } catch (error) {
        return null;
    }
};
