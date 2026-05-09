/**
 * notificationService.js
 * 
 * Handles all API calls related to notifications
 * Provides methods for CRUD operations and status management
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/notifications`;

/**
 * Get all notifications for a user
 * @param {number} userId - User ID
 * @param {Object} options - Query options (limit, offset, type)
 * @returns {Promise<{ok: boolean, data: Array}>}
 */
const getNotifications = async (userId, options = {}) => {
  try {
    const params = new URLSearchParams({
      limit: options.limit || 20,
      offset: options.offset || 0,
      ...(options.type && { type: options.type }),
    });
    const response = await axios.get(`${API_URL}/${userId}?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Get unread notification count for a user
 * @param {number} userId - User ID
 * @returns {Promise<{ok: boolean, data: {unreadCount: number}}>}
 */
const getUnreadCount = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/unread/count/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    throw error;
  }
};

/**
 * Get a single notification by ID
 * @param {number} notificationId - Notification ID
 * @returns {Promise<{ok: boolean, data: Object}>}
 */
const getNotificationById = async (notificationId) => {
  try {
    const response = await axios.get(`${API_URL}/detail/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification:', error);
    throw error;
  }
};

/**
 * Mark a notification as read
 * @param {number} notificationId - Notification ID
 * @returns {Promise<{ok: boolean, message: string}>}
 */
const markAsRead = async (notificationId) => {
  try {
    const response = await axios.put(
      `${API_URL}/mark-read/${notificationId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

/**
 * Mark all notifications as read for a user
 * @param {number} userId - User ID
 * @returns {Promise<{ok: boolean, message: string}>}
 */
const markAllAsRead = async (userId) => {
  try {
    const response = await axios.put(
      `${API_URL}/mark-all-read/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error marking all as read:', error);
    throw error;
  }
};

/**
 * Delete a notification
 * @param {number} notificationId - Notification ID
 * @returns {Promise<{ok: boolean, message: string}>}
 */
const deleteNotification = async (notificationId) => {
  try {
    const response = await axios.delete(`${API_URL}/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

/**
 * Delete all notifications for a user
 * @param {number} userId - User ID
 * @returns {Promise<{ok: boolean, message: string}>}
 */
const deleteAllNotifications = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/all/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting all notifications:', error);
    throw error;
  }
};

/**
 * Create a new notification (Admin/System use)
 * @param {Object} notificationData - Notification data
 * @returns {Promise<{ok: boolean, data: {notificationId: number}}>}
 */
const createNotification = async (notificationData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, notificationData);
    return response.data;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

/**
 * Get notifications filtered by type
 * @param {number} userId - User ID
 * @param {string} type - Notification type
 * @param {Object} options - Query options (limit, offset)
 * @returns {Promise<{ok: boolean, data: Array}>}
 */
const getNotificationsByType = async (userId, type, options = {}) => {
  try {
    const params = new URLSearchParams({
      limit: options.limit || 20,
      offset: options.offset || 0,
      type,
    });
    const response = await axios.get(`${API_URL}/${userId}?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications by type:', error);
    throw error;
  }
};

const notificationService = {
  getNotifications,
  getUnreadCount,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  createNotification,
  getNotificationsByType,
};

export default notificationService;
