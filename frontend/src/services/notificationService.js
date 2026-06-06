import api from './api';

const notificationService = {
  getUserNotifications: async (page = 1, limit = 20) => {
    return api.get(`/notifications?page=${page}&limit=${limit}`);
  },

  markAsRead: async (id) => {
    return api.put(`/notifications/${id}/read`);
  },

  markAllAsRead: async () => {
    return api.put('/notifications/all/read');
  },
};

export default notificationService;
