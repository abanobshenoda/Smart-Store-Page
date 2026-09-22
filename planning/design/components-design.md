# Component Design Specifications

## Overview

مواصفات تصميم المكونات الرئيسية:
- مكونات الواجهة الأمامية
- مكونات لوحة التحكم
- مكونات 3D
- مكونات الأنيميشن

## Component Library

### 1. Navigation Components

#### Navbar
```
┌─────────────────────────────────────────────────────────────┐
│ 🏠 Smart Store    [Products ▼] [Categories ▼] [Search...]  │
│                                                             │
│    🔍          👤 Account    🛒 Cart (3)    🌙 EN/AR       │
└─────────────────────────────────────────────────────────────┘
```

**States**:
- Default
- Scrolled (sticky, shadow)
- Mobile (hamburger menu)

**Features**:
- Logo with 3D effect
- Mega menu for categories
- Search with autocomplete
- Cart with badge animation
- Language toggle (AR/EN)

#### Footer
```
┌─────────────────────────────────────────────────────────────┐
│ About Us    |    Contact    |    Help    |    Social        │
│ Company     |    Phone      |    FAQ     |    Facebook      │
│ Careers     |    Email      |    Shipping|    Instagram     │
│ Press       |    Address    |    Returns |    Twitter       │
│             |               |    Size Guide|  TikTok        │
├─────────────────────────────────────────────────────────────┤
│ Newsletter: [Enter email] [Subscribe]                       │
├─────────────────────────────────────────────────────────────┤
│ © 2024 Smart Store. All rights reserved.                   │
│ Payment Methods: 💳 📱 💵                                  │
└─────────────────────────────────────────────────────────────┘
```

### 2. Product Components

#### Product Card (3D)
```
┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │      [3D Product Model]     │   │
│  │                             │   │
│  │    ← Scroll to Rotate →     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ⭐⭐⭐⭐⭐ (128)                    │
│                                     │
│  Nike Air Max 2024                  │
│  EGP 2,500                         │
│  ~~EGP 3,000~~ -17%                │
│                                     │
│  Colors: ● ● ● ●                   │
│                                     │
│  [Add to Cart]                      │
│                                     │
│  NEW          SALE                  │
└─────────────────────────────────────┘
```

**Features**:
- 3D model rotation on hover
- Shadow depth effect
- Quick add button
- Wishlist heart icon
- Sale/New badges

#### Product Detail (3D)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────┐  Product Details          │
│  │                             │                          │
│  │                             │  Nike Air Max 2024       │
│  │      [3D Product Viewer]    │                          │
│  │                             │  ⭐⭐⭐⭐⭐ (128 reviews)   │
│  │   🔄 Auto-rotate on scroll  │                          │
│  │   🔍 Click to zoom         │  EGP 2,500               │
│  │   📱 Touch to rotate       │  ~~EGP 3,000~~ -17%     │
│  │                             │                          │
│  └─────────────────────────────┘  Color:                  │
│                                     ● ● ● ●              │
│  [📷] [📷] [📷] [📷]              Size:                   │
│                                     [39] [40] [41] [42]   │
│                                                             │
│  [Add to Cart]     [Add to Wishlist]    [Share]           │
│                                                             │
│  Description:                                              │
│  Premium comfort with iconic Air Max cushioning...         │
│                                                             │
│  Size Guide | Shipping | Returns                           │
└─────────────────────────────────────────────────────────────┘
```

### 3. Form Components

#### Input Field
```
┌─────────────────────────────────────┐
│ Label *                            │
│ ┌─────────────────────────────────┐│
│ │ Placeholder text               ││
│ └─────────────────────────────────┘│
│ Helper text or error message       │
└─────────────────────────────────────┘
```

**States**:
- Default
- Focus (blue border)
- Error (red border)
- Success (green border)
- Disabled (gray)

#### Select Dropdown
```
┌─────────────────────────────────────┐
│ Label *                            │
│ ┌─────────────────────────────┐   │
│ │ Selected option          ▼  │   │
│ └─────────────────────────────┘   │
│                                   │
│ ┌─────────────────────────────┐   │
│ │ Option 1                    │   │
│ │ Option 2                    │   │
│ │ Option 3                    │   │
│ └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

