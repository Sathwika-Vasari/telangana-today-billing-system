import api from './api';

const campaignService = {
  getAll: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (filters.status) params.append('status', filters.status);
    if (filters.advertiser_id) params.append('advertiser_id', filters.advertiser_id);
    if (filters.search) params.append('search', filters.search);
    return api.get(`/campaigns?${params.toString()}`);
  },

  getById: async (id) => {
    return api.get(`/campaigns/${id}`);
  },

  create: async (data) => {
    return api.post('/campaigns', data);
  },

  update: async (id, data) => {
    return api.put(`/campaigns/${id}`, data);
  },

  delete: async (id) => {
    return api.delete(`/campaigns/${id}`);
  },
};

export default campaignService;
