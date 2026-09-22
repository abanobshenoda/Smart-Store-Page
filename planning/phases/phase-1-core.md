# Phase 1: Core Features (Database & Auth)

## Overview

بناء الميزات الأساسية: قاعدة البيانات والمصادقة.

## Duration: 7-10 Days

## Prerequisites

- Phase 0 completed
- Neon DB account created
- GitHub repository setup

## Tasks

### Task 1.1: Database Setup

**Priority**: High
**Duration**: 2 days

#### Subtasks:

- [ok] Create Neon DB project
  - Go to neon.tech
  - Create free account
  - Create new project
  - Copy connection string
- [ok] Configure Drizzle ORM

  ```bash
  # drizzle.config.ts
  import { defineConfig } from 'drizzle-kit';

  export default defineConfig({
    schema: './src/lib/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.DATABASE_URL!,
    },
  });
  ```

- [ok] Create database schema

  ```typescript
  // src/lib/db/schema.ts
  import { pgTable, uuid, varchar, ... } from 'drizzle-orm/pg-core';

  export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    // ... more fields
  });
  ```

- [ok] Run migrations
  ```bash
  npx drizzle-kit generate
  npx drizzle-kit push
  ```
- [ok] Create seed data
  ```bash
  npm run db:seed
  ```

### Task 1.2: Database Schema Implementation

**Priority**: High
**Duration**: 2 days

#### Subtasks:

- [ok] Users table
  - id, email, phone, password_hash
  - first_name, last_name, role
  - avatar_url, email_verified
  - created_at, updated_at
- [ok] Addresses table
  - id, user_id, label
  - governorate, city, street
  - building, apartment, landmark
  - is_default
- [ok] Categories table
  - id, name_ar, name_en
  - slug, image_url
  - parent_id, sort_order
- [ok] Brands table
  - id, name, slug
  - logo_url, description
- [ok] Products table
  - id, name_ar, name_en
  - slug, description_ar, description_en
  - category_id, brand_id
  - base_price, sale_price, cost_price
  - sku, barcode, weight
  - model_3d_url
  - is_active, is_featured
- [ok] Product Images table
  - id, product_id, url
  - alt_text, sort_order, is_primary
- [ok] Product Variants table
  - id, product_id
  - size, color, color_hex
  - sku, stock_quantity
  - price_adjustment
- [ok] Create indexes for performance

### Task 1.3: Database Utilities

**Priority**: High
**Duration**: 1 day

#### Subtasks:

- [ok] Create database connection

  ```typescript
  // src/lib/db/index.ts
  import { neon } from "@neondatabase/serverless";
  import { drizzle } from "drizzle-orm/neon-http";

  const sql = neon(process.env.DATABASE_URL!);
  export const db = drizzle(sql);
  ```

- [ok] Create CRUD helpers
  ```typescript
  // src/lib/db/helpers.ts
  export async function findById(table: any, id: string) { ... }
  export async function findAll(table: any) { ... }
  export async function create(table: any, data: any) { ... }
  export async function update(table: any, id: string, data: any) { ... }
  export async function remove(table: any, id: string) { ... }
  ```
- [ok] Create query builders
- [ok] Add error handling

### Task 1.4: Authentication Setup

**Priority**: High
**Duration**: 2 days

#### Subtasks:

- [ok] Configure NextAuth.js

  ```typescript
  // src/app/api/auth/[...nextauth]/route.ts
  import NextAuth from 'next-auth';
  import CredentialsProvider from 'next-auth/providers/credentials';
  import GoogleProvider from 'next-auth/providers/google';

  const handler = NextAuth({
    providers: [
      CredentialsProvider({ ... }),
      GoogleProvider({ ... }),
    ],
    callbacks: { ... },
    session: { strategy: 'jwt' },
    pages: {
      signIn: '/login',
    },
  });

  export { handler as GET, handler as POST };
  ```

- [ok] Create auth utilities
  ```typescript
  // src/lib/auth.ts
  export async function getCurrentUser() { ... }
  export async function hashPassword(password: string) { ... }
  export async function verifyPassword(password: string, hash: string) { ... }
  ```
- [ok] Create auth middleware

  ```typescript
  // src/middleware.ts
  import { withAuth } from "next-auth/middleware";

  export default withAuth({
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  });

  export const config = {
    matcher: ["/admin/:path*", "/pos/:path*"],
  };
  ```

- [ok] Setup session provider

### Task 1.5: Registration & Login

**Priority**: High
**Duration**: 2 days

#### Subtasks:

- [ ] Create registration form

  ```typescript
  // src/components/auth/RegisterForm.tsx
  'use client';

  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { registerSchema } from '@/lib/validators/auth';

  export function RegisterForm() { ... }
  ```

- [x] Create login form
  ```typescript
  // src/components/auth/LoginForm.tsx
  export function LoginForm() { ... }
  ```
- [x] Create auth API routes
  ```typescript
  // src/app/api/auth/register/route.ts
  export async function POST(req: Request) { ... }
  ```
- [ ] Add form validation

  ```typescript
  // src/lib/validators/auth.ts
  import { z } from "zod";

  export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    phone: z.string().regex(/^01[0-9]{9}$/),
  });
  ```

- [ ] Create auth pages
  - /login
  - /register
  - /forgot-password
  - /reset-password

### Task 1.6: Profile Management

**Priority**: Medium
**Duration**: 1 day

#### Subtasks:

- [ ] Create profile page
- [ ] Implement profile edit
- [ ] Add address management
- [ ] Create password change

## Deliverables

- [ ] Database schema created
- [ ] Migrations running
- [ ] Seed data populated
- [ ] Authentication working
- [ ] Registration flow complete
- [ ] Login flow complete
- [ ] Profile management functional

## Verification

- [ ] Database connection working
- [ ] User can register
- [ ] User can login
- [ ] User can logout
- [ ] Profile can be edited
- [ ] Addresses can be managed

## API Routes Created

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/profile
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

## Pages Created

```
/login
/register
/forgot-password
/reset-password
/account
/account/addresses
```

## Notes

- Use bcrypt for password hashing (12 rounds)
- Implement rate limiting on auth routes
- Add CSRF protection
- Use secure cookie settings
- Log all auth events
