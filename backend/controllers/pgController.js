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
    const propertyData =
        typeof req.body.property === "string"
            ? JSON.parse(req.body.property)
            : req.body.property;
    try {
        const {
            propertyName,
            description,
            houseNumber,
            street,
            landmark,
            city,
            state,
            zip,
            maplink,
            discount,
            occupancy,
            prices,
            facilities,
            lookingFor,
            phone,
        } = propertyData;

        const parsedOccupancy =
            typeof occupancy === "string" ? JSON.parse(occupancy) : occupancy;

        const parsedPrices =
            typeof prices === "string" ? JSON.parse(prices) : prices;

        const parsedFacilities =
            typeof facilities === "string" ? JSON.parse(facilities) : facilities;


        const [ownerRows] = await db.execute(
            `SELECT id, first_name, email, phone FROM users WHERE phone = ?`,
            [phone]
        );

        let ownerId;
        let ownerName;
        let ownerEmail;
        let ownerPhone = phone;


        if (ownerRows.length === 0) {
            const [insertResult] = await db.execute(
                `
                INSERT INTO users (phone, role)
                VALUES (?, 'owner')
                ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)
                `,
                [phone]
            );

            ownerId = insertResult.insertId;
            ownerName = '';
            ownerEmail = '';
        } else {
            ownerId = ownerRows[0].id;
            ownerName = ownerRows[0].first_name || '';
            ownerEmail = ownerRows[0].email || '';
        }


        const [result] = await db.execute(
            `
            INSERT INTO pg_data (
                property_name,
                description,
                house_number,
                street,
                landmark,
                city,
                state,
                zip,
                maplink,
                discount,
                occupancy,
                prices,
                facilities,
                looking_for,
                owner_id,
                owner_phone
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                propertyName,
                description,
                houseNumber,
                street,
                landmark,
                city,
                state,
                zip,
                maplink,
                discount || 0,
                JSON.stringify(parsedOccupancy),
                JSON.stringify(parsedPrices),
                JSON.stringify(parsedFacilities),
                lookingFor || "Any",
                ownerId,
                ownerPhone
            ]
        );

        const pgId = result.insertId;

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const imageUrl = `uploads/${file.filename}`;
                await db.execute(
                    `INSERT INTO pg_images (pg_id, image_url) VALUES (?, ?)`,
                    [pgId, imageUrl]
                );
            }
        }

        res.status(201).json({
            message: "PG added successfully",
            pgId
        });

    } catch (error) {
        console.error("Add PG Error:", error);
        res.status(500).json({ message: "Server error adding PG" });
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
