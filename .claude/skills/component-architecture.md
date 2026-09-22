# Component Architecture Standards

## 🎯 Purpose
Enforce best practices for creating, organizing, and maintaining React components in the Smart Store project.

---

## 🧩 Core Rules

### 1. **Break Large Pages into Components**

Before implementing ANY page with more than 100 lines:
```
□ Identify logical sections (Header, Content, Sidebar, Footer)
□ Extract each section as a separate component
□ Keep page files as composition/layout ONLY
□ Move business logic to hooks or utils
```

**Example Structure:**
```typescript
// ❌ BAD: Everything in page.tsx (300+ lines)
export default function ProductPage() {
  // 50 lines of state
  // 100 lines of logic
  // 150 lines of JSX
}

// ✅ GOOD: Composed from components
export default function ProductPage() {
  return (
    <>
      <ProductHeader />
      <ProductGallery />
      <ProductDetails />
      <RelatedProducts />
    </>
  )
}
```

---

### 2. **Create Shared Components First**

Before creating a component, check:
```
□ Does a similar component exist in components/shared/?
□ Can I extend an existing component instead?
□ Will this component be reused elsewhere?
□ If yes → Put it in components/shared/
□ If no → Put it in components/features/[feature-name]/
```

**Component Classification:**
- **`components/ui/`** → Base UI primitives (Button, Input, Card) from shadcn
- **`components/shared/`** → Reusable business components (LoadingSpinner, ErrorBoundary, DataTable)
- **`components/layout/`** → Layout wrappers (Header, Footer, Sidebar, Container)
- **`components/features/[name]/`** → Feature-specific components (ProductCard, CartItem)
- **`components/admin/`** → Admin dashboard components
- **`components/auth/`** → Authentication components

---

### 3. **Move Logic to Utils**

Extract ALL reusable logic to `lib/utils.ts` or dedicated utility files:

**What goes in utils:**
- ✅ Data formatting (currency, dates, numbers)
- ✅ String manipulation (truncate, slugify, sanitize)
- ✅ Calculations (tax, discounts, totals)
- ✅ Validation helpers (email, phone, URL)
- ✅ Array/Object transformations
- ✅ Type guards and assertions

**What stays in components:**
- ❌ Component-specific UI state
- ❌ Event handlers (unless generic)
- ❌ Render logic

**Example:**
```typescript
// ✅ lib/utils.ts
export function formatCurrency(amount: number, currency = 'SAR'): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date, locale = 'ar-SA'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// ✅ Component uses util
function ProductPrice({ price }: { price: number }) {
  return <span>{formatCurrency(price)}</span>
}
```

---

### 4. **Component Quality Checklist**

Every component MUST have:

```typescript
// ✅ 1. TypeScript interface for props
interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  variant?: 'default' | 'compact'
}

// ✅ 2. Default props (if applicable)
export function ProductCard({ 
  product, 
  onAddToCart,
  variant = 'default' 
}: ProductCardProps) {

  // ✅ 3. Loading state (if async)
  if (isLoading) return <LoadingSpinner />
  
  // ✅ 4. Error state (if can fail)
  if (error) return <ErrorMessage error={error} />
  
  // ✅ 5. Empty state (if can be empty)
  if (!product) return <EmptyState message="المنتج غير موجود" />
  
  // ✅ 6. Accessibility attributes
  return (
    <article 
      aria-label={`منتج: ${product.name}`}
      role="article"
    >
      {/* Component content */}
    </article>
  )
}

// ✅ 7. Display name for debugging
ProductCard.displayName = 'ProductCard'
```

---

### 5. **File Organization Rules**

```
components/
├── shared/                    # Reusable across features
│   ├── LoadingSpinner.tsx
│   ├── ErrorBoundary.tsx
│   ├── EmptyState.tsx
│   ├── ConfirmDialog.tsx
│   ├── DataTable.tsx
│   └── index.ts              # Export barrel
│
├── features/                 # Feature-specific
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductFilters.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   └── orders/
│       ├── OrderList.tsx
│       └── OrderDetails.tsx
│
└── ui/                       # Base primitives (shadcn)
    ├── button.tsx
    ├── card.tsx
    └── input.tsx
```

---

### 6. **Before Creating Any Component**

**Run this checklist:**

1. **Search existing components:**
   ```bash
   # Search for similar components
   grep -r "function.*Card" website/components/
   grep -r "export.*Table" website/components/
   ```

