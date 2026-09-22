# Order Management System

## Overview

نظام إدارة الطلبات الكامل:
- تتبع الطلبات من التأكيد للتوصيل
- إدارة حالات الطلب
- إشعارات للمستخدمين
- إدارة المرتجعات

## Features

### 1. Order Status Flow
```
pending → confirmed → processing → shipped → delivered
    ↓         ↓           ↓          ↓
cancelled  cancelled   cancelled  returned
```

### 2. Customer Features
- View order history
- Track order status
- Cancel order (before shipping)
- Request return

### 3. Admin Features
- View all orders
- Update order status
- Process refunds
- Print invoices
- Export orders

## Database Schema

```sql
-- Order Status History
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL,
  notes TEXT,
  changed_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Returns
CREATE TABLE returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  user_id UUID REFERENCES users(id),
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending', 'approved', 'rejected', 'received', 'refunded'
  )),
  refund_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Return Items
CREATE TABLE return_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id UUID REFERENCES returns(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES order_items(id),
  quantity INT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

```
GET    /api/admin/orders              - Get all orders (admin)
GET    /api/admin/orders/[id]         - Get order details (admin)
PUT    /api/admin/orders/[id]/status  - Update order status
GET    /api/admin/orders/stats        - Get order statistics
POST   /api/admin/orders/[id]/refund  - Process refund
GET    /api/orders                    - Get user orders
GET    /api/orders/[id]               - Get order details
POST   /api/orders/[id]/cancel        - Cancel order
POST   /api/orders/[id]/return        - Request return
GET    /api/orders/[id]/track         - Track order
```

## Order Tracking UI

```
┌─────────────────────────────────────────┐
│ Order #SS-2024-001234                   │
├─────────────────────────────────────────┤
│                                         │
│ ✅ Confirmed    Nov 15, 2024           │
│      │                                  │
│ ✅ Processing   Nov 16, 2024           │
│      │                                  │
│ ✅ Shipped      Nov 17, 2024           │
│      │        Tracking: AR123456789     │
│      │                                  │
│ ⏳ Delivery     Nov 19, 2024           │
│        Expected                         │
│                                         │
├─────────────────────────────────────────┤
│ Items:                                  │
│ 👟 Nike Air Max 42 Black    x1  2,500  │
│ 👟 Adidas Ultraboost 40     x2  6,400  │
│                                         │
│ Total: EGP 8,900                        │
│ Status: Shipped                         │
└─────────────────────────────────────────┘
```

## Tasks

### Task 1: Order Status Management
- [ ] Create status transition logic
- [ ] Add status history tracking
- [ ] Implement status notifications
- [ ] Create admin status update

### Task 2: Order Tracking
- [ ] Build tracking page
- [ ] Create tracking timeline component
- [ ] Integrate with shipping API
- [ ] Add real-time updates

### Task 3: Returns & Refunds
- [ ] Create return request form
- [ ] Implement return approval workflow
- [ ] Process refunds
- [ ] Update inventory on return

### Task 4: Notifications
- [ ] Order confirmation email
- [ ] Status update notifications
- [ ] Shipping notification
- [ ] Delivery confirmation
