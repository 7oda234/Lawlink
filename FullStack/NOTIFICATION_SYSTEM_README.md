# LawLink Notification System - Complete Implementation

## 🎯 Overview

A complete real-time notification system for the LawLink legal application. Supports instant notifications for clients and lawyers regarding case updates, payments, documents, court sessions, and more.

**Technology Stack:**
- **Backend:** Node.js, Express.js, Socket.IO
- **Frontend:** React, Socket.IO Client, Tailwind CSS
- **Database:** MariaDB
- **Real-time:** WebSocket via Socket.IO

---

## ✨ Features

### Backend Features
- ✅ Complete notification CRUD operations
- ✅ Real-time delivery via Socket.IO
- ✅ 10 notification types for different events
- ✅ Read/unread status tracking
- ✅ Timestamps for all notifications
- ✅ Pagination support
- ✅ Type-based filtering
- ✅ Metadata support for additional context
- ✅ Persistent storage in database

### Frontend Features
- ✅ Real-time notification updates
- ✅ Notification dropdown in navbar
- ✅ Unread count badge
- ✅ Full notifications page with filtering
- ✅ Type-based categorization
- ✅ Read/unread status toggling
- ✅ Notification deletion
- ✅ Bulk mark as read
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Beautiful dark theme UI

---

## 📁 Project Structure

```
FullStack/
├── backend/
│   ├── modules/
│   │   └── Notification/
│   │       ├── Notification.Model.js         - Database schema
│   │       ├── Notification.Service.js       - Business logic
│   │       ├── Notification.Controller.js    - Request handlers
│   │       ├── notification.routes.js        - API routes
│   │       └── NotificationSocket.js         - Socket.IO handlers
│   ├── server.js                             - Updated with Socket.IO
│   └── controllers/
│       └── app.controller.js                 - Routes registered
│
├── frontend/
│   └── src/
│       ├── context/
│       │   └── NotificationContext.jsx       - State & Socket.IO mgmt
│       ├── services/
│       │   └── notificationService.js        - API client
│       ├── components/
│       │   ├── NotificationItem.jsx          - Single notification UI
│       │   └── NotificationDropdown.jsx      - Navbar dropdown
│       └── pages/
│           └── NotificationsPage.jsx         - Full notifications page
│
├── NOTIFICATION_SETUP_CHECKLIST.md           - Setup guide
├── NOTIFICATION_INTEGRATION_GUIDE.js         - Integration examples
├── NOTIFICATION_CONTROLLER_EXAMPLES.js       - Controller patterns
└── README.md                                 - This file
```

---

## 🚀 Quick Start

### 1. Database Setup

Run this SQL in MariaDB:

```sql
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
```

### 2. Frontend Setup

#### Wrap your app with NotificationProvider:

In `frontend/src/main.jsx` or `App.jsx`:

```jsx
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      {/* Your existing app structure */}
    </NotificationProvider>
  );
}

export default App;
```

#### Add NotificationDropdown to Navbar:

```jsx
import NotificationDropdown from './components/NotificationDropdown';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Other navbar items */}
      <NotificationDropdown />
    </nav>
  );
}
```

#### Add Notifications Route:

```jsx
import NotificationsPage from './pages/NotificationsPage';

// In your routes configuration:
{
  path: '/notifications',
  element: <ProtectedRoute><NotificationsPage /></ProtectedRoute>
}
```

### 3. Environment Variables

Create `.env` in frontend directory:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Backend Setup

No additional setup needed - Socket.IO is already integrated in `server.js`.

---

## 📚 API Endpoints

### GET Notifications
```
GET /api/notifications/:userId?limit=20&offset=0&type=OFFER_ACCEPTED
```
Returns paginated notifications with optional type filtering.

### Get Unread Count
```
GET /api/notifications/unread/count/:userId
```
Returns: `{ ok: true, data: { unreadCount: 5 } }`

### Get Single Notification
```
GET /api/notifications/detail/:notificationId
```

### Create Notification (Admin/System)
```
POST /api/notifications/create
Body: {
  "title": "Notification Title",
  "message": "Notification message",
  "type": "OFFER_ACCEPTED",
  "receiverId": 1,
  "caseId": 5,
  "senderId": 2,
  "actionUrl": "/cases/5",
  "metadata": { "extra": "data" }
}
```

### Mark as Read
```
PUT /api/notifications/mark-read/:notificationId
```

### Mark All as Read
```
PUT /api/notifications/mark-all-read/:userId
```

### Delete Notification
```
DELETE /api/notifications/:notificationId
```

### Delete All Notifications
```
DELETE /api/notifications/all/:userId
```

---

## 🔌 Socket.IO Events

### Client -> Server
- `user:connect` - User connects to notification system
- `notification:mark-read` - Mark notification as read
- `notification:mark-all-read` - Mark all as read
- `notification:delete` - Delete notification

### Server -> Client
- `notification:new` - New notification received
- `notification:read` - Notification marked as read
- `notification:all-read` - All notifications marked as read
- `notification:deleted` - Notification deleted
- `notification:unread-count` - Unread count updated
- `notification:broadcast` - Broadcast notification
- `error` - Error event

---

## 💡 Using Notifications in Components

