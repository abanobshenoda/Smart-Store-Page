# Professional Frontend Engineer

## Purpose
Build **robust, performant, and maintainable** React/Next.js applications following modern best practices and patterns.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 19
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand (client state)
- **Forms**: React Hook Form + Zod validation
- **Animation**: Framer Motion + GSAP
- **Icons**: Lucide React + Heroicons

---

## Core Principles

### 1. **Server Components by Default**
```tsx
// ✅ GOOD: Server Component (default)
export default async function ProductsPage() {
  const products = await getProducts(); // Direct server call
  return <ProductList products={products} />;
}

// ❌ BAD: Unnecessary Client Component
"use client";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => { fetchProducts(); }, []);
}
```

**Rule**: Only use `"use client"` when you NEED:
- Event handlers (onClick, onChange, etc.)
- React hooks (useState, useEffect, etc.)
- Browser APIs (window, document, etc.)

### 2. **TypeScript Strict Mode**
```typescript
// ✅ GOOD: Strict typing
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

async function getProduct(id: string): Promise<Product> {
  const product = await db.products.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");
  return product;
}

// ❌ BAD: Loose typing
function getProduct(id: any): any {
  return db.products.findUnique({ where: { id } });
}
```

**Never use `any`** unless:
- Interfacing with untyped third-party library
- Explicitly documenting why in a comment

**Prefer `unknown`** when type is truly unknown:
```typescript
// ✅ GOOD: Safe unknown
function handleApiResponse(data: unknown) {
  if (isProduct(data)) {
    // TypeScript now knows data is Product
    return data.name;
  }
}

// Type guard
function isProduct(data: unknown): data is Product {
  return typeof data === "object" 
    && data !== null 
    && "id" in data 
    && "name" in data;
}
```

### 3. **Component Composition**
```tsx
// ✅ GOOD: Composable components
<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
  </CardHeader>
  <CardContent>
    <ProductDetails product={product} />
  </CardContent>
  <CardFooter>
    <AddToCartButton productId={product.id} />
  </CardFooter>
</Card>

// ❌ BAD: Monolithic component
<ProductCard 
  showHeader 
  showFooter 
  headerType="large" 
  footerButtons={["cart", "wishlist"]}
  // ... 20 more props
/>
```

---

## React Patterns

### 1. **Server Component Data Fetching**
```tsx
// app/products/page.tsx
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // Direct server call - no useEffect needed
  const products = await getProducts({
    category: searchParams.category,
  });

  return (
    <div>
      <ProductFilters />
      <ProductList products={products} />
    </div>
  );
}
```

### 2. **Client Component with Server Action**
```tsx
// components/AddToCartButton.tsx
"use client";

import { addToCart } from "@/server/cart";
import { useTransition } from "react";

export function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart(productId);
      
      if (result.success) {
        toast.success("تم الإضافة إلى السلة");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Button onClick={handleAddToCart} disabled={isPending}>
      {isPending ? "جاري الإضافة..." : "أضف إلى السلة"}
    </Button>
  );
}
```

### 3. **Form Handling**
```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProduct } from "@/server/products";

const productSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  price: z.number().positive("السعر يجب أن يكون موجب"),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    const result = await createProduct(data);
    
    if (!result.success) {
      toast.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">اسم المنتج</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "جاري الحفظ..." : "حفظ"}
      </Button>
    </form>
  );
}
```

### 4. **Custom Hooks**
```tsx
// hooks/useCart.ts
import { create } from "zustand";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  
  clearCart: () => set({ items: [] }),
}));
```

### 5. **Loading & Error States**
```tsx
// app/products/[id]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails id={params.id} />
    </Suspense>
  );
}

async function ProductDetails({ id }: { id: string }) {
  const product = await getProduct(id);
  
  if (!product) {
    notFound(); // Shows app/not-found.tsx
  }

  return <div>{/* Product details */}</div>;
}
```

---

## Performance Optimization

### 1. **Memoization**
```tsx
import { useMemo, useCallback } from "react";

function ProductList({ products, filters }: Props) {
  // Memoize expensive computations
  const filteredProducts = useMemo(() => {
    return products.filter((p) => 
      p.category === filters.category
    );
  }, [products, filters.category]);

  // Memoize callbacks passed to children
  const handleAddToCart = useCallback((id: string) => {
    addToCart(id);
  }, []);

  return (
    <div>
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
```

### 2. **Code Splitting**
```tsx
import dynamic from "next/dynamic";

// Lazy load heavy components
const AdminDashboard = dynamic(() => import("./AdminDashboard"), {
  loading: () => <Skeleton className="h-screen" />,
  ssr: false, // Disable SSR if component uses browser APIs
});

// Conditional loading
{isAdmin && <AdminDashboard />}
```

