# Libraries, Dependencies & Resources

## Complete Guide - Every Package Explained

---

## 1. Core Framework

### Next.js 14+
```
npm install next
```
- **What**: React framework for production apps
- **Used for**: Routing, SSR/SSG, API routes, file-based routing, image optimization
- **Docs**: https://nextjs.org/docs
- **Learn**: https://nextjs.org/learn

### React 18
```
npm install react react-dom
```
- **What**: UI library (comes with Next.js)
- **Used for**: Building UI components, state management, rendering
- **Docs**: https://react.dev

### TypeScript
```
npm install -D typescript @types/react @types/node
```
- **What**: Type-safe JavaScript
- **Used for**: All files, prevents bugs, better autocomplete
- **Docs**: https://www.typescriptlang.org/docs

---

## 2. Styling

### Tailwind CSS
```
npm install -D tailwindcss postcss autoprefixer
```
- **What**: Utility-first CSS framework
- **Used for**: All styling, responsive design, dark mode
- **Docs**: https://tailwindcss.com/docs
- **Playground**: https://play.tailwindcss.com

### tailwindcss-animate
```
npm install tailwindcss-animate
```
- **What**: Animation utilities for Tailwind
- **Used for**: Hover effects, transitions, keyframes
- **Docs**: https://github.com/vercel-labs/tailwindcss-animate

---

## 3. Database & ORM

### Neon (Serverless PostgreSQL)
```
npm install @neondatabase/serverless
```
- **What**: Serverless PostgreSQL database
- **Used for**: All data storage, users, products, orders
- **Docs**: https://neon.tech/docs
- **Free Tier**: 0.5 GB storage, 24/7 compute

### Drizzle ORM
```
npm install drizzle-orm
npm install -D drizzle-kit
```
- **What**: TypeScript ORM for SQL databases
- **Used for**: Database queries, schema definition, migrations
- **Docs**: https://orm.drizzle.team/docs
- **Schema Guide**: https://orm.drizzle.team/docs/overview

### @neondatabase/serverless
- **What**: Neon database driver
- **Used for**: Connecting to Neon PostgreSQL
- **Docs**: https://neon.tech/docs/serverless/serverless-driver

---

## 4. Authentication

### NextAuth.js (Auth.js)
```
npm install next-auth
```
- **What**: Authentication for Next.js
- **Used for**: Login, registration, sessions, OAuth (Google, Facebook), JWT tokens
- **Docs**: https://next-auth.js.org
- **v5 Docs**: https://authjs.dev

### bcryptjs
```
npm install bcryptjs
npm install -D @types/bcryptjs
```
- **What**: Password hashing
- **Used for**: Hashing user passwords before storing
- **Docs**: https://github.com/nicolo-ribaudo/bcryptjs

---

## 5. State Management

### Zustand
```
npm install zustand
```
- **What**: Lightweight state management
- **Used for**: Cart state, UI state, global app state
- **Docs**: https://zustand-demo.pmnd.rs
- **Why**: Simpler than Redux, no boilerplate

---

## 6. Forms & Validation

### React Hook Form
```
npm install react-hook-form
```
- **What**: Form handling library
- **Used for**: All forms (login, register, checkout, admin)
- **Docs**: https://react-hook-form.com

### Zod
```
npm install zod
```
- **What**: Schema validation
- **Used for**: Form validation, API input validation
- **Docs**: https://zod.dev

### @hookform/resolvers
```
npm install @hookform/resolvers
```
- **What**: Connects Zod with React Hook Form
- **Used for**: Validating forms with Zod schemas
- **Docs**: https://react-hook-form.com/docs/useform/schema

---

## 7. UI Components

### Radix UI (Headless Components)
```
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select
npm install @radix-ui/react-tabs
npm install @radix-ui/react-toast
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-accordion
npm install @radix-ui/react-avatar
npm install @radix-ui/react-checkbox
npm install @radix-ui/react-label
npm install @radix-ui/react-popover
npm install @radix-ui/react-scroll-area
npm install @radix-ui/react-separator
npm install @radix-ui/react-slot
npm install @radix-ui/react-switch
```
- **What**: Unstyled, accessible UI primitives
- **Used for**: Modals, dropdowns, selects, tabs, toasts, tooltips
- **Docs**: https://www.radix-ui.com/docs
- **Why**: Accessibility built-in, works perfectly with Tailwind

