# Analytics & Reports

## Overview

نظام التقارير والتحليلات الشامل:
- تقارير المبيعات
- تقارير المنتجات
- تقارير العملاء
- تقارير المخزون
- لوحات تحكم تفاعلية

## Features

### 1. Sales Reports
- Daily/Weekly/Monthly sales
- Revenue by category
- Revenue by brand
- Payment method breakdown
- Compare periods

### 2. Product Reports
- Top selling products
- Low performing products
- Stock levels
- Product views (future)

### 3. Customer Reports
- New vs returning customers
- Customer lifetime value
- Geographic distribution
- Purchase patterns

### 4. Dashboard Charts
- Revenue trends
- Order trends
- Category distribution
- Payment method pie chart

## Database Schema

```sql
-- Daily Sales Summary (Materialized View)
CREATE MATERIALIZED VIEW daily_sales_summary AS
SELECT 
  DATE(created_at) as sale_date,
  COUNT(*) as total_orders,
  SUM(total_amount) as total_revenue,
  AVG(total_amount) as avg_order_value,
  COUNT(DISTINCT user_id) as unique_customers
FROM orders
WHERE status != 'cancelled'
GROUP BY DATE(created_at)
ORDER BY sale_date DESC;

-- Product Performance
CREATE MATERIALIZED VIEW product_performance AS
SELECT 
  p.id as product_id,
  p.name_en,
  COUNT(oi.id) as times_sold,
  SUM(oi.quantity) as units_sold,
  SUM(oi.total_price) as total_revenue,
  AVG(r.rating) as avg_rating
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN product_reviews r ON p.id = r.product_id
GROUP BY p.id, p.name_en;

-- Report Settings
CREATE TABLE report_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type VARCHAR(50) NOT NULL,
  frequency VARCHAR(20) CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  recipients TEXT[],
  format VARCHAR(10) DEFAULT 'pdf',
  is_active BOOLEAN DEFAULT TRUE,
  last_sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

```
GET    /api/admin/reports/sales              - Sales report
GET    /api/admin/reports/sales/summary      - Sales summary
GET    /api/admin/reports/products           - Product report
GET    /api/admin/reports/products/top       - Top products
GET    /api/admin/reports/customers          - Customer report
GET    /api/admin/reports/inventory          - Inventory report
GET    /api/admin/reports/revenue            - Revenue report
POST   /api/admin/reports/export             - Export report
GET    /api/admin/reports/charts             - Chart data
```

## Reports Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Reports & Analytics                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Period: [Last 7 Days ▼]  [Compare with: Previous Period]   │
│                                                             │
│ Key Metrics:                                                │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│ │ Revenue │ │  Orders │ │ Avg Ord │ │  Items  │          │
│ │ 125,000 │ │   156   │ │   801   │ │   312   │          │
│ │  +15%   │ │  +12%   │ │  +8%    │ │  +10%   │          │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│ Revenue Trend                                               │
│ ┌────────────────────────────────────────┐                 │
│ │ 📈                                    │                 │
│ │      /\      /\                       │                 │
│ │     /  \    /  \    /\                │                 │
│ │    /    \  /    \  /  \               │                 │
│ │   /      \/      \/    \__            │                 │
│ │  Mon Tue Wed Thu Fri Sat Sun          │                 │
│ └────────────────────────────────────────┘                 │
│                                                             │
│ Sales by Category                                           │
│ ┌────────────────────────────────────────┐                 │
│ │ Men's Shoes      ████████████  45%    │                 │
│ │ Women's Shoes    ████████     30%     │                 │
│ │ Kids' Shoes      █████        15%     │                 │
│ │ Accessories      ███          10%     │                 │
│ └────────────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

## Tasks

### Task 1: Sales Reports
- [ ] Create sales summary API
- [ ] Build sales report page
- [ ] Implement date range picker
- [ ] Add comparison feature

### Task 2: Product Reports
- [ ] Top products report
- [ ] Low performing products
- [ ] Stock level report
- [ ] Category performance

### Task 3: Customer Reports
- [ ] New vs returning customers
- [ ] Customer segmentation
- [ ] Geographic report
- [ ] Lifetime value

### Task 4: Charts & Visualization
- [ ] Revenue trend chart
- [ ] Category distribution pie
- [ ] Payment method breakdown
- [ ] Customer growth chart

### Task 5: Export & Scheduling
- [ ] PDF export
- [ ] Excel export
- [ ] Email scheduling
- [ ] Report templates
