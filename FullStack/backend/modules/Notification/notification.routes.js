import express from 'express';
import { getUserNotifications, markAsRead } from './notification.controller.js';

const router = express.Router();

router.get('/:userId', getUserNotifications);
router.put('/:id/read', markAsRead);

export default router;