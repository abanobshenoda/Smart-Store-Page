# Professional Database Engineer

## Purpose
Design, implement, and optimize **PostgreSQL databases** using Drizzle ORM with proper schema design, migrations, and query optimization.

---

## Database Stack

- **Database**: PostgreSQL (Neon, Supabase, or local)
- **ORM**: Drizzle ORM
- **Migrations**: Drizzle Kit
- **Client**: @neondatabase/serverless

---

## Schema Design Principles

### 1. **Normalization**
```typescript
// ✅ GOOD: Normalized schema
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: integer("price").notNull(), // cents
  categoryId: uuid("category_id").references(() => categories.id),
  brandId: uuid("brand_id").references(() => brands.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Proper relations
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  orderItems: many(orderItems),
}));
```

### 2. **Data Types**
```typescript
// Use appropriate PostgreSQL types
export const users = pgTable("users", {
  // UUID for primary keys
  id: uuid("id").primaryKey().defaultRandom(),
  
  // TEXT for strings (no length limit issues)
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  
  // INTEGER for money (store in cents to avoid floating point)
  balance: integer("balance").default(0),
  
  // BOOLEAN for flags
  isActive: boolean("is_active").default(true),
  
  // TIMESTAMP for dates
  createdAt: timestamp("created_at").defaultNow(),
  
  // JSONB for flexible data
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  
  // ENUM for fixed options
  role: userRoleEnum("role").default("customer"),
  
  // UUID for foreign keys
  referrerId: uuid("referrer_id").references(() => users.id),
});
```

---

## Relationships

### 1:1 (One to One)
```typescript
// User has one profile
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().unique(),
  bio: text("bio"),
  avatar: text("avatar"),
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
    relationName: "profile",
  }),
}));

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
    relationName: "profile",
  }),
}));
```

### 1:N (One to Many)
```typescript
// Category has many products
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  parentId: uuid("parent_id").references(() => categories.id), // self-referencing
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "subcategories",
  }),
  subcategories: many(categories, {
    relationName: "subcategories",
  }),
  products: many(products),
}));
```

### N:M (Many to Many)
```typescript
// Products have many tags through junction table
export const productTags = pgTable("product_tags", {
  productId: uuid("product_id").notNull(),
  tagId: uuid("tag_id").notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.productId, t.tagId] }),
}));

export const productTagsRelations = relations(productTags, ({ one }) => ({
  product: one(products, {
    fields: [productTags.productId],
    references: [products.id],
  }),
  tag: one(tags, {
    fields: [productTags.tagId],
    references: [tags.id],
  }),
}));
```

---

## Indexes

### When to Create Indexes
```typescript
// ✅ Index on frequently queried columns
export const products = pgTable("products", {
  // ... columns
  categoryId: uuid("category_id").references(() => categories.id),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  // Index for category filtering
  categoryIdIdx: index("idx_products_category_id").on(table.categoryId),
  // Index for price range queries
  priceIdx: index("idx_products_price").on(table.price),
  // Composite index for common queries
  categoryPriceIdx: index("idx_products_category_price")
    .on(table.categoryId, table.price),
  // Index for sorting
  createdAtIdx: index("idx_products_created_at").on(table.createdAt),
}));
```

### Index Types
```typescript
export const orders = pgTable("orders", {
  // ... columns
  userId: uuid("user_id").notNull(),
  status: text("status").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  // B-tree index (default, for =, <, >, <=, >=)
  userIdIdx: index("idx_orders_user_id").on(table.userId),
  
  // Partial index (only active orders)
  activeOrdersIdx: index("idx_orders_active")
    .on(table.userId, table.status)
    .where(eq(table.status, "active")),
  
  // Composite index for complex queries
  userStatusCreatedIdx: index("idx_orders_user_status_created")
    .on(table.userId, table.status, table.createdAt),
}));
```

---

## Migrations

### Creating Migrations
```bash
# Generate migration from schema changes
npm run db:generate

# Apply migrations
npm run db:migrate

# Push schema (dev only)
npm run db:push

# Open Drizzle Studio
npm run db:studio
```

### Migration Best Practices
```typescript
// ✅ GOOD: Safe migration
export const migrations = {
  up: async () => {
    // Add column with default
    await db.schema.alterTable("products")
      .addColumn("isActive", boolean("is_active").default(true))
      .execute();
    
    // Add index
    await db.schema.alterTable("products")
      .addIndex("idx_products_is_active")
      .on("is_active")
      .execute();
  },
  down: async () => {
    await db.schema.alterTable("products")
      .dropIndex("idx_products_is_active")
      .execute();
    
    await db.schema.alterTable("products")
      .dropColumn("is_active")
      .execute();
  },
};
```

---

## Query Optimization

### 1. **Select Only Needed Columns**
```typescript
// ❌ BAD: Selects all columns
const products = await db.select().from(productsTable);

// ✅ GOOD: Select only needed columns
const products = await db
  .select({
    id: productsTable.id,
    name: productsTable.name,
    price: productsTable.price,
  })
  .from(productsTable);
```

