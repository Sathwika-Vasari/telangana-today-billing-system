import api from './api';

const dashboardService = {
  getSummary: async () => {
    return api.get('/dashboard/summary');
  },
};

export default dashboardService;
