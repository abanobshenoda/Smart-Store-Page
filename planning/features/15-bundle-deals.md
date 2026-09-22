# Bundle Deals & Combo Offers

## Overview

عروض باقات وكومبو للمنتجات:
- شراء مجموعة منتجات مع بعض بخصم
- باقات مخصصة من الـ Dashboard
- خصم على.Bundle بالكامل
- عرض الـ savings

## Dashboard Control

### Feature Toggle
```
Dashboard → Settings → Features → Bundle Deals
├── Enable Feature: [Toggle ON/OFF]
├── Show Savings: [Toggle ON/OFF]
├── Allow Custom Bundles: [Toggle ON/OFF]
└── Max Items per Bundle: [10 ▼]
```

### Bundle Management
```
Dashboard → Marketing → Bundle Deals
├── Active Bundles
│   ├── Summer Essentials Bundle
│   │   ├── Products: 3
│   │   ├── Original: EGP 7,500
│   │   ├── Bundle Price: EGP 5,999
│   │   ├── Discount: 20%
│   │   └── [Edit] [Deactivate]
│   └── ...
├── Draft Bundles
│   └── ...
└── [+ Create New Bundle]
```

## Features

### 1. Bundle Display
```
┌─────────────────────────────────────────────────────────────┐
│ 🎁 Summer Essentials Bundle                                │
│                                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│ │  👟     │ │  👟     │ │  🧦     │                       │
│ │ Nike    │ │ Adidas  │ │ Socks   │                       │
│ │ Air Max │ │ Ultraboost│ │ Pack   │                       │
│ │ EGP 2,500│ │ EGP 3,200│ │ EGP 300│                      │
│ └─────────┘ └─────────┘ └─────────┘                       │
│                                                             │
│ Original Price: EGP 6,000                                  │
│ Bundle Price:   EGP 4,799                                  │
│ You Save:       EGP 1,201 (20%)                           │
│                                                             │
│ [Add Bundle to Cart]                                        │
└─────────────────────────────────────────────────────────────┘
```

### 2. Product Page Bundle Suggestion
```
┌─────────────────────────────────────┐
│ Frequently Bought Together          │
│                                     │
│ 👟 Nike Air Max    +               │
│ 👟 Nike Socks Pack +               │
│ 🧦 Shoe Care Kit                   │
│                                     │
│ Bundle Price: EGP 2,800            │
│ (Save EGP 300)                     │
│                                     │
│ [Add All to Cart]                   │
└─────────────────────────────────────┘
```

## Database Schema

```sql
-- Bundles table
CREATE TABLE bundles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  image_url TEXT,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  min_items INT DEFAULT 2,
  max_items INT,
  is_active BOOLEAN DEFAULT TRUE,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bundle Products table
CREATE TABLE bundle_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id UUID REFERENCES bundles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INT DEFAULT 1,
  is_required BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bundle Stats table
CREATE TABLE bundle_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id UUID REFERENCES bundles(id) ON DELETE CASCADE,
  views INT DEFAULT 0,
  adds_to_cart INT DEFAULT 0,
  purchases INT DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bundle Orders (track which bundles were sold)
CREATE TABLE bundle_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  bundle_id UUID REFERENCES bundles(id),
  quantity INT DEFAULT 1,
  bundle_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

```
GET    /api/bundles                      - Get active bundles
GET    /api/bundles/[id]                 - Get bundle details
POST   /api/bundles/[id]/add-to-cart     - Add bundle to cart

POST   /api/admin/bundles                - Create bundle
GET    /api/admin/bundles                - Get all bundles
PUT    /api/admin/bundles/[id]           - Update bundle
DELETE /api/admin/bundles/[id]           - Delete bundle
POST   /api/admin/bundles/[id]/products  - Add products to bundle
DELETE /api/admin/bundles/[id]/products/[productId] - Remove product
GET    /api/admin/bundles/[id]/stats     - Get bundle statistics
```

## Frontend Implementation

### Bundle Card Component
```typescript
// src/components/product/BundleCard.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface BundleCardProps {
  bundle: {
    id: string;
    name: string;
    description: string;
    image: string;
    products: Array<{
      id: string;
      name: string;
      image: string;
      price: number;
    }>;
    originalPrice: number;
    bundlePrice: number;
    savings: number;
    discountPercentage: number;
  };
}

