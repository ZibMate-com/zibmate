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

        if (authUser.role !== 'owner' && authUser.role !== 'admin') {
            return NextResponse.json({ message: 'Require Owner or Admin Role' }, { status: 403 });
        }

        const [bookings] = await db.execute<RowDataPacket[]>(`
            SELECT b.*, p.name as pg_name 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            WHERE p.owner_id = ?
        `, [authUser.id]);

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        console.error("GetOwnerBookings error:", error);
        return NextResponse.json({ message: 'Server error fetching owner bookings' }, { status: 500 });
    }
}