2. **Check if it should be shared:**
   - Will it be used in 2+ places? → `shared/`
   - Feature-specific only? → `features/[name]/`

3. **Check if logic exists in utils:**
   ```bash
   # Search for existing utilities
   grep -r "export function format" website/lib/
   grep -r "export function validate" website/lib/
   ```

4. **Plan the component structure:**
   - Props interface
   - Loading/Error/Empty states
   - Accessibility
   - Responsive design

---

### 7. **Utils Organization**

```typescript
// lib/utils.ts - General utilities
export function cn(...inputs: ClassValue[]) // Tailwind class merging
export function formatCurrency(amount: number): string
export function formatDate(date: Date): string
export function truncate(text: string, length: number): string

// lib/utils/format.ts - Formatting utilities
export function formatPhoneNumber(phone: string): string
export function formatAddress(address: Address): string
export function formatFileSize(bytes: number): string

// lib/utils/validation.ts - Validation helpers
export function isValidEmail(email: string): boolean
export function isValidPhone(phone: string): boolean
export function isValidURL(url: string): boolean

// lib/utils/calculations.ts - Business calculations
export function calculateDiscount(price: number, discount: number): number
export function calculateTax(subtotal: number, taxRate: number): number
export function calculateTotal(items: CartItem[]): number
```

---

## 🚦 Workflow

### When Adding a New Feature

1. **Read existing code:**
   ```bash
   # Check similar features
   ls -la website/components/features/
   # Check available shared components
   ls -la website/components/shared/
   ```

2. **Plan component structure:**
   - Main feature component (in `features/[name]/`)
   - Reusable sub-components (in `shared/`)
   - Utils needed (in `lib/utils/`)

3. **Implement in order:**
   - Utils first
   - Shared components second
   - Feature components last
   - Page composition final

4. **Verify reusability:**
   - Can this be used elsewhere? → Move to `shared/`
   - Is this logic generic? → Extract to utils

---

## 🚫 Anti-Patterns to Avoid

### ❌ DON'T:
```typescript
// 1. DON'T put everything in one file
export default function HugePage() {
  const [state1, setState1] = useState()
  const [state2, setState2] = useState()
  // ... 500 lines of code
}

// 2. DON'T duplicate logic
function ProductCard() {
  const formatted = `${price} ر.س` // Duplicated formatting
}
function CartItem() {
  const formatted = `${price} ر.س` // Same logic again!
}

// 3. DON'T create feature-specific utils in component
function ProductList() {
  const formatPrice = (p) => `${p} ر.س` // Should be in utils!
  // ...
}
```

### ✅ DO:
```typescript
// 1. Compose from smaller components
export default function ProductPage() {
  return (
    <div>
      <ProductHeader />
      <ProductContent />
      <ProductFooter />
    </div>
  )
}

// 2. Centralize logic in utils
// lib/utils.ts
export const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount)

// Components use it
function ProductCard() {
  return <span>{formatCurrency(price)}</span>
}

// 3. Extract shared components
// components/shared/PriceDisplay.tsx
export function PriceDisplay({ amount }: { amount: number }) {
  return <span className="price">{formatCurrency(amount)}</span>
}
```

---

## ✅ Success Criteria

Before marking a component complete:

- ✅ Component is under 200 lines (if larger, split it)
- ✅ No duplicated logic (extracted to utils)
- ✅ Reusable parts extracted to `shared/`
- ✅ Has TypeScript interface
- ✅ Has Loading/Error/Empty states
- ✅ Has accessibility attributes
- ✅ Responsive design (320px → 1920px)
- ✅ Follows existing naming conventions
- ✅ Exported from barrel file (`index.ts`)

---

## 📚 Quick Reference

### Component Size Guidelines
- **Page component**: < 100 lines (mostly composition)
- **Feature component**: < 200 lines
- **Shared component**: < 150 lines
- **Utility function**: < 50 lines

### When to Split
- Component has multiple responsibilities
- JSX exceeds 100 lines
- Logic can be reused elsewhere
- Testing becomes difficult

### Naming Conventions
- **Components**: PascalCase (`ProductCard`, `LoadingSpinner`)
- **Utils**: camelCase (`formatCurrency`, `calculateTotal`)
- **Types**: PascalCase (`ProductCardProps`, `CartItem`)
- **Files**: kebab-case or PascalCase matching component name

---

**Remember:** Components are the building blocks. Keep them small, focused, and reusable.
