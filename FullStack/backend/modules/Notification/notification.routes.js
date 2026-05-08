import express from "express";
import * as notificationController from "./notification.controller.js";
const router = express.Router();

router.get("/:userId", notificationController.handleGetNotifications);
router.put("/read/:id", notificationController.handleMarkAsRead);
router.put("/read-all/:userId", notificationController.handleMarkAllAsRead);
router.delete("/:id", notificationController.handleDeleteNotification);
router.delete("/all/:userId", notificationController.handleDeleteAllNotifications);

export default router;