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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const [pgs] = await db.execute<RowDataPacket[]>(`
            SELECT p.*, u.first_name, u.last_name 
            FROM pg_data p 
            JOIN users u ON p.owner_id = u.id 
            WHERE p.id = ?
        `, [id]);

        if (pgs.length === 0) {
            return NextResponse.json({ message: 'PG not found' }, { status: 404 });
        }

        const pg = pgs[0];
        const [images] = await db.execute<RowDataPacket[]>('SELECT image_url FROM pg_images WHERE pg_id = ?', [pg.id]);
        pg.images = images.map((img: any) => formatImageUrl(img.image_url));

        if (typeof pg.facilities === 'string') {
            pg.facilities = JSON.parse(pg.facilities);
        }

        return NextResponse.json(pg, { status: 200 });
    } catch (error) {
        console.error("GetPGById error:", error);
        return NextResponse.json({ message: 'Server error fetching PG details' }, { status: 500 });
    }
}
