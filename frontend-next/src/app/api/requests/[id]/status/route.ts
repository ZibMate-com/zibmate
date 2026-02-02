import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const authUser = verifyAuth(req);
        if (!authUser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (authUser.role !== 'admin') {
            return NextResponse.json({ message: 'Require Admin Role' }, { status: 403 });
        }

        const body = await req.json();
        const { status } = body;
        const { id } = await params;

        await db.execute('UPDATE tenent_call_requests SET status = ? WHERE id = ?', [status, id]);

        return NextResponse.json({ message: 'Request status updated' }, { status: 200 });

    } catch (error) {
        console.error("UpdateRequestStatus error:", error);
        return NextResponse.json({ message: 'Server error updating request' }, { status: 500 });
    }
}
