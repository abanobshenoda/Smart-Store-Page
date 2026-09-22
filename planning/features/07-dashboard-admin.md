# Admin Dashboard

## Overview

لوحة تحكم شاملة لإدارة المتجر:
- عرض المبيعات والإحصائيات
- إدارة المنتجات
- إدارة الطلبات
- إدارة العملاء
- إعدادات المتجر

## Features

### 1. Dashboard Overview
- Revenue charts (daily, weekly, monthly)
- Order statistics
- Top selling products
- Recent orders
- Low stock alerts
- Customer growth

### 2. Product Management
- Add/edit/delete products
- Bulk import/export
- Image management
- Variant management
- Category management
- Brand management

### 3. Order Management
- View all orders
- Filter by status, date, customer
- Update order status
- Print invoices
- Process refunds

### 4. Customer Management
- View all customers
- Customer details
- Order history
- Customer groups
- Export customer data

### 5. Settings
- Store information
- Tax settings
- Shipping rates
- Payment methods
- Email templates
- User management

## Database Schema

```sql
-- Admin Audit Log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  old_value JSONB,
  new_value JSONB,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Settings
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Email Templates
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  html_body TEXT NOT NULL,
  variables JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Dashboard UI Design

```
┌─────────────────────────────────────────────────────────────┐
│ Smart Store Dashboard                                       │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ 📊 Home  │  Today's Summary                                 │
│          │  ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ 📦 Products│ │ Revenue │ │ Orders  │ │Customers│           │
│          │ │ 45,200  │ │   12    │ │    8    │           │
│ 📋 Orders│ │  +12%   │ │  +5%    │ │  +3%    │           │
│          │ └─────────┘ └─────────┘ └─────────┘           │
│ 👥 Customers                                                 │
│          │  Revenue Chart (Last 7 Days)                      │
│ 💳 POS  │  ┌────────────────────────────────┐              │
│          │  │ 📈                           │              │
│ 📈 Reports│ │    /\/\/\                     │              │
│          │  │   /      \    /\/\           │              │
│ ⚙️ Settings│ │__/        \__/    \__        │              │
│          │  └────────────────────────────────┘              │
│          │                                                  │
│          │  Recent Orders                                   │
│          │  ┌────────────────────────────────────┐          │
│          │  │ #SS-1234  Ahmed     2,500  Shipped │          │
│          │  │ #SS-1233  Mona      3,200  Pending │          │
│          │  │ #SS-1232  Ali       1,800  Delivered│         │
│          │  └────────────────────────────────────┘          │
│          │                                                  │
│          │  Top Products                                    │
│          │  1. Nike Air Max     (45 sold)                   │
│          │  2. Adidas Ultraboost (38 sold)                  │
│          │  3. Puma RS-X       (32 sold)                   │
└──────────┴──────────────────────────────────────────────────┘
```

## API Routes

```
GET    /api/admin/dashboard/stats      - Dashboard statistics
GET    /api/admin/dashboard/charts     - Chart data
GET    /api/admin/products             - Get all products
POST   /api/admin/products             - Create product
PUT    /api/admin/products/[id]        - Update product
DELETE /api/admin/products/[id]        - Delete product
POST   /api/admin/products/import      - Bulk import
GET    /api/admin/products/export      - Export products
GET    /api/admin/orders               - Get all orders
PUT    /api/admin/orders/[id]          - Update order
GET    /api/admin/customers            - Get all customers
GET    /api/admin/customers/[id]       - Get customer details
GET    /api/admin/reports/sales        - Sales report
GET    /api/admin/reports/products     - Product report
GET    /api/admin/reports/customers    - Customer report
GET    /api/admin/settings             - Get settings
PUT    /api/admin/settings             - Update settings
GET    /api/admin/audit-log            - Get audit logs
```

## Frontend Pages

```
/admin                - Dashboard home
/admin/products       - Product list
/admin/products/new   - Add product
/admin/products/[id]  - Edit product
/admin/orders         - Order list
/admin/orders/[id]    - Order details
/admin/customers      - Customer list
/admin/customers/[id] - Customer details
/admin/reports        - Reports
/admin/settings       - Settings
/admin/users          - User management
```

## Tasks

### Task 1: Dashboard Home
- [ ] Create stats cards
- [ ] Build revenue chart
- [ ] Create recent orders table
- [ ] Add top products list
- [ ] Implement low stock alerts

### Task 2: Product Management
- [ ] Build product list page
- [ ] Create product form (add/edit)
- [ ] Implement image upload
- [ ] Add bulk actions
- [ ] Create category management
- [ ] Create brand management

### Task 3: Order Management
- [ ] Build order list page
- [ ] Create order detail page
- [ ] Implement status updates
- [ ] Add filters and search
- [ ] Create invoice printing

### Task 4: Customer Management
- [ ] Build customer list page
- [ ] Create customer detail page
- [ ] Implement customer groups
- [ ] Add export functionality

### Task 5: Settings
- [ ] Store information settings
- [ ] Tax settings
- [ ] Shipping rate settings
- [ ] Payment method settings
- [ ] Email template editor

## Dashboard Charts

### Revenue Chart
- Line chart showing daily revenue
- Compare with previous period
- Toggle between daily/weekly/monthly

### Orders Chart
- Bar chart showing order count
- Breakdown by status
- Trend analysis

### Products Chart
- Pie chart of sales by category
- Top selling products
- Stock levels

## Access Control

| Role | Access |
|------|--------|
| Admin | Full access |
| Manager | Products, Orders, Customers, Reports |
| POS User | POS only |
| Staff | View only |
