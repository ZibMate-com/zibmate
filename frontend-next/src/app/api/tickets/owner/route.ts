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

        const [tickets] = await db.execute<RowDataPacket[]>(`
            SELECT t.*, u.first_name, u.last_name, p.name as pg_name, r.room_number
            FROM tickets t 
            JOIN users u ON t.user_id = u.id 
            JOIN pg_data p ON t.pg_id = p.id 
            LEFT JOIN rooms r ON t.room_id = r.id
            WHERE p.owner_id = ?
            ORDER BY t.created_at DESC
        `, [authUser.id]);

        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        console.error("GetOwnerTickets error:", error);
        return NextResponse.json({ message: 'Server error fetching tickets' }, { status: 500 });
    }
}
