import express from 'express';
const router = express.Router();
import * as dashboardController from '../controllers/dashboardController.js';
import { verifyToken, isOwner } from '../middleware/authMiddleware.js';

router.get('/owner', verifyToken, isOwner, dashboardController.getOwnerDashboardStats);
router.get('/tenant', verifyToken, dashboardController.getTenantDashboard);
router.get('/owner/rooms', verifyToken, isOwner, dashboardController.getOwnerRooms);

export default router;
