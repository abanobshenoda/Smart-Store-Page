# Phase 0: Project Foundation

## Overview

تأسيس المشروع وإعداد جميع الأدوات والمكتبات الأساسية.

## Duration: 3-5 Days

## Tasks

### Task 0.1: Project Initialization

**Priority**: High
**Duration**: 1 day

#### Subtasks:

- [ok] Create Next.js project with TypeScript
  ```bash
  npx create-next-app@latest smart-store --typescript --tailwind --eslint --app --src-dir
  ```
- [ok] Initialize Git repository
  ```bash
  git init
  git remote add origin https://github.com/username/smart-store.git
  ```
- [ok] Create `.gitignore` file
- [ok] Create `README.md` with project description
- [ok] Setup branch strategy (main, develop, feature/\*)

### Task 0.2: Install Dependencies

**Priority**: High
**Duration**: 0.5 day

#### Subtasks:

- [ok] Core Dependencies
  ```bash
  npm install next@latest react@latest react-dom@latest
  ```
- [ok] TypeScript & ESLint
  ```bash
  npm install -D typescript @types/node @types/react @types/react-dom
  ```
- [ok] Tailwind CSS
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- [ok] UI Libraries
  ```bash
  npm install @headlessui/react @heroicons/react clsx tailwind-merge
  ```
- [ok] State Management
  ```bash
  npm install zustand
  ```
- [ok] Form Handling
  ```bash
  npm install react-hook-form @hookform/resolvers zod
  ```
- [ok] HTTP Client
  ```bash
  npm install axios
  ```
- [ok] Date Handling
  ```bash
  npm install date-fns
  ```
- [ok] Icons
  ```bash
  npm install react-icons
  ```

### Task 0.3: Install 3D & Animation Libraries

**Priority**: High
**Duration**: 0.5 day

#### Subtasks:

- [ok] Three.js & React Three Fiber
  ```bash
  npm install three @react-three/fiber @react-three/drei
  npm install -D @types/three
  ```
- [ok] Animation Libraries
  ```bash
  npm install framer-motion gsap
  ```
- [ok] Animation Utils
  ```bash
  npm install @studio-freight/lenis  # Smooth scrolling
  ```

### Task 0.4: Install Database & Auth Libraries

**Priority**: High
**Duration**: 0.5 day

#### Subtasks:

- [ok] Database
  ```bash
  npm install @neondatabase/serverless drizzle-orm
  npm install -D drizzle-kit
  ```
- [ok] Authentication
  ```bash
  npm install next-auth @next-auth/prisma-adapter
  npm install bcryptjs
  npm install -D @types/bcryptjs
  ```
- [ok] Validation
  ```bash
  npm install zod
  ```

### Task 0.5: Project Structure Setup

**Priority**: High
**Duration**: 1 day

#### Subtasks:

- [ok] Create folder structure
  ```
  src/
  ├── app/                    # App Router
  │   ├── (auth)/            # Auth routes
  │   ├── (shop)/            # Shop routes
  │   ├── admin/             # Admin routes
  │   ├── pos/               # POS routes
  │   ├── api/               # API routes
  │   ├── layout.tsx         # Root layout
  │   └── page.tsx           # Home page
  ├── components/            # Reusable components
  │   ├── ui/                # UI components
  │   ├── 3d/                # 3D components
  │   ├── layout/            # Layout components
  │   ├── product/           # Product components
  │   ├── cart/              # Cart components
  │   └── admin/             # Admin components
  ├── lib/                   # Utilities
  │   ├── db/                # Database
  │   ├── auth/              # Authentication
  │   ├── utils/             # Utilities
  │   └── validators/        # Zod schemas
  ├── hooks/                 # Custom hooks
  ├── stores/                # Zustand stores
  ├── types/                 # TypeScript types
  └── styles/                # Global styles
  ```
- [ok] Create base components
  - Button component
  - Input component
  - Card component
  - Modal component
- [ok] Setup global styles
- [ok] Configure Tailwind with custom theme

### Task 0.6: Environment Setup

**Priority**: High
**Duration**: 0.5 day

#### Subtasks:

- [ok] Create `.env.local` file

  ```env
  # Database
  DATABASE_URL="postgresql://..."

  # NextAuth
  NEXTAUTH_URL="http://localhost:3000"
  NEXTAUTH_SECRET="your-secret"

  # OAuth
  GOOGLE_CLIENT_ID=""
  GOOGLE_CLIENT_SECRET=""

  # Payment (future)
  STRIPE_SECRET_KEY=""
  STRIPE_PUBLISHABLE_KEY=""
  ```

- [ok] Create `.env.example` file
- [ok] Setup environment validation
- [ok] Document environment variables

### Task 0.7: Git Configuration

**Priority**: Medium
**Duration**: 0.5 day

#### Subtasks:

- [ok] Create `.gitignore`
  ```gitignore
  node_modules/
  .next/
  .env.local
  .env*.local
  *.tsbuildinfo
  next-env.d.ts
  ```
- [ok] Initial commit
- [ok] Create development branch
- [ok] Setup GitHub repository

## Deliverables

- [ok] Working Next.js project
- [ok] All dependencies installed
- [ok] Project structure created
- [ok] Environment configured
- [ok] Git repository setup
- [ok] README updated

## Verification

- [ok] `npm run dev` starts successfully
- [ok] `npm run build` completes without errors
- [ok] TypeScript compilation works
- [ok] Tailwind CSS working
- [ok] Git repository clean

## Notes

- Use npm as package manager
- Follow conventional commits
- Keep dependencies minimal
- Document all configuration
