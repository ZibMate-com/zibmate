import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
    try {
        const authUser = verifyAuth(req);
        if (!authUser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const [bookings] = await db.execute<RowDataPacket[]>(`
            SELECT b.*, p.name as pg_name, p.location as pg_location, r.room_number 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            LEFT JOIN rooms r ON b.room_id = r.id
            WHERE b.user_id = ?
        `, [authUser.id]);

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        console.error("GetUserBookings error:", error);
        return NextResponse.json({ message: 'Server error fetching bookings' }, { status: 500 });
    }
}
