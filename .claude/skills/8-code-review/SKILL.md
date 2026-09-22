# Professional Code Review

## Purpose
Review code for **correctness, security, performance, and maintainability** before considering any task complete.

---

## Self-Review Checklist

Before claiming any work is done, verify:

### Correctness
- □ Code does what it's supposed to do
- □ Edge cases handled
- □ Error cases handled
- □ No logical errors
- □ Types are correct

### Security
- □ Input validation present
- □ Authorization checks present
- □ No SQL injection possible
- □ No sensitive data exposed
- □ Secrets not in code

### Performance
- □ No N+1 queries
- □ Lazy loading where appropriate
- □ Images optimized
- □ No unnecessary re-renders

### Maintainability
- □ Clean code structure
- □ No duplicate code
- □ Variables named well
- □ Comments where needed
- □ Follows project patterns

### Testing
- □ Manual test passed
- □ No console errors
- □ Build passes
- □ Lint passes

---

## Review Process

### 1. Read the Code
```bash
# Read the files you changed
# Understand the full picture
```

### 2. Check Requirements
```
- Did I implement what was asked?
- Did I miss anything?
- Are there edge cases?
```

### 3. Run Checks
```bash
# TypeScript
npm run build

# ESLint
npm run lint

# Manual test in browser
npm run dev
```

### 4. Review Security
```
- Input validation?
- Authorization?
- Data exposure?
```

---

## Common Issues to Catch

### TypeScript Issues
```typescript
// ❌ BAD: any type
const data: any = getData();

// ✅ GOOD: proper type
const data: Product[] = await getProducts();

// ❌ BAD: implicit any
function processData(data) { }  // Parameter 'data' implicitly has 'any' type

// ✅ GOOD: explicit types
function processData(data: ProductData): Promise<void> { }
```

### React Issues
```typescript
// ❌ BAD: Missing dependency
useEffect(() => {
  fetchData();
}, []); // Missing dependencies

// ✅ GOOD: Complete dependencies
useEffect(() => {
  fetchData();
}, [userId]);

// ❌ BAD: Unnecessary client component
"use client";
function ProductList({ products }: Props) {
  return <div>{products.map(p => <div key={p.id}>{p.name}</div>)}</div>;
}

// ✅ GOOD: Server component
function ProductList({ products }: Props) {
  return <div>{products.map(p => <div key={p.id}>{p.name}</div>)}</div>;
}
```

### Server Action Issues
```typescript
// ❌ BAD: No validation
export async function createProduct(data: any) {
  return await db.products.create({ data });
}

// ✅ GOOD: With validation
export async function createProduct(data: unknown) {
  const validated = CreateProductSchema.parse(data);
  return await db.products.create({ data: validated });
}

// ❌ BAD: No authorization
export async function deleteProduct(id: string) {
  await db.products.delete({ where: { id } });
}

// ✅ GOOD: With authorization
export async function deleteProduct(id: string) {
  await requireRole(["admin"]);
  await db.products.delete({ where: { id } });
}
```

---

## Review Questions

### For New Features
1. Does it meet the requirement?
2. Are all states handled (loading, error, empty)?
3. Is it responsive?
4. Is it accessible?

### For Bug Fixes
1. Does it actually fix the bug?
2. Did I test edge cases?
3. Could it break anything else?

### For Refactoring
1. Is the new code clearer?
2. Is there a real benefit?
3. Did I test after refactoring?

### For Security
1. Is input validated?
2. Is authorization checked?
3. Is sensitive data protected?

---

## Anti-Patterns (NEVER DO)

1. ❌ Skip self-review
2. ❌ Claim "done" without testing
3. ❌ Ignore TypeScript errors
4. ❌ Ignore ESLint warnings
5. ❌ Skip edge cases
6. ❌ Skip error handling
7. ❌ Skip loading states
8. ❌ Skip accessibility

---

## Remember

> **Review your own code first.**
> **If you wouldn't approve it, neither would I.**
> **Quality over speed.**

A good review catches issues before others do.