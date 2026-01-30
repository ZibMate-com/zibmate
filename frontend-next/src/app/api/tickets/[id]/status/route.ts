import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { ResultSetHeader } from 'mysql2';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const authUser = verifyAuth(req);
        if (!authUser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (authUser.role !== 'owner' && authUser.role !== 'admin') {
            return NextResponse.json({ message: 'Require Owner or Admin Role' }, { status: 403 });
        }

        const { id } = await params;
        const { status } = await req.json();

        await db.execute<ResultSetHeader>('UPDATE tickets SET status = ? WHERE id = ?', [status, id]);

        return NextResponse.json({ message: 'Ticket status updated' }, { status: 200 });
    } catch (error) {
        console.error("UpdateTicketStatus error:", error);
        return NextResponse.json({ message: 'Server error updating ticket' }, { status: 500 });
    }
}
