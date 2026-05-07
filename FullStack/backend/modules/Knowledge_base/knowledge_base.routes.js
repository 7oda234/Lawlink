import express from 'express';
import { uploadSingle, handleUploadError } from '../../middleware/upload.js'; // الميدل وير بتاع الرفع
import { uploadToKnowledgeBase } from './knowledge_base.controller.js';

const router = express.Router();

// بنرفع ملف واحد (PDF) ونسميه في الفورم 'file'
router.post('/upload', uploadSingle('file'), handleUploadError, uploadToKnowledgeBase);

export default router;
