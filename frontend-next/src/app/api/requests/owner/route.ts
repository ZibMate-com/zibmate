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

        if (authUser.role !== 'owner') {
            return NextResponse.json({ message: 'Require Owner Role' }, { status: 403 });
        }

        const [requests] = await db.execute<RowDataPacket[]>(
            `SELECT * FROM owner_call_requests 
            ORDER BY created_at DESC`
        );

        return NextResponse.json(requests, { status: 200 });

    } catch (error) {
        console.error("GetOwnerRequests error:", error);
        return NextResponse.json({ message: "Failed to fetch requests" }, { status: 500 });
    }
}
