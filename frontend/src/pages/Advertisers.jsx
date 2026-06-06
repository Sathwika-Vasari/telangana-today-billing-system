import React, { useState, useEffect } from 'react';
import advertiserService from '../services/advertiserService';
import useAlert from '../hooks/useAlert';

const Advertisers = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const { success, error } = useAlert();

  useEffect(() => {
    fetchAdvertisers();
  }, [page, search]);

  const fetchAdvertisers = async () => {
    try {
      setLoading(true);
      const response = await advertiserService.getAll(page, 10, { search });
      setAdvertisers(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
    } catch (err) {
      error('Failed to fetch advertisers');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await advertiserService.create(formData);
      success('Advertiser created successfully');
      setShowForm(false);
      setFormData({});
      fetchAdvertisers();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to create advertiser');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this advertiser?')) return;
    try {
      await advertiserService.delete(id);
      success('Advertiser deleted successfully');
      fetchAdvertisers();
    } catch (err) {
      error('Failed to delete advertiser');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Advertisers</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Advertiser'}
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Advertiser</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="input"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              className="input"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="City"
              className="input"
              value={formData.city || ''}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <textarea
              placeholder="Address"
              className="input col-span-2"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <button type="submit" className="btn-primary col-span-2">
              Create Advertiser
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search advertisers..."
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {advertisers.map((advertiser) => (
                <tr key={advertiser.id}>
                  <td>{advertiser.name}</td>
                  <td>{advertiser.email}</td>
                  <td>{advertiser.phone}</td>
                  <td>{advertiser.city}</td>
                  <td>
                    <span className={`badge badge-${advertiser.status === 'active' ? 'success' : 'danger'}`}>
                      {advertiser.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(advertiser.id)}
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

export default Advertisers;
