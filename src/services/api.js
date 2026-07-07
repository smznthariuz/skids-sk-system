import axios from 'axios';

// Base URL configuration
// Will be replaced with actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    logout: () => apiClient.post('/auth/logout'),
    register: (data) => apiClient.post('/auth/register', data),
    me: () => apiClient.get('/auth/me'),
    forgotPassword: (data) => apiClient.post('/auth/forgot-password', data),
  },

  admin: {
    getYouth: () => apiClient.get('/admin/youth'),
    addYouth: (data) => apiClient.post('/admin/youth', data),
    updateYouth: (id, data) => apiClient.put(`/admin/youth/${id}`, data),
    deleteYouth: (id) => apiClient.delete(`/admin/youth/${id}`),
    getAnnouncements: () => apiClient.get('/admin/announcements'),
    addAnnouncement: (data) => apiClient.post('/admin/announcements', data),
    updateAnnouncement: (id, data) => apiClient.put(`/admin/announcements/${id}`, data),
    deleteAnnouncement: (id) => apiClient.delete(`/admin/announcements/${id}`),
    getEvents: () => apiClient.get('/admin/events'),
    addEvent: (data) => apiClient.post('/admin/events', data),
    updateEvent: (id, data) => apiClient.put(`/admin/events/${id}`, data),
    deleteEvent: (id) => apiClient.delete(`/admin/events/${id}`),
    getBudget: () => apiClient.get('/admin/budget'),
    addBudget: (data) => apiClient.post('/admin/budget', data),
    updateBudget: (id, data) => apiClient.put(`/admin/budget/${id}`, data),
    deleteBudget: (id) => apiClient.delete(`/admin/budget/${id}`),
    getDocuments: () => apiClient.get('/admin/documents'),
    uploadDocument: (data) => apiClient.post('/admin/documents', data),
    deleteDocument: (id) => apiClient.delete(`/admin/documents/${id}`),
    getMessages: () => apiClient.get('/admin/messages'),
    replyMessage: (id, data) => apiClient.post(`/admin/messages/${id}/reply`, data),
    markMessageRead: (id) => apiClient.put(`/admin/messages/${id}/read`),
    getHistory: () => apiClient.get('/admin/history'),
    getProfile: () => apiClient.get('/admin/profile'),
    updateProfile: (data) => apiClient.put('/admin/profile', data),
  },

  user: {
    getAnnouncements: () => apiClient.get('/announcements'),
    getEvents: () => apiClient.get('/events'),
    getBudget: () => apiClient.get('/budget'),
    getDocuments: () => apiClient.get('/documents'),
    sendMessage: (data) => apiClient.post('/messages', data),
    getProfile: () => apiClient.get('/user/profile'),
    updateProfile: (data) => apiClient.put('/user/profile', data),
  },
};

export default apiClient;
export { apiClient };
