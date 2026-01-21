import db from '../config/db.js';

export const getOwnerDashboardStats = async (req, res) => {
    try {
        const ownerId = req.userId;

        // Total PGs
        const [pgs] = await db.execute('SELECT COUNT(*) as count FROM pg_data WHERE owner_id = ?', [ownerId]);

        // Total Bookings
        const [bookings] = await db.execute(`
            SELECT COUNT(*) as count 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            WHERE p.owner_id = ?
        `, [ownerId]);

        // Total Tickets
        const [tickets] = await db.execute(`
            SELECT COUNT(*) as count 
            FROM tickets t 
            JOIN pg_data p ON t.pg_id = p.id 
            WHERE p.owner_id = ? AND t.status != 'closed'
        `, [ownerId]);

        // Revenue (Confirmed bookings)
        const [revenue] = await db.execute(`
            SELECT SUM(total_amount) as total 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            WHERE p.owner_id = ? AND b.status = 'confirmed'
        `, [ownerId]);

        res.status(200).json({
            totalPgs: pgs[0].count,
            totalBookings: bookings[0].count,
            activeTickets: tickets[0].count,
            totalRevenue: revenue[0].total || 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching dashboard stats' });
    }
};

export const getTenantDashboard = async (req, res) => {
    try {
        const userId = req.userId;

        // Current Stay
        const [stays] = await db.execute(`
            SELECT b.*, p.name as pg_name, r.room_number 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            LEFT JOIN rooms r ON b.room_id = r.id
            WHERE b.user_id = ? AND b.status = 'confirmed'
            ORDER BY b.created_at DESC LIMIT 1
        `, [userId]);

        // Active Tickets
        const [tickets] = await db.execute(`
            SELECT * FROM tickets WHERE user_id = ? AND status != 'closed'
        `, [userId]);

        res.status(200).json({
            currentStay: stays[0] || null,
            activeTickets: tickets
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching tenant dashboard' });
    }
};

export const getOwnerRooms = async (req, res) => {
    try {
        const ownerId = req.userId;
        const [rooms] = await db.execute(`
            SELECT r.*, p.name as pg_name, 
            (SELECT CONCAT(u.first_name, ' ', u.last_name) 
             FROM bookings b 
             JOIN users u ON b.user_id = u.id 
             WHERE b.room_id = r.id AND b.status = 'confirmed' 
             LIMIT 1) as tenant_name
            FROM rooms r 
            JOIN pg_data p ON r.pg_id = p.id 
            WHERE p.owner_id = ?
        `, [ownerId]);

        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching owner rooms' });
    }
};
