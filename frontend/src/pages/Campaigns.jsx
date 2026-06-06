import React, { useState, useEffect } from 'react';
import campaignService from '../services/campaignService';
import useAlert from '../hooks/useAlert';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const { success, error } = useAlert();

  useEffect(() => {
    fetchCampaigns();
  }, [page, statusFilter]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await campaignService.getAll(page, 10, { status: statusFilter });
      setCampaigns(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
    } catch (err) {
      error('Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await campaignService.create(formData);
      success('Campaign created successfully');
      setShowForm(false);
      setFormData({});
      fetchCampaigns();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to create campaign');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await campaignService.delete(id);
      success('Campaign deleted successfully');
      fetchCampaigns();
    } catch (err) {
      error('Failed to delete campaign');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Campaign'}
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Campaign</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Advertiser ID"
              className="input"
              value={formData.advertiser_id || ''}
              onChange={(e) => setFormData({ ...formData, advertiser_id: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Campaign Name"
              className="input"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <select
              className="input"
              value={formData.ad_type || ''}
              onChange={(e) => setFormData({ ...formData, ad_type: e.target.value })}
              required
            >
              <option value="">Select Ad Type</option>
              <option value="Banner">Banner</option>
              <option value="Video">Video</option>
              <option value="Text">Text</option>
              <option value="Display">Display</option>
              <option value="Social Media">Social Media</option>
              <option value="Email">Email</option>
            </select>
            <input
              type="date"
              className="input"
              value={formData.start_date || ''}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              required
            />
            <input
              type="date"
              className="input"
              value={formData.end_date || ''}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Billing Amount"
              className="input"
              value={formData.billing_amount || ''}
              onChange={(e) => setFormData({ ...formData, billing_amount: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              className="input col-span-2"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button type="submit" className="btn-primary col-span-2">
              Create Campaign
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="p-4 border-b border-gray-200">
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Advertiser</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.name}</td>
                  <td>{campaign.advertiser_name}</td>
                  <td>{campaign.ad_type}</td>
                  <td>₹{campaign.billing_amount}</td>
                  <td>
                    <span className={`badge badge-${campaign.status === 'active' ? 'success' : 'warning'}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className="btn-danger btn text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-2 rounded ${page === i + 1 ? 'btn-primary' : 'btn-secondary'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
