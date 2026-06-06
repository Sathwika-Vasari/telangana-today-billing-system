import api from './api';

const paymentService = {
  getAll: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (filters.status) params.append('status', filters.status);
    if (filters.campaign_id) params.append('campaign_id', filters.campaign_id);
    return api.get(`/payments?${params.toString()}`);
  },

  getById: async (id) => {
    return api.get(`/payments/${id}`);
  },

  create: async (data) => {
    return api.post('/payments', data);
  },

  update: async (id, data) => {
    return api.put(`/payments/${id}`, data);
  },
};

export default paymentService;
