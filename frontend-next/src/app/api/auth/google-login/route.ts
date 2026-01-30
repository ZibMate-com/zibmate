import { NextResponse } from 'next/server';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(req: Request) {
    try {
        const { email, firstName, lastName, role } = await req.json();

        // Check if user exists
        const [users] = await db.execute<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
        let user;

        if (users.length === 0) {
            // Create user for social login (no password needed for social users)
            const [result] = await db.execute<ResultSetHeader>(
                'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName || '', email, 'SOCIAL_LOGIN_PROVIDER', role || 'user']
            );
            const [newUsers] = await db.execute<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [result.insertId]);
            user = newUsers[0];
        } else {
            user = users[0];
        }

        // Create token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Google Login error:", error);
        return NextResponse.json({ message: 'Server error during Google login' }, { status: 500 });
    }
}
