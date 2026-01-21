import express from 'express';
const router = express.Router();
import * as bookingController from '../controllers/bookingController.js';
import { verifyToken, isOwner } from '../middleware/authMiddleware.js';

router.post('/', verifyToken, bookingController.createBooking);
router.get('/my-bookings', verifyToken, bookingController.getUserBookings);
router.get('/owner-bookings', verifyToken, isOwner, bookingController.getOwnerBookings);
router.put('/:id/status', verifyToken, isOwner, bookingController.updateBookingStatus);

export default router;
