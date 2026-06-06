const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cron = require('node-cron');
require('dotenv').config();

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const alertService = require('./services/alertService');

// Routes
const authRoutes = require('./routes/authRoutes');
const advertiserRoutes = require('./routes/advertiserRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/advertisers', advertiserRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Schedule alert generation tasks
if (process.env.NODE_ENV !== 'test') {
  // Run renewal alerts every day at 6 AM
  cron.schedule('0 6 * * *', () => {
    console.log('Running renewal alert generation...');
    alertService.generateRenewalAlerts();
  });

  // Run payment alerts every day at 9 AM
  cron.schedule('0 9 * * *', () => {
    console.log('Running payment alert generation...');
    alertService.generatePaymentAlerts();
  });

  // Run campaign alerts every day at 12 PM
  cron.schedule('0 12 * * *', () => {
    console.log('Running campaign alert generation...');
    alertService.generateCampaignAlerts();
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Server is running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${process.env.DB_NAME}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}\n`);
});

module.exports = app;
