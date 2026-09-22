# Professional UI/UX Design Engineer

## Purpose
Design and implement **exceptional user interfaces** that are beautiful, accessible, performant, and delightful to use. This skill ensures every UI component meets professional standards.

---

## Design Philosophy

### 1. **User-Centered Design**
```
Every design decision must serve the user, not the designer.
```

- **Clarity** over cleverness
- **Function** over form (but both matter)
- **Accessibility** as default, not afterthought
- **Performance** as feature
- **Consistency** builds trust

### 2. **Mobile-First Responsive**
```
Design for 320px first, scale up gracefully.
```

Breakpoints:
```css
/* Mobile (default) */
@media (min-width: 320px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

### 3. **Design System Consistency**
**ALWAYS use existing components before creating new ones.**

Tech stack:
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Base components
- **Framer Motion**: Animations
- **Lucide/Heroicons**: Icons

---

## UI Component Checklist

Every component MUST have:

### ✅ **1. Responsive Design**
```tsx
// ✅ GOOD: Mobile-first, responsive
<div className="flex flex-col gap-4 md:flex-row md:gap-6">
  <Card className="w-full md:w-1/2" />
</div>

// ❌ BAD: Fixed width, not responsive
<div style={{ width: "1200px" }}>
  <Card />
</div>
```

### ✅ **2. Loading States**
```tsx
// ✅ GOOD: Clear loading feedback
{isLoading ? (
  <Skeleton className="h-10 w-full" />
) : (
  <ProductCard product={product} />
)}

// ❌ BAD: No feedback during loading
{data && <ProductCard product={data} />}
```

### ✅ **3. Error States**
```tsx
// ✅ GOOD: Helpful error message
{error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      فشل تحميل المنتجات. <button onClick={retry}>حاول مرة أخرى</button>
    </AlertDescription>
  </Alert>
)}

// ❌ BAD: Silent failure or console.error only
{error && console.error(error)}
```

### ✅ **4. Empty States**
```tsx
// ✅ GOOD: Helpful empty state with action
{products.length === 0 && (
  <EmptyState
    icon={<ShoppingBag />}
    title="لا توجد منتجات"
    description="ابدأ بإضافة منتجات إلى متجرك"
    action={<Button>أضف منتج</Button>}
  />
)}

// ❌ BAD: Nothing shown
{products.length > 0 && <ProductList products={products} />}
```

### ✅ **5. Accessibility**
```tsx
// ✅ GOOD: Full accessibility
<button
  aria-label="أضف إلى السلة"
  aria-describedby="product-name"
  disabled={!inStock}
>
  <ShoppingCart aria-hidden="true" />
  أضف إلى السلة
</button>

// ❌ BAD: Icon-only button with no label
<button>
  <ShoppingCart />
</button>
```

### ✅ **6. TypeScript Props**
```tsx
// ✅ GOOD: Strict typing
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
  variant?: "default" | "compact";
  className?: string;
}

// ❌ BAD: Loose typing
function ProductCard(props: any) { }
```

---

## Design Patterns

### 1. **Color System**
Use **CSS custom properties** for theming:

```css
:root {
  /* Brand Colors */
  --primary: 220 90% 56%;        /* Blue */
  --primary-foreground: 0 0% 100%;
  
  /* Semantic Colors */
  --success: 142 76% 36%;        /* Green */
  --warning: 38 92% 50%;         /* Orange */
  --destructive: 0 84% 60%;      /* Red */
  
  /* Neutral Colors */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --border: 214 32% 91%;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    --muted: 217 33% 17%;
    --border: 217 33% 25%;
  }
}
```

### 2. **Spacing System**
Use **Tailwind's spacing scale**:

```tsx
// ✅ Consistent spacing
<div className="p-4 space-y-4 md:p-6 md:space-y-6">
  <h2 className="text-2xl font-bold">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>

// ❌ Random pixel values
<div style={{ padding: "17px", marginBottom: "23px" }}>
```

### 3. **Typography Scale**
```tsx
// Headings
<h1 className="text-4xl font-bold tracking-tight">   {/* 36px */}
<h2 className="text-3xl font-semibold">              {/* 30px */}
<h3 className="text-2xl font-semibold">              {/* 24px */}
<h4 className="text-xl font-medium">                 {/* 20px */}

