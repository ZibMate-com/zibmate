import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { RowDataPacket } from 'mysql2';

// Helper to format image URL
const formatImageUrl = (url: string) => {
    if (url && (url.startsWith('http') || url.startsWith('https') || url.startsWith('data:'))) {
        return url;
    }
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    return `${baseUrl}/${url}`;
};

export async function GET(req: NextRequest) {
    try {
        const authUser = verifyAuth(req);
        if (!authUser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (authUser.role !== 'owner' && authUser.role !== 'admin') {
            return NextResponse.json({ message: 'Require Owner or Admin Role' }, { status: 403 });
        }

        const [pgs] = await db.execute<RowDataPacket[]>('SELECT * FROM pg_data WHERE owner_id = ?', [authUser.id]);

        for (let pg of pgs) {
            const [images] = await db.execute<RowDataPacket[]>('SELECT image_url FROM pg_images WHERE pg_id = ?', [pg.id]);
            pg.images = images.map((img: any) => formatImageUrl(img.image_url));
            if (typeof pg.facilities === 'string') {
                pg.facilities = JSON.parse(pg.facilities);
            }
        }

        return NextResponse.json(pgs, { status: 200 });
    } catch (error) {
        console.error("GetMyPGs error:", error);
        return NextResponse.json({ message: 'Server error fetching your PGs' }, { status: 500 });
    }
}
