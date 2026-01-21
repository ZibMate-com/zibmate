import db from '../config/db.js';

export const createBooking = async (req, res) => {
    try {
        const { pgId, roomId, fullName, email, phone, profession, aadharNumber, checkInDate, roomType, totalAmount } = req.body;
        const userId = req.userId;

        const [result] = await db.execute(
            'INSERT INTO bookings (user_id, pg_id, room_id, full_name, email, phone, profession, aadhar_number, check_in_date, room_type, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, pgId, roomId || null, fullName, email, phone, profession, aadharNumber, checkInDate, roomType, totalAmount, 'pending']
        );

        res.status(201).json({ message: 'Booking requested successfully', bookingId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating booking' });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const [bookings] = await db.execute(`
            SELECT b.*, p.name as pg_name, p.location as pg_location, r.room_number 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            LEFT JOIN rooms r ON b.room_id = r.id
            WHERE b.user_id = ?
        `, [req.userId]);
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching bookings' });
    }
};

export const getOwnerBookings = async (req, res) => {
    try {
        const [bookings] = await db.execute(`
            SELECT b.*, p.name as pg_name 
            FROM bookings b 
            JOIN pg_data p ON b.pg_id = p.id 
            WHERE p.owner_id = ?
        `, [req.userId]);
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching owner bookings' });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        await db.execute('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: 'Booking status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating booking status' });
    }
};
