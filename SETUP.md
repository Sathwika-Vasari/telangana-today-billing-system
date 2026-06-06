# Project Setup Guide

## Prerequisites

- Node.js v16.0.0 or higher
- npm v8.0.0 or higher
- MySQL 5.7 or higher
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Sathwika-Vasari/telangana-today-billing-system.git
cd telangana-today-billing-system
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# nano .env

# Start the backend server
npm run dev
```

**Backend will run on**: `http://localhost:5000`

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Start the frontend development server
npm run dev
```

**Frontend will run on**: `http://localhost:3000`

### 4. Database Setup

```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE telangana_today_billing;"

# Import schema (when available)
mysql -u root -p telangana_today_billing < backend/db/schema.sql
```

## Detailed Setup

### Backend Installation

#### Step 1: Install Dependencies

```bash
cd backend
npm install
```

#### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=telangana_today_billing
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

#### Step 3: Create Database

```bash
# Using MySQL CLI
mysql -u root -p

> CREATE DATABASE telangana_today_billing;
> EXIT;
```

#### Step 4: Run Migrations

```bash
# If using migration system
npm run migrate
```

#### Step 5: Start Backend Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### Frontend Installation

#### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

#### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_APP_NAME=Telangana Today - Billing System
```

#### Step 3: Start Development Server

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Verification

### Check Backend

```bash
curl http://localhost:5000/api/health
# Expected response: {"success": true, "message": "Server is running"}
```

### Check Frontend

Open `http://localhost:3000` in your browser

You should see the login page.

### Test Login

Use default credentials (if seeded):
- Email: `admin@telanganatoday.com`
- Password: `Admin@123`

## Common Issues & Solutions

### Issue: "EACCES: permission denied"

```bash
# Run with sudo or fix npm permissions
sudo npm install

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Issue: "Port already in use"

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Issue: "Cannot connect to database"

```bash
# Check MySQL is running
sudo systemctl status mysql

# Start MySQL if not running
sudo systemctl start mysql

# Verify credentials
mysql -u root -p

# Check database exists
SHOW DATABASES;
```

### Issue: "Cannot find module"

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: "CORS error"

Check `FRONTEND_URL` in backend `.env` matches your frontend URL:

```env
FRONTEND_URL=http://localhost:3000
```

## Project Structure

```
telangana-today-billing-system/
├── backend/
│   ├── server.js           # Express app entry point
│   ├── middleware/         # Custom middleware
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── controllers/       # Route controllers
│   ├── services/          # Business logic
│   ├── db/                # Database scripts
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   ├── App.jsx        # Main app component
│   │   └── index.jsx      # Entry point
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── .env               # Environment variables
│
├── README.md              # Project documentation
├── ENVIRONMENT.md         # Environment setup guide
└── SETUP.md              # This file
```

## Development Scripts

### Backend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run linter
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests
npm run lint     # Run linter
```

## Next Steps

1. **Configure Database**
   - Update DB credentials in backend `.env`
   - Create database schema

2. **Set Up Authentication**
   - Create admin user
   - Configure JWT settings

3. **Customize Settings**
   - Update app name and branding
   - Configure email settings
   - Set up payment gateway (optional)

4. **Test the Application**
   - Login with admin account
   - Create test advertisers and campaigns
   - Test payment recording

5. **Deploy**
   - Follow deployment guide
   - Configure production environment
   - Set up CI/CD pipeline

## Additional Resources

- [Environment Configuration](ENVIRONMENT.md)
- [Main README](README.md)
- [API Documentation](backend/API.md) (when available)
- [Database Schema](backend/DATABASE.md) (when available)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the documentation
3. Contact the development team

---

**Last Updated**: June 2026
