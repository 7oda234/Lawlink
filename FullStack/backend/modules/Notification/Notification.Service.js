import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("🔴 SQL Error in Notification Service:", err.sqlMessage || err.message);
        return reject(err);
      }
      resolve(result);
    });
  });

/**
 * ==================== CORE NOTIFICATION FUNCTIONS ====================
 */

// 1. Create a new notification
export const createNotification = async (
  title,
  message,
  type,
  receiverId,
  { caseId = null, senderId = null, actionUrl = null, metadata = null } = {}
) => {
  const sql = `
    INSERT INTO notification 
    (title, message, type, related_case_id, sender_id, receiver_id, action_url, metadata, is_read, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, false, NOW())
  `;
  const metadataJson = metadata ? JSON.stringify(metadata) : null;
  const res = await runQuery(sql, [
    title,
    message,
    type,
    caseId,
    senderId,
    receiverId,
    actionUrl,
    metadataJson
  ]);
  return res.insertId;
};

// 2. Get user notifications (paginated)
export const getNotificationsByReceiver = async (receiverId, limit = 20, offset = 0) => {
  const sql = `
    SELECT * FROM notification 
    WHERE receiver_id = ? 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;
  return await runQuery(sql, [receiverId, limit, offset]);
};

// 3. Get unread count for user
export const getUnreadCount = async (receiverId) => {
  const sql = `SELECT COUNT(*) as unread_count FROM notification WHERE receiver_id = ? AND is_read = false`;
  const res = await runQuery(sql, [receiverId]);
  return res.length > 0 ? res[0].unread_count : 0;
};

// 4. Mark notification as read
export const markAsRead = async (notificationId) => {
  const sql = `UPDATE notification SET is_read = 1 WHERE notification_id = ?`;
  return await runQuery(sql, [notificationId]);
};

// 5. Mark all notifications as read for user
export const markAllAsRead = async (receiverId) => {
  const sql = `UPDATE notification SET is_read = 1 WHERE receiver_id = ?`;
  return await runQuery(sql, [receiverId]);
};

// 6. Delete notification
export const deleteNotification = async (notificationId) => {
  const sql = `DELETE FROM notification WHERE notification_id = ?`;
  return await runQuery(sql, [notificationId]);
};

// 7. Delete all notifications for user
export const deleteAllNotifications = async (receiverId) => {
  const sql = `DELETE FROM notification WHERE receiver_id = ?`;
  return await runQuery(sql, [receiverId]);
};

// 8. Get notifications by type
export const getNotificationsByType = async (receiverId, type, limit = 20, offset = 0) => {
  const sql = `
    SELECT * FROM notification 
    WHERE receiver_id = ? AND type = ? 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;
  return await runQuery(sql, [receiverId, type, limit, offset]);
};

// 9. Get single notification
export const getNotificationById = async (notificationId) => {
  const sql = `SELECT * FROM notification WHERE notification_id = ?`;
  const res = await runQuery(sql, [notificationId]);
  return res.length > 0 ? res[0] : null;
};

/**
 * ==================== HELPER FUNCTIONS ====================
 */

export const getClientIdByCase = async (caseId) => {
  const sql = `SELECT client_id FROM cases WHERE case_id = ?`;
  const res = await runQuery(sql, [caseId]);
  return res.length > 0 ? res[0].client_id : null;
};

export const getLawyerIdByCase = async (caseId) => {
  const sql = `SELECT lawyer_id FROM cases WHERE case_id = ?`;
  const res = await runQuery(sql, [caseId]);
  return res.length > 0 ? res[0].lawyer_id : null;
};

export const getUserById = async (userId) => {
  const sql = `SELECT user_id, name, email, role FROM users WHERE user_id = ?`;
  const res = await runQuery(sql, [userId]);
  return res.length > 0 ? res[0] : null;
};

/**
 * ==================== NOTIFICATION TRIGGER FUNCTIONS ====================
 */

export const notifyOfferAccepted = async (caseId, lawyerId, clientId) => {
  const lawyer = await getUserById(lawyerId);
  return await createNotification(
    'العرض مقبول',
    `قَبِل المحامي ${lawyer?.name || 'المحامي'} العرض`,
    'OFFER_ACCEPTED',
    clientId,
    { caseId, senderId: lawyerId, actionUrl: `/cases/${caseId}` }
  );
};

export const notifyAwaitingResponse = async (caseId, receiverId, message) => {
  return await createNotification(
    'في انتظار الرد',
    message || 'جاري الانتظار لردك',
    'AWAITING_RESPONSE',
    receiverId,
    { caseId, actionUrl: `/cases/${caseId}` }
  );
};

export const notifyDocumentUploaded = async (caseId, receiverId, documentName, uploadedBy) => {
  const uploader = await getUserById(uploadedBy);
  return await createNotification(
    'تم تحميل مستند جديد',
    `تم تحميل المستند: ${documentName} بواسطة ${uploader?.name || 'مستخدم'}`,
    'DOCUMENT_UPLOADED',
    receiverId,
    { caseId, senderId: uploadedBy, actionUrl: `/cases/${caseId}/documents` }
  );
};

export const notifyCaseStatusChanged = async (caseId, receiverId, oldStatus, newStatus) => {
  return await createNotification(
    'تغيير حالة القضية',
    `تم تحديث حالة القضية من ${oldStatus} إلى ${newStatus}`,
    'CASE_STATUS_CHANGED',
    receiverId,
    { caseId, actionUrl: `/cases/${caseId}` }
  );
};

export const notifyPaymentReceived = async (caseId, receiverId, amount, installmentNumber) => {
  return await createNotification(
    'تم استقبال الدفع',
    `تم استقبال دفعة ${amount} ج.م (الدفعة ${installmentNumber})`,
    'PAYMENT_RECEIVED',
    receiverId,
    { caseId, actionUrl: `/cases/${caseId}/payments` }
  );
};

export const notifyInvoiceCreated = async (caseId, receiverId, invoiceAmount, invoiceNumber) => {
  return await createNotification(
    'تم إنشاء فاتورة جديدة',
    `تم إنشاء فاتورة برقم ${invoiceNumber} بمبلغ ${invoiceAmount} ج.م`,
    'INVOICE_CREATED',
    receiverId,
    { caseId, actionUrl: `/cases/${caseId}/invoices` }
  );
};

export const notifyCourtSessionAdded = async (caseId, receiverId, sessionDate, courtName) => {
  return await createNotification(
    'جلسة محكمة جديدة',
    `تم إضافة جلسة جديدة في ${courtName} بتاريخ ${sessionDate}`,
    'COURT_SESSION',
    receiverId,
    { caseId, actionUrl: `/cases/${caseId}/sessions` }
  );
};

export const notifyNewMessage = async (caseId, receiverId, senderName, messagePreview, senderId) => {
  return await createNotification(
    'رسالة جديدة',
    `${senderName}: ${messagePreview}`,
    'MESSAGE_RECEIVED',
    receiverId,
    { caseId, senderId, actionUrl: `/messages` }
  );
};

export const notifyAdminAnnouncement = async (receiverId, announcementTitle, announcementContent, adminId) => {
  return await createNotification(
    announcementTitle,
    announcementContent,
    'ANNOUNCEMENT',
    receiverId,
    { senderId: adminId, actionUrl: `/announcements` }
  );
};

export const notifyCaseCompleted = async (caseId, receiverId, completionDate) => {
  return await createNotification(
    'القضية مكتملة',
    `تم إكمال القضية بنجاح في ${completionDate}`,
    'CASE_COMPLETED',
    receiverId,
    { caseId, actionUrl: `/cases/${caseId}` }
  );
};