### Basic Usage
```jsx
import { useNotifications } from '../context/NotificationContext';

function MyComponent() {
  const { notifications, unreadCount } = useNotifications();

  return (
    <div>
      <p>Unread: {unreadCount}</p>
      <ul>
        {notifications.map(notif => (
          <li key={notif.notification_id}>{notif.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Filter Notifications
```jsx
const { getNotificationsByType } = useNotifications();
const caseUpdates = getNotificationsByType('CASE_STATUS_CHANGED');
```

### Mark as Read
```jsx
const { markAsRead } = useNotifications();
const handleRead = async (notifId) => {
  await markAsRead(notifId);
};
```

---

## 🔔 Notification Types

| Type | Use Case | Receiver |
|------|----------|----------|
| `OFFER_ACCEPTED` | Lawyer accepts case offer | Client |
| `AWAITING_RESPONSE` | Waiting for response | Client/Lawyer |
| `DOCUMENT_UPLOADED` | New document added | Case parties |
| `CASE_STATUS_CHANGED` | Status update | Case parties |
| `PAYMENT_RECEIVED` | Payment completed | Lawyer |
| `INVOICE_CREATED` | Invoice generated | Client |
| `COURT_SESSION` | Session scheduled | Case parties |
| `MESSAGE_RECEIVED` | New message | Case parties |
| `ANNOUNCEMENT` | Admin announcement | Users |
| `CASE_COMPLETED` | Case finished | Case parties |

---

## 🎯 Integration Examples

### Trigger Notification on Case Status Change

```javascript
// In your case controller
import * as notificationService from '../modules/Notification/Notification.Service.js';
import { emitNotificationToUser } from '../modules/Notification/NotificationSocket.js';

export const updateCaseStatus = async (req, res) => {
  try {
    const { caseId, newStatus, oldStatus, clientId, lawyerId } = req.body;

    // Your business logic...

    // Create notifications
    const notifId = await notificationService.notifyCaseStatusChanged(
      caseId,
      clientId,
      oldStatus,
      newStatus
    );

    // Emit real-time
    const notification = await notificationService.getNotificationById(notifId);
    emitNotificationToUser(global.io, clientId, notification);

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
```

### Notify Multiple Users

```javascript
import { emitNotificationToUsers } from '../modules/Notification/NotificationSocket.js';

// Send notification to multiple users
const userIds = [1, 2, 3];
emitNotificationToUsers(global.io, userIds, notificationData);
```

---

## 🧪 Testing

### Test with Postman

1. **Create test notification:**
```
POST http://localhost:5000/api/notifications/create
Content-Type: application/json

{
  "title": "Test",
  "message": "Test notification",
  "type": "ANNOUNCEMENT",
  "receiverId": 1
}
```

2. **Get notifications:**
```
GET http://localhost:5000/api/notifications/1
```

3. **Get unread count:**
```
GET http://localhost:5000/api/notifications/unread/count/1
```

### Test Real-time
1. Open two browser tabs with different users
2. Send notification from backend API
3. Check if it appears in real-time on recipient's browser

---

## 🐛 Troubleshooting

### Issue: Socket.IO not connecting
**Solution:**
- Check backend is running on port 5000
- Verify CORS_ORIGIN environment variable
- Check browser console for connection errors

### Issue: Notifications not appearing
**Solution:**
- Verify NotificationProvider wraps app
- Check browser console for errors
- Verify user_id is being sent correctly
- Check database for notifications

### Issue: Real-time updates not working
**Solution:**
- Ensure global.io is available on backend
- Check Socket.IO event names match exactly
- Verify user is connected via 'user:connect'

### Issue: Database errors
**Solution:**
- Run CREATE TABLE script above
- Verify table name is 'notifications'
- Check foreign key constraints

---

## 📝 Files Created

### Backend (5 files)
1. `backend/modules/Notification/Notification.Model.js` - Schema definition
2. `backend/modules/Notification/Notification.Service.js` - Business logic (230+ lines)
3. `backend/modules/Notification/Notification.Controller.js` - API handlers (160+ lines)
4. `backend/modules/Notification/notification.routes.js` - Routes definition
5. `backend/modules/Notification/NotificationSocket.js` - Socket.IO integration (150+ lines)

### Frontend (4 components)
1. `frontend/src/context/NotificationContext.jsx` - State management (180+ lines)
2. `frontend/src/services/notificationService.js` - API client (140+ lines)
3. `frontend/src/components/NotificationItem.jsx` - Notification display (150+ lines)
4. `frontend/src/components/NotificationDropdown.jsx` - Navbar dropdown (130+ lines)
5. `frontend/src/pages/NotificationsPage.jsx` - Full page (300+ lines)

### Documentation (3 files)
1. `NOTIFICATION_SETUP_CHECKLIST.md` - Setup instructions
2. `NOTIFICATION_INTEGRATION_GUIDE.js` - Integration patterns
3. `NOTIFICATION_CONTROLLER_EXAMPLES.js` - Controller examples

**Total: 12 files created, 1600+ lines of code**

---

## ✅ Verification Checklist

Before considering complete, verify:

- [ ] Database table created
- [ ] Backend server runs without errors
- [ ] Socket.IO initializes on startup
- [ ] Frontend wraps app with NotificationProvider
- [ ] NotificationDropdown visible in navbar
- [ ] NotificationsPage accessible at `/notifications`
- [ ] Can create test notification via API
- [ ] Notification appears in dropdown in real-time
- [ ] Mark as read works
- [ ] Delete works
- [ ] Filtering works
- [ ] Pagination works
- [ ] Unread count updates in real-time
- [ ] Socket.IO logs appear in browser console

---

## 🎉 You're All Set!

The notification system is now fully implemented and ready to use. Start integrating notifications into your existing controllers using the examples provided.

For detailed integration steps, see: `NOTIFICATION_SETUP_CHECKLIST.md`
For controller examples, see: `NOTIFICATION_CONTROLLER_EXAMPLES.js`

Happy coding! 🚀
