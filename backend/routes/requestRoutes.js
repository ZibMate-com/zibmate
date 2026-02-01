import express from 'express';
import * as requestController from '../controllers/requestController.js'
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/tenent/create",verifyToken, requestController.createTenentRequest);
router.get("/tenent",verifyToken, isAdmin,requestController.getTenentRequest);
router.put("/:id/status",verifyToken, isAdmin,requestController.getTenentRequest);
router.post("/sendmail/:request_id",verifyToken,isAdmin,requestController.sendOwnerDetails);
export default router;