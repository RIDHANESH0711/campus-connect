import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for injecting JWT bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh / error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh/`, { refresh: refreshToken });
          if (res.status === 200) {
            localStorage.setItem('token', res.data.access);
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
            return api(originalRequest);
          }
        } catch (refreshErr) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  getProfile: () => api.get('/auth/me/'),
  updateProfile: (data) => api.patch('/auth/me/', data),
};

export const eventService = {
  getAll: (params) => api.get('/events/', { params }),
  getFeatured: () => api.get('/events/featured/'),
  getById: (id) => api.get(`/events/${id}/`),
  create: (data) => api.post('/events/', data),
  update: (id, data) => api.put(`/events/${id}/`, data),
  delete: (id) => api.delete(`/events/${id}/`),
};

export const registrationService = {
  getAll: (params) => api.get('/registrations/', { params }),
  register: (eventId) => api.post('/registrations/', { event_id: eventId }),
  cancel: (id) => api.patch(`/registrations/${id}/cancel/`),
  approve: (id) => api.patch(`/registrations/${id}/approve/`),
  reject: (id) => api.patch(`/registrations/${id}/reject/`),
  delete: (id) => api.delete(`/registrations/${id}/`),
};

export const studentService = {
  getAll: (params) => api.get('/students/', { params }),
  getById: (id) => api.get(`/students/${id}/`),
  create: (data) => api.post('/students/', data),
  update: (id, data) => api.put(`/students/${id}/`, data),
  delete: (id) => api.delete(`/students/${id}/`),
};

export const categoryService = {
  getAll: () => api.get('/categories/'),
  create: (data) => api.post('/categories/', data),
  update: (id, data) => api.put(`/categories/${id}/`, data),
  delete: (id) => api.delete(`/categories/${id}/`),
};

export const venueService = {
  getAll: () => api.get('/venues/'),
  create: (data) => api.post('/venues/', data),
  update: (id, data) => api.put(`/venues/${id}/`, data),
  delete: (id) => api.delete(`/venues/${id}/`),
};

export const feedbackService = {
  getAll: (params) => api.get('/feedback/', { params }),
  submit: (data) => api.post('/feedback/', data),
  delete: (id) => api.delete(`/feedback/${id}/`),
};

export default api;
