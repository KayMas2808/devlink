# DevLink - Professional User Management API

A modern, production-ready user authentication and management system built with **NestJS, Prisma, PostgreSQL**, featuring advanced security, comprehensive API documentation, and professional development practices.

## Architecture Overview

```
src/
├── auth/                 # Authentication & Authorization
│   ├── dto/              # Data Transfer Objects
│   ├── guards/           # JWT & Role Guards
│   └── services/         # Auth Business Logic
├── user/                 # User Management
│   ├── dto/              # User DTOs with validation
│   └── services/         # User Business Logic
├── common/               # Shared Components
│   ├── decorators/       # Custom Decorators
│   ├── filters/          # Exception Filters
│   ├── guards/           # Authorization Guards
│   ├── interceptors/     # Request/Response Interceptors
│   └── utils/            # Utility Functions
├── prisma/               # Database Layer
│   ├── migrations/       # Database Migrations
│   └── seed.ts           # Database Seeding
└── files/                # File Management (ready for expansion)
```

## API Endpoints

### Authentication
```http
POST   /api/v1/auth/signup              # Register new user
POST   /api/v1/auth/login               # User login
POST   /api/v1/auth/verify-email        # Verify email address
POST   /api/v1/auth/resend-verification # Resend verification email
POST   /api/v1/auth/forgot-password     # Request password reset
POST   /api/v1/auth/reset-password      # Reset password
POST   /api/v1/auth/refresh-token       # Refresh access token
GET    /api/v1/auth/profile             # Get current user profile
POST   /api/v1/auth/logout              # Logout current session
POST   /api/v1/auth/logout-all          # Logout all sessions
```

### User Management
```http
GET    /api/v1/users                    # Get users (paginated, filtered)
GET    /api/v1/users/:id                # Get user by ID
PUT    /api/v1/users/profile            # Update own profile
PUT    /api/v1/users/:id                # Update user (admin)
POST   /api/v1/users/change-password    # Change password
POST   /api/v1/users/upload-avatar      # Upload profile picture
DELETE /api/v1/users/profile            # Delete own account
DELETE /api/v1/users/:id                # Delete user (admin)
POST   /api/v1/users/:id/activate       # Activate user (admin)
POST   /api/v1/users/:id/deactivate     # Deactivate user (admin)
GET    /api/v1/users/stats/overview     # User statistics (admin)
```

### System
```http
GET    /health                          # Health check
GET    /docs                           # API documentation
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Redis (for caching and sessions)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/your-username/devlink
cd devlink
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Database setup**
```bash
npm run prisma:migrate
npm run seed  # Creates admin user and sample data
```

5. **Start development server**
```bash
npm run start:dev
```

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/devlink_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="1h"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@devlink.com

# Redis (for caching and sessions)
REDIS_URL=redis://localhost:6379

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100
```

## API

Once the server is running, visit:
- **Interactive API Docs**: `http://localhost:3000/docs`
- **Health Check**: `http://localhost:3000/health`

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Docker

```bash
# Start all services (API, Database, Redis, Email)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

**Optional development tools** (use `--profile tools`):
- **pgAdmin**: `http://localhost:5050` (Database management)
- **Redis Commander**: `http://localhost:8081` (Redis management)
- **MailHog**: `http://localhost:8025` (Email testing)

```bash
# Start with development tools
docker-compose --profile tools up -d
```

## Security Features

- **Input Validation**: Comprehensive validation on all inputs
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **XSS Protection**: Input sanitization and security headers
- **Rate Limiting**: Configurable rate limiting per IP/user
- **Secure Headers**: Security headers with Helmet.js
- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Security**: Short-lived access tokens with refresh rotation
- **CORS Protection**: Configurable CORS policies

## Ready-to-Use Credentials

After running `npm run seed`, use these credentials:

**Admin User:**
- Email: `admin@devlink.com`
- Password: `Admin123!`

**Demo Users:**
- Moderator: `moderator@devlink.com` / `Password123!`
- User: `user@devlink.com` / `Password123!`
