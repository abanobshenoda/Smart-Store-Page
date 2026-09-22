# Professional Backend Engineer

## Purpose
Build **secure, performant, and maintainable** backend logic using Next.js Server Actions following the project's mandatory architecture rules.

---

## 🚨 CRITICAL: Read This First

**Before ANY backend work**, read `website/AGENTS.md`.

### Mandatory Architecture Rules

1. ✅ **Server Actions ONLY** (`"use server"`) for ALL backend logic
2. ❌ **NO API routes** (`app/api/*`) except NextAuth (`/api/auth/[...nextauth]`)
3. ✅ **Session-based auth** via NextAuth only
4. ✅ **Authorization checks** in EVERY privileged Server Action
5. ❌ **NO client-side fetch** for mutations

**Violating these rules is NOT acceptable.**

---

## Server Actions Structure

### File Organization
```
src/server/
├── auth.ts              # Auth helpers (requireAuth, requireRole)
├── products.ts          # Product Server Actions
├── cart.ts              # Cart Server Actions
├── orders.ts            # Order Server Actions
├── checkout.ts          # Checkout Server Actions
├── admin/               # Admin-only Server Actions
│   ├── products.ts
│   ├── orders.ts
│   └── users.ts
└── pos/                 # POS Server Actions
    ├── sales.ts
    └── inventory.ts
```

### Server Action Template
```typescript
// src/server/products.ts
"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuth, requireRole } from "@/server/auth";

// 1. Define input schema
const CreateProductSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  price: z.number().positive("السعر يجب أن يكون موجب"),
  categoryId: z.string().uuid(),
  description: z.string().optional(),
  images: z.array(z.string().url()).optional(),
});

type CreateProductInput = z.infer<typeof CreateProductSchema>;

// 2. Implement Server Action
export async function createProduct(input: CreateProductInput) {
  try {
    // 3. Validate input
    const validated = CreateProductSchema.parse(input);

    // 4. Authorize (if privileged action)
    const user = await requireRole(["admin", "manager"]);

    // 5. Execute business logic
    const product = await db.products.create({
      data: {
        ...validated,
        createdBy: user.id,
      },
    });

    // 6. Return structured response
    return { 
      success: true, 
      product,
    };
  } catch (error) {
    // 7. Handle errors
    console.error("Failed to create product:", error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: "بيانات غير صحيحة",
        issues: error.issues,
      };
    }

    return { 
      success: false, 
      error: "فشل إنشاء المنتج. حاول مرة أخرى.",
    };
  }
}
```

---

## Authentication & Authorization

### Auth Helpers
```typescript
// src/server/auth.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Get current session or throw
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("غير مصرح - يجب تسجيل الدخول");
  }
  
  return session.user;
}

/**
 * Require specific role(s)
 */
export async function requireRole(roles: string[]) {
  const user = await requireAuth();
  
  if (!roles.includes(user.role)) {
    throw new Error("غير مصرح - صلاحيات غير كافية");
  }
  
  return user;
}

/**
 * Check if user owns resource
 */
export async function requireOwnership(userId: string) {
  const user = await requireAuth();
  
  if (user.id !== userId && user.role !== "admin") {
    throw new Error("غير مصرح - غير مالك المورد");
  }
  
  return user;
}
```

### Usage in Server Actions
```typescript
"use server";

export async function getMyOrders() {
  // Authentication required
  const user = await requireAuth();
  
  const orders = await db.orders.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  
  return { success: true, orders };
}

export async function deleteProduct(productId: string) {
  // Admin role required
  await requireRole(["admin"]);
  
  await db.products.delete({
    where: { id: productId },
  });
  
  return { success: true };
}

export async function updateProfile(userId: string, data: ProfileData) {
  // Ownership required
  await requireOwnership(userId);
  
  const updated = await db.users.update({
    where: { id: userId },
    data,
  });
  
  return { success: true, user: updated };
}
```

---

## Input Validation

### Zod Schemas
```typescript
import { z } from "zod";

// Product schemas
export const ProductSchema = z.object({
  name: z.string().min(3).max(100),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().uuid(),
  description: z.string().max(1000).optional(),
  images: z.array(z.string().url()).max(5).optional(),
  isActive: z.boolean().default(true),
});

// Order schemas
export const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1, "يجب إضافة منتج واحد على الأقل"),
  shippingAddress: z.string().min(10),
  paymentMethod: z.enum(["cash", "card", "wallet"]),
  notes: z.string().max(500).optional(),
});

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});
```

### Validation in Action
```typescript
"use server";

export async function createOrder(input: unknown) {
  try {
    // Validate unknown input
    const validated = CreateOrderSchema.parse(input);
    
    const user = await requireAuth();
    
    // Calculate total
    const total = validated.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    // Create order in transaction
    const order = await db.$transaction(async (tx) => {
      // 1. Create order
      const newOrder = await tx.orders.create({
        data: {
          userId: user.id,
          total,
          shippingAddress: validated.shippingAddress,
          paymentMethod: validated.paymentMethod,
          notes: validated.notes,
        },
      });
      
      // 2. Create order items
      await tx.orderItems.createMany({
        data: validated.items.map((item) => ({
          orderId: newOrder.id,
          ...item,
        })),
      });
      
      // 3. Update stock
      for (const item of validated.items) {
        await tx.products.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }
      
      return newOrder;
    });
    
    return { success: true, order };
  } catch (error) {
    console.error("Failed to create order:", error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "بيانات غير صحيحة",
        issues: error.issues,
      };
    }
    
    return {
      success: false,
      error: "فشل إنشاء الطلب. حاول مرة أخرى.",
    };
  }
}
```

---

## Database Operations

