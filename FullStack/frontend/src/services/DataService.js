/*
 * DataService
 * Centralized API wrapper used across the frontend.
 *
 * NOTE:
 * - Some components import this file using `../../services/DataService`.
 * - Others import it as `../services/DataService`.
 * This module MUST exist at `src/services/DataService.js`.
 */

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ✅ Named and exported cleanly
export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT to every request (prevents 401->frontend retry loops)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && typeof token === 'string' && token.trim().length > 10) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized error handling (no silent failures)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error || {};
    if (config && !config.__lawlinkRetried) {
      config.__lawlinkRetried = true;
      const isNetworkError = !error.response;
      if (isNetworkError) {
        return axiosInstance(config);
      }
    }
    return Promise.reject(error);
  }
);

const dataService = {
  admin: {
    searchGlobal: (query) => axiosInstance.get('/api/admin/search', { params: { query } }),

    getFullDashboard: () => axiosInstance.get('/api/admin/full-dashboard'),

    getFinancialLogs: () => axiosInstance.get('/api/admin/financial-logs'),

    getReportsAnalytics: () => axiosInstance.get('/api/admin/reports-analytics'),

    // ✅ تصحيح جلب السجلات وإضافة آلية دفاعية تناوبية لمنع الـ Axios Error
    getSystemLogs: () => 
      axiosInstance.get('/api/admin/system-logs')
        .catch(() => axiosInstance.get('/system-logs')),

    getAIUsageLogs: () => axiosInstance.get('/api/admin/ai-usage'),

    getClients: () => axiosInstance.get('/api/admin/clients'),
    
    getCases: () => axiosInstance.get('/api/admin/cases'),
    
    // ✅ تصحيح دالة جلب القضايا المراقبة واستبدال http بـ axiosInstance ليرسل الـ Token
   // توجيه الدالة للمسار المعتمد للقضايا في الباك-إند
  getCasesMonitoring: () => 
    axiosInstance.get('/api/admin/cases')
      .catch(() => axiosInstance.get('/api/cases')),

    getCasesMonitor: (params = {}) => axiosInstance.get('/api/cases/monitor', { params }),

    getMe: () => axiosInstance.get('/api/auth/me'),

    getUnreadNotificationsCount: () => axiosInstance.get('/api/notifications/unread'),
  },

  adminClients: {
    getClients: () => axiosInstance.get('/api/admin/clients'),
  },

  adminCases: {
    getCases: () => axiosInstance.get('/api/admin/cases'),
  },

  reports: {
    adminGetFinancialLogs: () => axiosInstance.get('/api/admin/financial-logs'),
  },

  finance: {
    getInvoiceDetails: (paymentId) => axiosInstance.get(`/api/payments/finance/invoices/${paymentId}`)
      .catch(() => axiosInstance.get(`/payments/finance/invoices/${paymentId}`)),

    downloadInvoice: (paymentId) => axiosInstance
      .get(`/api/payments/finance/invoices/${paymentId}/download`, { responseType: 'blob' })
      .catch(() => axiosInstance.get(`/payments/finance/invoices/${paymentId}/download`, { responseType: 'blob' })),

    // ✅ ربط المسارات المعتمدة للباك إند الخاص بالأقساط
    getInstallmentsByCase: (caseId) => 
      axiosInstance.get(`/api/installments/case/${caseId}`)
        .catch(() => axiosInstance.get(`/installments/case/${caseId}`)),
        
    payInstallment: (installmentId, payload) =>
      axiosInstance.post(`/api/installments/${installmentId}/pay`, payload || {})
        .catch(() => axiosInstance.post(`/installments/${installmentId}/pay`, payload || {})),
        
    createInstallmentPlan: (caseId, payload) =>
      axiosInstance.post(`/api/installments/case/${caseId}/create-plan`, payload || {})
        .catch(() => axiosInstance.post(`/installments/case/${caseId}/create-plan`, payload || {})),
      
    payVisaCheckout: (payload) => axiosInstance.post('/api/payments/visa-checkout', payload || {})
      .catch(() => axiosInstance.post('/payments/visa-checkout', payload || {})),

    getWalletBalance: () => axiosInstance.get('/api/payments/wallet/balance')
      .catch(() => axiosInstance.get('/payments/wallet/balance')),
      
    getPaymentHistory: () => axiosInstance.get('/api/payments/wallet/payments')
      .catch(() => axiosInstance.get('/payments/wallet/payments')),

    getLawyerEarnings: () => axiosInstance.get('/api/payments/lawyer/earnings')
      .catch(() => axiosInstance.get('/payments/lawyer/earnings')),
  },

  cases: {
    getAll: () => axiosInstance.get('/cases'),
  },

  aiTools: {
    research: async (payload) => {
      const response = await axiosInstance.post('/api/ai/research', payload || {});
      return response.data;
    },
    draft: async (payload) => {
      const response = await axiosInstance.post('/api/ai/draft', payload || {});
      return response.data;
    },
    contractReview: async (formData) => {
      const response = await axiosInstance.post('/api/ai/contract-review', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    predict: async (payload) => {
      const response = await axiosInstance.post('/api/ai/predict', payload || {});
      return response.data;
    },
    chat: async (payload) => {
      const response = await axiosInstance.post('/api/ai/chat', payload || {});
      return response.data;
    },
  },

  // ✅ توحيد دوال الـ MongoDB للإشعارات لتطابق الـ Routes تماماً وتمرير الـ userId
  notifications: {
    getByUserId: (userId, params = {}) => 
      axiosInstance.get(`/api/notifications/${userId}`, { params })
        .catch(() => axiosInstance.get(`/notifications/${userId}`, { params })),

    markAsRead: (id) => 
      axiosInstance.put(`/api/notifications/${id}/read`)
        .catch(() => axiosInstance.put(`/notifications/${id}/read`)),

    markAllRead: (userId) => 
      axiosInstance.put(`/api/notifications/user/${userId}/read-all`)
        .catch(() => axiosInstance.put(`/notifications/user/${userId}/read-all`)),

    deleteNotification: (id) => 
      axiosInstance.delete(`/api/notifications/${id}`)
        .catch(() => axiosInstance.delete(`/notifications/${id}`)),
  },
};

export default dataService;
