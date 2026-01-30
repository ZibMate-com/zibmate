import express from 'express';
import * as requestController from '../controllers/requestController.js'
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/tenent/create",verifyToken, requestController.createTenentRequest);
router.get("/tenent",verifyToken, isAdmin,requestController.getTenentRequest);

export default router;