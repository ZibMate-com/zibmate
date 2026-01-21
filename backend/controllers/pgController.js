import db from '../config/db.js';

// Helper to format image URL
const formatImageUrl = (url) => {
    if (url && (url.startsWith('http') || url.startsWith('https') || url.startsWith('data:'))) {
        return url;
    }
    const baseUrl = process.env.BACKEND_URL;
    return `${baseUrl}/${url}`;
};

export const getAllPGs = async (req, res) => {
    try {
        const [pgs] = await db.execute('SELECT * FROM pg_data');

        for (let pg of pgs) {
            const [images] = await db.execute('SELECT image_url FROM pg_images WHERE pg_id = ?', [pg.id]);
            pg.images = images.map(img => formatImageUrl(img.image_url));
            if (typeof pg.facilities === 'string') {
                pg.facilities = JSON.parse(pg.facilities);
            }
        }

        res.status(200).json(pgs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching PGs' });
    }
};

export const getPGById = async (req, res) => {
    try {
        const [pgs] = await db.execute(`
            SELECT p.*, u.first_name, u.last_name 
            FROM pg_data p 
            JOIN users u ON p.owner_id = u.id 
            WHERE p.id = ?
        `, [req.params.id]);
        if (pgs.length === 0) {
            return res.status(404).json({ message: 'PG not found' });
        }

        const pg = pgs[0];
        const [images] = await db.execute('SELECT image_url FROM pg_images WHERE pg_id = ?', [pg.id]);
        pg.images = images.map(img => formatImageUrl(img.image_url));

        if (typeof pg.facilities === 'string') {
            pg.facilities = JSON.parse(pg.facilities);
        }

        res.status(200).json(pg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching PG details' });
    }
};

export const addPG = async (req, res) => {
    try {
        // When using multipart/form-data, non-file fields are in req.body
        const { name, description, price, discount, location, locationLink, occupancy, lookingFor, facilities, city } = req.body;
        const ownerId = req.userId;

        // Parse facilities if it's sent as a string (happens with FormData)
        const parsedFacilities = typeof facilities === 'string' ? JSON.parse(facilities) : facilities;

        const [result] = await db.execute(
            'INSERT INTO pg_data (name, description, price, discount, location, location_link, occupancy, looking_for, facilities, city, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, discount, location, locationLink, occupancy, lookingFor, JSON.stringify(parsedFacilities), city, ownerId]
        );

        const pgId = result.insertId;

        // Handle uploaded files
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const imageUrl = `uploads/${file.filename}`;
                await db.execute('INSERT INTO pg_images (pg_id, image_url) VALUES (?, ?)', [pgId, imageUrl]);
            }
        } else if (req.body.images) {
            // Support for external URLs if passed via body (though primary use is files now)
            const extImages = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
            for (let imageUrl of extImages) {
                await db.execute('INSERT INTO pg_images (pg_id, image_url) VALUES (?, ?)', [pgId, imageUrl]);
            }
        }

        res.status(201).json({ message: 'PG added successfully', pgId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error adding PG' });
    }
};

export const getMyPGs = async (req, res) => {
    try {
        const [pgs] = await db.execute('SELECT * FROM pg_data WHERE owner_id = ?', [req.userId]);

        for (let pg of pgs) {
            const [images] = await db.execute('SELECT image_url FROM pg_images WHERE pg_id = ?', [pg.id]);
            pg.images = images.map(img => formatImageUrl(img.image_url));
            if (typeof pg.facilities === 'string') {
                pg.facilities = JSON.parse(pg.facilities);
            }
        }

        res.status(200).json(pgs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching your PGs' });
    }
};

export const getTopPGs = async (req, res) => {
    try {
        const [pgs] = await db.execute(`
            SELECT p.*, 
            (SELECT image_url FROM pg_images WHERE pg_id = p.id LIMIT 1) as image 
            FROM pg_data p 
            LIMIT 4
        `);

        // Parse facilities
        const parsedPgs = pgs.map(pg => ({
            ...pg,
            facilities: typeof pg.facilities === 'string' ? JSON.parse(pg.facilities) : pg.facilities,
            images: pg.image ? [pg.image] : []
        }));

        res.status(200).json(parsedPgs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching top PGs' });
    }
};
