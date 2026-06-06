# Telangana Today - Advertiser Account & Campaign Billing System

A comprehensive full-stack web application for managing advertiser accounts, campaigns, billing, and payments for Telangana Today media organization.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)

## 🎯 Project Overview

### Business Problem

Telangana Today manages advertiser accounts manually through:
- Spreadsheets
- WhatsApp messages
- Paper records

### Problems Solved

- ✅ Centralized account management system
- ✅ Real-time campaign tracking
- ✅ Automated payment tracking
- ✅ Renewal date alerts
- ✅ Automated alert engine
- ✅ Real-time analytics dashboard
- ✅ Comprehensive reporting

## 🛠 Tech Stack

### Frontend
- **React.js 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **JWT** - Authentication
- **PostgreSQL** - Database
- **Nodemon** - Development utility

### Database
- **PostgreSQL** - Relational database
- **Supabase** (Production) - Managed PostgreSQL

### Deployment
- **Frontend** → Vercel
- **Backend** → Render
- **Database** → Supabase PostgreSQL

## ✨ Features

### 1. Authentication & Authorization
- Admin and Staff roles
- JWT-based authentication
- Protected routes
- Role-based access control

### 2. Dashboard
- Total advertisers count
- Active campaigns count
- Revenue generated
- Pending payments
- Upcoming renewals
- Critical alerts display

### 3. Advertiser Management
- Create, read, update, delete advertisers
- Search functionality
- Filter by status
- Pagination
- Contact information management

### 4. Campaign Management
- Create, read, update, delete campaigns
- Campaign status tracking
- Booking date management
- Start/end date configuration
- Automatic renewal date calculation
- Search and filter capabilities

### 5. Payment & Billing
- Invoice generation
- Payment status tracking
- Mark payments as paid/pending
- Payment history
- Overdue payment alerts

### 6. Reports & Analytics
- Revenue trends chart
- Campaign status breakdown
- Monthly revenue analysis
- Advertiser performance metrics
- Export capabilities

### 7. Alert Engine
- 30-day pre-renewal alerts
- 15-day pre-renewal alerts
- 7-day pre-renewal alerts
- Renewal date alerts
- Pending payment alerts
- Overdue payment alerts

### 8. Notifications
- Real-time notification display
- Notification history
- Notification filtering

## 📁 Project Structure

```
telangana-today-billing-system/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Advertisers.jsx
│   │   │   ├── Campaigns.jsx
│   │   │   ├── Payments.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── advertiserService.js
│   │   │   ├── campaignService.js
│   │   │   ├── paymentService.js
│   │   │   ├── reportService.js
│   │   │   └── notificationService.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useAlert.js
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── AuthLayout.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── advertiserController.js
│   │   ├── campaignController.js
│   │   ├── paymentController.js
│   │   ├── reportController.js
│   │   ├── dashboardController.js
│   │   └── notificationController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── advertiserRoutes.js
│   │   ├── campaignRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── notificationRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Advertiser.js
│   │   ├── Campaign.js
│   │   ├── Payment.js
│   │   ├── Notification.js
│   │   └── AuditLog.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── alertService.js
│   │   ├── emailService.js
│   │   └── reportService.js
│   ├── config/
│   │   ├── database.js
│   │   └── constants.js
│   ├── migrations/
│   │   └── migration files
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── advertiser.test.js
│   │   ├── campaign.test.js
│   │   ├── payment.test.js
│   │   └── api.test.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── migrations/
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── TESTING_REPORT.md
│   ├── ARCHITECTURE.md
│   ├── ER_DIAGRAM.md
│   ├── PROJECT_REPORT.md
│   └── DEMO_SCRIPT.md
│
├── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── deploy-frontend.yml
│       └── deploy-backend.yml
│
└── DEPLOYMENT.md

```

## 🚀 Installation

### Prerequisites
- Node.js v16+
- PostgreSQL 12+
- Git
- npm or yarn

### Step 1: Clone Repository
```bash
git clone https://github.com/Sathwika-Vasari/telangana-today-billing-system.git
cd telangana-today-billing-system
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4: Setup Database
```bash
cd ../database
# Create PostgreSQL database
createdb telangana_today_db

# Run schema
psql telangana_today_db < schema.sql

# Seed sample data
psql telangana_today_db < seed.sql
```

## ⚙️ Configuration

### Backend .env
```
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=telangana_today_db

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## 🏃 Running the Application

