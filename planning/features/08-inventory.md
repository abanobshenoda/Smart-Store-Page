# Inventory Management System

## Overview

نظام إدارة المخزون الكامل:
- تتبع المخزون بالوقت الحقيقي
- تنبيهات المخزون المنخفض
- إدارة Variants (مقاس + لون)
- تقارير المخزون
- مزامنة بين الأونلاين والبوز

## Features

### 1. Real-time Stock Tracking
- Stock levels per variant
- Stock history
- Stock adjustments
- Stock transfer between locations

### 2. Low Stock Alerts
- Configurable thresholds
- Email notifications
- Dashboard alerts
- Auto-reorder suggestions

### 3. Stock Management
- Manual stock adjustment
- Bulk stock update
- Stock count/inventory check
- Damage/loss tracking

### 4. Multi-location Support
- Main warehouse
- Store locations
- Stock transfer between locations

## Database Schema

```sql
-- Stock Movements
CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID REFERENCES product_variants(id),
  type VARCHAR(20) CHECK (type IN (
    'purchase', 'sale', 'return', 'adjustment', 
    'transfer', 'damage', 'loss'
  )),
  quantity INT NOT NULL,
  reference_type VARCHAR(50),
  reference_id UUID,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Stock Alerts
CREATE TABLE stock_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID REFERENCES product_variants(id),
  threshold INT DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE,
  last_notified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inventory Counts
CREATE TABLE inventory_counts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  notes TEXT,
  started_by UUID REFERENCES users(id),
  completed_by UUID REFERENCES users(id),
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Inventory Count Items
CREATE TABLE inventory_count_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  count_id UUID REFERENCES inventory_counts(id),
  variant_id UUID REFERENCES product_variants(id),
  system_quantity INT NOT NULL,
  counted_quantity INT,
  difference INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

```
GET    /api/admin/inventory               - Get inventory
GET    /api/admin/inventory/low-stock     - Get low stock items
POST   /api/admin/inventory/adjust        - Adjust stock
POST   /api/admin/inventory/bulk-update   - Bulk stock update
GET    /api/admin/inventory/movements     - Stock movement history
POST   /api/admin/inventory/count         - Start inventory count
PUT    /api/admin/inventory/count/[id]    - Update count
POST   /api/admin/inventory/count/[id]/complete - Complete count
GET    /api/admin/inventory/transfers     - Get transfers
POST   /api/admin/inventory/transfers     - Create transfer
```

## Inventory Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Inventory Management                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Summary:                                                    │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│ │ Total   │ │ In Stock│ │Low Stock│ │  Out    │          │
│ │  1,250  │ │  1,180  │ │   45    │ │   25    │          │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│ ⚠️ Low Stock Alerts                                         │
│ ┌────────────────────────────────────────────┐             │
│ │ Nike Air Max 42 Black      Stock: 2        │             │
│ │ Adidas Ultraboost 40 White Stock: 3        │             │
│ │ Puma RS-X 43 Red           Stock: 1        │             │
│ └────────────────────────────────────────────┘             │
│                                                             │
│ Recent Movements                                            │
│ ┌────────────────────────────────────────────┐             │
│ │ Date       Product        Type      Qty    │             │
│ │ Nov 15     Nike Air Max   Sale     -2      │             │
│ │ Nov 14     Adidas         Purchase +50     │             │
│ │ Nov 13     Puma RS-X      Return  +1       │             │
│ └────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

## Tasks

### Task 1: Stock Tracking
- [ ] Implement stock movement logging
- [ ] Create stock level queries
- [ ] Build stock history page
- [ ] Add stock adjustment API

### Task 2: Low Stock Alerts
- [ ] Create alert thresholds
- [ ] Implement notification system
- [ ] Build alert dashboard
- [ ] Add email notifications

### Task 3: Inventory Counts
- [ ] Create count session
- [ ] Build count interface
- [ ] Implement count comparison
- [ ] Add adjustment after count

### Task 4: Reporting
- [ ] Stock level report
- [ ] Movement history report
- [ ] Stock valuation report
- [ ] Slow-moving items report
