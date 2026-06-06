import React, { useState, useEffect } from 'react';
import paymentService from '../services/paymentService';
import useAlert from '../hooks/useAlert';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const { success, error } = useAlert();

  useEffect(() => {
    fetchPayments();
  }, [page, statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getAll(page, 10, { status: statusFilter });
      setPayments(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
    } catch (err) {
      error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await paymentService.create(formData);
      success('Payment recorded successfully');
      setShowForm(false);
      setFormData({});
      fetchPayments();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to record payment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Record Payment'}
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Record New Payment</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Campaign ID"
              className="input"
              value={formData.campaign_id || ''}
              onChange={(e) => setFormData({ ...formData, campaign_id: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              className="input"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <input
              type="date"
              className="input"
              value={formData.payment_date || ''}
              onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
              required
            />
            <select
              className="input"
              value={formData.payment_method || ''}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
              <option value="online">Online</option>
            </select>
            <input
              type="text"
              placeholder="Reference Number"
              className="input"
              value={formData.reference_number || ''}
              onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
            />
            <select
              className="input"
              value={formData.status || ''}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            >
              <option value="">Select Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="overdue">Overdue</option>
            </select>
            <textarea
              placeholder="Notes"
              className="input col-span-2"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
            <button type="submit" className="btn-primary col-span-2">
              Record Payment
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.campaign_name}</td>
                  <td>₹{payment.amount}</td>
                  <td>{payment.payment_method}</td>
                  <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge badge-${payment.status === 'paid' ? 'success' : payment.status === 'overdue' ? 'danger' : 'warning'}`}>
                      {payment.status}
                    </span>
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

export default Payments;
