# Point of Sale (POS) System

## Overview

نظام بيع في المحل (Point of Sale) يتكامل مع نظام الأونلاين:
- واجهة كاشير سريعة وسهلة
- بحث المنتجات بالباركود أو الاسم
- طباعة الإيصالات
- تقارير المبيعات اليومية
- إدارة صندوق النقود
- مزامنة مع المخزون الأونلاين

## Features

### 1. POS Interface
- Product grid with categories
- Quick search (barcode, name, SKU)
- Cart with quantity controls
- Multiple payment methods
- Quick checkout

### 2. Cash Register
- Open/close register
- Cash in/out tracking
- End-of-day reconciliation
- Cash drawer management

### 3. Receipt Printing
- Thermal printer support
- Custom receipt format
- Digital receipt (email/SMS)
- Return receipt

### 4. Daily Reports
- Sales summary
- Payment method breakdown
- Top selling products
- Cash register report

## Database Schema

```sql
-- POS Sessions (Cash Register)
CREATE TABLE pos_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  register_number VARCHAR(50),
  opening_balance DECIMAL(10,2) NOT NULL,
  closing_balance DECIMAL(10,2),
  expected_balance DECIMAL(10,2),
  difference DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  opened_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);

-- POS Transactions
CREATE TABLE pos_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES pos_sessions(id),
  order_id UUID REFERENCES orders(id),
  type VARCHAR(20) CHECK (type IN ('sale', 'return', 'cash_in', 'cash_out')),
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(30),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- POS Settings
CREATE TABLE pos_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name VARCHAR(255),
  store_address TEXT,
  store_phone VARCHAR(20),
  tax_rate DECIMAL(5,2) DEFAULT 14.00,
  receipt_header TEXT,
  receipt_footer TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## POS Interface Design

```
┌─────────────────────────────────────────────────────────────┐
│ 🔍 Search products...                    Session: #1234   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Categories:                                                │
│  [All] [Shoes] [Sandals] [Slippers] [Accessories]          │
│                                                             │
│  Products:                                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │  👟  │ │  👟  │ │  👟  │ │  👡  │ │  🧦  │            │
│  │Nike  │ │Adidas│ │Puma  │ │Slide │ │Socks │            │
│  │2,500 │ │3,200 │ │1,800 │ │  500 │ │  150 │            │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Current Sale                                    [Clear All] │
├─────────────────────────────────────────────────────────────┤
│ Item              Size   Qty   Price      Total            │
│ Nike Air Max      42     1     2,500      2,500            │
│ Adidas Ultraboost 40     2     3,200      6,400            │
│                              ──────────────────             │
│                              Subtotal:    8,900            │
│                              VAT (14%):   1,246            │
│                              ──────────────────             │
│                              TOTAL:      10,146            │
├─────────────────────────────────────────────────────────────┤
│ 💵 Cash    💳 Card    📱 Wallet    📱 InstaPay            │
│                                                             │
│         [Complete Sale]           [Hold]                    │
└─────────────────────────────────────────────────────────────┘
```

## API Routes

```
POST   /api/pos/sessions              - Open register
PUT    /api/pos/sessions/close        - Close register
GET    /api/pos/sessions/current      - Get current session
POST   /api/pos/transactions          - Create transaction
GET    /api/pos/transactions          - Get transactions
GET    /api/pos/reports/daily         - Daily report
GET    /api/pos/reports/sales         - Sales report
POST   /api/pos/products/lookup       - Quick product lookup
POST   /api/pos/receipt/print         - Print receipt
```

## Frontend Pages

```
/pos                 - Main POS interface
/pos/register        - Register management
/pos/reports         - Reports page
/pos/settings        - POS settings
```

## Tasks

### Task 1: POS Interface
- [ ] Build product grid component
- [ ] Create quick search
- [ ] Implement cart management
- [ ] Add payment buttons

### Task 2: Cash Register
- [ ] Open register flow
- [ ] Close register flow
- [ ] Cash in/out tracking
- [ ] Reconciliation

### Task 3: Receipt Printing
- [ ] Create receipt template
- [ ] Implement thermal printing
- [ ] Add digital receipt option
- [ ] Create return receipt

### Task 4: Reports
- [ ] Daily sales report
- [ ] Payment breakdown
- [ ] Top products
- [ ] Export to PDF/Excel

## POS Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F1 | Help |
| F2 | Search |
| F3 | Quick add by code |
| F4 | Hold sale |
| F5 | Recall held sale |
| F8 | Discount |
| F9 | Quantity |
| F12 | Complete sale |
| Esc | Cancel |
| Del | Remove item |
