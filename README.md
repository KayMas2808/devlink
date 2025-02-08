# Full-Stack User Authentication API with React & NestJS

A full-stack user authentication system using **NestJS, Prisma, PostgreSQL, and React**. This project features user registration, login, JWT-based authentication, and profile management.

## Features
- **User Authentication**: Sign up, log in, and secure routes with JWT.
- **User Management**: Update user profiles, delete accounts.
- **Database Integration**: Prisma ORM with PostgreSQL.
- **Role-Based Access Control**: Protect certain routes based on user roles.
- **React Frontend**: A modern React app for UI interaction.

## Tech Stack
- **Backend**: NestJS, Prisma, PostgreSQL, JWT Auth
- **Frontend**: React, Vite, TailwindCSS
- **API Testing**: Postman

---

## Installation

### Backend Setup (NestJS + Prisma)
```sh
# Clone the repository
git clone https://github.com/KayMas2808/devlink
cd devlink/server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env  # Edit .env with your PostgreSQL credentials

# Run database migrations
npx prisma migrate dev --name init

# Start the backend server
npm run start:dev
```

## API Endpoints
### **Auth Routes**
| Method | Endpoint     | Description         |
|--------|-------------|---------------------|
| POST   | `/auth/signup`  | Register new user |
| POST   | `/auth/login`   | Login & get token |
| GET    | `/user/:id`  | Get user profile (Protected) |
| PUT    | `/user/:id`  | Update user profile (Protected) |
| DELETE | `/user/:id`  | Delete account (Protected) |

---

## Environment Variables
Create a `.env` file and add the following:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/auth_db
JWT_SECRET=your_jwt_secret
```

---

## Future Enhancements
- OAuth (Google, GitHub login)
- Password Reset Functionality
- Deployment to Vercel & Render

---

