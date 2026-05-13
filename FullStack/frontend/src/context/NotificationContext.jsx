import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

import notificationService from '../services/notificationService';
import { useAuth } from './useAuth';
import { NotificationContext } from './NotificationContextObject';

// This module is intentionally ONLY exporting the Provider component
// to satisfy react-refresh/only-export-components.

export const NotificationProvider = ({ children }) => {
  const { authUser } = useAuth();

  const socketRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const fetchNotifications = async () => {
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
  };

  const fetchUnreadCount = async () => {
    try {
      if (!authUser?.user_id) return;
      const response = await notificationService.getUnreadCount(authUser.user_id);
      if (response.ok && response.data) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  useEffect(() => {
    if (!authUser?.user_id) return;

    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('user:connect', authUser.user_id);

      // Initial sync
      fetchNotifications();
      fetchUnreadCount();
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('notification:new', (notificationData) => {
      setNotifications((prev) => [notificationData, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    newSocket.on('notification:read', ({ notificationId }) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.notification_id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    });

    newSocket.on('notification:all-read', () => {
      setNotifications((prev) => prev.map((notif) => ({ ...notif, is_read: true })));
      setUnreadCount(0);
    });

    newSocket.on('notification:deleted', ({ notificationId }) => {
      setNotifications((prev) => prev.filter((notif) => notif.notification_id !== notificationId));
    });

    newSocket.on('notification:unread-count', ({ unreadCount: count }) => {
      setUnreadCount(count);
    });

    newSocket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    return () => {
      newSocket.disconnect();
      socketRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.user_id]);

  const markAsRead = async (notificationId) => {
    try {
      const response = await notificationService.markAsRead(notificationId);
      if (response.ok) {
        socketRef.current?.emit('notification:mark-read', notificationId);
        fetchUnreadCount();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      if (!authUser?.user_id) return;
      const response = await notificationService.markAllAsRead(authUser.user_id);
      if (response.ok) {
        socketRef.current?.emit('notification:mark-all-read', authUser.user_id);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await notificationService.deleteNotification(notificationId);
      if (response.ok) {
        socketRef.current?.emit('notification:delete', notificationId, authUser?.user_id);
        setNotifications((prev) => prev.filter((n) => n.notification_id !== notificationId));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getNotificationsByType = (type) => notifications.filter((n) => n.type === type);
  const getUnreadNotifications = () => notifications.filter((n) => !n.is_read);

  const value = {
    notifications,
    unreadCount,
    isConnected,
    socket: socketRef.current,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationsByType,
    getUnreadNotifications,
    fetchNotifications,
    fetchUnreadCount,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

