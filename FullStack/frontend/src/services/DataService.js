// Full DataService for LawLink API calls
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🛡️ Request Interceptor: Attach JWT Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🛡️ Response Interceptor: Global Error Handling
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
    completeClientRegistration: (clientData) => api.post('/auth/complete-client', clientData),
    completeLawyerRegistration: (lawyerData) => api.post('/auth/complete-lawyer', lawyerData),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
    verifyEmail: (token) => api.post('/auth/verify-email', { token }),
    updateProfile: (userData) => api.put('/auth/profile', userData),
    changePassword: (passwords) => api.post('/auth/change-password', passwords),
  },

  // 👥 User Management APIs
  users: {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    update: (id, userData) => api.put(`/users/${id}`, userData),
    delete: (id) => api.delete(`/users/${id}`),
    getLawyers: () => api.get('/users/lawyers'),
    getClients: () => api.get('/users/clients'),
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
    addDocument: (id, documentData) => api.post(`/cases/${id}/documents`, documentData),
  },

  // 💰 Financial APIs (Wallet, Payments, Installments)
  finance: {
    // Wallet
    getWalletBalance: () => api.get('/wallet/balance'),
    addFunds: (amount) => api.post('/wallet/topup', { amount }),
    
    // Payments
    getPaymentHistory: () => api.get('/payments/history'),
    getLawyerEarnings: () => api.get('/payments/lawyer-stats'),
    
    // Installments
    getInstallmentsByCase: (caseId) => api.get(`/installments/case/${caseId}`),
    payInstallment: (id) => api.post(`/installments/${id}/pay`),
    
    // Invoices
    downloadInvoice: async (paymentId) => {
      const response = await api.get(`/invoice/generate/${paymentId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  },

  // 💬 Communication APIs
  communication: {
    getMessages: (userId) => api.get(`/messages/${userId}`),
    sendMessage: (messageData) => api.post('/messages', messageData),
    getNotifications: () => api.get('/notifications'),
    markNotificationRead: (id) => api.patch(`/notifications/${id}/read`),
    createNotification: (notificationData) => api.post('/notifications', notificationData),
  },

  // 📊 Reports and Analytics APIs
  reports: {
    getSystemReports: () => api.get('/reports/system'),
    getUserReports: () => api.get('/reports/users'),
    getCaseReports: () => api.get('/reports/cases'),
    exportReports: (type) => api.get(`/reports/export/${type}`, { responseType: 'blob' }),
    // Admin financial logs
    adminGetFinancialLogs: () => api.get('/admin/financial-logs'),
  },

  // 🤖 AI Tools (Connecting to Python FastAPI service)
  ai: {
    analyzeDocument: (fileData) => {
      const formData = new FormData();
      formData.append('file', fileData);
      return api.post('/ai/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    legalAssistant: (query) => api.post('/ai/query', { query }),
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
};

export default dataService;
