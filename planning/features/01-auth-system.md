# Authentication & Authorization System

## Overview

نظام مصادقة وتفويض شامل يدعم:
- تسجيل الدخول للمستخدمين (Customers)
- تسجيل الدخول للمدينين (Admins)
- تسجيل الدخول للكاشير (POS Users)
- OAuth (Google, Facebook)
- JWT Tokens
- Session Management

## Features

### 1. User Registration
- Email + Password registration
- Phone number registration (OTP verification)
- Social login (Google, Facebook)
- Email verification
- Password strength validation

### 2. User Login
- Email/Phone + Password
- Remember me functionality
- Forgot password flow
- Reset password via email
- Rate limiting (prevent brute force)

### 3. Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| Customer | Browse, Cart, Checkout, View Orders |
| POS User | Process Sales, View Products, Daily Reports |
| Manager | All POS + Inventory, Customer Management |
| Admin | Full Access |

### 4. Profile Management
- Edit personal information
- Change password
- Manage addresses
- Order history
- Wishlist

## Technical Implementation

### Tech Stack
- **NextAuth.js** - Authentication
- **JWT** - Session tokens
- **bcrypt** - Password hashing
- **Zod** - Validation

### Database Tables

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'pos', 'manager', 'admin')),
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Addresses table
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(50) DEFAULT 'Home',
  governorate VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  street TEXT NOT NULL,
  building VARCHAR(50),
  apartment VARCHAR(50),
  landmark VARCHAR(255),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions table (for NextAuth)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Password reset tokens
CREATE TABLE password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login
POST   /api/auth/logout          - Logout
POST   /api/auth/forgot-password - Send reset email
POST   /api/auth/reset-password  - Reset password
GET    /api/auth/me              - Get current user
PUT    /api/auth/profile         - Update profile
POST   /api/auth/verify-email    - Verify email
POST   /api/auth/verify-phone    - Verify phone OTP
```

### Frontend Pages

```
/login          - Login page
/register       - Registration page
/forgot-password - Forgot password page
/reset-password  - Reset password page
/account         - Account settings
/account/addresses - Manage addresses
/account/orders    - Order history
```

## Tasks

### Task 1: Setup NextAuth.js
- [ ] Install dependencies
- [ ] Configure NextAuth with providers
- [ ] Setup JWT strategy
- [ ] Create auth callbacks

### Task 2: User Registration
- [ ] Create registration form
- [ ] Add form validation (Zod)
- [ ] Implement password hashing
- [ ] Add email verification
- [ ] Create welcome email

### Task 3: User Login
- [ ] Create login form
- [ ] Implement credential login
- [ ] Add Google OAuth
- [ ] Add Facebook OAuth
- [ ] Implement rate limiting

### Task 4: Role-Based Access
- [ ] Create middleware for route protection
- [ ] Implement role checks
- [ ] Create admin-only pages
- [ ] Create POS-only pages

### Task 5: Profile Management
- [ ] Create profile page
- [ ] Implement address management
- [ ] Add password change functionality
- [ ] Create order history page

## Validation Rules

### Registration
- Email: Valid email format
- Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number
- Name: Min 2 chars, max 100 chars
- Phone: Egyptian format (01XXXXXXXXX)

### Login
- Email: Required
- Password: Required

## Security Measures

1. CSRF Protection via NextAuth
2. Rate limiting on auth routes
3. Password hashing with bcrypt (12 rounds)
4. JWT token expiration (30 days)
5. Secure cookie settings
6. Input validation on all endpoints
