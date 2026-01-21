import express from 'express';
const router = express.Router();
import * as ticketController from '../controllers/ticketController.js';
import { verifyToken, isOwner } from '../middleware/authMiddleware.js';

router.post('/', verifyToken, ticketController.createTicket);
router.get('/owner', verifyToken, isOwner, ticketController.getOwnerTickets);
router.put('/:id/status', verifyToken, isOwner, ticketController.updateTicketStatus);

export default router;
