// /**
//  * Socket.IO Integration for Real-time Notifications
//  * 
//  * Handles WebSocket connections and real-time notification delivery
//  * Includes event emitters for:
//  * - notification:new - New notification received
//  * - notification:read - Notification marked as read
//  * - notification:delete - Notification deleted
//  * - notification:unread-count - Unread count updated
//  */

// import { Server } from 'socket.io';
// import * as notificationService from './Notification.Service.js';

// // Map of user_id -> socket_id for direct messaging
// const userSockets = new Map();

// /**
//  * Initialize Socket.IO with Express server
//  * @param {http.Server} server - The HTTP server instance
//  * @param {Object} options - Configuration options
//  */
// export const initializeNotificationSocket = (server, options = {}) => {
//   const io = new Server(server, {
//     cors: {
//       origin: options.corsOrigin || ['http://localhost:5173', 'http://localhost:3000'],
//       methods: ['GET', 'POST'],
//       credentials: true,
//     },
//     transports: ['websocket', 'polling'],
//   });

//   /**
//    * Connection handler
//    */
//   io.on('connection', (socket) => {
//     console.log(`✅ New Socket.IO connection: ${socket.id}`);

//     /**
//      * User joins their notification room
//      * Allows targeted notifications
//      */
//     socket.on('user:connect', (userId) => {
//       if (userId) {
//         socket.join(`user_${userId}`);
//         userSockets.set(userId, socket.id);
//         console.log(`👤 User ${userId} connected via socket: ${socket.id}`);
//       }
//     });

//     /**
//      * Mark notification as read
//      */
//     socket.on('notification:mark-read', async (notificationId) => {
//       try {
//         await notificationService.markAsRead(notificationId);
//         io.emit('notification:read', { notificationId });
//         console.log(`✓ Notification ${notificationId} marked as read`);
//       } catch (err) {
//         console.error('Error marking notification as read:', err);
//         socket.emit('error', { message: 'Failed to mark as read' });
//       }
//     });

//     /**
//      * Mark all notifications as read
//      */
//     socket.on('notification:mark-all-read', async (userId) => {
//       try {
//         await notificationService.markAllAsRead(userId);
//         socket.to(`user_${userId}`).emit('notification:all-read', { userId });
//         console.log(`✓ All notifications for user ${userId} marked as read`);
//       } catch (err) {
//         console.error('Error marking all notifications as read:', err);
//         socket.emit('error', { message: 'Failed to mark all as read' });
//       }
//     });

//     /**
//      * Delete notification
//      */
//     socket.on('notification:delete', async (notificationId, userId) => {
//       try {
//         await notificationService.deleteNotification(notificationId);
//         io.to(`user_${userId}`).emit('notification:deleted', { notificationId });
//         console.log(`✓ Notification ${notificationId} deleted`);
//       } catch (err) {
//         console.error('Error deleting notification:', err);
//         socket.emit('error', { message: 'Failed to delete notification' });
//       }
//     });

//     /**
//      * Disconnect handler
//      */
//     socket.on('disconnect', () => {
//       // Remove user from map
//       for (const [userId, socketId] of userSockets.entries()) {
//         if (socketId === socket.id) {
//           userSockets.delete(userId);
//           console.log(`👤 User ${userId} disconnected`);
//           break;
//         }
//       }
//       console.log(`❌ Socket.IO disconnected: ${socket.id}`);
//     });

//     /**
//      * Error handler
//      */
//     socket.on('error', (error) => {
//       console.error('Socket.IO error:', error);
//     });
//   });

//   return io;
// };

// /**
//  * Emit notification to a specific user
//  * @param {Server} io - Socket.IO server instance
//  * @param {number} userId - Receiver user ID
//  * @param {Object} notificationData - Notification data
//  */
// export const emitNotificationToUser = (io, userId, notificationData) => {
//   io.to(`user_${userId}`).emit('notification:new', notificationData);
//   console.log(`📨 Notification sent to user ${userId}`);
// };

// /**
//  * Emit notification to multiple users
//  * @param {Server} io - Socket.IO server instance
//  * @param {Array} userIds - Array of receiver user IDs
//  * @param {Object} notificationData - Notification data
//  */
// export const emitNotificationToUsers = (io, userIds, notificationData) => {
//   userIds.forEach((userId) => {
//     emitNotificationToUser(io, userId, notificationData);
//   });
// };

// /**
//  * Broadcast notification to all connected users
//  * @param {Server} io - Socket.IO server instance
//  * @param {Object} notificationData - Notification data
//  */
// export const broadcastNotification = (io, notificationData) => {
//   io.emit('notification:broadcast', notificationData);
//   console.log(`📢 Broadcast notification sent to all users`);
// };

// /**
//  * Emit unread count update to user
//  * @param {Server} io - Socket.IO server instance
//  * @param {number} userId - User ID
//  * @param {number} unreadCount - Updated unread count
//  */
// export const emitUnreadCountUpdate = (io, userId, unreadCount) => {
//   io.to(`user_${userId}`).emit('notification:unread-count', { userId, unreadCount });
// };

// export default initializeNotificationSocket;
