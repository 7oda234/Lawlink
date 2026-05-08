import * as notificationService from "./notification.service.js";
import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// جلب إشعارات مستخدم معين
export const handleGetNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const sql = `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`;
    const notifications = await runQuery(sql, [userId]);
    res.status(200).json({ ok: true, data: notifications });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// تحديث إشعار واحد كمقروء
export const handleMarkAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `UPDATE notifications SET is_read = 1 WHERE notification_id = ?`;
    await runQuery(sql, [id]);
    res.status(200).json({ ok: true, message: "تم تحديث الحالة" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// تحديد كل إشعارات اليوزر كمقروءة
export const handleMarkAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    const sql = `UPDATE notifications SET is_read = 1 WHERE user_id = ?`;
    await runQuery(sql, [userId]);
    res.status(200).json({ ok: true, message: "تم تحديد الكل كمقروء" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// حذف إشعار واحد
export const handleDeleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM notifications WHERE notification_id = ?`;
    await runQuery(sql, [id]);
    res.status(200).json({ ok: true, message: "تم الحذف" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// مسح كل إشعارات اليوزر
export const handleDeleteAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const sql = `DELETE FROM notifications WHERE user_id = ?`;
    await runQuery(sql, [userId]);
    res.status(200).json({ ok: true, message: "تم مسح كافة التنبيهات" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};