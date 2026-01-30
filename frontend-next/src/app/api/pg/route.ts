import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { writeFile } from 'fs/promises';
import path from 'path';

// Helper to format image URL
const formatImageUrl = (url: string) => {
    if (url && (url.startsWith('http') || url.startsWith('https') || url.startsWith('data:'))) {
        return url;
    }
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    // If url already has /uploads, don't prepend it again if we are serving static files
    // But since we are saving as `uploads/filename`, we might need to adjust based on how next/image works or static serving.
    // Ideally, we serve from public/uploads.
    // If url starts with 'uploads/', then baseUrl/uploads/filename is correct if uploads is served.
    // Next.js serves public folder at root. So `baseUrl/uploads/filename` works if `public/uploads` exists.
    return `${baseUrl}/${url}`;
};

export async function GET(req: NextRequest) {
    try {
        const [pgs] = await db.execute<RowDataPacket[]>('SELECT * FROM pg_data');

        for (let pg of pgs) {
            const [images] = await db.execute<RowDataPacket[]>('SELECT image_url FROM pg_images WHERE pg_id = ?', [pg.id]);
            pg.images = images.map((img: any) => formatImageUrl(img.image_url));
            if (typeof pg.facilities === 'string') {
                pg.facilities = JSON.parse(pg.facilities);
            }
        }

        return NextResponse.json(pgs, { status: 200 });
    } catch (error) {
        console.error("GetAllPGs error:", error);
        return NextResponse.json({ message: 'Server error fetching PGs' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const authUser = verifyAuth(req);
        if (!authUser) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price');
        const discount = formData.get('discount');
        const location = formData.get('location') as string;
        const locationLink = formData.get('locationLink') as string;
        const occupancy = formData.get('occupancy');
        const lookingFor = formData.get('lookingFor') as string;
        const facilities = formData.get('facilities');
        const city = formData.get('city') as string;

        // Parse JSON fields
        const parsedFacilities = typeof facilities === 'string' ? JSON.parse(facilities) : facilities;
        const parsedOccupancy = typeof occupancy === 'string' ? JSON.parse(occupancy as string) : occupancy;

        const ownerId = authUser.id;

        const [result] = await db.execute<ResultSetHeader>(
            'INSERT INTO pg_data (name, description, price, discount, location, location_link, occupancy, looking_for, facilities, city, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, discount, location, locationLink, JSON.stringify(parsedOccupancy), lookingFor, JSON.stringify(parsedFacilities), city, ownerId]
        );

        const pgId = result.insertId;
        const files = formData.getAll('images') as File[];

        if (files && files.length > 0) {
            for (const file of files) {
                if (file instanceof File) {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
                    const uploadDir = path.join(process.cwd(), 'public/uploads');

                    // Ensure directory exists (you might want to check this once or assume standard structure)
                    // await mkdir(uploadDir, { recursive: true }); 

                    await writeFile(path.join(uploadDir, filename), buffer);

                    const imageUrl = `uploads/${filename}`;
                    await db.execute('INSERT INTO pg_images (pg_id, image_url) VALUES (?, ?)', [pgId, imageUrl]);
                }
            }
        }

        return NextResponse.json({ message: 'PG added successfully', pgId }, { status: 201 });

    } catch (error) {
        console.error("AddPG error:", error);
        return NextResponse.json({ message: 'Server error adding PG' }, { status: 500 });
    }
}
