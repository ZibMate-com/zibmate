import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
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
        const [pgs] = await db.execute<RowDataPacket[]>(`
            SELECT p.*, 
            (SELECT image_url FROM pg_images WHERE pg_id = p.id LIMIT 1) as image 
            FROM pg_data p 
            LIMIT 4
        `);

        // Parse facilities and format image
        const parsedPgs = pgs.map((pg: any) => ({
            ...pg,
            facilities: typeof pg.facilities === 'string' ? JSON.parse(pg.facilities) : pg.facilities,
            images: pg.image ? [formatImageUrl(pg.image)] : []
        }));

        return NextResponse.json(parsedPgs, { status: 200 });
    } catch (error) {
        console.error("GetTopPGs error:", error);
        return NextResponse.json({ message: 'Server error fetching top PGs' }, { status: 500 });
    }
}
