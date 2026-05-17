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

const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper for consistent response shapes
const unwrap = (res) => res;

// Attach JWT to every request (prevents 401->frontend retry loops)
http.interceptors.request.use(
  (config) => {
    // Only attach Authorization header if the token looks valid (avoids 401 loops)
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
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error || {};

    // retry network errors max 1 time, avoid infinite loops
    if (config && !config.__lawlinkRetried) {
      config.__lawlinkRetried = true;
      const isNetworkError = !error.response;
      if (isNetworkError) {
        return http(config);
      }
    }

    return Promise.reject(error);
  }
);


const dataService = {
  // تجميع وتوحيد كل دوال الـ admin لإنهاء مشاكل الـ TypeError والـ 404
  admin: {
    // Used by AdminHeader global search
    searchGlobal: (query) => http.get('/api/admin/search', { params: { query } }).then(unwrap),

    // Admin dashboard overview
    getFullDashboard: () => http.get('/api/admin/full-dashboard').then(unwrap),

    // Used by AdminInvoicesPage / AdminFinancialOverview
    getFinancialLogs: () => http.get('/api/admin/financial-logs').then(unwrap),

    // Used by AdminFinancialOverview (duplicate removed)



    // Reports / analytics
    getReportsAnalytics: () => http.get('/api/admin/reports-analytics').then(unwrap),

    // System logs / activity
    getSystemLogs: () => http.get('/api/admin/system-logs').then(unwrap),

    // AI usage
    getAIUsageLogs: () => http.get('/api/admin/ai-usage').then(unwrap),

    // 👈 دمج وتكرار الدوال هنا لمنع خطأ: "is not a function" في الصفحات
    getClients: () => http.get('/api/admin/clients').then(unwrap),
    getCases: () => http.get('/api/admin/cases').then(unwrap),
    
    // 👈 إضافة دالة مراقبة القضايا الناقصة من صفحة AdminCaseMonitoringPage وحل بورت 5173
    getCasesMonitoring: () => http.get('/api/admin/cases-monitoring').then(unwrap),

    // ✅ Admin monitor with server-side filtering
    // GET /api/cases/monitor?search=&status=&priority=&category=&sort=
    getCasesMonitor: (params = {}) => http.get('/api/cases/monitor', { params }).then(unwrap),

    // ✅ Auth profile
    getMe: () => http.get('/api/auth/me').then(unwrap),

    // ✅ Notifications unread badge
    getUnreadNotificationsCount: () => http.get('/api/notifications/unread').then(unwrap),
  },


  // تم الإبقاء عليها كما هي منعاً لانهيار الصفحات التي تستدعيها بهذا المسمى القديم
  adminClients: {
    // Fetch clients list (Admin -> Clients page)
    getClients: () => http.get('/api/admin/clients').then(unwrap),
  },

  // تم الإبقاء عليها كما هي منعاً لانهيار الصفحات التي تستدعيها بهذا المسمى القديم
  adminCases: {
    // Used by AdminInstallmentsPage.jsx
    getCases: () => http.get('/api/admin/cases').then(unwrap),
  },

  reports: {
    // Needed by AdminFinancialOverviewpage.jsx
    adminGetFinancialLogs: () => http.get('/api/admin/financial-logs').then(unwrap),
  },

  finance: {
    // Used by AdminInvoicesPage
    // 🔴 FIX APPLIED: Added /payments to match the backend router mount point
    getInvoiceDetails: (paymentId) => http.get(`/api/payments/finance/invoices/${paymentId}`)
      .catch(() => http.get(`/payments/finance/invoices/${paymentId}`))
      .then(unwrap),

    downloadInvoice: (paymentId) => http
      .get(`/api/payments/finance/invoices/${paymentId}/download`, { responseType: 'blob' })
      .catch(() => http.get(`/payments/finance/invoices/${paymentId}/download`, { responseType: 'blob' }))
      .then(unwrap),

    // Placeholders used by other pages (prevents runtime import crashes)
    // Backend installment routes are mounted under `/api/installments/...`.
    getInstallmentsByCase: (caseId) => http.get(`/api/installments/case/${caseId}`).then(unwrap),
    payInstallment: (installmentId, payload) =>
      http.post(`/api/installments/${installmentId}/pay`, payload || {}).then(unwrap),
    createInstallmentPlan: (caseId, payload) =>
      http.post(`/api/installments/case/${caseId}/create-plan`, payload || {}).then(unwrap),
      
    // 🔴 FIX APPLIED: Updated checkout and wallet routes to hit the payment router correctly
    payVisaCheckout: (payload) => http.post('/api/payments/visa-checkout', payload || {})
      .catch(() => http.post('/payments/visa-checkout', payload || {}))
      .then(unwrap),

    // تعديل مسارات المحفظة لحل الـ 404 بالتجربة التناوبية بين الدومين المباشر أو تحت سابقة /api
    getWalletBalance: () => http.get('/api/payments/wallet/balance')
      .catch(() => http.get('/payments/wallet/balance'))
      .then(unwrap),
      
    getPaymentHistory: () => http.get('/api/payments/wallet/payments')
      .catch(() => http.get('/payments/wallet/payments'))
      .then(unwrap),

    getLawyerEarnings: () => http.get('/api/payments/lawyer/earnings')
      .catch(() => http.get('/payments/lawyer/earnings'))
      .then(unwrap),
  },

  cases: {
    getAll: () => http.get('/cases').then(unwrap),
  },

  aiTools: {
    // Document drafting
    draft: (payload) => http.post('/api/ai/draft', payload || {}).then(unwrap),

    // Contract review (expects FormData under key "contract")
    contractReview: (formData) => http.post('/api/ai/contract-review', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(unwrap),

    // Case outcome prediction
    predict: (payload) => http.post('/api/ai/predict', payload || {}).then(unwrap),

    // Legal chatbot
    chat: (payload) => http.post('/api/ai/chat', payload || {}).then(unwrap),
  },

  notifications: {
    // Fetch notifications for a specific user
    getByUserId: (userId, params = {}) => 
      http.get(`/api/notifications/${userId}`, { params })
        .catch(() => http.get(`/notifications/${userId}`, { params }))
        .then(unwrap),

    // Mark a single notification as read
    markAsRead: (id) => 
      http.put(`/api/notifications/${id}/read`)
        .catch(() => http.put(`/notifications/${id}/read`))
        .then(unwrap),

    // Mark all notifications as read (if your backend supports it, otherwise this needs a loop in the UI)
    markAllRead: (userId) => 
      http.put(`/api/notifications/user/${userId}/read-all`)
        .catch(() => http.put(`/notifications/user/${userId}/read-all`))
        .then(unwrap),

    // Delete a notification (You need to add this route to notification.routes.js if it doesn't exist!)
    deleteNotification: (id) => 
      http.delete(`/api/notifications/${id}`)
        .catch(() => http.delete(`/notifications/${id}`))
        .then(unwrap),
  },
};

export default dataService;
