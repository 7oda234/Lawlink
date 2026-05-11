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
    getByEmail: (email) => api.get(`/users/edit-details`, { params: { email } }),
    update: (id, userData) => api.put(`/users/${id}`, userData),
    delete: (id) => api.delete(`/users/${id}`),
    getLawyers: () => api.get('/users/lawyers'),
    getClients: () => api.get('/users/clients'),
    uploadProfilePicture: (id, formData) => api.post(`/users/upload-profile-picture/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
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

  // 📄 Document Upload APIs
  documents: {
    upload: (formData) => api.post('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  },

  // 💰 Financial APIs (Wallet, Payments, Installments)
  finance: {
    getWalletBalance: () => api.get('/wallet/balance'),
    addFunds: (amount) => api.post('/wallet/topup', { amount }),
    getPaymentHistory: () => api.get('/payments/history', { params: { userId: localStorage.getItem('userId') } }),
    getLawyerEarnings: () => api.get('/payments/lawyer-stats'),
    
    // مسارات الأقساط والدفع
    getInstallmentsByCase: (caseId) => api.get(`/installments/case/${caseId}`),
    createInstallmentPlan: (caseId, payload) => api.post(`/installments/case/${caseId}/create-plan`, payload),
    payInstallment: (id, payload) => api.post(`/installments/${id}/pay`, payload),
    payVisaCheckout: (payload) => api.post('/payments/visa-checkout', payload), // لدفع الكاش والمقدم
    
    // 🔴 تم تصحيح المسار هنا بإضافة حرف s ليطابق الباك إند
    getInvoiceDetails: (paymentId) => api.get(`/payments/invoice/${paymentId}`), 
    downloadInvoice: async (paymentId) => {
      const response = await api.get(`/payments/invoice/${paymentId}`);
      const invoice = response.data?.data ?? response.data;

      const blob = new Blob([JSON.stringify(invoice, null, 2)], {
        type: 'application/json',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_${paymentId}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response;
    }
  },

  // 📊 Reports and Analytics APIs
  reports: {
    getSystemReports: () => api.get('/reports/system'),
    getUserReports: () => api.get('/reports/users'),
    getCaseReports: () => api.get('/reports/cases'),
    exportReports: (type) => api.get(`/reports/export/${type}`, { responseType: 'blob' }),
    adminGetFinancialLogs: () => api.get('/admin/financial-logs'), 
  },

  admin: {
    getFullDashboard: () => api.get('/admin/full-dashboard'),
    getUsers: () => api.get('/admin/users'),
    getLawyers: () => api.get('/admin/lawyers'),
    getPendingLawyers: () => api.get('/admin/lawyers/pending'),
    approveLawyer: (userId, approved) => api.post('/admin/lawyers/approve', { userId, approved }),
    verifyLawyer: (userId, verified) => api.patch(`/admin/lawyers/${userId}/verify`, { verified }),
    getClients: () => api.get('/admin/clients'),
    getCases: () => api.get('/admin/cases'),
    getCaseMonitoring: () => api.get('/admin/cases-monitoring'),
    getReportsAnalytics: () => api.get('/admin/reports-analytics'),
    getSystemLogs: () => api.get('/admin/system-logs'),
    getAIUsageLogs: () => api.get('/admin/ai-usage'),
    getFinancialLogs: () => api.get('/admin/financial-logs'),
  },

  notifications: {
    getByUserId: (userId, params = {}) => api.get(`/notifications/${userId}`, { params }),
    markAllRead: (userId) => api.put(`/notifications/mark-all-read/${userId}`),
    deleteNotification: (notificationId) => api.delete(`/notifications/${notificationId}`),
  },

  // 🤖 AI Tools APIs
  aiTools: {
    research: (query) => api.post('/v1/ai-tools/research', query),
    draft: (payload) => api.post('/v1/ai-tools/draft', payload),
    contractReview: (formData) => api.post('/v1/ai-tools/contract-review', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    predict: (payload) => api.post('/v1/ai-tools/predict', payload),
    chat: (messagePayload) => api.post('/v1/ai-tools/chat', messagePayload),
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
  },
};

export default dataService;