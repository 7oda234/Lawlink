import dataService from './DataService';

const notificationService = {
  getNotifications: async (userId) => {
    try {
      if (!userId) return { success: false, notifications: [] };
      const response = await dataService.notifications.getByUserId(userId);
      return response?.data || { success: true, notifications: [] };
    } catch (error) {
      console.error('[NotificationService] Failed to load notifications:', error);
      return { success: false, notifications: [] };
    }
  }
};

export default notificationService;
