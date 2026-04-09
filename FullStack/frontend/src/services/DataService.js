// If using dotenv for environment variables
import 'dotenv/config';

// Since you are ALREADY in the src folder, use "./"
// DataService for API calls
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const dataService = {
  // 🔐 Authentication APIs
  auth: {
    /**
     * تسجيل الدخول - Login
     */
    login: (credentials) => api.post('/auth/login', credentials),

    /**
     * تسجيل مستخدم جديد - Register
     */
    register: (userData) => api.post('/auth/register', userData),

    /**
     * إكمال تسجيل العميل - Complete client registration
     */
    completeClientRegistration: (clientData) => api.post('/auth/complete-client', clientData),

    /**
     * إكمال تسجيل المحامي - Complete lawyer registration
     */
    completeLawyerRegistration: (lawyerData) => api.post('/auth/complete-lawyer', lawyerData),

    /**
     * إرسال رابط إعادة تعيين كلمة المرور - Forgot password
     */
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),

    /**
     * إعادة تعيين كلمة المرور - Reset password
     */
    resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),

    /**
     * التحقق من البريد الإلكتروني - Verify email
     */
    verifyEmail: (token) => api.post('/auth/verify-email', { token }),

    /**
     * تحديث الملف الشخصي - Update profile
     */
    updateProfile: (userData) => api.put('/auth/profile', userData),

    /**
     * تغيير كلمة المرور - Change password
     */
    changePassword: (passwords) => api.post('/auth/change-password', passwords),
  },

  // 👥 User Management APIs
  users: {
    /**
     * الحصول على جميع المستخدمين - Get all users
     */
    getAll: () => api.get('/users'),

    /**
     * الحصول على مستخدم بالمعرف - Get user by ID
     */
    getById: (id) => api.get(`/users/${id}`),

    /**
     * تحديث مستخدم - Update user
     */
    update: (id, userData) => api.put(`/users/${id}`, userData),

    /**
     * حذف مستخدم - Delete user
     */
    delete: (id) => api.delete(`/users/${id}`),

    /**
     * الحصول على المحامين - Get lawyers
     */
    getLawyers: () => api.get('/users/lawyers'),

    /**
     * الحصول على العملاء - Get clients
     */
    getClients: () => api.get('/users/clients'),
  },

  // ⚖️ Case Management APIs
  cases: {
    /**
     * الحصول على جميع القضايا - Get all cases
     */
    getAll: () => api.get('/cases'),

    /**
     * الحصول على قضية بالمعرف - Get case by ID
     */
    getById: (id) => api.get(`/cases/${id}`),

    /**
     * إنشاء قضية جديدة - Create new case
     */
    create: (caseData) => api.post('/cases', caseData),

    /**
     * تحديث قضية - Update case
     */
    update: (id, caseData) => api.put(`/cases/${id}`, caseData),

    /**
     * حذف قضية - Delete case
     */
    delete: (id) => api.delete(`/cases/${id}`),

    /**
     * الحصول على قضايا المستخدم - Get user cases
     */
    getUserCases: () => api.get('/cases/user'),

    /**
     * تحديث حالة القضية - Update case status
     */
    updateStatus: (id, status) => api.patch(`/cases/${id}/status`, { status }),

    /**
     * إضافة مستند للقضية - Add document to case
     */
    addDocument: (id, documentData) => api.post(`/cases/${id}/documents`, documentData),
  },

  // 💬 Communication APIs
  communication: {
    /**
     * الحصول على الرسائل - Get messages
     */
    getMessages: (userId) => api.get(`/messages/${userId}`),

    /**
     * إرسال رسالة - Send message
     */
    sendMessage: (messageData) => api.post('/messages', messageData),

    /**
     * الحصول على الإشعارات - Get notifications
     */
    getNotifications: () => api.get('/notifications'),

    /**
     * تحديث حالة الإشعار - Mark notification as read
     */
    markNotificationRead: (id) => api.patch(`/notifications/${id}/read`),

    /**
     * إنشاء إشعار - Create notification
     */
    createNotification: (notificationData) => api.post('/notifications', notificationData),
  },

  // 📊 Reports and Analytics APIs
  reports: {
    /**
     * الحصول على تقارير النظام - Get system reports
     */
    getSystemReports: () => api.get('/reports/system'),

    /**
     * الحصول على تقارير المستخدمين - Get user reports
     */
    getUserReports: () => api.get('/reports/users'),

    /**
     * الحصول على تقارير القضايا - Get case reports
     */
    getCaseReports: () => api.get('/reports/cases'),

    /**
     * تصدير التقارير - Export reports
     */
    exportReports: (type) => api.get(`/reports/export/${type}`, { responseType: 'blob' }),
  },

  // 📁 File Upload APIs
  files: {
    /**
     * رفع ملف - Upload file
     */
    upload: (file, type = 'document') => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      return api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },

    /**
     * حذف ملف - Delete file
     */
    delete: (fileId) => api.delete(`/files/${fileId}`),

    /**
     * الحصول على ملف - Get file
     */
    get: (fileId) => api.get(`/files/${fileId}`, { responseType: 'blob' }),
  },
};

export default dataService;
