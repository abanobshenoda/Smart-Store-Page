# Performance Engineer

## Purpose
Optimize **application performance** by identifying bottlenecks, reducing load times, and ensuring smooth user experience (60fps).

---

## Performance Metrics

### Core Web Vitals
```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms  
CLS (Cumulative Layout Shift): < 0.1
```

### Other Key Metrics
```
TTFB (Time to First Byte): < 600ms
FCP (First Contentful Paint): < 1.8s
TTI (Time to Interactive): < 3.8s
```

---

## Frontend Optimization

### 1. **Image Optimization**
```typescript
// ✅ GOOD: Optimized Next.js Image
import Image from "next/image";

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveTheFold} // Load immediately for LCP
  placeholder="blur"
  blurDataURL={product.blurDataURL}
/>

// ❌ BAD: Unoptimized img tag
<img src={product.image} alt={product.name} />
```

### 2. **Code Splitting**
```typescript
// Lazy load heavy components
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <Skeleton className="h-[400px]" />,
  ssr: false, // Disable SSR for browser-only
});

// Conditional loading
{showAdmin && <AdminDashboard />}
```

### 3. **Reduce Bundle Size**
```typescript
// ❌ BAD: Import entire library
import { debounce } from "lodash";

// ✅ GOOD: Import only what you need
import debounce from "lodash/debounce";

// Or use native methods
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
```

### 4. **Memoization**
```typescript
import { useMemo, useCallback } from "react";

// Memoize expensive computations
const filteredProducts = useMemo(() => {
  return products
    .filter(p => p.category === filter)
    .sort((a, b) => b.price - a.price);
}, [products, filter]);

// Memoize callbacks
const handleAddToCart = useCallback((id: string) => {
  addToCart(id);
}, [addToCart]);
```

---

## Backend Optimization

### 1. **Avoid N+1 Queries**
```typescript
// ❌ BAD: N+1 query
const orders = await db.orders.findMany();
for (const order of orders) {
  order.items = await db.orderItems.findMany({
    where: { orderId: order.id },
  });
}

// ✅ GOOD: Single query with include
const orders = await db.orders.findMany({
  include: {
    items: {
      include: { product: true },
    },
    user: {
      select: { id: true, name: true },
    },
  },
});
```

### 2. **Pagination**
```typescript
export async function getProducts(page = 1, limit = 20) {
  const [products, total] = await Promise.all([
    db.products.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.products.count(),
  ]);
  
  return {
    products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}
```

### 3. **Caching**
```typescript
import { unstable_cache } from "next/cache";

// Cache expensive, rarely-changing data
export const getCategories = unstable_cache(
  async () => {
    return await db.categories.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  },
  ["categories"],
  { revalidate: 3600 } // 1 hour
);

// Invalidate cache on data change
export async function createCategory(data: CategoryData) {
  const category = await db.categories.create({ data });
  revalidateTag("categories"); // Clear cache
  return category;
}
```

### 4. **Database Indexes**
```typescript
// Add indexes for frequently queried columns
export const products = pgTable("products", {
  // ... columns
}, (table) => ({
  categoryIdIdx: index("idx_products_category").on(table.categoryId),
  priceIdx: index("idx_products_price").on(table.price),
  createdAtIdx: index("idx_products_created").on(table.createdAt),
}));
```

---

## React Optimization

### 1. **Server Components**
```tsx
// ✅ Default to Server Components
// app/products/page.tsx
export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductList products={products} />; // No "use client" needed
}

// ❌ Only use client when needed
"use client";
function ProductList() {
  const [filter, setFilter] = useState("");
  // Client-side state/interactivity
}
```

### 2. **Streaming**
```tsx
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <div>
      <ProductHeader />
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={params.id} />
      </Suspense>
    </div>
  );
}
```

---

## Network Optimization

### 1. **Preload Critical Resources**
```tsx
// In next/head or metadata
export const metadata = {
  other: {
    "preload-image": "/hero-product.jpg",
  },
};
```

### 2. **Prefetch Pages**
```tsx
// Next.js automatically prefetches link targets
// Just use <Link> properly
import Link from "next/link";

<Link href="/products" prefetch={true}>
  Shop Now
</Link>
```

---

## Profiling

### Chrome DevTools
```
1. Open DevTools (F12)
2. Performance tab
3. Start recording
4. Perform action
5. Analyze:
   - Long tasks (>50ms)
   - Large recalculations
   - Network bottlenecks
```

### React DevTools
```
1. Install React DevTools
2. Components tab
3. Check why components re-render
4. Highlight updates during interaction
```

---

## Checklist

Before considering performance done:

- □ Images use Next.js Image with proper sizes
- □ Heavy components lazy loaded
- □ No N+1 queries (use include/joins)
- □ Pagination on large datasets
- □ Caching for rarely-changing data
- □ Server Components used by default
- ✅ Build passes without warnings
- ✅ No console errors

---

## Remember

> **Measure before optimizing.**
> **Focus on the biggest impact first.**
> **60fps is the goal.**
> **Mobile performance matters.**

Performance is a feature, not an afterthought.