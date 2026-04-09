<<<<<<< Updated upstream
// If using dotenv for environment variables
import 'dotenv/config'; 

// Since you are ALREADY in the src folder, use "./" 
// DataService for API calls
=======
>>>>>>> Stashed changes
import axios from 'axios';

// Get API base URL from environment variables or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

<<<<<<< Updated upstream
export const dataService = {
  // Example API methods
  getUsers: () => api.get('/users'),
  getCases: () => api.get('/cases'),
  // Add more methods as needed
=======
// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
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
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    
    completeClientRegistration: (clientData) => 
      api.post('/auth/complete-client', clientData),
    
    completeLawyerRegistration: (lawyerData) => 
      api.post('/auth/complete-lawyer', lawyerData),

    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    
    resetPassword: (token, newPassword) => 
      api.post('/auth/reset-password', { token, newPassword }),
    
    verifyEmail: (token) => api.post('/auth/verify-email', { token }),
    
    updateProfile: (userData) => api.put('/auth/profile', userData),
    
    changePassword: (passwords) => api.post('/auth/change-password', passwords),
    
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return Promise.resolve();
    },
  },

  // 👥 User Management APIs
  users: {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    update: (id, userData) => api.put(`/users/${id}`, userData),
    delete: (id) => api.delete(`/users/${id}`),
    getLawyers: () => api.get('/users/lawyers'),
    getClients: () => api.get('/users/clients'),
    getLawyerRatings: (lawyerId) => api.get(`/users/${lawyerId}/ratings`),
  },

  // ⚖️ Case Management APIs
  cases: {
    getAll: () => api.get('/cases'),
    getById: (id) => api.get(`/cases/${id}`),
    create: (caseData) => api.post('/cases', caseData),
    update: (id, caseData) => api.put(`/cases/${id}`, caseData),
    delete: (id) => api.delete(`/cases/${id}`),
    getUserCases: () => api.get('/cases/user'),
    updateStatus: (id, status) => api.patch(`/cases/${id}/status`, { status }),
    getTimeline: (caseId) => api.get(`/cases/${caseId}/timeline`),
    assignLawyer: (caseId, lawyerId) => 
      api.post(`/cases/${caseId}/assign-lawyer`, { lawyer_id: lawyerId }),
  },

  // 📄 Document Management APIs
  documents: {
    getByCaseId: (caseId) => api.get(`/documents/case/${caseId}`),
    getById: (docId) => api.get(`/documents/${docId}`),
    addDocument: (caseId, documentData) => api.post(`/documents/case/${caseId}`, documentData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (docId) => api.delete(`/documents/${docId}`),
    download: (docId) => api.get(`/documents/${docId}/download`, { responseType: 'blob' }),
  },

  // 💬 Messaging APIs
  messages: {
    getConversations: () => api.get('/messages/conversations'),
    getMessages: (conversationId) => api.get(`/messages/conversation/${conversationId}`),
    sendMessage: (conversationId, messageData) => 
      api.post(`/messages/conversation/${conversationId}`, messageData),
    deleteMessage: (messageId) => api.delete(`/messages/${messageId}`),
    getUnreadCount: () => api.get('/messages/unread/count'),
    markAsRead: (messageId) => api.patch(`/messages/${messageId}/read`),
  },

  // 📌 Appointment APIs
  appointments: {
    getUserAppointments: () => api.get('/appointments/user'),
    create: (appointmentData) => api.post('/appointments', appointmentData),
    update: (appointmentId, appointmentData) => 
      api.put(`/appointments/${appointmentId}`, appointmentData),
    cancel: (appointmentId) => api.delete(`/appointments/${appointmentId}`),
  },

  // 💳 Payment APIs
  payments: {
    getUserPayments: () => api.get('/payments/user'),
    getInvoice: (invoiceId) => api.get(`/payments/invoices/${invoiceId}`),
    createPayment: (paymentData) => api.post('/payments', paymentData),
    confirmPayment: (paymentId, confirmationData) => 
      api.post(`/payments/${paymentId}/confirm`, confirmationData),
  },

  // 🔔 Notification APIs
  notifications: {
    getNotifications: () => api.get('/notifications'),
    markAsRead: (notificationId) => api.patch(`/notifications/${notificationId}/read`),
    delete: (notificationId) => api.delete(`/notifications/${notificationId}`),
    create: (notificationData) => api.post('/notifications', notificationData),
  },

  // 📊 Reports APIs
  reports: {
    getSystemReports: () => api.get('/reports/system'),
    getUserReports: () => api.get('/reports/users'),
    getCaseReports: () => api.get('/reports/cases'),
    getPaymentReports: () => api.get('/reports/payments'),
    exportReports: (type) => api.get(`/reports/export/${type}`, { responseType: 'blob' }),
  },

  // 📁 File Upload APIs
  files: {
    upload: (file, type = 'document') => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      return api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    delete: (fileId) => api.delete(`/files/${fileId}`),
    get: (fileId) => api.get(`/files/${fileId}`, { responseType: 'blob' }),
  },

  // ⚙️ Admin APIs
  admin: {
    getActivityLogs: () => api.get('/admin/activity-logs'),
    manageUsers: () => api.get('/admin/users'),
    approveLawyer: (lawyerId) => api.post(`/admin/approve-lawyer/${lawyerId}`),
    rejectLawyer: (lawyerId) => api.post(`/admin/reject-lawyer/${lawyerId}`),
  },
>>>>>>> Stashed changes
};

export default dataService;