### Lucide React
```
npm install lucide-react
```
- **What**: Beautiful icons
- **Used for**: All icons in the app (search, cart, user, etc.)
- **Docs**: https://lucide.dev
- **Icons**: https://lucide.dev/icons

### class-variance-authority (CVA)
```
npm install class-variance-authority
```
- **What**: Component variant management
- **Used for**: Button variants, input variants, card variants
- **Docs**: https://cva.style

### clsx + tailwind-merge
```
npm install clsx tailwind-merge
```
- **What**: Conditional class names + merge Tailwind classes
- **Used for**: Dynamic class names without conflicts
- **Docs**: https://github.com/lukeed/clsx | https://github.com/dcastil/tailwind-merge

---

## 8. 3D & Animations

### Three.js
```
npm install three
npm install -D @types/three
```
- **What**: 3D graphics library for the web
- **Used for**: 3D product models, 3D viewers
- **Docs**: https://threejs.org/docs

### React Three Fiber
```
npm install @react-three/fiber
```
- **What**: React renderer for Three.js
- **Used for**: Rendering 3D scenes in React components
- **Docs**: https://docs.pmnd.rs/react-three-fiber

### React Three Drei
```
npm install @react-three/drei
```
- **What**: Useful helpers for React Three Fiber
- **Used for**: OrbitControls, Environment, ContactShadows, Text, etc.
- **Docs**: https://github.com/pmndrs/drei

### @react-spring/three
```
npm install @react-spring/three
```
- **What**: Spring-physics animations for Three.js
- **Used for**: Smooth 3D animations (hover, rotate, scale)
- **Docs**: https://www.react-spring.io

### Framer Motion
```
npm install framer-motion
```
- **What**: Production-ready animation library
- **Used for**: Page transitions, scroll animations, hover effects, loading animations
- **Docs**: https://www.framer.com/motion
- **Examples**: https://www.framer.com/motion/examples

---

## 9. Maps

### Leaflet
```
npm install leaflet
npm install react-leaflet
npm install -D @types/leaflet
```
- **What**: Interactive maps library
- **Used for**: Store locator, showing store locations on map
- **Docs**: https://leafletjs.com/docs
- **React Docs**: https://react-leaflet.js.org

---

## 10. Internationalization (i18n)

### next-intl
```
npm install next-intl
```
- **What**: Internationalization for Next.js
- **Used for**: Arabic/English translation, RTL support
- **Docs**: https://next-intl.dev/docs
- **Why**: Best i18n for Next.js App Router

---

## 11. Payments

### Stripe
```
npm install stripe
npm install @stripe/stripe-js
```
- **What**: Payment processing platform
- **Used for**: Credit/debit card payments
- **Docs**: https://docs.stripe.com
- **Node SDK**: https://docs.stripe.com/payments/accept-a-payment

### Fawry
- **What**: Egyptian payment gateway
- **Used for**: Mobile wallet payments
- **Docs**: https://developer.fawry.com

### InstaPay
- **What**: Egyptian bank transfer system
- **Used for**: Bank transfers
- **Docs**: https://instapay.com.eg

---

## 12. Email

### Resend
```
npm install resend
```
- **What**: Email sending service
- **Used for**: Order confirmations, abandoned cart emails, newsletters
- **Docs**: https://resend.com/docs
- **Free Tier**: 100 emails/day

### React Email
```
npm install @react-email/components
```
- **What**: Build email templates with React
- **Used for**: Designing beautiful email templates
- **Docs**: https://react.email/docs
- **Components**: https://react.email/components

---

## 13. File Upload & Storage

### UploadThing
```
npm install uploadthing
```
- **What**: File upload service
- **Used for**: Product images, user avatars, documents
- **Docs**: https://uploadthing.com
- **Why**: Easy setup, works with Next.js, free tier available

### Cloudinary (Alternative)
```
npm install cloudinary
```
- **What**: Cloud image/video management
- **Used for**: Image optimization, transformations, storage
- **Docs**: https://cloudinary.com/documentation
- **Free Tier**: 25 GB storage

---

## 14. Charts & Analytics

