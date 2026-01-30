import db from "../config/db.js";

export const createTenentRequest = async (req, res) => {
    try {
        const { pg_id, full_name, email, phone } = req.body;
        const userId = req.userId;

        if (!full_name || !email || !phone || !pg_id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const [results] = await db.execute(
            'INSERT INTO tenent_call_requests ( user_id , pg_id , full_name , email , phone ) VALUES( ? , ? , ? , ? , ? )', [userId, pg_id, full_name, email, phone]
        );

        res.status(201).json({ message: 'Call Request raised successfully', requestID : results.insertId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error raising call request' });
    }
}

export const getTenentRequest = async (req, res) => {
    try {
        const [requests] = await db.execute(
            `SELECT r.*, p.name AS pg_name
       FROM tenent_call_requests r
       JOIN pg_data p ON r.pg_id = p.id
       ORDER BY r.created_at DESC`
        )
        res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Failed to fetch requests" });
    }
}