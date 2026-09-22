# Backend Architecture - Smart Store

## Decision: Server Actions ONLY + NextAuth Session for Auth

---

## القاعدة الأساسية

### 1. شغّل الـ Backend كله بـ Server Actions (بدون API routes)

- كل منطق الـ backend والعمليات تتم عبر **Server Actions** (ملفات بـ `"use server"`).
- **لا** تنشئ REST API routes (`app/api/...`) لمنطق التطبيق.
- يشمل: المنتجات، السلة، الطلبات، الدفع، الإدارة، POS، المخزون، العروض، البحث، المفضلة... إلخ.

### 2. الاستثناء الوحيد: الـ Auth عبر NextAuth Session

- **Authentication** هي الميزة الوحيدة اللي تستخدم NextAuth.js (Auth.js) بنظام **session**.
- الـ Auth يستخدم route handler واحد مسموح به: `app/api/auth/[...nextauth]/route.ts`.
- كل ميزات الـ backend الثانية تفضل بـ Server Actions.

---

## بنية المجلدات

```
src/
├── server/                 # Server Actions
│   ├── products.ts
│   ├── cart.ts
│   ├── orders.ts
│   ├── checkout.ts
│   ├── admin/              # إجراءات الإدارة (محمية)
│   └── pos/                # إجراءات الـ POS
├── lib/
│   └── auth.ts             # إعداد NextAuth (authOptions)
└── app/
    └── api/
        └── auth/
            └── [...nextauth]/
                └── route.ts   # الاستثناء الوحيد
```

---

## أمثلة الكود

### Server Action (منتجات)
```ts
// src/server/products.ts
"use server";

export async function getProducts(filters: SearchFilters) {
  // استعلام من قاعدة البيانات
  return products;
}

export async function createProduct(input: CreateProductInput) {
  // إضافة إلى قاعدة البيانات
}
```

### استدعاء Server Action من مكوّن عميل
```tsx
"use client";

import { addToCart } from "@/server/cart";

export function AddToCartButton({ productId }: { productId: string }) {
  return (
    <button onClick={() => addToCart(productId)}>أضف إلى السلة</button>
  );
}
```

### قراءة Session داخل Server Action
```ts
// src/server/orders.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getMyOrders() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("غير مصرح");
  }

  // اعرض طلبات المستخدم فقط
  return ordersByUser(session.user.id);
}
```

---

## قواعد صريحة

| ✅ مسموح | ❌ ممنوع |
|---------|---------|
| Server Actions لكل منطق التطبيق | REST API routes لمنطق التطبيق |
| NextAuth Session للـ Auth فقط | Custom API routes للتطبيق |
| Client بيستدعي Server Actions | Client fetch للـ mutations |
| Server Components للقراءة | Client-side mutations |
| SWR للقراءة الغير مغيّرة عند الحاجة | Relying على client fetch |

---

## الحماية (Authorization)

كل Server Action يمس بيانات admin/POS/manager يعني **بالضرورة**:
1. يقرأ الـ session عبر `getServerSession`.
2. يتحقق من دور المستخدم.
3. يرمي خطأ لو غير مصرح.

```ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireRole(roles: string[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !roles.includes(session.user.role)) {
    throw new Error("غير مصرح");
  }
  return session.user;
}
```

---

## الخلاصة
- ✅ Server Actions = كل منطق الـ backend
- ✅ NextAuth Session = الـ Auth فقط (الاستثناء الوحيد)
- ❌ لا REST API routes مخصصة لمنطق التطبيق
- ❌ لا client-side fetch للـ mutations
- ✅ الحماية مفروضة في كل Server Action عبر الـ session
