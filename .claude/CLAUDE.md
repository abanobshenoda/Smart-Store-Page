# Smart Store - Full-Stack Engineering Standards

## 🎯 Project Mission
Build a professional, production-ready e-commerce platform with exceptional UI/UX, robust architecture, and enterprise-grade code quality.

---

## 🧠 Core Engineering Principles

### 1. **Think Before Code**
```
Understand → Inspect → Plan → Implement → Verify → Document
```

- **Never** start coding before understanding the requirement
- **Always** inspect existing codebase patterns first
- **Always** propose plan for architectural changes
- **Never** introduce new patterns without justification

### 2. **Respect Existing Architecture**
- **MANDATORY**: Read `website/AGENTS.md` and `website/CLAUDE.md` before ANY backend work
- Follow existing file structure and naming conventions
- Match code style, comment density, and idioms
- Reuse existing components before creating new ones

### 3. **Quality Gates (Non-Negotiable)**
Every change must pass ALL checks:
```bash
□ TypeScript strict mode (no 'any')
□ ESLint clean
□ Build successful
□ Tests passing (when tests exist)
□ Manual verification in browser
□ Self code-review completed
```

### 4. **Backend Architecture (CRITICAL)**
Per `AGENTS.md`:
- ✅ **Server Actions ONLY** (`"use server"`) for all backend logic
- ❌ **NO API routes** except NextAuth (`/api/auth/[...nextauth]`)
- ✅ **Session-based auth** via NextAuth only
- ✅ **Authorization checks** in EVERY privileged Server Action
- ❌ **NO client-side fetch** for mutations

### 5. **Security First**
Before implementing ANY feature, check:
```
□ Authentication verified
□ Authorization enforced
□ Input validated (Zod schemas)
□ SQL injection prevented (Drizzle ORM)
□ XSS prevented (React auto-escaping + validation)
□ CSRF protection (Next.js built-in)
□ Sensitive data not exposed
```

### 6. **Performance Matters**
- Lazy load heavy components
- Optimize images (Next.js Image)
- Minimize bundle size
- Cache expensive operations
- Avoid N+1 queries
- Use Server Components by default

### 7. **TypeScript Strict**
```typescript
// ✅ GOOD
type User = { id: string; name: string };
const user: User = await getUser();

// ❌ BAD
const user: any = await getUser();
const data = await fetch(url).then(r => r.json()); // implicit any
```

### 8. **Error Handling**
```typescript
// Every Server Action must handle errors
"use server";

export async function createOrder(data: CreateOrderInput) {
  try {
    // Validate
    const validated = CreateOrderSchema.parse(data);
    
    // Authorize
    const user = await requireAuth();
    
    // Execute
    const order = await db.insert(orders).values({...});
    
    return { success: true, order };
  } catch (error) {
    console.error("Create order failed:", error);
    return { success: false, error: error.message };
  }
}
```

---

## 🎨 UI/UX Standards

### Design System
- **Consistency**: Use existing components (shadcn/ui, Tailwind)
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design (320px → 1920px)
- **Performance**: Smooth animations (60fps), optimized images
- **Arabic RTL**: Full RTL support with proper text alignment

### Component Quality
```typescript
// ✅ Every component must have:
// 1. TypeScript props interface
// 2. Responsive design
// 3. Loading states
// 4. Error states
// 5. Empty states
// 6. Accessibility attributes
```

### Animation Guidelines
- Use Framer Motion for complex animations
- Use Tailwind transitions for simple hover/focus
- Keep animations under 300ms
- Provide reduced-motion alternatives
- Never block interaction with animations

---

## 📁 Project Structure

```
website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages group
│   │   ├── (shop)/            # Public shop pages
│   │   ├── (admin)/           # Admin dashboard
│   │   └── api/auth/          # NextAuth ONLY
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components (shadcn)
│   │   ├── layout/           # Layout components
│   │   ├── features/         # Feature-specific components
│   │   └── shared/           # Shared components
│   │
│   ├── server/               # Server Actions (CRITICAL)
│   │   ├── products.ts       # Product actions
│   │   ├── cart.ts           # Cart actions
│   │   ├── orders.ts         # Order actions
│   │   ├── auth.ts           # Auth helpers
│   │   └── admin/            # Admin actions
│   │
│   ├── lib/                  # Utilities
│   │   ├── db/              # Database client + schema
│   │   ├── auth.ts          # NextAuth config
│   │   ├── utils.ts         # Helper functions
│   │   └── validations/     # Zod schemas
│   │
│   ├── hooks/               # React hooks
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
│
├── public/                  # Static assets
├── scripts/                 # Database scripts
└── drizzle/                # Database migrations
```

---

## 🔄 Development Workflow

### Before Starting ANY Task
1. **Understand**: Read the requirement carefully
2. **Inspect**: Check existing code patterns
3. **Plan**: Outline approach (for architectural changes)
4. **Verify**: Check `AGENTS.md` rules for backend work

### Implementation
1. **Read** relevant files first
2. **Implement** minimal, focused changes
3. **Test** manually in browser
4. **Verify** build passes
5. **Review** your own code
6. **Document** important decisions

### After Completing
```bash
# Run checks
npm run lint
npm run build

# Manual verification
npm run dev
# → Test in browser at http://localhost:3000
```

---

## 🚫 NEVER Do This

1. **DO NOT** modify files without reading them first
2. **DO NOT** create API routes for app logic (Server Actions only!)
3. **DO NOT** use `any` type without documented reason
4. **DO NOT** skip validation on Server Actions
5. **DO NOT** skip authorization checks on privileged actions
6. **DO NOT** commit secrets or .env files
7. **DO NOT** introduce new dependencies without justification
8. **DO NOT** rewrite working code unnecessarily
9. **DO NOT** claim success without verification
10. **DO NOT** ignore existing architecture patterns

---

## ✅ ALWAYS Do This

1. **ALWAYS** read `AGENTS.md` before backend work
2. **ALWAYS** use Server Actions (not API routes)
3. **ALWAYS** validate inputs with Zod
4. **ALWAYS** check authorization in privileged actions
5. **ALWAYS** handle errors gracefully
6. **ALWAYS** use TypeScript strict mode
7. **ALWAYS** test changes manually
8. **ALWAYS** run build before claiming done
9. **ALWAYS** respect existing patterns
10. **ALWAYS** ask before architectural changes

---

## 🎯 Success Criteria

A task is complete when:
- ✅ Requirement fully implemented
- ✅ Follows architecture rules (`AGENTS.md`)
- ✅ TypeScript strict + ESLint clean
- ✅ Build successful
- ✅ Manually verified in browser
- ✅ No security vulnerabilities introduced
- ✅ Performance acceptable
- ✅ Responsive design works (mobile → desktop)
- ✅ Code reviewed by self
- ✅ Important decisions documented

---

## 📚 Quick Reference

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: NextAuth.js (session-based)
- **Validation**: Zod
- **State**: Zustand (client state)
- **Animation**: Framer Motion + GSAP
- **Package Manager**: Bun

### Key Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed database
```

---

## 🤝 When Uncertain

1. **Architecture decisions** → Ask before implementing
2. **New dependencies** → Justify need first
3. **Breaking changes** → Discuss impact
4. **Security concerns** → Flag immediately
5. **Performance issues** → Profile before optimizing

---

**Remember**: Quality over speed. Professional over quick. Thoughtful over reactive.
