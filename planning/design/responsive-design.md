# Responsive Design Guidelines

## Overview

إرشادات التصميم المتجاوب لجميع الأجهزة:
- Mobile-first approach
- Breakpoints
- Grid system
- Touch interactions

## Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { ... }

/* Tablet */
@media (min-width: 641px) and (max-width: 768px) { ... }

/* Laptop */
@media (min-width: 769px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) and (max-width: 1280px) { ... }

/* Large Desktop */
@media (min-width: 1281px) { ... }
```

## Grid System

### Mobile (1 Column)
```
┌─────────┐
│ Item 1  │
└─────────┘
┌─────────┐
│ Item 2  │
└─────────┘
┌─────────┐
│ Item 3  │
└─────────┘
```

### Tablet (2 Columns)
```
┌─────────┬─────────┐
│ Item 1  │ Item 2  │
└─────────┴─────────┘
┌─────────┬─────────┐
│ Item 3  │ Item 4  │
└─────────┴─────────┘
```

### Desktop (3-4 Columns)
```
┌─────────┬─────────┬─────────┬─────────┐
│ Item 1  │ Item 2  │ Item 3  │ Item 4  │
└─────────┴─────────┴─────────┴─────────┘
┌─────────┬─────────┬─────────┬─────────┐
│ Item 5  │ Item 6  │ Item 7  │ Item 8  │
└─────────┴─────────┴─────────┴─────────┘
```

## Component Responsive Behavior

### Navigation

#### Mobile
```
┌─────────────────────────────┐
│ 🏠 Smart Store    ☰ Menu   │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🔍 Search...                │
├─────────────────────────────┤
│ Home                        │
│ Products                    │
│ Categories                  │
│ Cart (3)                    │
│ Account                     │
├─────────────────────────────┤
│ 🌙 AR/EN                   │
└─────────────────────────────┘
```

#### Tablet/Desktop
```
┌─────────────────────────────────────────────────────────────┐
│ 🏠 Smart Store    [Products] [Categories]    🔍 👤 🛒 🌙   │
└─────────────────────────────────────────────────────────────┘
```

### Product Grid

#### Mobile (1 Column)
```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │    [Product Image]      │ │
│ │                         │ │
│ └─────────────────────────┘ │
│ Product Name                │
│ EGP 2,500                   │
│ [Add to Cart]               │
└─────────────────────────────┘
```

#### Tablet (2 Columns)
```
┌─────────────────┬─────────────────┐
│ ┌─────────────┐ │ ┌─────────────┐ │
│ │             │ │ │             │ │
│ │  [Product]  │ │ │  [Product]  │ │
│ │             │ │ │             │ │
│ └─────────────┘ │ └─────────────┘ │
│ Product Name    │ Product Name    │
│ EGP 2,500       │ EGP 3,200       │
└─────────────────┴─────────────────┘
```

#### Desktop (4 Columns)
```
┌─────────┬─────────┬─────────┬─────────┐
│ Product │ Product │ Product │ Product │
│   1     │   2     │   3     │   4     │
└─────────┴─────────┴─────────┴─────────┘
```

### Product Detail

#### Mobile
```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │   [3D Product Viewer]   │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ Product Name                │
│ ⭐⭐⭐⭐⭐ (128)              │
│                             │
│ EGP 2,500                   │
│ ~~EGP 3,000~~ -17%          │
│                             │
│ Color: ● ● ● ●             │
│ Size: [39][40][41][42]      │
│                             │
│ [Add to Cart]               │
│                             │
│ Description...              │
└─────────────────────────────┘
```

#### Desktop
```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────┐  Product Details           │
│ │                             │                          │
│ │   [3D Product Viewer]       │  Nike Air Max 2024       │
│ │                             │                          │
│ │   🔄 Auto-rotate            │  ⭐⭐⭐⭐⭐ (128)           │
│ │                             │                          │
│ └─────────────────────────────┘  EGP 2,500               │
│                                     ~~EGP 3,000~~        │
│ [📷] [📷] [📷] [📷]              Color: ● ● ● ●         │
│                                     Size: [39][40][41]   │
│                                                             │
│  [Add to Cart]     [♡ Wishlist]     [↗ Share]             │
└─────────────────────────────────────────────────────────────┘
```

### Shopping Cart

#### Mobile (Bottom Sheet)
```
┌─────────────────────────────┐
│ ───                        │
│ Shopping Cart          (3)  │
├─────────────────────────────┤
│ ┌─────┐                    │
│ │ 📷  │ Product 1          │
│ └─────┘ EGP 2,500          │
│         [-] 1 [+]          │
├─────────────────────────────┤
│ ┌─────┐                    │
│ │ 📷  │ Product 2          │
│ └─────┘ EGP 3,200          │
│         [-] 2 [+]          │
├─────────────────────────────┤
│ Total: EGP 8,900            │
│ [Checkout]                  │
└─────────────────────────────┘
```

#### Desktop (Sidebar)
```
┌─────────────────────────────────────────────────────────────┐
│                                                     [×]     │
│ Shopping Cart                                          (3)  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────┐                                                    │
│ │ 📷  │ Nike Air Max 2024               EGP 2,500         │
│ │     │ Size: 42, Black                 [-] 1 [+]         │
│ └─────┘                                                    │
│                                                             │
│ ┌─────┐                                                    │
│ │ 📷  │ Adidas Ultraboost               EGP 6,400         │
│ │     │ Size: 40, White                 [-] 2 [+]         │
│ └─────┘                                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Subtotal:                                    EGP 8,900     │
│ Shipping:                                     EGP 50       │
│ VAT (14%):                                  EGP 1,246      │
│─────────────────────────────────────────────────────────────│
│ Total:                                     EGP 10,196      │
├─────────────────────────────────────────────────────────────┤
│ [Apply Coupon]                                             │
│                                                             │
│ [Checkout]                                                  │
└─────────────────────────────────────────────────────────────┘
```

### Checkout

#### Mobile (Multi-step)
```
┌─────────────────────────────┐
│ ← Checkout                  │
│ Step 1/3: Address           │
├─────────────────────────────┤
│                             │
│ Select Address              │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🏠 Home                │ │
│ │ Cairo, Nasr City...    │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🏢 Office              │ │
│ │ Giza, Downtown...      │ │
│ └─────────────────────────┘ │
│                             │
│ [+ Add New Address]         │
│                             │
│ [Continue to Payment →]     │
└─────────────────────────────┘
```

#### Desktop (Multi-column)
```
┌─────────────────────────────────────────────────────────────┐
│ Checkout                                        Step 1/3    │
├─────────────────────────────────────────┬───────────────────┤
│                                         │ Order Summary     │
│ Select Delivery Address                 │                   │
│                                         │ ┌───────────────┐ │
│ ┌─────────────────────────────────────┐ │ │ 📷 Product 1  │ │
│ │ 🏠 Home                            │ │ │ EGP 2,500     │ │
│ │ Cairo, Nasr City, St 15...         │ │ └───────────────┘ │
│ │ 01012345678            [Selected ✓] │ │ ┌───────────────┐ │
│ └─────────────────────────────────────┘ │ │ 📷 Product 2  │ │
│                                         │ │ EGP 6,400     │ │
│ ┌─────────────────────────────────────┐ │ └───────────────┘ │
│ │ 🏢 Office                           │ │                   │
│ │ Giza, Downtown, St 20...           │ │ Subtotal: 8,900  │
│ │ 01098765432                        │ │ Shipping: 50     │
│ └─────────────────────────────────────┘ │ VAT: 1,246       │
│                                         │ Total: 10,196    │
│ [+ Add New Address]                     │                   │
│                                         │ [Continue →]      │
└─────────────────────────────────────────┴───────────────────┘
```

## Touch Interactions

### Mobile Touch Targets
- Minimum touch target: 44px x 44px
- Button padding: 12px minimum
- Icon size: 24px minimum

### Swipe Gestures
- Product image gallery: Swipe left/right
- Cart items: Swipe left to delete
- Navigation: Swipe from left for menu

### Long Press
- Product card: Quick view
- Cart item: Edit quantity

## Performance Considerations

### Mobile Optimization
- Lazy load images
- Reduce 3D model complexity
- Minimize animations
- Use responsive images (srcset)

### Image Sizes
```html
<img 
  srcset="image-320w.jpg 320w,
          image-640w.jpg 640w,
          image-1024w.jpg 1024w"
  sizes="(max-width: 640px) 320px,
         (max-width: 1024px) 640px,
         1024px"
  src="image-1024w.jpg"
  alt="Product"
/>
```

## Testing Checklist

### Mobile
- [ ] Touch targets are large enough
- [ ] Text is readable without zoom
- [ ] Forms are easy to fill
- [ ] Navigation is accessible
- [ ] Images load quickly

### Tablet
- [ ] Layout adapts to screen size
- [ ] Touch and mouse both work
- [ ] Content is properly spaced

### Desktop
- [ ] Full navigation is visible
- [ ] Hover effects work
- [ ] Keyboard navigation works
- [ ] Multiple columns display correctly
