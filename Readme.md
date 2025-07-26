# Secure File Storage System - Backend

A secure, scalable file storage system built with **Node.js**, **Express**, **MongoDB**, **Redis**, and **AWS S3**. It supports OTP-based signup, JWT authentication, file uploads with filtering by type, and organized storage using S3 folder structures.

---

**Live URL**: [https://file-store-1-ibpx.onrender.com/](https://file-store-1-ibpx.onrender.com/)

---

## Features

- User authentication using OTP (email-based)
- Secure JWT access/refresh token flow (access token in frontend, refresh token in HTTP-only cookie)
- Redis used for:
  - OTP storage (5-minute expiry)
  - Refresh token storage (7-day expiry)
- Multiple file uploads with MIME-type based filtering
- AWS S3 structured upload path: `/userId/filetype/filename`
- Supports file listing, filtering, and download via pre-signed URLs
- Protected routes using access tokens
- Type-safe codebase using TypeScript

---

## API Endpoints

### Auth Routes

**POST** `/auth/request-otp` - Send OTP to email during signup

**POST** `/auth/verify-otp` - Verify OTP and create user

**POST** `/auth/login` - Login with email & password

**POST** `/auth/logout` - Logout and clear refresh token

**POST** `/auth/refresh` - Get new access token using refresh token

### File Routes

**POST** `/files/upload` - Upload multiple files (form-data)

**GET** `/files` - Get list of uploaded files can also support query param

**GET** `/files/presigned-url/:id` - Download file by ID via pre-signed URL

**DELETE** `/files/:id` - Delete file by ID

---


### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd file-storage
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Create environment files**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   
   # Frontend environment (if needed)
   cd ../frontend
   cp .env.example .env
   ```

4. **Configure environment variables** (see sample below)

5. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```


---

## Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=production
FRONTEND_URL=

# Database
MONGO_URI=mongodb+srv://admin:admin@cluster0.eqevsdm.mongodb.net/file-store?retryWrites=true&w=majority&appName=Cluster0

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Redis Configuration
REDIS_HOST=redis-19657.c309.us-east-2-1.ec2.redns.redis-cloud.com
REDIS_PORT=19657
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password_here

# Email Configuration (SendGrid)
SENDER_EMAIL=your_sender_email@example.com
SENDGRID_API_KEY=your_sendgrid_api_key_here

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=us-east-1

Create a `.env` file in the frontend directory with the following variables:
 
NEXT_PUBLIC_API_URL=
```

---