### Query Patterns
```typescript
// Get one
export async function getProduct(id: string) {
  const product = await db.products.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
    },
  });
  
  if (!product) {
    return { success: false, error: "المنتج غير موجود" };
  }
  
  return { success: true, product };
}

// Get many with filters
export async function getProducts(filters: {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const { page = 1, limit = 20, ...where } = filters;
  
  const [products, total] = await Promise.all([
    db.products.findMany({
      where: {
        categoryId: where.categoryId,
        price: {
          gte: where.minPrice,
          lte: where.maxPrice,
        },
        name: where.search
          ? { contains: where.search, mode: "insensitive" }
          : undefined,
        isActive: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.products.count({
      where: {
        categoryId: where.categoryId,
        isActive: true,
      },
    }),
  ]);
  
  return {
    success: true,
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

// Update
export async function updateProduct(
  id: string,
  data: Partial<Product>
) {
  await requireRole(["admin", "manager"]);
  
  const product = await db.products.update({
    where: { id },
    data,
  });
  
  return { success: true, product };
}

// Delete (soft delete preferred)
export async function deleteProduct(id: string) {
  await requireRole(["admin"]);
  
  // Soft delete
  await db.products.update({
    where: { id },
    data: { isActive: false, deletedAt: new Date() },
  });
  
  return { success: true };
}
```

### Transactions
```typescript
export async function transferStock(
  fromProductId: string,
  toProductId: string,
  quantity: number
) {
  await requireRole(["admin", "manager"]);
  
  const result = await db.$transaction(async (tx) => {
    // 1. Decrease stock from source
    const fromProduct = await tx.products.update({
      where: { id: fromProductId },
      data: { stock: { decrement: quantity } },
    });
    
    if (fromProduct.stock < 0) {
      throw new Error("مخزون غير كافٍ");
    }
    
    // 2. Increase stock to destination
    const toProduct = await tx.products.update({
      where: { id: toProductId },
      data: { stock: { increment: quantity } },
    });
    
    // 3. Log transaction
    await tx.stockMovements.create({
      data: {
        fromProductId,
        toProductId,
        quantity,
        type: "transfer",
      },
    });
    
    return { fromProduct, toProduct };
  });
  
  return { success: true, ...result };
}
```

---

## Performance Optimization

### 1. **Avoid N+1 Queries**
```typescript
// ❌ BAD: N+1 query
export async function getOrdersWithItems() {
  const orders = await db.orders.findMany();
  
  // This runs a query for EACH order!
  for (const order of orders) {
    order.items = await db.orderItems.findMany({
      where: { orderId: order.id },
    });
  }
  
  return orders;
}

// ✅ GOOD: Single query with include
export async function getOrdersWithItems() {
  const orders = await db.orders.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  
  return orders;
}
```

### 2. **Pagination**
```typescript
export async function getProducts(page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    db.products.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.products.count(),
  ]);
  
  return {
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: skip + limit < total,
    },
  };
}
```

### 3. **Caching**
```typescript
import { unstable_cache } from "next/cache";

// Cache categories (rarely change)
export const getCategories = unstable_cache(
  async () => {
    const categories = await db.categories.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    return categories;
  },
  ["categories"],
  {
    revalidate: 3600, // 1 hour
    tags: ["categories"],
  }
);

// Invalidate cache when data changes
export async function createCategory(data: CategoryData) {
  await requireRole(["admin"]);
  
  const category = await db.categories.create({ data });
  
  // Invalidate cache
  revalidateTag("categories");
  
  return { success: true, category };
}
```

---

## Error Handling

### Structured Error Responses
```typescript
type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; issues?: z.ZodIssue[] };

export async function createProduct(
  input: unknown
): Promise<ActionResponse<Product>> {
  try {
    const validated = ProductSchema.parse(input);
    await requireRole(["admin"]);
    
    const product = await db.products.create({ data: validated });
    
    return { success: true, data: product };
  } catch (error) {
    console.error("Create product failed:", error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "بيانات غير صحيحة",
        issues: error.issues,
      };
    }
    
    if (error instanceof Error && error.message.includes("غير مصرح")) {
      return {
        success: false,
        error: error.message,
      };
    }
    
    return {
      success: false,
      error: "فشل إنشاء المنتج",
    };
  }
}
```

---

## Security Checklist

Before deploying a Server Action:

- □ Input validated with Zod schema
- □ Authentication checked (if needed)
- □ Authorization checked (if privileged)
- □ SQL injection prevented (Drizzle/Prisma parameterized queries)
- □ Rate limiting considered (for sensitive operations)
- □ Sensitive data not exposed in response
- □ Errors logged (not exposed to client)
- □ Transaction used (for multi-step operations)

---

## Anti-Patterns (NEVER DO)

1. ❌ Create API routes for app logic (use Server Actions!)
2. ❌ Skip input validation
3. ❌ Skip authorization checks on privileged actions
4. ❌ Use raw SQL without parameterization
5. ❌ Return sensitive data to unauthorized users
6. ❌ Expose detailed error messages to client
7. ❌ Forget to use transactions for multi-step operations
8. ❌ Create N+1 queries
9. ❌ Skip logging errors
10. ❌ Trust client-provided user ID (use session!)

---

## Integration with Other Skills

- **Security Skill**: Validates all security checks
- **Database Skill**: Optimizes queries and schema
- **Frontend Skill**: Calls Server Actions from components
- **Testing Skill**: Tests Server Actions

---

## Remember

> **Server Actions ONLY - NO API routes!**
> **Validate EVERY input.**
> **Authorize EVERY privileged action.**
> **Never trust client data.**

Security is not optional. It's the foundation.