export function BundleCard({ bundle }: BundleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{bundle.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{bundle.description}</p>
        
        <div className="flex gap-2 mb-4">
          {bundle.products.map((product) => (
            <div key={product.id} className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="rounded"
              />
              <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                +
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-sm text-gray-500 line-through">
            <span>Original Price</span>
            <span>EGP {bundle.originalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-green-600">
            <span>Bundle Price</span>
            <span>EGP {bundle.bundlePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-red-500 font-semibold">
            <span>You Save</span>
            <span>EGP {bundle.savings.toLocaleString()} ({bundle.discountPercentage}%)</span>
          </div>
        </div>

        <Button className="w-full mt-4" onClick={() => addBundleToCart(bundle.id)}>
          Add Bundle to Cart
        </Button>
      </div>
    </div>
  );
}
```

### Frequently Bought Together
```typescript
// src/components/product/FrequentlyBoughtTogether.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface FrequentlyBoughtTogetherProps {
  mainProduct: Product;
  suggestedProducts: Product[];
}

export function FrequentlyBoughtTogether({
  mainProduct,
  suggestedProducts,
}: FrequentlyBoughtTogetherProps) {
  const [selected, setSelected] = useState<string[]>(
    suggestedProducts.map((p) => p.id)
  );

  const totalPrice = [mainProduct, ...suggestedProducts.filter((p) => 
    selected.includes(p.id)
  )].reduce((sum, p) => sum + p.price, 0);

  const bundlePrice = totalPrice * 0.9; // 10% discount

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-bold mb-4">Frequently Bought Together</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1">
          <input
            type="checkbox"
            checked
            disabled
            className="mr-2"
          />
          <span>{mainProduct.name}</span>
          <span className="text-gray-500 ml-2">EGP {mainProduct.price}</span>
        </div>
      </div>

      {suggestedProducts.map((product) => (
        <div key={product.id} className="flex items-center gap-2 mb-2">
          <div className="flex-1">
            <input
              type="checkbox"
              checked={selected.includes(product.id)}
              onChange={() => toggleProduct(product.id)}
              className="mr-2"
            />
            <span>{product.name}</span>
            <span className="text-gray-500 ml-2">EGP {product.price}</span>
          </div>
        </div>
      ))}

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between font-bold">
          <span>Total Price</span>
          <span>EGP {bundlePrice.toLocaleString()}</span>
        </div>
        <div className="text-green-600 text-sm">
          You save EGP {(totalPrice - bundlePrice).toLocaleString()}
        </div>
      </div>

      <Button className="w-full mt-4">
        Add All to Cart
      </Button>
    </div>
  );
}
```

## Tasks

### Task 1: Database Setup
- [ ] Create bundles table
- [ ] Create bundle_products table
- [ ] Create bundle_stats table
- [ ] Create bundle_orders table

### Task 2: Dashboard Management
- [ ] Bundle list page
- [ ] Create/edit bundle form
- [ ] Add/remove products
- [ ] Bundle statistics

### Task 3: API Implementation
- [ ] Get active bundles
- [ ] Create/update/delete bundles
- [ ] Add bundle to cart
- [ ] Track statistics

### Task 4: Frontend Components
- [ ] Bundle card component
- [ ] Frequently bought together
- [ ] Bundle page
- [ ] Cart integration

### Task 5: Pricing Logic
- [ ] Calculate bundle price
- [ ] Apply discounts
- [ ] Handle stock
- [ ] Track savings

## Notes

- Bundles can have required and optional items
- Minimum items requirement
- Automatic discount calculation
- Stock validation for all items
- Statistics for optimization
