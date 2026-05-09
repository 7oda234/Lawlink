/**
 * NotificationContext.jsx
 * 
 * Manages real-time notifications using Socket.IO
 * Provides notification state and helper functions to consume notifications
 * across the application
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import notificationService from '../services/notificationService';
import { useAuth } from './useAuth';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  /**
   * Initialize Socket.IO connection when user logs in
   */
  useEffect(() => {
    if (!authUser?.user_id) return;

    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    // Connection handlers
    newSocket.on('connect', () => {
      console.log('✅ Socket.IO connected');
      setIsConnected(true);
      // Notify server of user connection
      newSocket.emit('user:connect', authUser.user_id);
      // Fetch initial notifications
      fetchNotifications();
      fetchUnreadCount();
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Socket.IO disconnected');
      setIsConnected(false);
    });

    // Notification events
    newSocket.on('notification:new', (notificationData) => {
      console.log('📨 New notification received:', notificationData);
      setNotifications((prev) => [notificationData, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    newSocket.on('notification:read', ({ notificationId }) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.notification_id === notificationId
            ? { ...notif, is_read: true }
            : notif
        )
      );
    });

    newSocket.on('notification:all-read', () => {
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, is_read: true }))
      );
      setUnreadCount(0);
    });

    newSocket.on('notification:deleted', ({ notificationId }) => {
      setNotifications((prev) =>
        prev.filter((notif) => notif.notification_id !== notificationId)
      );
    });

    newSocket.on('notification:unread-count', ({ unreadCount: count }) => {
      setUnreadCount(count);
    });

    newSocket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [authUser?.user_id]);

  /**
   * Fetch notifications from API
   */
  const fetchNotifications = useCallback(async () => {
    try {
      if (!authUser?.user_id) return;
      const response = await notificationService.getNotifications(authUser.user_id, {
        limit: 50,
        offset: 0,
      });
      if (response.ok && response.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [authUser?.user_id]);

  /**
   * Fetch unread count from API
   */
  const fetchUnreadCount = useCallback(async () => {
    try {
      if (!authUser?.user_id) return;
      const response = await notificationService.getUnreadCount(authUser.user_id);
      if (response.ok && response.data) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  }, [authUser?.user_id]);

  /**
   * Mark a notification as read
   */
  const markAsRead = useCallback(
    async (notificationId) => {
      try {
        const response = await notificationService.markAsRead(notificationId);
        if (response.ok) {
          if (socket) {
            socket.emit('notification:mark-read', notificationId);
          }
          fetchUnreadCount();
        }
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    },
    [socket, fetchUnreadCount]
  );

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(async () => {
    try {
      if (!authUser?.user_id) return;
      const response = await notificationService.markAllAsRead(authUser.user_id);
      if (response.ok) {
        if (socket) {
          socket.emit('notification:mark-all-read', authUser.user_id);
        }
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  }, [socket, authUser?.user_id]);

  /**
   * Delete a notification
   */
  const deleteNotification = useCallback(
    async (notificationId) => {
      try {
        const response = await notificationService.deleteNotification(notificationId);
        if (response.ok) {
          if (socket) {
            socket.emit('notification:delete', notificationId, authUser?.user_id);
          }
          setNotifications((prev) =>
            prev.filter((notif) => notif.notification_id !== notificationId)
          );
        }
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    },
    [socket, authUser?.user_id]
  );

  /**
   * Get notifications filtered by type
   */
  const getNotificationsByType = useCallback((type) => {
    return notifications.filter((notif) => notif.type === type);
  }, [notifications]);

  /**
   * Get unread notifications
   */
  const getUnreadNotifications = useCallback(() => {
    return notifications.filter((notif) => !notif.is_read);
  }, [notifications]);

  const value = {
    notifications,
    unreadCount,
    isConnected,
    socket,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationsByType,
    getUnreadNotifications,
    fetchNotifications,
    fetchUnreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Custom hook to use notification context
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export default NotificationContext;
