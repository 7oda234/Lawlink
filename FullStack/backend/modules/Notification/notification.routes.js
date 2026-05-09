import express from "express";
import * as notificationController from "./Notification.Controller.js";

const router = express.Router();

// جلب كل الإشعارات الخاصة بمستخدم
router.get("/:userId", notificationController.handleGetNotifications);

// جلب عدد الإشعارات غير المقروءة لمستخدم
router.get("/unread/:userId", notificationController.handleGetUnreadCount);

// تحديد إشعار كـ "مقروء"
router.put("/read/:notificationId", notificationController.handleMarkAsRead);

// تحديد كل إشعارات المستخدم كـ "مقروءة"
router.put("/read-all/:userId", notificationController.handleMarkAllAsRead);

// حذف إشعار معين
router.delete("/delete/:notificationId", notificationController.handleDeleteNotification);

export default router;