// Body
<p className="text-base">                            {/* 16px */}
<p className="text-sm text-muted-foreground">        {/* 14px */}
<p className="text-xs text-muted-foreground">        {/* 12px */}
```

### 4. **Animation Guidelines**

#### Use Framer Motion for complex animations:
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <ProductCard product={product} />
</motion.div>
```

#### Use Tailwind for simple transitions:
```tsx
<button className="transition-colors hover:bg-primary/90">
  Click me
</button>
```

#### Animation Rules:
- ✅ Keep animations **under 300ms**
- ✅ Provide `prefers-reduced-motion` alternative
- ✅ Never block interaction with animations
- ✅ Use `ease-out` for entering, `ease-in` for exiting
- ❌ Never use animation just because you can

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Layout Patterns

### 1. **Card Layout**
```tsx
<Card className="overflow-hidden">
  <CardHeader className="p-0">
    <Image src={product.image} alt={product.name} />
  </CardHeader>
  <CardContent className="p-4">
    <CardTitle>{product.name}</CardTitle>
    <CardDescription>{product.description}</CardDescription>
  </CardContent>
  <CardFooter className="p-4 pt-0">
    <Button className="w-full">أضف إلى السلة</Button>
  </CardFooter>
</Card>
```

### 2. **Grid Layout**
```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

### 3. **Form Layout**
```tsx
<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="email">البريد الإلكتروني</Label>
    <Input
      id="email"
      type="email"
      placeholder="example@email.com"
      required
    />
  </div>
  
  <Button type="submit" className="w-full">
    إرسال
  </Button>
</form>
```

---

## Arabic RTL Support

### Text Direction
```tsx
// ✅ Proper RTL support
<div dir="rtl" className="text-right">
  <p>النص العربي يظهر من اليمين لليسار</p>
</div>

// For mixed content
<p className="[&[dir=rtl]]:text-right [&[dir=ltr]]:text-left">
  Smart content direction
</p>
```

### Icon Direction
```tsx
// Icons that should flip in RTL
<ChevronRight className="rtl:rotate-180" />

// Icons that should NOT flip (numbers, symbols)
<ShoppingCart /> {/* No flip needed */}
```

---

## Performance Optimization

### 1. **Image Optimization**
```tsx
import Image from "next/image";

// ✅ GOOD: Optimized with Next.js Image
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  className="rounded-lg"
  loading="lazy"
/>

// ❌ BAD: Unoptimized img tag
<img src={product.image} alt={product.name} />
```

### 2. **Lazy Loading**
```tsx
import dynamic from "next/dynamic";

// Lazy load heavy components
const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <Skeleton className="h-[400px]" />,
  ssr: false,
});
```

### 3. **Code Splitting**
```tsx
// Split by route
const AdminDashboard = dynamic(() => import("./AdminDashboard"));

// Only load when needed
{isAdmin && <AdminDashboard />}
```

---

## Accessibility (WCAG 2.1 AA)

### 1. **Semantic HTML**
```tsx
// ✅ GOOD: Semantic structure
<article>
  <header>
    <h2>Product Name</h2>
  </header>
  <main>
    <p>Description</p>
  </main>
  <footer>
    <button>Add to Cart</button>
  </footer>
</article>

// ❌ BAD: Div soup
<div>
  <div>Product Name</div>
  <div>Description</div>
  <div>Add to Cart</div>
</div>
```

### 2. **Keyboard Navigation**
```tsx
// ✅ All interactive elements are keyboard accessible
<button
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  Click me
</button>
```

### 3. **Focus Management**
```tsx
// ✅ Clear focus indicators
<button className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Focusable Button
</button>
```

### 4. **Alt Text for Images**
```tsx
// ✅ Descriptive alt text
<Image
  src={product.image}
  alt={`${product.name} - ${product.category}`}
/>

// ❌ Generic or missing alt
<Image src={product.image} alt="product" />
```

### 5. **ARIA Labels**
```tsx
// When visual label is not enough
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// For complex widgets
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">Confirm Action</h2>
</div>
```

---

## Component Design Process

### Step 1: **Understand the Requirement**
```
What is this component for?
Who will use it?
What states does it have?
What interactions are needed?
```

### Step 2: **Check Existing Components**
```bash
# Search for similar components
ls src/components/ui/
ls src/components/features/