### Terminal 1: Start Backend Server
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 2: Start Frontend Server
```bash
cd frontend
npm start
# Application opens on http://localhost:3000
```

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Body: {
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "admin" | "staff"
}
```

#### Login
```
POST /auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}
Response: {
  "token": "jwt_token",
  "user": { ... }
}
```

#### Get Profile
```
GET /auth/profile
Headers: { "Authorization": "Bearer token" }
```

### Advertiser Endpoints

#### Get All Advertisers
```
GET /advertisers?page=1&limit=10&search=&status=
```

#### Get Single Advertiser
```
GET /advertisers/:id
```

#### Create Advertiser
```
POST /advertisers
Body: {
  "name": "Company Name",
  "email": "contact@company.com",
  "phone": "9876543210",
  "address": "Address",
  "city": "City",
  "state": "State",
  "pincode": "123456",
  "status": "active"
}
```

#### Update Advertiser
```
PUT /advertisers/:id
Body: { ...updated fields }
```

#### Delete Advertiser
```
DELETE /advertisers/:id
```

### Campaign Endpoints

#### Get All Campaigns
```
GET /campaigns?page=1&limit=10&status=&advertiser_id=
```

#### Create Campaign
```
POST /campaigns
Body: {
  "name": "Campaign Name",
  "advertiser_id": 1,
  "ad_type": "Banner|Video|Text",
  "booking_date": "2024-01-15",
  "start_date": "2024-01-20",
  "end_date": "2024-02-20",
  "billing_amount": 50000,
  "status": "active|paused|completed"
}
```

#### Update Campaign
```
PUT /campaigns/:id
Body: { ...updated fields }
```

#### Delete Campaign
```
DELETE /campaigns/:id
```

### Payment Endpoints

#### Get All Payments
```
GET /payments?page=1&limit=10&status=
```

#### Create Payment
```
POST /payments
Body: {
  "campaign_id": 1,
  "amount": 50000,
  "payment_date": "2024-01-20",
  "payment_method": "bank_transfer|check|cash",
  "reference_number": "REF123",
  "status": "paid|pending|failed"
}
```

#### Update Payment Status
```
PUT /payments/:id
Body: {
  "status": "paid|pending|failed"
}
```

### Report Endpoints

#### Get Summary Report
```
GET /reports/summary
Response: {
  "total_advertisers": 50,
  "active_campaigns": 25,
  "total_revenue": 5000000,
  "pending_payments": 500000,
  "upcoming_renewals": 10
}
```

#### Get Revenue Report
```
GET /reports/revenue?period=month|year
```

#### Get Campaign Status Report
```
GET /reports/campaign-status
```

#### Get Renewal Report
```
GET /reports/renewals?days=30
```

### Dashboard Endpoints

#### Get Dashboard Summary
```
GET /dashboard/summary
Response: {
  "metrics": { ... },
  "alerts": [ ... ],
  "recent_activities": [ ... ]
}
```

## 🗄️ Database Schema

### Tables

1. **users**
   - Stores admin and staff user accounts
   - Fields: id, email, password, name, role, created_at

2. **advertisers**
   - Advertiser company information
   - Fields: id, name, email, phone, address, city, state, pincode, status, created_at, updated_at

3. **campaigns**
   - Campaign details
   - Fields: id, advertiser_id, name, ad_type, booking_date, start_date, end_date, billing_amount, status, renewal_date, created_at, updated_at

4. **payments**
   - Payment records
   - Fields: id, campaign_id, amount, payment_date, payment_method, reference_number, status, created_at, updated_at

5. **notifications**
   - Alert notifications
   - Fields: id, user_id, campaign_id, type, message, is_read, created_at

6. **audit_logs**
   - Activity tracking
   - Fields: id, user_id, action, entity_type, entity_id, old_value, new_value, created_at

## 🧪 Testing

### Run Unit Tests
```bash
cd backend
npm test
```

### Run Integration Tests
```bash
npm run test:integration
```

### Run API Tests
```bash
npm run test:api
```

### Test Coverage
```bash
npm run test:coverage
```

### Postman Collection
Import `postman-collection.json` in Postman for API testing.

## 📊 Reports & Documentation

All documentation is available in the `docs/` folder:

- **API_DOCUMENTATION.md** - Complete API reference
- **DATABASE_SCHEMA.md** - Database design details
- **ARCHITECTURE.md** - System architecture
- **ER_DIAGRAM.md** - Entity relationship diagram
- **DEPLOYMENT_GUIDE.md** - Production deployment
- **TESTING_REPORT.md** - Test results
- **PROJECT_REPORT.md** - Complete project report
- **DEMO_SCRIPT.md** - Demonstration walkthrough

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
# Deploy build folder to Vercel
```

### Backend Deployment (Render)
```bash
cd backend
# Configure environment variables on Render
# Deploy repository to Render
```

### Database (Supabase PostgreSQL)
```bash
# Create Supabase project
# Update database credentials in backend .env
# Run migrations on Supabase
```

See `DEPLOYMENT.md` for detailed instructions.

## 📝 License

This project is proprietary software for Telangana Today.

## 👥 Support

For issues or questions, contact the development team.

---

**Last Updated:** June 2024
**Version:** 1.0.0
**Status:** Production Ready
