
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import pgRoutes from './routes/pgRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import requestRoutes from './routes/requestRoutes.js'
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test Database Connection
db.execute('SELECT 1')
    .then(() => console.log('Successfully connected to the database.'))
    .catch(err => {
        console.error('Database connection failed:');
        console.error(err.message);
    });

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://zibmate.com', 
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pg', pgRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/requests',requestRoutes);

app.get('/', (req, res) => {
    res.send('ZibMate Backend is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

