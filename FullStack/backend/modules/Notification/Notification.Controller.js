// import * as notificationService from "./Notification.Service.js";

// // عرض كل الإشعارات الخاصة بمستخدم معين
// export const handleGetNotifications = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { limit = 20, offset = 0, type } = req.query;

//     if (!userId) {
//       return res.status(400).json({ ok: false, message: "User ID is required" });
//     }

//     let notifications;
//     if (type) {
//       notifications = await notificationService.getNotificationsByType(
//         userId,
//         type,
//         parseInt(limit),
//         parseInt(offset)
//       );
//     } else {
//       notifications = await notificationService.getNotificationsByReceiver(
//         userId,
//         parseInt(limit),
//         parseInt(offset)
//       );
//     }

//     // معالجة البيانات بشكل آمن
//     const parsedNotifications = notifications.map((notif) => {
//       let safeMetadata = null;
//       if (notif.metadata) {
//         try {
//           safeMetadata = typeof notif.metadata === 'string' ? JSON.parse(notif.metadata) : notif.metadata;
//         } catch (e) {
//           console.error(`⚠️ خطأ في قراءة بيانات الإشعار رقم: ${notif.notification_id}`);
//         }
//       }
//       return { ...notif, metadata: safeMetadata };
//     });

//     res.status(200).json({ ok: true, data: parsedNotifications });
//   } catch (err) {
//     console.error("❌ Error fetching notifications:", err);
//     res.status(500).json({ ok: false, message: "حدث خطأ داخلي في الخادم أثناء جلب الإشعارات" });
//   }
// };

// // جلب عدد الإشعارات غير المقروءة
// export const handleGetUnreadCount = async (req, res) => {
//   try {
//     const { userId } = req.params;
    
//     if (!userId) {
//         return res.status(400).json({ ok: false, message: "User ID is required" });
//     }

//     const count = await notificationService.getUnreadCount(userId);
//     res.status(200).json({ ok: true, data: { unreadCount: count } });
//   } catch (err) {
//     res.status(500).json({ ok: false, message: err.message });
//   }
// };

// // تحديد إشعار معين كمقروء
// export const handleMarkAsRead = async (req, res) => {
//   try {
//     const { notificationId } = req.params;
//     await notificationService.markAsRead(notificationId);
//     res.status(200).json({ ok: true, message: "تم التحديد كمقروء بنجاح" });
//   } catch (err) {
//     res.status(500).json({ ok: false, message: err.message });
//   }
// };

// // تحديد كل الإشعارات كمقروءة لمستخدم معين
// export const handleMarkAllAsRead = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     await notificationService.markAllAsRead(userId);
//     res.status(200).json({ ok: true, message: "تم تحديد كل الإشعارات كمقروءة بنجاح" });
//   } catch (err) {
//     res.status(500).json({ ok: false, message: err.message });
//   }
// };

// // حذف إشعار معين
// export const handleDeleteNotification = async (req, res) => {
//     try {
//       const { notificationId } = req.params;
//       await notificationService.deleteNotification(notificationId);
//       res.status(200).json({ ok: true, message: "تم حذف الإشعار بنجاح" });
//     } catch (err) {
//       res.status(500).json({ ok: false, message: err.message });
//     }
// };