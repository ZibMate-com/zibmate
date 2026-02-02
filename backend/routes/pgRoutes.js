import express from 'express';
const router = express.Router();
import * as pgController from '../controllers/pgController.js';
import { verifyToken, isOwner, isAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

router.get('/', pgController.getAllPGs);
router.get('/my-pgs', verifyToken, isOwner, pgController.getMyPGs);
router.get('/top', pgController.getTopPGs);
router.get('/:id', pgController.getPGById);
router.post('/onboard', verifyToken, isAdmin, upload.array('images', 10), pgController.addPG);

export default router;
