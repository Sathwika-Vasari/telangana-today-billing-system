# Telangana Today - Advertiser Billing System

A comprehensive full-stack billing management system for Telangana Today newspaper, enabling efficient tracking of advertiser campaigns, payments, renewals, and automated alerts.

## 🎯 Project Overview

This system streamlines the billing operations for advertising campaigns with features including:
- **Advertiser Management**: Track advertiser details and statuses
- **Campaign Management**: Create and manage advertising campaigns
- **Payment Processing**: Record and track payments with multiple payment methods
- **Automated Alerts**: Renewal reminders and payment notifications
- **Reporting Dashboard**: Visual analytics and financial summaries
- **Role-based Access Control**: Admin and staff user roles

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT
- **Task Scheduling**: node-cron
- **Logging**: Morgan
- **Validation**: Express-validator

### Frontend
- **Library**: React 18.2
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Charts**: Recharts

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ and npm
- MySQL 5.7+
- Git

### Installation

#### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=telangana_today_billing
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_APP_NAME=Telangana Today - Billing System
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
telangana-today-billing-system/
├── backend/
│   ├── server.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── advertiserRoutes.js
│   │   ├── campaignRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── notificationRoutes.js
│   ├── models/
│   ├── controllers/
│   ├── services/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── AlertContainer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Advertisers.jsx
│   │   │   ├── Campaigns.jsx
│   │   │   └── Payments.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── advertiserService.js
│   │   │   ├── campaignService.js
│   │   │   ├── paymentService.js
│   │   │   ├── reportService.js
│   │   │   ├── dashboardService.js
│   │   │   └── notificationService.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useAlert.js
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🔑 Key Features

### 1. Authentication & Authorization
- User registration and login with JWT tokens
- Role-based access control (Admin, Manager, Staff)
- Secure token storage and automatic logout on unauthorized access

### 2. Advertiser Management
- Add, update, and delete advertiser profiles
- Track advertiser contact information and status
- Search and filter advertisers

### 3. Campaign Management
- Create and manage advertising campaigns
- Track campaign status (active, paused, completed, cancelled)
- Multiple ad types support (Banner, Video, Text, Display, Social Media, Email)
- Automated billing amount calculation

### 4. Payment Processing
- Record payments with multiple methods (bank transfer, check, cash, credit card, online)
- Track payment status and due dates
- Payment reconciliation
- Late payment alerts

### 5. Reporting & Analytics
- Revenue analysis by period
- Campaign status reports
- Payment status dashboard
- Renewal alerts and tracking
- Interactive charts and visualizations

### 6. Automated Alerts
- Renewal reminders (daily at 6 AM)
- Payment alerts (daily at 9 AM)
- Campaign status updates (daily at 12 PM)
- In-app notification system

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

### Advertisers
- `GET /api/advertisers` - List all advertisers
- `GET /api/advertisers/:id` - Get advertiser details
- `POST /api/advertisers` - Create new advertiser
- `PUT /api/advertisers/:id` - Update advertiser
- `DELETE /api/advertisers/:id` - Delete advertiser

### Campaigns
- `GET /api/campaigns` - List campaigns
- `GET /api/campaigns/:id` - Get campaign details
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### Payments
- `GET /api/payments` - List payments
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments` - Record payment
- `PUT /api/payments/:id` - Update payment

### Reports
- `GET /api/reports/summary` - Financial summary
- `GET /api/reports/revenue` - Revenue analysis
- `GET /api/reports/campaign-status` - Campaign status report
- `GET /api/reports/renewals` - Renewal information

### Dashboard
- `GET /api/dashboard/summary` - Dashboard metrics and alerts

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/all/read` - Mark all as read

## 🗄️ Database Schema

### Main Tables
- **users** - User accounts with roles
- **advertisers** - Advertiser information
- **campaigns** - Campaign details
- **payments** - Payment records
- **alerts** - System alerts and notifications
- **audit_logs** - Activity tracking

## 📱 Features by User Role

### Admin
- Full system access
- User management
- Audit logs viewing
- System configuration

### Manager
- Advertiser management
- Campaign oversight
- Payment reconciliation
- Report generation

### Staff
- View assigned advertisers
- Record payments
- View own tasks and notifications

## 🔒 Security Features

- JWT-based authentication
- Password encryption with bcrypt
- CORS protection
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- XSS protection
- Audit logging for all actions

## 📈 Performance Optimizations

- Database query optimization with indexes
- API response caching
- Pagination for large datasets
- Frontend code splitting with Vite
- Lazy loading of components

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📦 Deployment

### Production Build

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check DB credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**
   - Change `PORT` in backend `.env`
   - Restart the server

3. **CORS Errors**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check frontend and backend URLs match

4. **API Connection Issues**
   - Verify backend is running on correct port
   - Check `REACT_APP_API_URL` in frontend `.env`

## 📚 Documentation

- [Backend API Documentation](./backend/API.md)
- [Database Schema](./backend/DATABASE.md)
- [Frontend Component Guide](./frontend/COMPONENTS.md)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is proprietary to Telangana Today.

## 👥 Support

For issues or questions, please contact the development team.

## 🎉 Acknowledgments

- Built with React, Node.js, and MySQL
- UI designed with Tailwind CSS
- Charts powered by Recharts

---

**Last Updated**: June 2026
