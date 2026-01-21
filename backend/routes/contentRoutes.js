import express from 'express';
const router = express.Router();
import * as contentController from '../controllers/contentController.js';

router.get('/:section', contentController.getContentBySection);
router.get('/', contentController.getAllContent);

export default router;
