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

        const ownerId = authUser.id;

        // Total PGs
        const [pgs] = await db.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM pg_data WHERE owner_id = ?', [ownerId]);

        // Total Bookings
        const [bookings] = await db.execute<RowDataPacket[]>(`
            SELECT COUNT(*) as count 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            WHERE p.owner_id = ?
        `, [ownerId]);

        // Total Tickets
        const [tickets] = await db.execute<RowDataPacket[]>(`
            SELECT COUNT(*) as count 
            FROM tickets t 
            JOIN pg_data p ON t.pg_id = p.id 
            WHERE p.owner_id = ? AND t.status != 'closed'
        `, [ownerId]);

        // Revenue (Confirmed bookings)
        const [revenue] = await db.execute<RowDataPacket[]>(`
            SELECT SUM(total_amount) as total 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            WHERE p.owner_id = ? AND b.status = 'confirmed'
        `, [ownerId]);

        return NextResponse.json({
            totalPgs: pgs[0].count,
            totalBookings: bookings[0].count,
            activeTickets: tickets[0].count,
            totalRevenue: revenue[0].total || 0
        }, { status: 200 });

    } catch (error) {
        console.error("GetOwnerDashboardStats error:", error);
        return NextResponse.json({ message: 'Server error fetching dashboard stats' }, { status: 500 });
    }
}
