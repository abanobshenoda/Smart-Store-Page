# Recently Viewed Products

## Overview

عرض المنتجات اللي المستخدم شافها مؤخراً:
- تتبع المنتجات المُشاهدة
- عرض في صفحات متعددة
- حفظ في localStorage + Database
- تحكم من الـ Dashboard

## Dashboard Control

### Feature Toggle
```
Dashboard → Settings → Features → Recently Viewed
├── Enable Feature: [Toggle ON/OFF]
├── Max Products to Show: [10 ▼]
├── Show on Home Page: [Toggle ON/OFF]
├── Show on Product Page: [Toggle ON/OFF]
├── Show on Cart Page: [Toggle ON/OFF]
└── Tracking Period: [30 days ▼]
```

## Features

### 1. Automatic Tracking
- Track product views automatically
- Store in localStorage (guests)
- Store in database (logged in users)
- Deduplicate products

### 2. Display Locations
```
┌─────────────────────────────────────┐
│ Home Page                           │
│ ┌─────────────────────────────────┐ │
│ │ Recently Viewed                 │ │
│ │ [👟] [👟] [👟] [👟] [👟]     │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Product Detail Page                 │
│ ┌─────────────────────────────────┐ │
│ │ You May Also Like               │ │
│ │ [👟] [👟] [👟] [👟]           │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Cart Page                           │
│ ┌─────────────────────────────────┐ │
│ │ Recently Viewed                 │ │
│ │ [👟] [👟] [👟]                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Database Schema

```sql
-- Recently Viewed Products table
CREATE TABLE recently_viewed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id),
  UNIQUE(session_id, product_id)
);

-- Index for fast queries
CREATE INDEX idx_recently_viewed_user ON recently_viewed(user_id, viewed_at DESC);
CREATE INDEX idx_recently_viewed_session ON recently_viewed(session_id, viewed_at DESC);
```

## API Routes

```
POST   /api/recently-viewed           - Track product view
GET    /api/recently-viewed           - Get recently viewed products
DELETE /api/recently-viewed/[id]      - Remove from recently viewed
DELETE /api/recently-viewed           - Clear all recently viewed
```

## Frontend Implementation

### Tracking Hook
```typescript
// src/hooks/useRecentlyViewed.ts
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useRecentlyViewed(productId: string) {
  const { data: session } = useSession();

  useEffect(() => {
    if (productId) {
      // Save to localStorage
      const recentlyViewed = JSON.parse(
        localStorage.getItem('recentlyViewed') || '[]'
      );
      
      // Remove if already exists
      const filtered = recentlyViewed.filter(
        (id: string) => id !== productId
      );
      
      // Add to beginning
      filtered.unshift(productId);
      
      // Keep only last 20
      const limited = filtered.slice(0, 20);
      
      localStorage.setItem('recentlyViewed', JSON.stringify(limited));

      // Also save to API if logged in
      if (session) {
        fetch('/api/recently-viewed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
      }
    }
  }, [productId, session]);
}
```

### Component
```typescript
// src/components/product/RecentlyViewed.tsx
'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';

interface RecentlyViewedProps {
  maxItems?: number;
  title?: string;
}

export function RecentlyViewed({ 
  maxItems = 10, 
  title = 'Recently Viewed' 
}: RecentlyViewedProps) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const localIds = JSON.parse(
        localStorage.getItem('recentlyViewed') || '[]'
      );
      
      if (localIds.length > 0) {
        const response = await fetch(
          `/api/products/recently-viewed?ids=${localIds.join(',')}`
        );
        const data = await response.json();
        setProducts(data.products.slice(0, maxItems));
      }
      
      setLoading(false);
    };

    fetchRecentlyViewed();
  }, [maxItems]);

  if (loading || products.length === 0) return null;

  return (
    <section>
      <h2>{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
```

## Tasks

### Task 1: Database Setup
- [ ] Create recently_viewed table
- [ ] Add indexes
- [ ] Create cleanup job (old entries)

### Task 2: API Implementation
- [ ] Track view endpoint
- [ ] Get recently viewed endpoint
- [ ] Remove endpoint
- [ ] Clear endpoint

### Task 3: Frontend Tracking
- [ ] Create tracking hook
- [ ] Add to product detail page
- [ ] Handle guest users (localStorage)
- [ ] Handle logged in users (API)

### Task 4: Display Components
- [ ] RecentlyViewed component
- [ ] Add to home page
- [ ] Add to product page
- [ ] Add to cart page

### Task 5: Dashboard Controls
- [ ] Feature toggle
- [ ] Display settings
- [ ] Max items setting
- [ ] Clear history option

## Notes

- Maximum 20 products stored per user
- Automatic cleanup after 30 days
- Deduplicate products
- Show products in order of viewed time
- Privacy-friendly (opt-out available)
