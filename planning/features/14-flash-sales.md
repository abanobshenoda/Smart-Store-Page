# Flash Sales & Countdown Timer

## Overview

عروض محدودة الوقت مع عداد تنازلي:
- إنشاء عروض سريعة
- عداد تنازلي
- خصومات محدودة
- تحكم كامل من الـ Dashboard

## Dashboard Control

### Feature Toggle
```
Dashboard → Settings → Features → Flash Sales
├── Enable Feature: [Toggle ON/OFF]
├── Show Countdown: [Toggle ON/OFF]
├── Show Progress Bar: [Toggle ON/OFF]
├── Show Stock Left: [Toggle ON/OFF]
└── Auto-end Sale: [Toggle ON/OFF]
```

### Flash Sale Management
```
Dashboard → Marketing → Flash Sales
├── Active Sales
│   ├── Summer Sale (Active)
│   │   ├── Discount: 30%
│   │   ├── Ends: 2024-11-30
│   │   ├── Products: 15
│   │   └── [Edit] [End Now]
│   └── Weekend Deal (Active)
├── Scheduled Sales
│   ├── Black Friday (Scheduled)
│   │   ├── Start: 2024-11-29
│   │   ├── End: 2024-11-30
│   │   └── [Edit] [Delete]
│   └── ...
├── Past Sales
│   └── ...
└── [+ Create New Sale]
```

## Features

### 1. Flash Sale Banner
```
┌─────────────────────────────────────────────────────────────┐
│ 🔥 FLASH SALE - Up to 50% OFF!                             │
│                                                             │
│    ⏰ 02 : 15 : 30 : 45                                   │
│       Hrs  Min  Sec  Ms                                     │
│                                                             │
│ [Shop Now →]                                                │
└─────────────────────────────────────────────────────────────┘
```

### 2. Product Card with Timer
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │         [3D Product]            │ │
│ │                                 │ │
│ │    ⏰ 02:15:30                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Nike Air Max 2024                   │
│ EGP 2,500                          │
│ ~~EGP 5,000~~ -50%                 │
│                                     │
│ 🔥 15 items left!                  │
│ ████████████░░░░ 75% sold          │
│                                     │
│ [Add to Cart]                       │
└─────────────────────────────────────┘
```

### 3. Countdown Timer
```
┌─────────────────────────────────────┐
│         ⏰ TIME LEFT                │
│                                     │
│    ┌─────┐ ┌─────┐ ┌─────┐        │
│    │  02 │ : │ 15  │ : │ 30 │        │
│    │ Hrs │   │ Min │   │ Sec│        │
│    └─────┘ └─────┘ └─────┘        │
└─────────────────────────────────────┘
```

## Database Schema

```sql
-- Flash Sales table
CREATE TABLE flash_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Flash Sale Products table
CREATE TABLE flash_sale_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flash_sale_id UUID REFERENCES flash_sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  original_price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2) NOT NULL,
  stock_limit INT,
  stock_sold INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(flash_sale_id, product_id)
);

-- Flash Sale Stats table
CREATE TABLE flash_sale_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flash_sale_id UUID REFERENCES flash_sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  views INT DEFAULT 0,
  adds_to_cart INT DEFAULT 0,
  purchases INT DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

```
GET    /api/flash-sales                  - Get active flash sales
GET    /api/flash-sales/[id]             - Get flash sale details
GET    /api/flash-sales/[id]/products    - Get flash sale products

POST   /api/admin/flash-sales            - Create flash sale
GET    /api/admin/flash-sales            - Get all flash sales
PUT    /api/admin/flash-sales/[id]       - Update flash sale
DELETE /api/admin/flash-sales/[id]       - Delete flash sale
POST   /api/admin/flash-sales/[id]/products - Add products to sale
DELETE /api/admin/flash-sales/[id]/products/[productId] - Remove product
GET    /api/admin/flash-sales/[id]/stats - Get sale statistics
```

## Frontend Implementation

### Countdown Timer Component
```typescript
// src/components/ui/CountdownTimer.tsx
'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: Date;
  onComplete?: () => void;
}

export function CountdownTimer({ endDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(timer);
        onComplete?.();
        return;
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  return (
    <div className="flex gap-2">
      <div className="text-center">
        <span className="text-2xl font-bold">{timeLeft.hours}</span>
        <span className="text-xs">Hrs</span>
      </div>
      <span className="text-2xl">:</span>
      <div className="text-center">
        <span className="text-2xl font-bold">{timeLeft.minutes}</span>
        <span className="text-xs">Min</span>
      </div>
      <span className="text-2xl">:</span>
      <div className="text-center">
        <span className="text-2xl font-bold">{timeLeft.seconds}</span>
        <span className="text-xs">Sec</span>
      </div>
    </div>
  );
}
```

### Flash Sale Banner
```typescript
// src/components/marketing/FlashSaleBanner.tsx
'use client';

import { CountdownTimer } from '@/components/ui/CountdownTimer';
import Link from 'next/link';

interface FlashSaleBannerProps {
  sale: {
    id: string;
    name: string;
    description: string;
    endDate: Date;
  };
}

export function FlashSaleBanner({ sale }: FlashSaleBannerProps) {
  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">🔥 {sale.name}</h3>
          <p>{sale.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <CountdownTimer endDate={sale.endDate} />
          <Link
            href={`/flash-sales/${sale.id}`}
            className="bg-white text-red-500 px-4 py-2 rounded-lg font-bold"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### Flash Sale Product Card
```typescript
// src/components/product/FlashSaleCard.tsx
'use client';

import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { ProductCard3D } from '@/components/3d/ProductCard3D';

interface FlashSaleCardProps {
  product: {
    id: string;
    name: string;
    originalPrice: number;
    salePrice: number;
    stockLimit: number;
    stockSold: number;
  };
  saleEndDate: Date;
}

export function FlashSaleCard({ product, saleEndDate }: FlashSaleCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );
  const stockLeft = product.stockLimit - product.stockSold;
  const stockPercentage = (product.stockSold / product.stockLimit) * 100;

  return (
    <div className="relative">
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
        -{discount}%
      </div>
      
      <div className="absolute top-2 right-2">
        <CountdownTimer endDate={saleEndDate} />
      </div>

      <ProductCard3D product={product} />

      <div className="mt-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>🔥 {stockLeft} items left!</span>
          <span>{Math.round(stockPercentage)}% sold</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className="bg-red-500 h-2 rounded-full"
            style={{ width: `${stockPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

## Tasks

### Task 1: Database Setup
- [ ] Create flash_sales table
- [ ] Create flash_sale_products table
- [ ] Create flash_sale_stats table

### Task 2: Dashboard Management
- [ ] Flash sale list page
- [ ] Create/edit flash sale form
- [ ] Add/remove products
- [ ] Sale statistics

### Task 3: API Implementation
- [ ] Get active sales
- [ ] Create/update/delete sales
- [ ] Add/remove products
- [ ] Track statistics

### Task 4: Frontend Components
- [ ] Countdown timer
- [ ] Flash sale banner
- [ ] Flash sale product card
- [ ] Flash sale page

### Task 5: Automatic Management
- [ ] Auto-start scheduled sales
- [ ] Auto-end expired sales
- [ ] Stock limit enforcement
- [ ] Statistics tracking

## Notes

- Sales auto-end at end_date
- Stock limits enforced
- Statistics tracked for optimization
- Mobile-responsive countdown
- Email notifications for upcoming sales
