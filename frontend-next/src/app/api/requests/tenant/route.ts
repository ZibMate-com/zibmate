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

        if (authUser.role !== 'admin') {
            return NextResponse.json({ message: 'Require Admin Role' }, { status: 403 });
        }

        const [requests] = await db.execute<RowDataPacket[]>(
            `SELECT r.*, p.name as property_name
            FROM tenent_call_requests r
            JOIN pg_data p ON r.pg_id = p.id
            ORDER BY r.created_at DESC`
        );

        return NextResponse.json(requests, { status: 200 });

    } catch (error) {
        console.error("GetTenantRequests error:", error);
        return NextResponse.json({ message: "Failed to fetch requests" }, { status: 500 });
    }
}