### Recharts
```
npm install recharts
```
- **What**: Charting library for React
- **Used for**: Dashboard charts (sales, orders, analytics)
- **Docs**: https://recharts.org
- **Examples**: https://recharts.org/en-US/examples

### Chart.js (Alternative)
```
npm install chart.js
npm install react-chartjs-2
```
- **What**: Simple yet flexible charting
- **Used for**: Alternative to Recharts
- **Docs**: https://www.chartjs.org/docs

---

## 15. Tables & Data

### TanStack Table (React Table)
```
npm install @tanstack/react-table
```
- **What**: Headless table library
- **Used for**: Admin tables (products, orders, customers)
- **Docs**: https://tanstack.com/table
- **Why**: Best for complex data tables with sorting, filtering, pagination

---

## 16. Date & Time

### date-fns
```
npm install date-fns
```
- **What**: Modern date utility library
- **Used for**: Formatting dates, time calculations, countdown timers
- **Docs**: https://date-fns.org

### Arabic date-fns (Optional)
```
npm install date-fns-jalali
```
- **What**: Persian/Arabic calendar support
- **Used for**: Arabic date formatting
- **Docs**: https://github.com/nicolo-ribaudo/date-fns-jalali

---

## 17. HTTP & Data Fetching

### SWR
```
npm install swr
```
- **What**: Data fetching with caching
- **Used for**: API calls, real-time data, optimistic updates
- **Docs**: https://swr.vercel.app

### Axios (Alternative)
```
npm install axios
```
- **What**: HTTP client
- **Used for**: API calls (alternative to fetch)
- **Docs**: https://axios-http.com/docs

---

## 18. SEO & Meta

### Next Metadata API
- **What**: Built-in Next.js metadata
- **Used for**: SEO, Open Graph, Twitter cards
- **Docs**: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

### next-sitemap
```
npm install next-sitemap
```
- **What**: Sitemap generator
- **Used for**: Auto-generating sitemaps
- **Docs**: https://next-sitemap.vercel.app

---

## 19. Testing

### Vitest
```
npm install -D vitest @testing-library/react @testing-library/jest-dom
```
- **What**: Testing framework
- **Used for**: Unit tests, component tests
- **Docs**: https://vitest.dev

### Playwright
```
npm install -D @playwright/test
```
- **What**: End-to-end testing
- **Used for**: Full app testing (login, checkout, etc.)
- **Docs**: https://playwright.dev

---

## 20. Dev Tools & Linting

### ESLint
```
npm install -D eslint eslint-config-next
```
- **What**: Code linting
- **Used for**: Code quality, catching errors
- **Docs**: https://eslint.org

### Prettier
```
npm install -D prettier eslint-config-prettier
```
- **What**: Code formatting
- **Used for**: Consistent code style
- **Docs**: https://prettier.io

### Husky
```
npm install -D husky
```
- **What**: Git hooks
- **Used for**: Pre-commit checks
- **Docs**: https://typicode.github.io/husky

---

## 21. Utilities

### clsx
```
npm install clsx
```
- **What**: Conditional class names
- **Used for**: Dynamic CSS classes
- **Docs**: https://github.com/lukeed/clsx

### tailwind-merge
```
npm install tailwind-merge
```
- **What**: Merge Tailwind classes without conflicts
- **Used for**: Preventing duplicate classes
- **Docs**: https://github.com/dcastil/tailwind-merge

### nanoid
```
npm install nanoid
```
- **What**: Unique ID generator
- **Used for**: Order numbers, session IDs
- **Docs**: https://github.com/ai/nanoid

### slugify
```
npm install slugify
```
- **What**: URL slug generator
- **Used for**: Product URLs, page URLs
- **Docs**: https://github.com/simov/slugify

---

## Complete Install Command

