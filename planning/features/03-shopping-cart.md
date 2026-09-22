# Shopping Cart System

## Overview

نظام سلة تسوق ذكي يدعم:
- إضافة/حذف المنتجات
- تعديل الكمية
- حفظ السلة للمستخدمين المسجلين
- سلة زائفة (Guest Cart)
- تحديث الأسعار تلقائياً
- كوبونات الخصم

## Features

### 1. Cart Operations
- Add product with specific size/color
- Remove product
- Update quantity
- Clear cart
- Move to wishlist

### 2. Cart Persistence
- Guest: localStorage
- Logged in: Database sync
- Merge guest cart on login

### 3. Price Calculation
- Subtotal calculation
- Discount application
- Shipping cost calculation
- Tax calculation (14% VAT)
- Total calculation

### 4. Coupon System
- Percentage discount
- Fixed amount discount
- Free shipping coupon
- Minimum order requirement
- Usage limits
- Expiration dates

## Database Schema

```sql
-- Shopping Cart
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  coupon_code VARCHAR(50),
  discount_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cart Items
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id),
  quantity INT DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Coupons
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) CHECK (type IN ('percentage', 'fixed', 'free_shipping')),
  value DECIMAL(10,2) NOT NULL,
  min_order_amount DECIMAL(10,2),
  max_uses INT,
  used_count INT DEFAULT 0,
  starts_at TIMESTAMP,
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Wishlist
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

## API Routes

```
GET    /api/cart                  - Get cart
POST   /api/cart/items            - Add item to cart
PUT    /api/cart/items/[id]       - Update cart item quantity
DELETE /api/cart/items/[id]       - Remove item from cart
DELETE /api/cart                  - Clear cart
POST   /api/cart/coupon           - Apply coupon
DELETE /api/cart/coupon           - Remove coupon
POST   /api/cart/merge            - Merge guest cart with user cart
GET    /api/wishlist              - Get wishlist
POST   /api/wishlist              - Add to wishlist
DELETE /api/wishlist/[id]         - Remove from wishlist
```

## Frontend Components

### Cart Sidebar (Slide-in)
```
┌─────────────────────────────┐
│ Shopping Cart          (3)  │
├─────────────────────────────┤
│ ┌─────┐                     │
│ │ 👟  │ Nike Air Max        │
│ │     │ Size: 42, Black     │
│ └─────┘ EGP 2,500     [- 1 +]│
├─────────────────────────────┤
│ ┌─────┐                     │
│ │ 👟  │ Adidas Ultraboost   │
│ │     │ Size: 40, White     │
│ └─────┘ EGP 3,200     [- 2 +]│
├─────────────────────────────┤
│ Subtotal:        EGP 8,900  │
│ Discount:        -EGP 500   │
│ Shipping:         EGP 50    │
│ VAT (14%):       EGP 1,176  │
│─────────────────────────────│
│ Total:          EGP 10,126  │
├─────────────────────────────┤
│ [Apply Coupon Code]         │
│ [Checkout]                  │
└─────────────────────────────┘
```

### Cart Page
- Full cart view with all items
- Product images with links
- Size/color display
- Quantity controls
- Remove item button
- Coupon input
- Order summary sidebar
- Continue shopping button

## Tasks

### Task 1: Cart State Management
- [ ] Setup Zustand store for cart
- [ ] Implement cart actions
- [ ] Add localStorage persistence
- [ ] Create cart sync with API

### Task 2: Cart UI Components
- [ ] Build cart item component
- [ ] Create cart sidebar
- [ ] Build cart page
- [ ] Add cart animations

### Task 3: Price Calculation
- [ ] Implement subtotal calculation
- [ ] Add VAT calculation
- [ ] Create shipping calculator
- [ ] Apply discounts

### Task 4: Coupon System
- [ ] Create coupon input component
- [ ] Implement coupon validation API
- [ ] Apply coupon discounts
- [ ] Handle coupon errors

### Task 5: Wishlist
- [ ] Build wishlist page
- [ ] Add to wishlist functionality
- [ ] Move to cart from wishlist
- [ ] Remove from wishlist

## Validation Rules

### Add to Cart
- Product ID: Required
- Variant ID: Required
- Quantity: Min 1, Max 10

### Apply Coupon
- Code: Required, uppercase
- Check expiration
- Check usage limits
- Check minimum order amount

## Animations

1. **Add to Cart**: Product flies to cart icon
2. **Cart Badge**: Bounce animation on count change
3. **Remove Item**: Slide out + fade
4. **Quantity Update**: Number flip animation
5. **Cart Open/Close**: Slide from right
