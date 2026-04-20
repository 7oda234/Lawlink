import express from 'express';
import * as messageController from './message.controller.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, messageController.sendMessage);
router.get('/history/:receiverId', protect, messageController.getHistory);
router.put('/edit/:messageId', protect, messageController.editMessage);
router.put('/seen/:senderId', protect, messageController.markSeen);

export default router;