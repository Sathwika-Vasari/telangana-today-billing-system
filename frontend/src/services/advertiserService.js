import api from './api';

const advertiserService = {
  getAll: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    return api.get(`/advertisers?${params.toString()}`);
  },

  getById: async (id) => {
    return api.get(`/advertisers/${id}`);
  },

  create: async (data) => {
    return api.post('/advertisers', data);
  },

  update: async (id, data) => {
    return api.put(`/advertisers/${id}`, data);
  },

  delete: async (id) => {
    return api.delete(`/advertisers/${id}`);
  },
};

export default advertiserService;
