# Software Architecture Engineer

## Purpose
Design **scalable, maintainable, and well-structured** software architecture following SOLID principles and modern best practices.

---

## Core Principles

### 1. **SOLID Principles**
```
S - Single Responsibility: One class/function does one thing
O - Open/Closed: Open for extension, closed for modification
L - Liskov Substitution: Subtypes must be substitutable
I - Interface Segregation: Many small interfaces > one big
D - Dependency Inversion: Depend on abstractions, not concretions
```

### 2. **Clean Architecture Layers**
```
┌─────────────────────────────────────┐
│  Presentation (Components, Pages)  │
├─────────────────────────────────────┤
│  Application (Server Actions)      │
├─────────────────────────────────────┤
│  Domain (Business Logic, Types)    │
├─────────────────────────────────────┤
│  Infrastructure (DB, Auth, APIs)   │
└─────────────────────────────────────┘
```

### 3. **Project Structure**
```
src/
├── app/                    # Next.js pages
│   ├── (shop)/            # Route groups
│   │   ├── page.tsx
│   │   └── [slug]/
│   └── api/               # NextAuth only
│
├── components/            # UI components
│   ├── ui/               # Base (shadcn)
│   ├── layout/           # Header, Footer
│   └── features/         # Feature components
│
├── server/               # Server Actions
│   ├── products.ts
│   ├── cart.ts
│   └── admin/
│
├── lib/                  # Infrastructure
│   ├── db/              # Drizzle schema
│   ├── auth.ts          # NextAuth config
│   └── utils.ts         # Helpers
│
├── hooks/               # Custom hooks
├── types/               # TypeScript types
└── styles/              # Global CSS
```

---

## Design Patterns

### 1. **Repository Pattern**
```typescript
// Instead of direct db calls in components
// src/lib/repositories/productRepository.ts
export const productRepository = {
  async findById(id: string) {
    return await db.products.findUnique({ where: { id } });
  },

  async findByCategory(categoryId: string, options: QueryOptions) {
    return await db.products.findMany({
      where: { categoryId },
      ...options,
    });
  },

  async create(data: CreateProductInput) {
    return await db.products.create({ data });
  },

  async update(id: string, data: UpdateProductInput) {
    return await db.products.update({ where: { id }, data });
  },
};
```

### 2. **Factory Pattern**
```typescript
// Create different types of objects
function createOrder(type: "online" | "pos", data: OrderData) {
  switch (type) {
    case "online":
      return new OnlineOrder(data);
    case "pos":
      return new POSOrder(data);
  }
}
```

### 3. **Strategy Pattern**
```typescript
// Different algorithms, same interface
interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
}

const paymentStrategies: Record<string, PaymentStrategy> = {
  cash: new CashPayment(),
  card: new CardPayment(),
  wallet: new WalletPayment(),
};

async function processPayment(
  method: string,
  amount: number
) {
  const strategy = paymentStrategies[method];
  if (!strategy) throw new Error("Invalid payment method");
  return await strategy.pay(amount);
}
```

---

## Architecture Decisions

### When to Create New Components

**Do create new components when:**
- ✅ Reusable across multiple pages
- ✅ Clear single responsibility
- ✅ Follows existing design patterns
- ✅ Has well-defined props interface

**Don't create new components when:**
- ❌ Only used once
- ❌ Unnecessarily complex
- ❌ Duplicates existing functionality
- ❌ Premature abstraction

### When to Create New Server Actions

**Do create new Server Actions when:**
- ✅ New business logic needed
- ✅ Reusable across components
- ✅ Clear input/output contract

**Don't create new Server Actions when:**
- ❌ Simple data fetch (use Server Component instead)
- ❌ Only used in one component
- ❌ Duplicates existing action

### When to Refactor

**Consider refactoring when:**
- ✅ Duplicate code appears 3+ times
- ✅ Function is too large (>100 lines)
- ✅ Too many parameters (>5)
- ✅ Deeply nested callbacks
- ✅ Hard to test

**Don't refactor when:**
- ❌ Code works and is clear
- ❌ No immediate need
- ❌ Risk of breaking something

---

## Code Organization

### Feature-Based Structure
```
src/
├── features/
│   ├── products/
│   │   ├── components/
│   │   ├── server/
│   │   ├── hooks/
│   │   └── types/
│   ├── cart/
│   └── orders/
```

### Shared vs Feature Code
```
Shared (src/components/ui/):
- Button, Input, Card, Modal
- Form components
- Layout components

Feature-specific (src/features/...):
- ProductCard, ProductList
- CartItem, CartSummary
- OrderDetails, OrderTimeline
```

---

## Performance Architecture

### Server vs Client Decisions
```
Server Components (default):
- Data fetching
- Static content
- SEO-critical pages
- Large dependencies

Client Components (use client):
- Interactivity
- Real-time updates
- Browser APIs
- Animations
```

### Caching Strategy
```
┌────────────────────────────────────────────┐
│  Cache Layer                               │
├────────────────────────────────────────────┤
│  Request Memoization (same-request)        │
│  Data Cache (revalidate tag/time)          │
│  Full Route Cache (static generation)      │
│  Router Cache (prefetched segments)        │
└────────────────────────────────────────────┘
```

---

## Anti-Patterns (NEVER DO)

1. ❌ Create unnecessary folder structure
2. ❌ Premature optimization
3. ❌ Over-abstraction (factories, builders when not needed)
4. ❌ Mix concerns in same file
5. ❌ Skip existing patterns
6. ❌ Create "util" files for everything
7. ❌ Duplicate code instead of extracting
8. ❌ Tight coupling between layers

---

## Remember

> **Premature abstraction is the root of all evil.**
> **Follow existing patterns.**
> **Simplicity over complexity.**
> **YAGNI: You aren't gonna need it.**

Architecture should enable, not complicate.