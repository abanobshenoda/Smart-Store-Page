# Customer Management

## Overview

نظام إدارة العملاء الشامل:
- ملفات العملاء
- تاريخ المشتريات
- مجموعات العملاء
- التسويق عبر البريد الإلكتروني
- برنامج الولاء

## Features

### 1. Customer Profiles
- Personal information
- Order history
- Wishlist
- Addresses
- Communication preferences

### 2. Customer Groups
- VIP customers
- Wholesale customers
- Regular customers
- New customers

### 3. Loyalty Program
- Points system
- Reward tiers
- Birthday rewards
- Referral program

### 4. Email Marketing
- Newsletter subscription
- Promotional emails
- Abandoned cart emails
- Order updates

## Database Schema

```sql
-- Customer Groups
CREATE TABLE customer_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Customer Group Members
CREATE TABLE customer_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES users(id),
  group_id UUID REFERENCES customer_groups(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(customer_id, group_id)
);

-- Loyalty Points
CREATE TABLE loyalty_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  points INT NOT NULL,
  type VARCHAR(20) CHECK (type IN ('earned', 'redeemed', 'expired')),
  reference_type VARCHAR(50),
  reference_id UUID,
  description TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Loyalty Settings
CREATE TABLE loyalty_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  points_per_egp DECIMAL(5,2) DEFAULT 1.00,
  redemption_rate DECIMAL(5,2) DEFAULT 0.50,
  min_points_redemption INT DEFAULT 100,
  expiry_months INT DEFAULT 12,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP
);

-- Abandoned Carts
CREATE TABLE abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  email VARCHAR(255),
  cart_data JSONB,
  recovered BOOLEAN DEFAULT FALSE,
  recovered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

```
GET    /api/admin/customers              - Get all customers
GET    /api/admin/customers/[id]         - Get customer details
PUT    /api/admin/customers/[id]         - Update customer
GET    /api/admin/customers/[id]/orders  - Get customer orders
POST   /api/admin/customers/groups       - Create customer group
GET    /api/admin/customers/groups       - Get customer groups
POST   /api/admin/customers/[id]/groups  - Add customer to group
GET    /api/admin/customers/export       - Export customers
GET    /api/admin/loyalty/settings       - Get loyalty settings
PUT    /api/admin/loyalty/settings       - Update loyalty settings
GET    /api/admin/loyalty/points         - Get loyalty points
POST   /api/admin/newsletter/send        - Send newsletter
GET    /api/admin/newsletter/subscribers - Get subscribers
```

## Customer Profile UI

```
┌─────────────────────────────────────────────────────────────┐
│ Customer: Ahmed Mohamed                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Contact Information:                                        │
│ Email: ahmed@example.com                                    │
│ Phone: 01012345678                                          │
│ Member Since: Jan 2024                                      │
│                                                             │
│ Order Summary:                                              │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│ │  Total  │ │  Orders │ │  Points │ │  Group  │          │
│ │ 25,000  │ │    8    │ │  2,500  │ │   VIP   │          │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│ Recent Orders:                                              │
│ #SS-1234  Nov 15  2,500  Delivered                          │
│ #SS-1200  Nov 10  3,200  Delivered                          │
│ #SS-1150  Nov 05  1,800  Delivered                          │
│                                                             │
│ Addresses:                                                  │
│ 🏠 Cairo, Nasr City, St 15                                 │
│ 🏢 Giza, Downtown, St 20                                   │
└─────────────────────────────────────────────────────────────┘
```

## Tasks

### Task 1: Customer Profiles
- [ ] Build customer list page
- [ ] Create customer detail page
- [ ] Implement customer search
- [ ] Add customer export

### Task 2: Customer Groups
- [ ] Create group management
- [ ] Implement group discounts
- [ ] Build group assignment
- [ ] Add group-based pricing

### Task 3: Loyalty Program
- [ ] Implement points system
- [ ] Create points earning rules
- [ ] Build points redemption
- [ ] Add tier system

### Task 4: Email Marketing
- [ ] Newsletter subscription
- [ ] Email campaign builder
- [ ] Abandoned cart recovery
- [ ] Email templates
