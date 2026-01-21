import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;

        // Check if user exists
        const [existingUsers] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await db.execute(
            'INSERT INTO users (first_name, last_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword, phone, role || 'user']
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

export const googleLogin = async (req, res) => {
    try {
        const { email, firstName, lastName, role } = req.body;

        // Check if user exists
        let [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        let user;

        if (users.length === 0) {
            // Create user for social login (no password needed for social users)
            const [result] = await db.execute(
                'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName || '', email, 'SOCIAL_LOGIN_PROVIDER', role || 'user']
            );
            const [newUsers] = await db.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
            user = newUsers[0];
        } else {
            user = users[0];
        }

        // Create token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during Google login' });
    }
};

export const getMe = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT id, first_name, last_name, email, role, phone FROM users WHERE id = ?', [req.userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(users[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
