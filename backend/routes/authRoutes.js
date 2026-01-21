import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google', authController.googleLogin);
router.get('/me', verifyToken, authController.getMe);

export default router;
