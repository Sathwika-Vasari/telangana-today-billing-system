import api from './api';

const reportService = {
  getSummary: async () => {
    return api.get('/reports/summary');
  },

  getRevenue: async (period = 'month') => {
    return api.get(`/reports/revenue?period=${period}`);
  },

  getCampaignStatus: async () => {
    return api.get('/reports/campaign-status');
  },

  getRenewals: async (days = 30) => {
    return api.get(`/reports/renewals?days=${days}`);
  },
};

export default reportService;
