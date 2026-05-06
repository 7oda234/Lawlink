import express from 'express';
import { uploadSingle, handleUploadError } from '../../middleware/upload.js';
import { conductResearch, contractReview } from './ai_tools.controller.js';

const router = express.Router();

router.post('/research', conductResearch);
router.post('/contract-review', uploadSingle('file'), handleUploadError, contractReview);

export default router;
