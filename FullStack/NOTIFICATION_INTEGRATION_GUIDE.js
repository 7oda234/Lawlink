/**
 * NOTIFICATION SYSTEM INTEGRATION GUIDE
 * 
 * This document explains how to integrate the notification system into existing code
 * and how to trigger notifications from various parts of the application.
 */

// ============================================================================
// STEP 1: WRAP APPLICATION WITH NOTIFICATION PROVIDER (Frontend)
// ============================================================================
// In your main.jsx or App.jsx, wrap your app with NotificationProvider:

/*
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      {/* Your app components */}
    </NotificationProvider>
  );
}
*/

// ============================================================================
// STEP 2: ADD NOTIFICATION DROPDOWN TO NAVBAR
// ============================================================================
// In your Navbar component:

/*
import NotificationDropdown from '../components/NotificationDropdown';

function Navbar() {
  return (
    <nav className="...">
      {/* Other navbar items */}
      <NotificationDropdown />
    </nav>
  );
}
*/

// ============================================================================
// STEP 3: ADD NOTIFICATIONS PAGE TO ROUTING
// ============================================================================
// In your routing configuration (App.jsx or routes):

/*
import NotificationsPage from './pages/NotificationsPage';

const routes = [
  // ... other routes
  {
    path: '/notifications',
    element: <NotificationsPage />,
    private: true
  }
];
*/

// ============================================================================
// STEP 4: USE NOTIFICATIONS IN COMPONENTS
// ============================================================================
// Example: Use the notification hook in any component:

/*
import { useNotifications } from '../context/NotificationContext';

function MyComponent() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    deleteNotification 
  } = useNotifications();

  return (
    <div>
      <p>Unread: {unreadCount}</p>
      {notifications.map(notif => (
        <div key={notif.notification_id}>
          <h3>{notif.title}</h3>
          <p>{notif.message}</p>
          <button onClick={() => markAsRead(notif.notification_id)}>
            Mark as Read
          </button>
        </div>
      ))}
    </div>
  );
}
*/

// ============================================================================
// STEP 5: TRIGGER NOTIFICATIONS FROM BACKEND
// ============================================================================
// Import and use notification service in your backend controllers

/*
import * as notificationService from '../modules/Notification/Notification.Service.js';
import { emitNotificationToUser } from '../modules/Notification/NotificationSocket.js';

// Example: When accepting an offer
export const acceptOffer = async (req, res) => {
  try {
    const { caseId, lawyerId, clientId } = req.body;
    
    // Your business logic...
    
    // Create and emit notification
    await notificationService.notifyOfferAccepted(caseId, lawyerId, clientId);
    
    // Emit real-time update to user
    const notifId = await notificationService.createNotification(
      'العرض مقبول',
      `قَبِل المحامي العرض`,
      'OFFER_ACCEPTED',
      clientId,
      { caseId, senderId: lawyerId }
    );
    
    // Get the notification to emit it
    const notification = await notificationService.getNotificationById(notifId);
    emitNotificationToUser(global.io, clientId, notification);
    
    res.status(200).json({ ok: true, message: 'Offer accepted' });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
*/

// ============================================================================
// STEP 6: COMMON NOTIFICATION TRIGGERS
// ============================================================================

// 1. When case status changes
/*
import { notifyCaseStatusChanged } from '../modules/Notification/Notification.Service.js';
import { emitNotificationToUser } from '../modules/Notification/NotificationSocket.js';

await notifyCaseStatusChanged(caseId, lawyerId, 'Open', 'In Progress');
emitNotificationToUser(global.io, lawyerId, notification);
*/

// 2. When document is uploaded
/*
import { notifyDocumentUploaded } from '../modules/Notification/Notification.Service.js';

await notifyDocumentUploaded(
  caseId, 
  clientId, 
  'contract.pdf', 
  uploadedByUserId
);
*/

// 3. When payment is received
/*
import { notifyPaymentReceived } from '../modules/Notification/Notification.Service.js';

await notifyPaymentReceived(caseId, lawyerId, 5000, 1);
*/

// 4. When invoice is created
/*
import { notifyInvoiceCreated } from '../modules/Notification/Notification.Service.js';

await notifyInvoiceCreated(caseId, clientId, 10000, 'INV-001');
*/

// 5. When court session is scheduled
/*
import { notifyCourtSessionAdded } from '../modules/Notification/Notification.Service.js';

await notifyCourtSessionAdded(
  caseId, 
  lawyerId, 
  '2024-01-15 10:00 AM', 
  'محكمة القاهرة'
);
*/

// 6. Send admin announcement to all users
/*
import { notifyAdminAnnouncement } from '../modules/Notification/Notification.Service.js';

// Send to specific user
await notifyAdminAnnouncement(
  userId, 
  'تحديث النظام', 
  'سيتم صيانة النظام غداً', 
  adminId
);
*/