# Can I reuse or extend an existing component?
```

### Step 3: **Design States**
```
□ Default state
□ Hover state
□ Focus state
□ Active/pressed state
□ Disabled state
□ Loading state
□ Error state
□ Empty state
□ Success state
```

### Step 4: **Implement Responsively**
```tsx
// Start with mobile (320px)
<div className="p-4">
  
// Add tablet styles (768px+)
<div className="p-4 md:p-6">
  
// Add desktop styles (1024px+)
<div className="p-4 md:p-6 lg:p-8">
```

### Step 5: **Test Thoroughly**
```
□ Test on mobile (Chrome DevTools)
□ Test on tablet
□ Test on desktop
□ Test dark mode
□ Test RTL direction
□ Test keyboard navigation
□ Test screen reader (if critical)
□ Test with slow network (loading states)
```

---

## Common Patterns

### 1. **Button Variants**
```tsx
// Primary action
<Button variant="default">حفظ</Button>

// Secondary action
<Button variant="outline">إلغاء</Button>

// Destructive action
<Button variant="destructive">حذف</Button>

// Ghost (minimal)
<Button variant="ghost">تعديل</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  جاري الحفظ...
</Button>
```

### 2. **Input with Validation**
```tsx
<div className="space-y-2">
  <Label htmlFor="email">البريد الإلكتروني</Label>
  <Input
    id="email"
    type="email"
    {...register("email")}
    className={errors.email && "border-destructive"}
  />
  {errors.email && (
    <p className="text-sm text-destructive">{errors.email.message}</p>
  )}
</div>
```

### 3. **Data Table**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>المنتج</TableHead>
      <TableHead>السعر</TableHead>
      <TableHead className="text-left">الإجراءات</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {products.map((product) => (
      <TableRow key={product.id}>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.price} جنيه</TableCell>
        <TableCell>
          <Button variant="ghost" size="sm">تعديل</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Design Review Checklist

Before considering a UI component complete:

### Visual Design
- □ Matches design system colors
- □ Uses consistent spacing
- □ Typography scale is correct
- □ Icons are properly sized
- □ Borders and shadows are subtle

### Responsive Design
- □ Works at 320px width
- □ Works at 768px width
- □ Works at 1024px+ width
- □ No horizontal scroll on mobile
- □ Touch targets are at least 44x44px

### Accessibility
- □ Semantic HTML used
- □ All interactive elements keyboard accessible
- □ Focus indicators visible
- □ Color contrast passes WCAG AA
- □ Alt text on images
- □ ARIA labels where needed

### States & Feedback
- □ Loading state shown
- □ Error state handled
- □ Empty state shown
- □ Success feedback given
- □ Disabled state clear

### Performance
- □ Images optimized (Next.js Image)
- □ Heavy components lazy loaded
- □ No layout shift (CLS)
- □ Animations are smooth (60fps)
- □ Bundle size reasonable

### RTL Support
- □ Text aligns correctly in RTL
- □ Directional icons flip
- □ Layout mirrors properly

---

## Anti-Patterns (NEVER DO)

1. ❌ Create new component without checking existing ones
2. ❌ Use inline styles instead of Tailwind classes
3. ❌ Hardcode colors instead of using CSS variables
4. ❌ Fixed width/height without responsiveness
5. ❌ Missing loading/error/empty states
6. ❌ Icon-only buttons without aria-label
7. ❌ Images without Next.js Image optimization
8. ❌ Animations that block interaction
9. ❌ Forgetting dark mode support
10. ❌ Forgetting RTL support for Arabic

---

## Integration with Other Skills

- **Frontend Skill**: Implements the logic behind the UI
- **Performance Skill**: Optimizes rendering and bundle size
- **Security Skill**: Ensures UI doesn't expose sensitive data
- **Testing Skill**: Writes component tests

---

## Remember

> **Design is not just how it looks, but how it works.**
> **Accessibility is not optional — it's mandatory.**
> **Performance is a feature, not an afterthought.**
> **Consistency builds trust, delight builds love.**

Every pixel matters. Every interaction counts. Every user deserves excellence.