### 3. **Image Optimization**
```tsx
import Image from "next/image";

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  priority={isAboveFold} // LCP optimization
  placeholder="blur"
  blurDataURL={product.blurDataURL}
/>
```

### 4. **React Compiler Optimization**
```tsx
// React 19 automatically optimizes re-renders
// No need for React.memo in most cases

// Only use React.memo for expensive pure components
export default React.memo(ExpensiveChart);
```

---

## State Management

### 1. **Local State (useState)**
For component-specific state:
```tsx
const [isOpen, setIsOpen] = useState(false);
const [selectedSize, setSelectedSize] = useState<Size>("M");
```

### 2. **Global State (Zustand)**
For app-wide state:
```tsx
// stores/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
    }),
    { name: "cart-storage" }
  )
);
```

### 3. **Server State (Server Components)**
For data from database:
```tsx
// Prefer Server Components over client-side fetching
async function ProductPage() {
  const products = await getProducts(); // Server-side
  return <ProductList products={products} />;
}
```

### 4. **Form State (React Hook Form)**
For complex forms:
```tsx
const { register, handleSubmit, watch, formState } = useForm();
```

---

## Error Handling

### 1. **Error Boundaries**
```tsx
// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">حدث خطأ</h2>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={reset}>حاول مرة أخرى</Button>
    </div>
  );
}
```

### 2. **Try-Catch in Server Actions**
```tsx
"use server";

export async function createOrder(data: OrderData) {
  try {
    const order = await db.orders.create({ data });
    return { success: true, order };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { 
      success: false, 
      error: "فشل إنشاء الطلب. حاول مرة أخرى." 
    };
  }
}
```

---

## Testing Checklist

Before considering a component complete:

### Functionality
- □ Component renders without errors
- □ All interactive elements work
- □ Server Actions called correctly
- □ Form validation works
- □ Error states handled

### Performance
- □ No unnecessary re-renders (React DevTools)
- □ Images optimized
- □ Heavy components lazy loaded
- □ No console warnings

### Responsive Design
- □ Works on mobile (320px+)
- □ Works on tablet (768px+)
- □ Works on desktop (1024px+)
- □ Touch targets large enough (44x44px)

### Accessibility
- □ Keyboard navigation works
- □ Focus indicators visible
- □ ARIA labels present
- □ Alt text on images

### TypeScript
- □ No `any` types (without documentation)
- □ Props interface defined
- □ Return types explicit

---

## Common Patterns

### 1. **Optimistic Updates**
```tsx
"use client";

import { useOptimistic } from "react";
import { addToCart } from "@/server/cart";

export function CartButton({ productId }: Props) {
  const [optimisticCart, addOptimisticItem] = useOptimistic(
    cart,
    (state, newItem) => [...state, newItem]
  );

  const handleAdd = async () => {
    addOptimisticItem({ id: productId, quantity: 1 });
    await addToCart(productId);
  };

  return <Button onClick={handleAdd}>Add to Cart</Button>;
}
```

### 2. **Infinite Scroll**
```tsx
"use client";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function ProductList({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async () => {
    const newProducts = await getProducts({ page: page + 1 });
    setProducts([...products, ...newProducts]);
    setPage(page + 1);
  };

  return (
    <div>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
      <div ref={ref}>Loading...</div>
    </div>
  );
}
```

### 3. **Modal Dialog**
```tsx
"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export function ProductModal({ product, open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div>{/* Product details */}</div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Anti-Patterns (NEVER DO)

1. ❌ Use `"use client"` unnecessarily
2. ❌ Fetch data with useEffect when Server Component works
3. ❌ Use `any` type without documented reason
4. ❌ Create API routes (use Server Actions!)
5. ❌ Forget error handling
6. ❌ Skip loading states
7. ❌ Mutate props
8. ❌ Use index as key in mapped arrays
9. ❌ Forget to cleanup effects
10. ❌ Skip TypeScript checks with `@ts-ignore`

---

## Integration with Other Skills

- **UI Design Skill**: Provides design guidelines
- **Backend Skill**: Implements Server Actions
- **Security Skill**: Validates inputs + authorization
- **Performance Skill**: Optimizes rendering
- **Testing Skill**: Writes component tests

---

## Remember

> **Server Components by default, Client Components when needed.**
> **TypeScript strict mode is non-negotiable.**
> **Every component must handle loading, error, and empty states.**
> **Performance is measured, not assumed.**

Write code that is easy to read, easy to test, and easy to change.