```bash
# Core
npm install next react react-dom typescript
npm install -D @types/react @types/node

# Styling
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate

# Database
npm install @neondatabase/serverless drizzle-orm
npm install -D drizzle-kit

# Auth
npm install next-auth bcryptjs

# State
npm install zustand

# Forms
npm install react-hook-form zod @hookform/resolvers

# UI
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch
npm install lucide-react class-variance-authority clsx tailwind-merge

# 3D & Animation
npm install three framer-motion @react-spring/three
npm install @react-three/fiber @react-three/drei
npm install -D @types/three

# Maps
npm install leaflet react-leaflet
npm install -D @types/leaflet

# i18n
npm install next-intl

# Payments
npm install stripe @stripe/stripe-js

# Email
npm install resend @react-email/components

# Upload
npm install uploadthing

# Charts
npm install recharts

# Tables
npm install @tanstack/react-table

# Dates
npm install date-fns

# Data Fetching
npm install swr

# SEO
npm install next-sitemap

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom @playwright/test

# Dev Tools
npm install -D eslint eslint-config-next prettier eslint-config-prettier husky
```

---

## Documentation Websites

### Official Docs
| Tool | URL |
|------|-----|
| Next.js | https://nextjs.org/docs |
| React | https://react.dev |
| TypeScript | https://www.typescriptlang.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Neon | https://neon.tech/docs |
| Drizzle ORM | https://orm.drizzle.team/docs |
| NextAuth.js | https://next-auth.js.org |
| Three.js | https://threejs.org/docs |
| Framer Motion | https://www.framer.com/motion |
| Leaflet | https://leafletjs.com/docs |
| Stripe | https://docs.stripe.com |
| Recharts | https://recharts.org |

### Learning Resources
| Resource | URL |
|----------|-----|
| Next.js Learn | https://nextjs.org/learn |
| Tailwind Playground | https://play.tailwindcss.com |
| Radix UI | https://www.radix-ui.com/docs |
| Zustand | https://zustand-demo.pmnd.rs |
| React Three Fiber | https://docs.pmnd.rs/react-three-fiber |
| React Hook Form | https://react-hook-form.com |
| Zod | https://zod.dev |

### Design & Inspiration
| Resource | URL |
|----------|-----|
| Dribbble | https://dribbble.com |
| Behance | https://behance.net |
| Mobbin | https://mobbin.com |
| Tailwind UI | https://tailwindui.com |
| Shadcn UI | https://ui.shadcn.com |
| Aceternity UI | https://ui.aceternity.com |

### 3D Resources
| Resource | URL |
|----------|-----|
| Sketchfab (Free Models) | https://sketchfab.com |
| TurboSquid | https://turbosquid.com |
| CGTrader | https://cgtrader.com |
| Polyhaven (Free HDRIs) | https://polyhaven.com |
| Three.js Examples | https://threejs.org/examples |
| R3F Examples | https://codesandbox.io/u/pmndrs |

### Egyptian Payment Docs
| Service | URL |
|---------|-----|
| Fawry | https://developer.fawry.com |
| InstaPay | https://instapay.com.eg |
| valU | https://www.valU.com.eg |

### Tools & Services
| Tool | URL |
|------|-----|
| Vercel (Hosting) | https://vercel.com |
| GitHub | https://github.com |
| Google Flow (AI Images) | https://flow.google.com |
| Stitch AI (Design) | https://stitch.withgoogle.com |

---

## Package Summary Table

| Category | Package | Purpose | Size |
|----------|---------|---------|------|
| Core | next | Framework | Large |
| Core | react | UI Library | Large |
| Styling | tailwindcss | CSS Framework | Medium |
| Database | @neondatabase/serverless | DB Driver | Small |
| Database | drizzle-orm | ORM | Medium |
| Auth | next-auth | Authentication | Medium |
| Auth | bcryptjs | Password Hashing | Small |
| State | zustand | State Management | Small |
| Forms | react-hook-form | Form Handling | Small |
| Forms | zod | Validation | Small |
| UI | @radix-ui/* | Components | Medium |
| UI | lucide-react | Icons | Medium |
| 3D | three | 3D Graphics | Large |
| 3D | @react-three/fiber | React Three.js | Medium |
| 3D | @react-three/drei | Three.js Helpers | Medium |
| Animation | framer-motion | Animations | Medium |
| Maps | leaflet | Maps | Small |
| i18n | next-intl | Translations | Small |
| Payments | stripe | Payments | Medium |
| Email | resend | Email Sending | Small |
| Upload | uploadthing | File Upload | Small |
| Charts | recharts | Charts | Medium |
| Tables | @tanstack/react-table | Data Tables | Medium |
| Dates | date-fns | Date Utils | Small |
| Fetch | swr | Data Fetching | Small |
