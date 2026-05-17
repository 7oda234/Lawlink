import axios from 'axios';
import { io } from 'socket.io-client';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const fetchAdminCases = async (params) => {
  const { data } = await axios.get(`${API_BASE}/api/admin/cases`, { params, withCredentials: true });
  return data;
};

export const fetchAdminCaseById = async (id) => {
  const { data } = await axios.get(`${API_BASE}/api/admin/cases/${id}`, { withCredentials: true });
  return data;
};

export const fetchAdminCasesStats = async () => {
  const { data } = await axios.get(`${API_BASE}/api/admin/cases/stats`, { withCredentials: true });
  return data;
};

export const fetchAdminCasesAnalytics = async () => {
  const { data } = await axios.get(`${API_BASE}/api/admin/cases/analytics`, { withCredentials: true });
  return data;
};

export const fetchAdminCasesWorkload = async () => {
  const { data } = await axios.get(`${API_BASE}/api/admin/cases/workload`, { withCredentials: true });
  return data;
};

export const fetchAdminCasesPerformance = async () => {
  const { data } = await axios.get(`${API_BASE}/api/admin/cases/performance`, { withCredentials: true });
  return data;
};

export const fetchAdminCasesActivity = async ({ caseId, page, pageSize } = {}) => {
  const { data } = await axios.get(`${API_BASE}/api/admin/cases/activity`, {
    params: { caseId, page, pageSize },
    withCredentials: true,
  });
  return data;
};

export const postAdminCaseActivity = async ({ caseId, type, text }) => {
  const { data } = await axios.post(`${API_BASE}/api/admin/cases/${caseId}/activity`, { type, text }, { withCredentials: true });
  return data;
};

export const fetchAdminCasesAlerts = async () => {
  const { data } = await axios.get(`${API_BASE}/api/admin/cases/alerts`, { withCredentials: true });
  return data;
};

export const postAdminCaseEscalate = async ({ caseId, reason }) => {
  const { data } = await axios.post(`${API_BASE}/api/admin/cases/${caseId}/escalate`, { reason }, { withCredentials: true });
  return data;
};

export const putAdminCaseStatus = async ({ caseId, status }) => {
  const { data } = await axios.put(`${API_BASE}/api/admin/cases/${caseId}/status`, { status }, { withCredentials: true });
  return data;
};

export const postAdminCaseNotes = async ({ caseId, notes }) => {
  const { data } = await axios.post(`${API_BASE}/api/admin/cases/${caseId}/notes`, { notes }, { withCredentials: true });
  return data;
};

// Socket client helper (no mocking)
let socket;

export const connectAdminMonitoringSocket = () => {
  if (socket && socket.connected) return socket;

  socket = io(API_BASE, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    autoConnect: true,
  });

  return socket;
};

