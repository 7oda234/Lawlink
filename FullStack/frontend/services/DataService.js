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

export const dataService = {
  // Example API methods
  getUsers: () => api.get('/users'),
  getCases: () => api.get('/cases'),
  // Add more methods as needed
};

export default dataService;
