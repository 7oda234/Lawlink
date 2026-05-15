import React, { useEffect, useState, useRef, useContext } from 'react';
import { io } from 'socket.io-client';

import notificationService from '../services/notificationService';
import { useAuth } from './useAuth';
import { NotificationContext } from './NotificationContextObject';

// ✅ تصدير الـ Hook بشكل سليم
export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const { authUser } = useAuth();
  const socketRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // ✅ 1. أمان تام: قراءة الـ ID من LocalStorage لو الـ Auth لسه بيحمل
  const currentUserId = authUser?.user_id || parseInt(localStorage.getItem('userId'));

  const fetchNotifications = async () => {
    try {
      if (!currentUserId) return;
      const response = await notificationService.getNotifications(currentUserId, { limit: 50, offset: 0 });
      
      // ✅ 2. تأمين استخراج البيانات (سواء راجعة من MongoDB أو MariaDB)
      let fetchedNotifs = [];
      if (response.data && response.data.data) {
         fetchedNotifs = response.data.data;
      } else if (response.data) {
         fetchedNotifs = response.data;
      } else if (Array.isArray(response)) {
         fetchedNotifs = response;
      }

      if (Array.isArray(fetchedNotifs)) {
         setNotifications(fetchedNotifs);
         // حساب العدد الغير مقروء يدوياً لضمان الدقة
         const unread = fetchedNotifs.filter(n => !n.isRead && !n.is_read).length;
         setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (!currentUserId) return;

    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
    });

    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('user:connect', currentUserId);
      fetchNotifications(); // جلب الإشعارات القديمة فور الاتصال
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    // ✅ 3. الاستماع للحدث الصحيح اللي الباك-إند بيبعته!
    newSocket.on(`notification_${currentUserId}`, (notificationData) => {
      setNotifications((prev) => [notificationData, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // (الحدث القديم تركته احتياطياً)
    newSocket.on('notification:new', (notificationData) => {
      setNotifications((prev) => [notificationData, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, [currentUserId]);

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      // توافق مع MongoDB (_id) أو MariaDB (notification_id)
      setNotifications(prev => prev.map(n => 
         n.notification_id === notificationId || n._id === notificationId ? { ...n, isRead: true, is_read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      if (!currentUserId) return;
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications((prev) => prev.filter((n) => n.notification_id !== notificationId && n._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const value = {
    notifications,
    unreadCount,
    isConnected,
    socket: socketRef.current,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};