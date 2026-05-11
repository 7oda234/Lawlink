# Notification System Integration Checklist

## 📋 Overview
Complete notification system for LawLink application with real-time support via Socket.IO.

**Backend Files Created:**
- ✅ `/backend/modules/Notification/Notification.Model.js` - Database schema
- ✅ `/backend/modules/Notification/Notification.Service.js` - Business logic & triggers
- ✅ `/backend/modules/Notification/Notification.Controller.js` - Request handlers
- ✅ `/backend/modules/Notification/notification.routes.js` - API endpoints
- ✅ `/backend/modules/Notification/NotificationSocket.js` - Socket.IO implementation
- ✅ `/backend/server.js` - Updated with Socket.IO integration

**Frontend Files Created:**
- ✅ `/frontend/src/context/NotificationContext.jsx` - State management
- ✅ `/frontend/src/services/notificationService.js` - API client
- ✅ `/frontend/src/components/NotificationItem.jsx` - Notification display
- ✅ `/frontend/src/components/NotificationDropdown.jsx` - Navbar dropdown
- ✅ `/frontend/src/pages/NotificationsPage.jsx` - Full notifications page

**Documentation:**
- ✅ `/FullStack/NOTIFICATION_INTEGRATION_GUIDE.js` - Integration guide

---

## 🔧 STEP-BY-STEP INTEGRATION GUIDE

### Phase 1: Backend Setup

#### 1.1 Database Table Creation
Run this SQL in MariaDB (if not already created):
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

#### 1.2 Backend Dependencies
Socket.IO is already in package.json. No additional backend packages needed.

#### 1.3 Verify Routes Are Registered
✅ Already done in `/backend/controllers/app.controller.js`:
```javascript
import notificationRouter from "../modules/Notification/notification.routes.js";
app.use("/api/notifications", notificationRouter);
```

#### 1.4 Verify Socket.IO Setup
✅ Already done in `/backend/server.js`:
- HTTP server created
- Socket.IO initialized
- Made globally available as `global.io`

---

### Phase 2: Frontend Setup

#### 2.1 Install Socket.IO Client
Socket.IO client is already in `frontend/package.json`:
```bash
npm install socket.io-client  # Already installed
```

#### 2.2 Add NotificationProvider to App
Update your `/frontend/src/App.jsx` or `/frontend/src/main.jsx`:

```jsx
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      {/* Your existing app structure */}
    </NotificationProvider>
  );
}
```

#### 2.3 Add NotificationDropdown to Navbar
Update your Navbar component:

```jsx
import NotificationDropdown from './components/NotificationDropdown';

function Navbar() {
  return (
    <nav className="...">
      {/* Other navbar items */}
      
      {/* Add this */}
      <NotificationDropdown />
      
      {/* Other navbar items */}
    </nav>
  );
}
```

#### 2.4 Add Notifications Route
Update your routing configuration (typically in App.jsx or a routes file):

```jsx
import NotificationsPage from './pages/NotificationsPage';

// In your route configuration:
{
  path: '/notifications',
  element: <ProtectedRoute><NotificationsPage /></ProtectedRoute>,
  // or whatever protection you use
}
```

#### 2.5 Update Environment Variables
Add to your `.env` file (frontend):
```
VITE_API_URL=http://localhost:5000
```

---

### Phase 3: Trigger Notifications from Backend

#### 3.1 Example: Accept Case Offer
In your case controller or service:

```javascript
import * as notificationService from '../modules/Notification/Notification.Service.js';
import { emitNotificationToUser } from '../modules/Notification/NotificationSocket.js';

export const acceptOffer = async (req, res) => {
  try {
    const { caseId, lawyerId, clientId } = req.body;
    
    // Your existing business logic...
    
    // Trigger notification
    const notificationId = await notificationService.notifyOfferAccepted(
      caseId, 
      lawyerId, 
      clientId
    );
    
    // Get notification and emit real-time update
    const notification = await notificationService.getNotificationById(notificationId);
    if (global.io) {
      emitNotificationToUser(global.io, clientId, notification);
    }
    
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
```

#### 3.2 Add to Other Controllers
Apply similar patterns to:
- **Payment Controller**: Call `notifyPaymentReceived()` after payment success
- **Invoice Controller**: Call `notifyInvoiceCreated()` when invoice is generated
- **Document Controller**: Call `notifyDocumentUploaded()` when document is added
- **Case Controller**: Call `notifyCaseStatusChanged()` on status updates
- **Appointment Controller**: Call `notifyCourtSessionAdded()` for court sessions
- **Message Controller**: Call `notifyNewMessage()` for incoming messages
- **Admin Controller**: Call `notifyAdminAnnouncement()` for announcements

---

### Phase 4: Test the System

#### 4.1 Backend Testing
Test API endpoints using Postman or curl:

```bash
# Create notification (as admin)
curl -X POST http://localhost:5000/api/notifications/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Notification",
    "message": "This is a test",
    "type": "ANNOUNCEMENT",
    "receiverId": 1
  }'

# Get notifications for user
curl http://localhost:5000/api/notifications/1

# Get unread count
curl http://localhost:5000/api/notifications/unread/count/1

# Mark as read
curl -X PUT http://localhost:5000/api/notifications/mark-read/1
```

