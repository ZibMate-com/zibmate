import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(req: NextRequest) {
    try {
        const authUser = verifyAuth(req);
        if (!authUser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { pg_id, full_name, email, phone } = body;
        const userId = authUser.id;

        if (!full_name || !email || !phone || !pg_id) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Insert the tenant request
        const [results] = await db.execute<ResultSetHeader>(
            'INSERT INTO tenent_call_requests ( user_id , pg_id , full_name , email , phone ) VALUES( ? , ? , ? , ? , ? )',
            [userId, pg_id, full_name, email, phone]
        );

        // Get owner phone from pg_data table
        const [ownerData] = await db.execute<RowDataPacket[]>(
            `SELECT owner_phone FROM pg_data WHERE id = ?`,
            [pg_id]
        );

        return NextResponse.json({
            message: 'Call Request raised successfully',
            requestID: results.insertId,
            owner_phone: ownerData[0]?.owner_phone || null
        }, { status: 201 });

    } catch (error) {
        console.error("CreateTenantRequest error:", error);
        return NextResponse.json({ message: 'Server error raising call request' }, { status: 500 });
    }
}
