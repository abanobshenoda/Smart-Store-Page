# Professional Security Engineer

## Purpose
Ensure **application security** through proper authentication, authorization, input validation, and security best practices. Every code change must be reviewed for security vulnerabilities.

---

## Core Security Principles

### 1. **Defense in Depth**
```
Multiple layers of security:
- Authentication (who you are)
- Authorization (what you can do)
- Input validation (sanitize everything)
- Output encoding (prevent XSS)
- Database parameterized queries (prevent SQLi)
```

### 2. **Trust Nothing**
```
Never trust user input
Never trust client-side validation
Never trust environment variables (validate them)
Always verify on server side
```

---

## Authentication (NextAuth.js)

### Setup
```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("بيانات غير كاملة");
        }

        const user = await db.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("بيانات غير صحيحة");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("بيانات غير صحيحة");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
```

### Session Check in Server Actions
```typescript
// src/server/auth.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("غير مصرح - يجب تسجيل الدخول");
  }
  
  return session.user;
}

export async function requireRole(roles: string[]) {
  const user = await requireAuth();
  
  if (!roles.includes(user.role)) {
    throw new Error("غير مصرح - صلاحيات غير كافية");
  }
  
  return user;
}
```

---

## Authorization (RBAC)

### Role Definitions
```typescript
// Roles hierarchy
const ROLES = {
  ADMIN: ["manage_users", "manage_products", "manage_orders", "view_analytics"],
  MANAGER: ["manage_products", "manage_orders", "view_analytics"],
  EMPLOYEE: ["view_products", "process_orders"],
  CUSTOMER: ["view_products", "create_orders", "manage_own_account"],
} as const;

type Role = keyof typeof ROLES;

// Permission check
export function hasPermission(role: Role, permission: string) {
  return ROLES[role]?.includes(permission) ?? false;
}
```

### Protecting Server Actions
```typescript
"use server";

export async function deleteProduct(productId: string) {
  // 1. Require admin role
  const user = await requireRole(["admin"]);
  
  // 2. Verify product exists
  const product = await db.products.findUnique({
    where: { id: productId },
  });
  
  if (!product) {
    return { success: false, error: "المنتج غير موجود" };
  }
  
  // 3. Delete (or soft delete)
  await db.products.update({
    where: { id: productId },
    data: { deletedAt: new Date() },
  });
  
  return { success: true };
}
```

---

## Input Validation (Zod)

### Always Validate
```typescript
import { z } from "zod";

// ❌ BAD: Trust client input directly
export async function createProduct(data: any) {
  const product = await db.products.create({
    data: {
      name: data.name, // Unvalidated!
      price: data.price, // Unvalidated!
    },
  });
}

// ✅ GOOD: Validate with Zod
const CreateProductSchema = z.object({
  name: z.string()
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .max(100, "الاسم طويل جداً"),
  price: z.number()
    .positive("السعر يجب أن يكون موجب")
    .max(1000000, "السعر مرتفع جداً"),
  description: z.string()
    .max(1000, "الوصف طويل جداً")
    .optional(),
});

export async function createProduct(data: unknown) {
  // Validate first
  const validated = CreateProductSchema.parse(data);
  
  const product = await db.products.create({
    data: validated,
  });
  
  return { success: true, product };
}
```

### Common Validation Patterns
```typescript
// Email validation
const emailSchema = z.string().email("بريد إلكتروني غير صالح");

// Password validation
const passwordSchema = z
  .string()
  .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
  .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير")
  .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير")
  .regex(/[0-9]/, "يجب أن تحتوي على رقم");

// UUID validation
const uuidSchema = z.string().uuid("معرف غير صالح");

// Phone validation (Egypt)
const phoneSchema = z
  .string()
  .regex(/^01[0125][0-9]{8}$/, "رقم هاتف غير صالح");
```

---

## SQL Injection Prevention

### Always Use Parameterized Queries
```typescript
// ✅ GOOD: Drizzle ORM uses parameterized queries
const products = await db
  .select()
  .from(productsTable)
  .where(eq(productsTable.categoryId, categoryId));

// ✅ GOOD: Raw SQL with parameters
const result = await db.execute(
  sql`SELECT * FROM products WHERE category_id = ${categoryId}`
);

// ❌ BAD: String interpolation (SQL injection!)
const query = `SELECT * FROM products WHERE category_id = '${categoryId}'`;
const products = await db.execute(query);
```

---

## XSS Prevention