### 2. **Use Include/Joins**
```typescript
// ❌ BAD: N+1 query
const products = await db.select().from(productsTable);
for (const product of products) {
  const category = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.id, product.categoryId));
  product.category = category;
}

// ✅ GOOD: Single query with join
const products = await db
  .select({
    id: productsTable.id,
    name: productsTable.name,
    categoryName: categoriesTable.name,
  })
  .from(productsTable)
  .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id));
```

### 3. **Pagination**
```typescript
export async function getProducts(page: number, limit: number) {
  const offset = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    db
      .select()
      .from(productsTable)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(productsTable.createdAt)),
    db
      .select({ count: count() })
      .from(productsTable),
  ]);
  
  return {
    data,
    total: total[0].count,
    page,
    totalPages: Math.ceil(total[0].count / limit),
  };
}
```

### 4. **Use WHERE Clauses Effectively**
```typescript
// ✅ GOOD: Filter early
const activeProducts = await db
  .select()
  .from(productsTable)
  .where(and(
    eq(productsTable.isActive, true),
    gte(productsTable.price, minPrice),
    lte(productsTable.price, maxPrice)
  ));

// ❌ BAD: Fetch all, filter in JavaScript
const allProducts = await db.select().from(productsTable);
const filtered = allProducts.filter(p => p.isActive);
```

---

## Transactions

```typescript
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function createOrderWithItems(
  userId: string,
  items: OrderItem[],
  total: number
) {
  return await db.transaction(async (tx) => {
    // 1. Create order
    const [order] = await tx
      .insert(ordersTable)
      .values({
        userId,
        total,
        status: "pending",
      })
      .returning();
    
    // 2. Create order items
    await tx
      .insert(orderItemsTable)
      .values(
        items.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      );
    
    // 3. Update product stock
    for (const item of items) {
      await tx
        .update(productsTable)
        .set({
          stock: sql`${productsTable.stock} - ${item.quantity}`,
        })
        .where(eq(productsTable.id, item.productId));
    }
    
    return order;
  });
}
```

---

## Soft Deletes

```typescript
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  isActive: boolean("is_active").default(true),
  deletedAt: timestamp("deleted_at"),
});

// Always filter out deleted records
export async function getActiveProducts() {
  return await db
    .select()
    .from(productsTable)
    .where(isNull(productsTable.deletedAt));
}

// Soft delete function
export async function softDeleteProduct(id: string) {
  return await db
    .update(productsTable)
    .set({ 
      isActive: false,
      deletedAt: new Date() 
    })
    .where(eq(productsTable.id, id));
}
```

---

## Seed Data

```typescript
// scripts/seed.ts
import { db } from "@/lib/db";
import { categoriesTable, productsTable } from "@/lib/db/schema";

async function seed() {
  console.log("🌱 Seeding database...");
  
  // Create categories
  const [electronics] = await db
    .insert(categoriesTable)
    .values({
      name: "إلكترونيات",
      slug: "electronics",
    })
    .onConflictDoNothing()
    .returning();
  
  // Create products
  await db.insert(productsTable).values([
    {
      name: "آيفون 15 برو",
      description: "أحدث آيفون من آبل",
      price: 55000_00, // in cents
      categoryId: electronics.id,
      stock: 100,
    },
    // ... more products
  ]);
  
  console.log("✅ Seeding complete!");
}

seed().catch(console.error);
```

---

## Database Checklist

Before deploying:

- □ Primary keys use UUID
- □ Foreign keys have proper constraints
- □ Indexes on frequently queried columns
- □ Appropriate data types (INTEGER for money)
- □ Soft deletes for important tables
- □ Timestamps (createdAt, updatedAt)
- □ Migrations tested on staging
- □ Queries use proper WHERE clauses (not JavaScript filtering)
- □ Transactions for multi-step operations
- □ Connection pooling configured

---

## Performance Monitoring

### EXPLAIN Queries
```typescript
// Use Drizzle's explain for debugging
const result = await db
  .select()
  .from(productsTable)
  .where(eq(productsTable.categoryId, categoryId))
  .explain("verbose");

console.log(result);
```

### Common Performance Issues
1. **N+1 Queries**: Use `.include()` or joins
2. **Missing Indexes**: Add indexes on WHERE/JOIN columns
3. **Large SELECT**: Only select needed columns
4. **No Pagination**: Always paginate large datasets
5. **Full Table Scans**: Check EXPLAIN output

---

## Anti-Patterns (NEVER DO)

1. ❌ Use MySQL/MongoDB instead of PostgreSQL (for relational data)
2. ❌ Skip foreign key constraints
3. ❌ Store money as FLOAT/DECIMAL (use INTEGER in cents)
4. ❌ Use TEXT for everything (use proper types)
5. ❌ Skip indexes on WHERE columns
6. ❌ Fetch all data and filter in JavaScript
7. ❌ Skip soft deletes (hard delete important data)
8. ❌ Run migrations on production without testing
9. ❌ Skip connection pooling
10. ❌ Ignore N+1 query problems

---

## Integration with Other Skills

- **Backend Skill**: Uses database in Server Actions
- **Security Skill**: Validates data integrity
- **Performance Skill**: Optimizes slow queries

---

## Remember

> **Normalize your schema.**
> **Index what you query.**
> **Filter in SQL, not JavaScript.**
> **Transactions protect your data.**
> **Always test migrations first.**

A well-designed database is the foundation of a performant application.