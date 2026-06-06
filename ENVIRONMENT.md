# Environment Variables Configuration

## Backend (.env)

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=telangana_today_billing
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@telanganatoday.com

# Payment Gateway (Optional)
PAYMENT_GATEWAY_KEY=your_payment_gateway_key
PAYMENT_GATEWAY_SECRET=your_payment_gateway_secret
```

## Frontend (.env)

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENV=development

# App Info
REACT_APP_APP_NAME=Telangana Today - Billing System
REACT_APP_VERSION=1.0.0
```

## Environment Variables Guide

### Backend Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `DB_HOST` | MySQL server hostname | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | secure_password |
| `DB_NAME` | Database name | telangana_today_billing |
| `DB_PORT` | MySQL port | 3306 |
| `PORT` | Express server port | 5000 |
| `NODE_ENV` | Environment type | development/production |
| `JWT_SECRET` | JWT signing key | very_long_random_string |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `FRONTEND_URL` | Frontend origin for CORS | http://localhost:3000 |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API base URL | http://localhost:5000/api |
| `REACT_APP_ENV` | Environment type | development |
| `REACT_APP_APP_NAME` | Application name | Telangana Today - Billing System |

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Initialization

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE telangana_today_billing;"

# Run migrations (if applicable)
cd backend
npm run migrate
```

### 4. Start Services

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## Production Deployment

### Backend Production

```env
NODE_ENV=production
DB_HOST=prod-db-server
DB_USER=prod_user
DB_PASSWORD=strong_production_password
DB_NAME=telangana_today_billing_prod
PORT=5000
JWT_SECRET=very_long_random_production_secret
FRONTEND_URL=https://yourdomain.com
```

### Frontend Production

```env
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_ENV=production
REACT_APP_APP_NAME=Telangana Today - Billing System
```

## Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Use strong JWT secrets** - Generate with: `openssl rand -hex 32`
3. **Protect database credentials** - Use separate DB users for dev/prod
4. **HTTPS in production** - Always use HTTPS URLs
5. **Rotate secrets regularly** - Change JWT secrets periodically
6. **Use environment-specific values** - Different configs for dev/prod

## Troubleshooting

### Database Connection Failed
- Check `DB_HOST`, `DB_USER`, `DB_PASSWORD`
- Verify MySQL is running
- Check database name exists

### API Connection Error
- Verify `REACT_APP_API_URL` is correct
- Check backend is running on specified port
- Check CORS settings in backend

### Port Already in Use
- Change PORT in backend `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

---

For more information, see the main [README.md](README.md)
