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
  },

  adminClients: {
    // Fetch clients list (Admin -> Clients page)
    getClients: () => http.get('/api/admin/clients').then(unwrap),
  },

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
    getInvoiceDetails: (paymentId) => http.get(`/finance/invoices/${paymentId}`).then(unwrap),

    downloadInvoice: (paymentId) => http
      .get(`/finance/invoices/${paymentId}/download`, { responseType: 'blob' })
      .then(unwrap),

    // Placeholders used by other pages (prevents runtime import crashes)
    // Backend installment routes are mounted under `/api/installments/...`.
    getInstallmentsByCase: (caseId) => http.get(`/api/installments/case/${caseId}`).then(unwrap),
    payInstallment: (installmentId, payload) =>
      http.post(`/api/installments/${installmentId}/pay`, payload || {}).then(unwrap),
    createInstallmentPlan: (caseId, payload) =>
      http.post(`/api/installments/case/${caseId}/create-plan`, payload || {}).then(unwrap),
    payVisaCheckout: (payload) => http.post('/finance/pay/visa', payload || {}).then(unwrap),

    getWalletBalance: () => http.get('/finance/wallet/balance').then(unwrap),
    getPaymentHistory: () => http.get('/finance/wallet/payments').then(unwrap),

    getLawyerEarnings: () => http.get('/finance/lawyer/earnings').then(unwrap),
  },

  cases: {
    getAll: () => http.get('/cases').then(unwrap),
  },
};

export default dataService;

