import pool from '../../db/Connection.js';

// ✅ إرسال رسالة جديدة
export const sendMessageService = async (senderId, receiverId, text) => {
    const [result] = await pool.promise().query(
        `INSERT INTO message (sender_id, receiver_id, message_text, is_read) VALUES (?, ?, ?, 0)`,
        [senderId, receiverId, text]
    );
    return result.insertId;
};

// ✅ جلب تاريخ المحادثة
export const getChatHistoryService = async (user1, user2) => {
    const [rows] = await pool.promise().query(
        `SELECT * FROM message 
         WHERE (sender_id = ? AND receiver_id = ?) 
            OR (sender_id = ? AND receiver_id = ?)
         ORDER BY send_at ASC`, 
        [user1, user2, user2, user1]
    );
    return rows;
};

// ✅ تعديل الرسالة (بشرط أن يكون الراسل هو من يعدل)
export const updateMessageService = async (messageId, senderId, newText) => {
    const [result] = await pool.promise().query(
        `UPDATE message 
         SET message_text = ?
         WHERE message_id = ? AND sender_id = ?`,
        [newText, messageId, senderId]
    );
    return result.affectedRows > 0;
};

// ✅ تحويل الرسائل لـ "مقروءة" (Seen)
export const markAsReadService = async (receiverId, senderId) => {
    const [result] = await pool.promise().query(
        `UPDATE message 
         SET is_read = 1 
         WHERE receiver_id = ? AND sender_id = ? AND is_read = 0`,
        [receiverId, senderId]
    );
    return result.affectedRows;
};