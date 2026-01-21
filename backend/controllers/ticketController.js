import db from '../config/db.js';

export const createTicket = async (req, res) => {
    try {
        const { pgId, roomId, issue, description, category, priority } = req.body;
        const userId = req.userId;

        const [result] = await db.execute(
            'INSERT INTO tickets (pg_id, user_id, room_id, issue, description, category, priority, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [pgId, userId, roomId || null, issue, description, category, priority || 'Medium', 'open']
        );

        res.status(201).json({ message: 'Ticket raised successfully', ticketId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error raising ticket' });
    }
};

export const getOwnerTickets = async (req, res) => {
    try {
        const [tickets] = await db.execute(`
            SELECT t.*, u.first_name, u.last_name, p.name as pg_name, r.room_number
            FROM tickets t 
            JOIN users u ON t.user_id = u.id 
            JOIN pg_data p ON t.pg_id = p.id 
            LEFT JOIN rooms r ON t.room_id = r.id
            WHERE p.owner_id = ?
            ORDER BY t.created_at DESC
        `, [req.userId]);
        res.status(200).json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching tickets' });
    }
};

export const updateTicketStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        await db.execute('UPDATE tickets SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: 'Ticket status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating ticket' });
    }
};
