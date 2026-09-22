# Smart Store — Professional E-Commerce Platform

> A production-ready, full-stack e-commerce platform built with modern web technologies.

---

## 🚀 Overview

**Smart Store** is a professional e-commerce application designed for exceptional UI/UX, robust architecture, and enterprise-grade code quality. It combines a sleek storefront with powerful admin capabilities, featuring 3D interactive elements, responsive design, and a complete backend powered by PostgreSQL and Drizzle ORM.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **UI / Components** | shadcn/ui + Tailwind CSS v4 |
| **State Management** | Zustand |
| **Forms & Validation** | React Hook Form + Zod |
| **Database** | PostgreSQL + Drizzle ORM |
| **Auth** | NextAuth.js (Session-Based) |
| **3D / Graphics** | Three.js + React Three Fiber |
| **Animation** | Framer Motion + GSAP |
| **Package Manager** | Bun |

---

## 📁 Project Structure

```
smart-store-page-new/
├── app/                      # Next.js App Router (pages, layout)
├── components/
│   ├── ui/                   # shadcn/ui base components (61 components)
│   ├── pages/                # Page-specific components (separate)
│   ├── sharedComponents/     # Shared/reusable components (shared only)
│   ├── layout/               # Layout components
│   ├── product/              # Product feature components
│   ├── cart/                 # Cart feature components
│   ├── admin/                # Admin dashboard components
│   └── 3d/                   # 3D / Three.js components
├── lib/
│   ├── db/                   # Drizzle client + schema
│   ├── auth.ts               # NextAuth configuration
│   ├── utils.ts              # Helper utilities
│   └── validations/          # Zod schemas
├── server/                   # Server Actions (CRUD logic)
├── stores/                   # Zustand state stores
├── types/                    # Global TypeScript types
├── planning/                 # Design docs, API specs, phases
└── drizzle/                  # Database migrations
```

---

## ✨ Key Features

- **Full-Stack E-Commerce** — Product catalog, cart, checkout, orders
- **Admin Dashboard** — Manage products, orders, and users
- **3D Interactive Elements** — Three.js integration for immersive UX
- **Responsive Design** — Mobile-first (320px → 1920px)
- **RTL / Arabic Support** — Full right-to-left text alignment
- **Strict TypeScript** — Zero implicit types, no `any`
- **Shadcn/ui Components** — 61 pre-built accessible UI elements
- **Server Actions Only** — No API routes except NextAuth
- **Security First** — Auth, authorization, input validation, CSRF protection

---

## 🏗 Architecture Principles

- **Server Actions ONLY** (`"use server"`) for backend logic
- **No API routes** except `/api/auth/[...nextauth]`
- **Session-based auth** via NextAuth
- **Authorization checks** in every privileged action
- **Zod validation** for all inputs
- **Drizzle ORM** prevents SQL injection
- **Component separation** — page-specific vs. shared only when reused
- **Branch workflow** — feature branch → test → approve → merge

---

## 🚀 Quick Start

```bash
# Install dependencies (Bun)
bun install

# Start dev server
npm run dev

# Build for production
npm run build
```

> **Note:** Any `package.json` changes require manual approval.

---

## ✅ Quality Gates (Every Change)

- [ ] TypeScript strict mode
- [ ] ESLint clean
- [ ] Build successful
- [ ] Tests passing (if exist)
- [ ] Manual browser verification
- [ ] Self code review completed
- [ ] No `any` types used
- [ ] Only shadcn/ui components

---

## 📄 License

MIT — Built with professional engineering standards.

---

*Project: Smart Store Page | Framework: Next.js 16 | Status: Active Development*