// ============================================================================
// NOTIFICATION TYPES AND THEIR USAGE
// ============================================================================

const NotificationTypes = {
  OFFER_ACCEPTED: {
    use: 'When a lawyer accepts a case offer',
    example: 'notifyOfferAccepted(caseId, lawyerId, clientId)'
  },
  AWAITING_RESPONSE: {
    use: 'When waiting for client or lawyer response',
    example: 'notifyAwaitingResponse(caseId, receiverId, message)'
  },
  DOCUMENT_UPLOADED: {
    use: 'When new document is added to case',
    example: 'notifyDocumentUploaded(caseId, receiverId, docName, uploadedBy)'
  },
  CASE_STATUS_CHANGED: {
    use: 'When case status updates',
    example: 'notifyCaseStatusChanged(caseId, receiverId, oldStatus, newStatus)'
  },
  PAYMENT_RECEIVED: {
    use: 'When payment/installment is made',
    example: 'notifyPaymentReceived(caseId, receiverId, amount, installmentNum)'
  },
  INVOICE_CREATED: {
    use: 'When new invoice is generated',
    example: 'notifyInvoiceCreated(caseId, receiverId, amount, invoiceNum)'
  },
  COURT_SESSION: {
    use: 'When court session is scheduled',
    example: 'notifyCourtSessionAdded(caseId, receiverId, date, court)'
  },
  MESSAGE_RECEIVED: {
    use: 'When new message arrives',
    example: 'notifyNewMessage(caseId, receiverId, senderName, preview, senderId)'
  },
  ANNOUNCEMENT: {
    use: 'Admin announcements to users',
    example: 'notifyAdminAnnouncement(receiverId, title, content, adminId)'
  },
  CASE_COMPLETED: {
    use: 'When case is completed',
    example: 'notifyCaseCompleted(caseId, receiverId, completionDate)'
  }
};

// ============================================================================
// DATABASE SETUP (Run this SQL in MariaDB)
// ============================================================================

/*
CREATE TABLE IF NOT EXISTS notifications (
  notification_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM(
    'OFFER_ACCEPTED',
    'AWAITING_RESPONSE',
    'DOCUMENT_UPLOADED',
    'CASE_STATUS_CHANGED',
    'PAYMENT_RECEIVED',
    'INVOICE_CREATED',
    'COURT_SESSION',
    'MESSAGE_RECEIVED',
    'ANNOUNCEMENT',
    'CASE_COMPLETED'
  ) NOT NULL,
  related_case_id INT NULLABLE,
  sender_id INT NULLABLE,
  receiver_id INT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500) NULLABLE,
  metadata JSON NULLABLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (related_case_id) REFERENCES cases(case_id) ON DELETE SET NULL,
  FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE SET NULL,
  FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
  
  INDEX idx_receiver_id (receiver_id),
  INDEX idx_is_read (is_read),
  INDEX idx_type (type),
  INDEX idx_created_at (created_at),
  INDEX idx_receiver_read (receiver_id, is_read)
);
*/

// ============================================================================
// API ENDPOINTS
// ============================================================================

const API_ENDPOINTS = {
  // Get all notifications for user
  GET: '/api/notifications/:userId?limit=20&offset=0&type=TYPE',
  
  // Get unread count
  GET_COUNT: '/api/notifications/unread/count/:userId',
  
  // Get single notification
  GET_DETAIL: '/api/notifications/detail/:notificationId',
  
  // Create notification (admin/system)
  POST_CREATE: '/api/notifications/create',
  
  // Mark single as read
  PUT_READ: '/api/notifications/mark-read/:notificationId',
  
  // Mark all as read
  PUT_ALL_READ: '/api/notifications/mark-all-read/:userId',
  
  // Delete single
  DELETE: '/api/notifications/:notificationId',
  
  // Delete all
  DELETE_ALL: '/api/notifications/all/:userId'
};

// ============================================================================
// SOCKET.IO EVENTS
// ============================================================================

const SOCKET_EVENTS = {
  // Client -> Server
  CLIENT_CONNECT: 'user:connect',
  MARK_READ: 'notification:mark-read',
  MARK_ALL_READ: 'notification:mark-all-read',
  DELETE: 'notification:delete',
  
  // Server -> Client
  NEW_NOTIFICATION: 'notification:new',
  NOTIFICATION_READ: 'notification:read',
  ALL_READ: 'notification:all-read',
  DELETED: 'notification:deleted',
  UNREAD_COUNT: 'notification:unread-count',
  BROADCAST: 'notification:broadcast',
  ERROR: 'error'
};

// ============================================================================
// ENVIRONMENT VARIABLES (.env)
// ============================================================================

/*
# Backend
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Frontend
VITE_API_URL=http://localhost:5000
*/

export default {
  NotificationTypes,
  API_ENDPOINTS,
  SOCKET_EVENTS
};
