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

const dataService = {
  // تجميع وتوحيد كل دوال الـ admin لإنهاء مشاكل الـ TypeError والـ 404
  admin: {
    // Used by AdminHeader global search
    searchGlobal: (query) => http.get('/api/admin/search', { params: { query } }).then(unwrap),

    // Admin dashboard overview
    getFullDashboard: () => http.get('/api/admin/full-dashboard').then(unwrap),

    // Used by AdminInvoicesPage
    getFinancialLogs: () => http.get('/api/admin/financial-logs').then(unwrap),

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
    // تعديل المسارات لتتطابق مع هيكلة الباك-إند بإضافة سابقة /api لو كان السيرفر يحتاجها
    getInvoiceDetails: (paymentId) => http.get(`/api/finance/invoices/${paymentId}`).catch(() => http.get(`/finance/invoices/${paymentId}`)).then(unwrap),

    downloadInvoice: (paymentId) => http
      .get(`/api/finance/invoices/${paymentId}/download`, { responseType: 'blob' })
      .catch(() => http.get(`/finance/invoices/${paymentId}/download`, { responseType: 'blob' }))
      .then(unwrap),

    // Placeholders used by other pages (prevents runtime import crashes)
    // Backend installment routes are mounted under `/api/installments/...`.
    getInstallmentsByCase: (caseId) => http.get(`/api/installments/case/${caseId}`).then(unwrap),
    payInstallment: (installmentId, payload) =>
      http.post(`/api/installments/${installmentId}/pay`, payload || {}).then(unwrap),
    createInstallmentPlan: (caseId, payload) =>
      http.post(`/api/installments/case/${caseId}/create-plan`, payload || {}).then(unwrap),
    payVisaCheckout: (payload) => http.post('/finance/pay/visa', payload || {}).then(unwrap),

    // تعديل مسارات المحفظة لحل الـ 404 بالتجربة التناوبية بين الدومين المباشر أو تحت سابقة /api
    getWalletBalance: () => http.get('/api/finance/wallet/balance').catch(() => http.get('/finance/wallet/balance')).then(unwrap),
    getPaymentHistory: () => http.get('/api/finance/wallet/payments').catch(() => http.get('/finance/wallet/payments')).then(unwrap),

    getLawyerEarnings: () => http.get('/api/finance/lawyer/earnings').catch(() => http.get('/finance/lawyer/earnings')).then(unwrap),
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
};

export default dataService;