### React Escapes by Default
```typescript
// React automatically escapes content
function Component() {
  const userInput = "<script>alert('xss')</script>";
  
  // ✅ SAFE: React escapes this
  return <div>{userInput}</div>;
  
  // ❌ DANGEROUS: Never do this
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}
```

### When Using dangerouslySetInnerHTML
```typescript
// If you MUST use it (rarely needed)
import DOMPurify from "isomorphic-dompurify";

function SafeHTML({ html }: { html: string }) {
  // Always sanitize first
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p"],
    ALLOWED_ATTR: [],
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

---

## CSRF Protection

### Next.js Built-in
Next.js automatically provides CSRF protection for:
- Server Actions
- API routes

**Never disable CSRF protection.**

---

## Rate Limiting

### For Sensitive Operations
```typescript
import { ratelimit } from "@/lib/ratelimit";

export async function loginAction(formData: FormData) {
  // Rate limit: 5 attempts per minute
  const { success } = await ratelimit.limit(formData.get("email") as string);
  
  if (!success) {
    return { error: "تجاوزت الحد المسموح. حاول لاحقاً." };
  }
  
  // ... login logic
}
```

---

## Environment Variables

### Never Expose Secrets
```typescript
// ❌ BAD: Accessing without validation
const apiKey = process.env.STRIPE_SECRET_KEY;

// ✅ GOOD: Validate on startup
const config = {
  stripeKey: process.env.STRIPE_SECRET_KEY ?? (() => {
    throw new Error("STRIPE_SECRET_KEY is required");
  })(),
};
```

### .env File Pattern
```
# .env.local (NEVER commit this!)
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# .env.example (OK to commit)
DATABASE_URL=postgresql://user:pass@localhost/db
NEXTAUTH_SECRET=your-secret-here
```

---

## Security Checklist

Before deploying ANY feature:

### Authentication
- □ Login uses secure password hashing (bcrypt)
- □ Session expires appropriately
- □ Password reset is secure
- □ OAuth providers properly configured

### Authorization
- □ Every privileged action checks user role
- □ Users can only access their own data
- □ Admin actions require admin role

### Input Validation
- □ All inputs validated with Zod
- □ Invalid input returns helpful error
- □ No SQL injection possible
- □ No XSS possible

### Data Protection
- □ Sensitive data not logged
- □ Secrets not in error messages
- □ API keys not exposed

### Rate Limiting
- □ Login attempts limited
- □ API calls limited
- □ File upload size limited

---

## Common Vulnerabilities

### 1. IDOR (Insecure Direct Object Reference)
```typescript
// ❌ BAD: User can access any order
export async function getOrder(orderId: string) {
  return await db.orders.findUnique({ where: { id: orderId } });
}

// ✅ GOOD: Verify ownership
export async function getOrder(orderId: string) {
  const user = await requireAuth();
  
  const order = await db.orders.findUnique({ 
    where: { id: orderId } 
  });
  
  if (!order) {
    throw new Error("الطلب غير موجود");
  }
  
  // Verify ownership
  if (order.userId !== user.id && user.role !== "admin") {
    throw new Error("غير مصرح");
  }
  
  return order;
}
```

### 2. Missing Authorization
```typescript
// ❌ BAD: No role check
export async function deleteUser(userId: string) {
  await db.users.delete({ where: { id: userId } });
}

// ✅ GOOD: Admin only
export async function deleteUser(userId: string) {
  await requireRole(["admin"]);
  await db.users.delete({ where: { id: userId } });
}
```

### 3. Information Disclosure
```typescript
// ❌ BAD: Expose internal errors
catch (error) {
  return { error: error.stack }; // Exposes stack trace!
}

// ✅ GOOD: Generic error message
catch (error) {
  console.error("Delete failed:", error);
  return { error: "فشل حذف المستخدم" };
}
```

---

## Anti-Patterns (NEVER DO)

1. ❌ Skip authorization checks
2. ❌ Skip input validation
3. ❌ Use `any` type (lose type safety)
4. ❌ Store passwords in plain text
5. ❌ Expose secrets in error messages
6. ❌ Use string interpolation in SQL
7. ❌ Disable CSRF protection
8. ❌ Skip rate limiting on sensitive endpoints
9. ❌ Trust client-side validation only
10. ❌ Skip HTTPS in production

---

## Integration with Other Skills

- **Backend Skill**: Implements auth checks in Server Actions
- **Database Skill**: Ensures data integrity
- **Frontend Skill**: Uses auth in components

---

## Remember

> **Security is not optional.**
> **Verify everything on the server.**
> **Never trust user input.**
> **Defense in depth.**
> **When in doubt, be strict.**

A single security vulnerability can compromise your entire application.