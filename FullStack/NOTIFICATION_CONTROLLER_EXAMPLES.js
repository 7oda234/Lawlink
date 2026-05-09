/**
 * NOTIFICATION TRIGGER EXAMPLES
 * 
 * Real-world examples of how to integrate notifications into existing controllers
 * Copy and adapt these patterns to your specific controllers
 */

import * as notificationService from '../modules/Notification/Notification.Service.js';
import { emitNotificationToUser, emitNotificationToUsers } from '../modules/Notification/NotificationSocket.js';

// ============================================================================
// EXAMPLE 1: CASE OFFER ACCEPTANCE
// ============================================================================
// Location: /backend/modules/Cases/cases.controller.js

export const acceptOfferExample = async (req, res) => {
  try {
    const { caseId, lawyerId, clientId } = req.body;

    // Your existing business logic to accept offer...
    // const result = await caseService.acceptOffer(caseId, lawyerId);

    // ✅ CREATE AND EMIT NOTIFICATION
    const notificationId = await notificationService.notifyOfferAccepted(
      caseId,
      lawyerId,
      clientId
    );

    // Get notification details for real-time emit
    const notification = await notificationService.getNotificationById(notificationId);

    // Emit real-time update to client
    if (global.io) {
      emitNotificationToUser(global.io, clientId, notification);
    }

    res.status(200).json({
      ok: true,
      message: 'عرض القضية تم قبوله بنجاح',
      data: { caseId, lawyerId }
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 2: CASE STATUS UPDATE
// ============================================================================
// Location: /backend/modules/Cases/cases.controller.js

export const updateCaseStatusExample = async (req, res) => {
  try {
    const { caseId, newStatus } = req.body;
    const { oldStatus, clientId, lawyerId } = req.body; // Also provide these

    // Your existing business logic to update status...
    // await caseService.updateStatus(caseId, newStatus);

    // ✅ NOTIFY BOTH PARTIES
    // Notify client
    const clientNotifId = await notificationService.notifyCaseStatusChanged(
      caseId,
      clientId,
      oldStatus,
      newStatus
    );

    // Notify lawyer
    const lawyerNotifId = await notificationService.notifyCaseStatusChanged(
      caseId,
      lawyerId,
      oldStatus,
      newStatus
    );

    // Emit real-time updates
    if (global.io) {
      const clientNotif = await notificationService.getNotificationById(clientNotifId);
      const lawyerNotif = await notificationService.getNotificationById(lawyerNotifId);

      emitNotificationToUser(global.io, clientId, clientNotif);
      emitNotificationToUser(global.io, lawyerId, lawyerNotif);
    }

    res.status(200).json({
      ok: true,
      message: 'تم تحديث حالة القضية'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 3: DOCUMENT UPLOAD
// ============================================================================
// Location: /backend/modules/Document_folder/document.controller.js

export const uploadDocumentExample = async (req, res) => {
  try {
    const { caseId, documentName, uploadedByUserId, receiverIds } = req.body;

    // Your existing business logic to save document...
    // await documentService.upload(caseId, file);

    // ✅ NOTIFY ALL PARTIES
    for (const receiverId of receiverIds) {
      if (receiverId !== uploadedByUserId) { // Don't notify uploader
        const notifId = await notificationService.notifyDocumentUploaded(
          caseId,
          receiverId,
          documentName,
          uploadedByUserId
        );

        // Emit real-time update
        if (global.io) {
          const notification = await notificationService.getNotificationById(notifId);
          emitNotificationToUser(global.io, receiverId, notification);
        }
      }
    }

    res.status(200).json({
      ok: true,
      message: 'تم تحميل المستند بنجاح'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 4: PAYMENT RECEIVED
// ============================================================================
// Location: /backend/modules/Payment/payment.controller.js

export const processPaymentExample = async (req, res) => {
  try {
    const { caseId, lawyerId, amount, installmentNumber } = req.body;

    // Your existing business logic to process payment...
    // const payment = await paymentService.processPayment(req.body);

    // ✅ NOTIFY LAWYER ABOUT PAYMENT
    const notifId = await notificationService.notifyPaymentReceived(
      caseId,
      lawyerId,
      amount,
      installmentNumber
    );

    // Emit real-time update
    if (global.io) {
      const notification = await notificationService.getNotificationById(notifId);
      emitNotificationToUser(global.io, lawyerId, notification);
    }

    res.status(200).json({
      ok: true,
      message: 'تم استقبال الدفع بنجاح'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 5: INVOICE CREATION
// ============================================================================
// Location: /backend/modules/Invoice/invoice.controller.js

export const createInvoiceExample = async (req, res) => {
  try {
    const { caseId, clientId, amount, invoiceNumber } = req.body;

    // Your existing business logic to create invoice...
    // const invoice = await invoiceService.create(req.body);

    // ✅ NOTIFY CLIENT ABOUT NEW INVOICE
    const notifId = await notificationService.notifyInvoiceCreated(
      caseId,
      clientId,
      amount,
      invoiceNumber
    );

    // Emit real-time update
    if (global.io) {
      const notification = await notificationService.getNotificationById(notifId);
      emitNotificationToUser(global.io, clientId, notification);
    }

    res.status(200).json({
      ok: true,
      message: 'تم إنشاء الفاتورة بنجاح'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 6: COURT SESSION SCHEDULING
// ============================================================================
// Location: /backend/modules/Appointment/appointment.controller.js

export const scheduleCourtSessionExample = async (req, res) => {
  try {
    const { caseId, lawyerId, clientId, sessionDate, courtName } = req.body;

    // Your existing business logic to schedule session...
    // const session = await appointmentService.schedule(req.body);

    // ✅ NOTIFY BOTH PARTIES
    const lawyerNotifId = await notificationService.notifyCourtSessionAdded(
      caseId,
      lawyerId,
      sessionDate,
      courtName
    );

    const clientNotifId = await notificationService.notifyCourtSessionAdded(
      caseId,
      clientId,
      sessionDate,
      courtName
    );

    // Emit real-time updates
    if (global.io) {
      const lawyerNotif = await notificationService.getNotificationById(lawyerNotifId);
      const clientNotif = await notificationService.getNotificationById(clientNotifId);

      emitNotificationToUser(global.io, lawyerId, lawyerNotif);
      emitNotificationToUser(global.io, clientId, clientNotif);
    }

    res.status(200).json({
      ok: true,
      message: 'تم جدولة الجلسة بنجاح'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 7: NEW MESSAGE
// ============================================================================
// Location: /backend/modules/Message/message.controller.js

export const sendMessageExample = async (req, res) => {
  try {
    const { caseId, senderId, receiverId, content } = req.body;

    // Your existing business logic to save message...
    // const message = await messageService.send(req.body);

    // ✅ NOTIFY RECEIVER ABOUT NEW MESSAGE
    // Get sender details for notification
    const senderDetails = await notificationService.getUserById(senderId);

    const notifId = await notificationService.notifyNewMessage(
      caseId,
      receiverId,
      senderDetails?.name || 'مستخدم',
      content.substring(0, 50) + (content.length > 50 ? '...' : ''), // Preview
      senderId
    );

    // Emit real-time update
    if (global.io) {
      const notification = await notificationService.getNotificationById(notifId);
      emitNotificationToUser(global.io, receiverId, notification);
    }

    res.status(200).json({
      ok: true,
      message: 'تم إرسال الرسالة بنجاح'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 8: ADMIN ANNOUNCEMENT
// ============================================================================
// Location: /backend/modules/admin/admin.controller.js

export const sendAnnouncementExample = async (req, res) => {
  try {
    const { title, content, targetUserIds, adminId } = req.body;

    // Your existing business logic...
    // await adminService.createAnnouncement(req.body);

    // ✅ NOTIFY ALL TARGETED USERS
    for (const userId of targetUserIds) {
      const notifId = await notificationService.notifyAdminAnnouncement(
        userId,
        title,
        content,
        adminId
      );

      // Emit real-time update
      if (global.io) {
        const notification = await notificationService.getNotificationById(notifId);
        emitNotificationToUser(global.io, userId, notification);
      }
    }

    res.status(200).json({
      ok: true,
      message: 'تم إرسال الإعلان بنجاح'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 9: CASE COMPLETION
// ============================================================================
// Location: /backend/modules/Cases/cases.controller.js

export const completeCaseExample = async (req, res) => {
  try {
    const { caseId, clientId, lawyerId, completionDate } = req.body;

    // Your existing business logic to complete case...
    // await caseService.complete(caseId);

    // ✅ NOTIFY BOTH PARTIES
    const clientNotifId = await notificationService.notifyCaseCompleted(
      caseId,
      clientId,
      completionDate
    );

    const lawyerNotifId = await notificationService.notifyCaseCompleted(
      caseId,
      lawyerId,
      completionDate
    );

    // Emit real-time updates
    if (global.io) {
      const clientNotif = await notificationService.getNotificationById(clientNotifId);
      const lawyerNotif = await notificationService.getNotificationById(lawyerNotifId);

      emitNotificationToUser(global.io, clientId, clientNotif);
      emitNotificationToUser(global.io, lawyerId, lawyerNotif);
    }

    res.status(200).json({
      ok: true,
      message: 'تم إكمال القضية بنجاح'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// EXAMPLE 10: AWAITING RESPONSE
// ============================================================================
// Location: /backend/modules/Cases/cases.controller.js

export const requestResponseExample = async (req, res) => {
  try {
    const { caseId, receiverId, message } = req.body;

    // Your existing business logic...

    // ✅ NOTIFY RECEIVER TO RESPOND
    const notifId = await notificationService.notifyAwaitingResponse(
      caseId,
      receiverId,
      message || 'في انتظار ردك'
    );

    // Emit real-time update
    if (global.io) {
      const notification = await notificationService.getNotificationById(notifId);
      emitNotificationToUser(global.io, receiverId, notification);
    }

    res.status(200).json({
      ok: true,
      message: 'تم إرسال طلب الرد'
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ============================================================================
// HELPER: BULK NOTIFICATION TO MULTIPLE USERS
// ============================================================================

export const sendBulkNotificationExample = async (userIds, notificationData) => {
  try {
    const notifications = [];

    for (const userId of userIds) {
      const notifId = await notificationService.createNotification(
        notificationData.title,
        notificationData.message,
        notificationData.type,
        userId,
        notificationData.extra || {}
      );

      notifications.push({
        userId,
        notificationId: notifId
      });
    }

    // Emit to all users
    if (global.io) {
      for (const { userId, notificationId } of notifications) {
        const notification = await notificationService.getNotificationById(notificationId);
        emitNotificationToUser(global.io, userId, notification);
      }
    }

    return notifications;
  } catch (err) {
    console.error('Error sending bulk notification:', err);
    throw err;
  }
};

export default {
  acceptOfferExample,
  updateCaseStatusExample,
  uploadDocumentExample,
  processPaymentExample,
  createInvoiceExample,
  scheduleCourtSessionExample,
  sendMessageExample,
  sendAnnouncementExample,
  completeCaseExample,
  requestResponseExample,
  sendBulkNotificationExample
};
