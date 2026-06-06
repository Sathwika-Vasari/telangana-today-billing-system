import React, { useState, useEffect } from 'react';
import dashboardService from '../services/dashboardService';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await dashboardService.getSummary();
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  const metrics = summary?.metrics || {};

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card p-6">
          <p className="text-gray-600 text-sm font-medium">Total Advertisers</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.total_advertisers || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm font-medium">Active Campaigns</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{metrics.active_campaigns || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-success-600 mt-2">₹{(metrics.total_revenue || 0).toFixed(2)}</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm font-medium">Pending Payments</p>
          <p className="text-3xl font-bold text-warning-600 mt-2">₹{(metrics.pending_payments || 0).toFixed(2)}</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm font-medium">Upcoming Renewals</p>
          <p className="text-3xl font-bold text-danger-600 mt-2">{metrics.upcoming_renewals || 0}</p>
        </div>
      </div>

      {/* Alerts Section */}
      {summary?.alerts && summary.alerts.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          <div className="space-y-2">
            {summary.alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                <p className="text-xs text-gray-600">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activities */}
      {summary?.recent_activities && summary.recent_activities.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-2">
            {summary.recent_activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex justify-between items-center p-3 border-b border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.user_name}</p>
                </div>
                <p className="text-xs text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