#### Size Selector
```
┌─────────────────────────────────────┐
│ Size:                               │
│                                     │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│ │  39 │ │  40 │ │  41 │ │  42 │  │
│ └─────┘ └─────┘ └─────┘ └─────┘  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│ │  43 │ │  44 │ │  45 │ │  46 │  │
│ └─────┘ └─────┘ └─────┘ └─────┘  │
│                                     │
│ 📏 Size Guide                       │
└─────────────────────────────────────┘
```

**States**:
- Default
- Selected (filled)
- Disabled (out of stock)
- Hover

### 4. Button Components

#### Primary Button
```
┌─────────────────────────────────────┐
│         [Add to Cart]              │
└─────────────────────────────────────┘
```

**States**:
- Default
- Hover (lift + shadow)
- Active (press down)
- Loading (spinner)
- Disabled

#### Icon Button
```
┌─────┐
│  ♡  │
└─────┘
```

#### Button Sizes
- Small: padding 8px 16px
- Medium: padding 12px 24px
- Large: padding 16px 32px

### 5. Card Components

#### Cart Item Card
```
┌─────────────────────────────────────┐
│ ┌─────┐                            │
│ │ 📷  │  Nike Air Max 2024         │
│ │     │  Size: 42, Black           │
│ └─────┘  EGP 2,500                 │
│                                     │
│         [-] 1 [+]      [🗑️]       │
└─────────────────────────────────────┘
```

#### Order Card
```
┌─────────────────────────────────────┐
│ Order #SS-2024-001234              │
│ Status: [Shipped]                   │
│                                     │
│ Items:                              │
│ 👟 Nike Air Max 42 Black    x1    │
│ 👟 Adidas Ultraboost 40     x2    │
│                                     │
│ Total: EGP 8,900                    │
│ Date: Nov 15, 2024                  │
│                                     │
│ [View Details] [Track Order]        │
└─────────────────────────────────────┘
```

### 6. Modal Components

#### Confirmation Modal
```
┌─────────────────────────────────────┐
│                                     │
│         ⚠️                          │
│                                     │
│    Are you sure?                    │
│                                     │
│    This action cannot be undone.    │
│                                     │
│    [Cancel]          [Confirm]      │
│                                     │
└─────────────────────────────────────┘
```

### 7. Notification Components

#### Toast Notification
```
┌─────────────────────────────────────┐
│ ✅ Product added to cart            │
│                                     │
│ Nike Air Max 2024 has been added   │
│ to your cart.                       │
│                                     │
│                        [View Cart]  │
└─────────────────────────────────────┘
```

**Types**:
- Success (green)
- Error (red)
- Warning (yellow)
- Info (blue)

### 8. Loading Components

#### Skeleton Loader
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐│
│ │ ████████████████████████████████││
│ │ ████████████████████████████████││
│ │ ████████████████████████████████││
│ │ ████████████                    ││
│ │ ████████████████████████████    ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

#### 3D Loading Spinner
```
┌─────────────────────────────────────┐
│                                     │
│         🔄                          │
│      [3D Shoe                      │
│       Spinning]                    │
│                                     │
│    Loading product...               │
│                                     │
└─────────────────────────────────────┘
```

## Component API

### Button Component
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

### ProductCard Component
```typescript
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  model3dUrl?: string;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isSale?: boolean;
  onAddToCart: (id: string) => void;
  onAddToWishlist: (id: string) => void;
}
```

### Input Component
```typescript
interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Full-width buttons
- Stacked cards
- Bottom navigation (optional)

### Tablet (640px - 1024px)
- 2-column grid
- Sidebar navigation
- Modal dialogs

### Desktop (> 1024px)
- 3-4 column grid
- Full navigation
- Side-by-side layouts