#### 4.2 Frontend Testing
1. Start both backend and frontend servers
2. Log in with a test user account
3. Check that NotificationDropdown appears in navbar
4. Open browser DevTools Console to see Socket.IO connection logs
5. Look for: "✅ Socket.IO connected" message
6. Navigate to `/notifications` page
7. Test filters and pagination

#### 4.3 Real-time Testing
1. Open two browser windows/tabs with different user accounts
2. From one user's backend (or via API), create a notification for the other user
3. Check if the notification appears in real-time on the other user's dropdown

---

### Phase 5: Notification Types Reference

| Type | Event | Receiver | Trigger |
|------|-------|----------|---------|
| OFFER_ACCEPTED | Lawyer accepts offer | Client | acceptOffer() |
| AWAITING_RESPONSE | Waiting for response | Client/Lawyer | Case updates |
| DOCUMENT_UPLOADED | New document added | Parties | uploadDocument() |
| CASE_STATUS_CHANGED | Status update | Parties | updateCaseStatus() |
| PAYMENT_RECEIVED | Payment completed | Lawyer | processPayment() |
| INVOICE_CREATED | New invoice | Client | createInvoice() |
| COURT_SESSION | Session scheduled | Parties | scheduleSession() |
| MESSAGE_RECEIVED | New message | Parties | sendMessage() |
| ANNOUNCEMENT | Admin announcement | Users | adminAnnounce() |
| CASE_COMPLETED | Case finished | Parties | completeCase() |

---

### Phase 6: Using Notifications in Components

#### 6.1 Basic Usage
```jsx
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
    </div>
  );
}
```

#### 6.2 Filter by Type
```jsx
const { getNotificationsByType } = useNotifications();

const offerNotifications = getNotificationsByType('OFFER_ACCEPTED');
```

#### 6.3 Get Unread Only
```jsx
const { getUnreadNotifications } = useNotifications();

const unreadNotifications = getUnreadNotifications();
```

---

## 🚀 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications/:userId` | Get user notifications |
| GET | `/api/notifications/unread/count/:userId` | Get unread count |
| GET | `/api/notifications/detail/:id` | Get single notification |
| POST | `/api/notifications/create` | Create notification |
| PUT | `/api/notifications/mark-read/:id` | Mark as read |
| PUT | `/api/notifications/mark-all-read/:userId` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |
| DELETE | `/api/notifications/all/:userId` | Delete all |

---

## 📝 Common Issues & Solutions

### Issue: Socket.IO connection fails
**Solution**: 
- Ensure backend server is running on port 5000
- Check CORS origin in server.js matches frontend URL
- Verify Socket.IO package is installed

### Issue: Notifications not appearing
**Solution**:
- Check browser console for Socket.IO errors
- Verify user_id is being sent correctly
- Check that NotificationProvider wraps the app

### Issue: Real-time updates not working
**Solution**:
- Ensure global.io is available in backend
- Check Socket.IO event names match exactly
- Verify user is connected before emitting

### Issue: Database errors
**Solution**:
- Run the SQL CREATE TABLE script above
- Verify table names match in queries
- Check foreign key relationships

---

## ✅ Verification Checklist

Before considering the notification system complete, verify:

- [ ] Database table created successfully
- [ ] Backend server starts without errors
- [ ] Socket.IO initializes on server startup
- [ ] Frontend NotificationProvider is wrapped around app
- [ ] NotificationDropdown appears in navbar
- [ ] NotificationsPage is accessible at `/notifications`
- [ ] Can create test notification via API
- [ ] Notification appears in dropdown in real-time
- [ ] Mark as read works
- [ ] Delete notification works
- [ ] Filtering works on NotificationsPage
- [ ] Pagination works on NotificationsPage
- [ ] Unread count updates in real-time
- [ ] Socket.IO events are logged in browser console
- [ ] Responsive design works on mobile

---

## 📚 File Structure

```
FullStack/
├── backend/
│   ├── modules/
│   │   └── Notification/
│   │       ├── Notification.Model.js ✅
│   │       ├── Notification.Service.js ✅
│   │       ├── Notification.Controller.js ✅
│   │       ├── notification.routes.js ✅
│   │       └── NotificationSocket.js ✅
│   ├── server.js ✅ (updated)
│   └── controllers/
│       └── app.controller.js (notification routes already included)
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── NotificationContext.jsx ✅
│   │   ├── services/
│   │   │   └── notificationService.js ✅
│   │   ├── components/
│   │   │   ├── NotificationItem.jsx ✅
│   │   │   └── NotificationDropdown.jsx ✅
│   │   └── pages/
│   │       └── NotificationsPage.jsx ✅
│   └── .env (add VITE_API_URL)
│
└── NOTIFICATION_INTEGRATION_GUIDE.js ✅
```

---

## 🎯 Next Steps

1. **Verify all files are created** - Check backend and frontend directories
2. **Run database script** - Create notifications table
3. **Start servers** - Run backend and frontend
4. **Test basic flow** - Create test notification and verify it appears
5. **Integrate with existing features** - Add notification triggers to case, payment, document controllers
6. **Deploy** - Ensure all environment variables are set in production

---

## 📞 Support

For issues or questions:
1. Check console logs for errors
2. Review API responses for error messages
3. Verify all files are in correct locations
4. Ensure environment variables are set correctly
5. Check that database table is created properly

Enjoy real-time notifications! 🎉
