# DevLink - Professional User Management API

A modern, production-ready user authentication and management system built with **NestJS, Prisma, PostgreSQL**, featuring advanced security, comprehensive API documentation, and professional development practices.

## Key Features

### Advanced Authentication & Security
- **JWT Authentication** with refresh token rotation
- **Role-Based Access Control (RBAC)** with permissions system
- **Email Verification** with secure token-based verification
- **Password Reset** functionality with time-limited tokens
- **Rate Limiting** to prevent abuse
- **Security Headers** with Helmet.js
- **Input Validation** and sanitization
- **Session Management** with device tracking

### Professional Database Design
- **Comprehensive Schema** with related models for users, roles, permissions
- **Soft Deletes** for data recovery
- **Audit Logging** for activity tracking
- **User Preferences** and settings
- **File Management** with metadata
- **Activity Logs** for user actions

### Professional API Design
- **OpenAPI/Swagger Documentation** with interactive UI
- **API Versioning** (v1 support with room for expansion)
- **Comprehensive DTOs** with validation using class-validator
- **Consistent Response Format** across all endpoints
- **Global Error Handling** with structured responses
- **Request/Response Logging** 
- **Pagination, Filtering & Search** for list endpoints

### File Management System
- **Secure File Upload** with type and size validation
- **Image Processing** with Sharp
- **Access Control** based on permissions
- **File metadata tracking**

### Communication Features
- **Email System** with HTML templates
- **Background Job Processing** infrastructure
- **Event-Driven Architecture** 

### Monitoring & Quality
- **Professional Logging** with Winston
- **Health Check Endpoints** 
- **Performance Monitoring** with request timing
- **User Activity Tracking**
- **Code Quality** with ESLint and Prettier

### Development & DevOps
- **Docker Support** for containerization
- **CI/CD Pipeline** with GitHub Actions
- **Testing Infrastructure** (Unit, Integration, E2E)
- **Environment Configuration** management
- **TypeScript** with strict typing

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

## Database Schema

Professional database design includes:

- **Users** - Complete user profiles with verification status
- **Roles & Permissions** - Flexible RBAC system
- **Email Tokens** - Email verification and password reset
- **Files** - File upload and management
- **Activity Logs** - Comprehensive audit trail
- **User Sessions** - Multi-device session management
- **User Preferences** - Customizable user settings
- **API Keys** - Service-to-service authentication

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

## API Documentation

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

## Development with Docker

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

## What Makes This Resume-Worthy

### Technical Skills Demonstrated
- **Backend Architecture**: Scalable NestJS application structure
- **Database Design**: Complex relational database with proper normalization
- **Security Implementation**: Enterprise-grade security practices
- **API Design**: RESTful APIs with proper documentation
- **Authentication**: JWT-based auth with refresh tokens and RBAC
- **Testing**: Comprehensive testing strategy
- **DevOps**: CI/CD pipeline and containerization

### Professional Development Practices
- **Code Quality**: TypeScript, ESLint, Prettier
- **Documentation**: Comprehensive API docs and README
- **Version Control**: Professional Git workflow
- **Environment Management**: Proper configuration handling
- **Error Handling**: Robust exception management
- **Logging**: Structured logging for debugging and monitoring

### Production Readiness
- **Performance**: Optimized database queries and caching
- **Scalability**: Designed for horizontal scaling
- **Monitoring**: Health checks and logging
- **Security**: Multiple layers of security protection
- **Reliability**: Error recovery and audit trails

## Ready-to-Use Credentials

After running `npm run seed`, use these credentials:

**Admin User:**
- Email: `admin@devlink.com`
- Password: `Admin123!`

**Demo Users:**
- Moderator: `moderator@devlink.com` / `Password123!`
- User: `user@devlink.com` / `Password123!`

## Project Highlights for Resume

- **Professional User Management API** with advanced authentication
- **Role-Based Access Control** system with granular permissions
- **Comprehensive API documentation** with OpenAPI/Swagger
- **Full TypeScript implementation** with strict type checking
- **CI/CD pipeline** with automated testing and deployment
- **Docker containerization** for development and deployment
- **Professional security implementation** including rate limiting and validation
- **Scalable database design** with audit logging and soft deletes

This project demonstrates **mid to senior-level development skills** and showcases the ability to build production-ready applications with professional development practices.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Perfect for showcasing full-stack development skills in interviews.

