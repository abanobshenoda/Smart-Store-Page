# Final Features

## Overview

المميزات النهائية:
- Abandoned Cart Recovery (استعادة السلة المتروكة)
- Smart Discounts System (نظام الخصومات الذكي)
- Static Pages (صفحات ثابتة)
- Guest Order Tracking (تتبع الطلب بدون حساب)
- Seasonal Promotions Engine (محرك العروض الموسمية)

---

## 1. Abandoned Cart Recovery

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 🛒 You left something in your cart!                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Hi Ahmed,                                                  │
│                                                             │
│ We noticed you left these items in your cart:              │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││ [👟] Nike Air Max 2024         EGP 2,500               ││
││ [👟] Adidas Ultraboost        EGP 3,200                ││
││                          Total: EGP 5,700               ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ 🎁 Complete your order in the next 24 hours and get       │
│    10% OFF with code: COMEBACK10                           │
│                                                             │
│ [Complete Your Order →]                                     │
│                                                             │
│ This offer expires in: 23:45:30                            │
└─────────────────────────────────────────────────────────────┘
```

### Recovery Flow

```
Cart Abandoned
    │
    ├── 1 Hour Later ──→ Email 1: "You left something behind"
    │
    ├── 24 Hours Later ─→ Email 2: "Still interested? Here's 10% off"
    │
    ├── 48 Hours Later ─→ Email 3: "Last chance! Free shipping"
    │
    └── 72 Hours Later ─→ Email 4: "Your cart is about to expire"
```

### Dashboard Control

```
Dashboard → Marketing → Cart Recovery
├── Enable Recovery: [Toggle ON/OFF]
├── Recovery Emails
│   ├── Email 1: [1 hour after] [Edit Template]
│   ├── Email 2: [24 hours after] [Edit Template]
│   ├── Email 3: [48 hours after] [Edit Template]
│   └── Email 4: [72 hours after] [Edit Template]
├── Discount Settings
│   ├── Offer Discount: [Toggle ON/OFF]
│   ├── Discount Type: [Percentage ▼]
│   ├── Discount Value: [10%]
│   └── Expiry Hours: [24]
└── Statistics
    ├── Recovery Rate: 12%
    ├── Revenue Recovered: EGP 45,200
    └── Emails Sent: 1,250
```

### Database Schema

```sql
-- Abandoned Carts table
CREATE TABLE abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  email VARCHAR(255),
  cart_data JSONB NOT NULL,
  cart_total DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'abandoned' CHECK (status IN (
    'abandoned', 'contacted', 'recovered', 'expired'
  )),
  discount_code VARCHAR(50),
  abandoned_at TIMESTAMP DEFAULT NOW(),
  recovered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Recovery Emails table
CREATE TABLE recovery_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  abandoned_cart_id UUID REFERENCES abandoned_carts(id),
  email_type VARCHAR(20) CHECK (email_type IN ('1hr', '24hr', '48hr', '72hr')),
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Recovery Settings table
CREATE TABLE recovery_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_active BOOLEAN DEFAULT TRUE,
  email_1_delay_minutes INT DEFAULT 60,
  email_2_delay_hours INT DEFAULT 24,
  email_3_delay_hours INT DEFAULT 48,
  email_4_delay_hours INT DEFAULT 72,
  offer_discount BOOLEAN DEFAULT TRUE,
  discount_type VARCHAR(20) DEFAULT 'percentage',
  discount_value DECIMAL(10,2) DEFAULT 10,
  discount_expiry_hours INT DEFAULT 24,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
GET    /api/admin/cart-recovery/settings      - Get settings
PUT    /api/admin/cart-recovery/settings      - Update settings
GET    /api/admin/cart-recovery/abandoned     - List abandoned carts
GET    /api/admin/cart-recovery/stats         - Get statistics
POST   /api/admin/cart-recovery/send-manual   - Send manual reminder
POST   /api/cart/track                        - Track cart (for guests)
```

---

## 2. Smart Discounts System

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 🎁 Your Special Discounts                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Welcome Discount:                                           │
│ ┌─────────────────────────────────────────────────────────┐│
││ 🎉 15% OFF your first order                             ││
││ Code: WELCOME15                                         ││
││ Expires: Nov 30, 2024                                   ││
││ [Apply to Cart]                                         ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Birthday Discount:                                          │
│ ┌─────────────────────────────────────────────────────────┐│
││ 🎂 Happy Birthday Ahmed!                                ││
││ Get 20% OFF this month                                  ││
││ Code: BIRTHDAY20                                        ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Student Discount:                                           │
│ ┌─────────────────────────────────────────────────────────┐│
││ 🎓 Student? Get 10% OFF always!                         ││
││ Verify with your student ID                             ││
││ [Verify Now]                                            ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Loyalty Discount:                                           │
│ ┌─────────────────────────────────────────────────────────┐│
││ ⭐ Gold Member: 5% OFF on all orders                    ││
││ Auto-applied at checkout                                ││
│└─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Discount Types

| Type | Value | Trigger | Auto-Apply |
|------|-------|---------|------------|
| Welcome | 15% | First order | Yes |
| Birthday | 20% | Birthday month | Yes |
| Student | 10% | Verified student | Yes |
| Loyalty | 5% | Gold members | Yes |
| Referral | EGP 100 | Friend referred | No |
| Win-back | 15% | Inactive 30 days | No |
| VIP | 10% | High spenders | Yes |

### Dashboard Control

```
Dashboard → Marketing → Smart Discounts
├── Discount Rules
│   ├── Welcome Discount
│   │   ├── Status: [Active]
│   │   ├── Value: [15%]
│   │   └── [Edit] [Delete]
│   ├── Birthday Discount
│   │   ├── Status: [Active]
│   │   ├── Value: [20%]
│   │   └── [Edit] [Delete]
│   ├── Student Discount
│   │   ├── Status: [Active]
│   │   ├── Value: [10%]
│   │   ├── Require Verification: [Yes]
│   │   └── [Edit] [Delete]
│   └── [+ Add New Rule]
├── Segments
│   ├── New Customers
│   ├── VIP Customers
│   ├── Inactive Customers
│   └── Student Customers
└── Statistics
    ├── Total Discounts Given: 1,250
    ├── Total Discount Value: EGP 125,000
    └── Conversion Rate: 45%
```

### Database Schema

```sql
-- Discount Rules table
CREATE TABLE discount_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) UNIQUE,
  type VARCHAR(30) CHECK (type IN (
    'welcome', 'birthday', 'student', 'loyalty', 
    'referral', 'winback', 'vip', 'first_order'
  )),
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  min_order_amount DECIMAL(10,2),
  max_discount_amount DECIMAL(10,2),
  applicable_products VARCHAR(20) CHECK (applicable_products IN (
    'all', 'categories', 'products', 'excluded'
  )),
  product_ids UUID[],
  category_ids UUID[],
  max_uses INT,
  used_count INT DEFAULT 0,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  is_auto_apply BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Discounts table
CREATE TABLE user_discounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  rule_id UUID REFERENCES discount_rules(id),
  code VARCHAR(50),
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Discount Usage Log
CREATE TABLE discount_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  rule_id UUID REFERENCES discount_rules(id),
  order_id UUID REFERENCES orders(id),
  discount_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
GET    /api/discounts/my                  - Get my available discounts
POST   /api/discounts/validate            - Validate discount code
GET    /api/admin/discounts/rules         - List all rules
POST   /api/admin/discounts/rules         - Create rule
PUT    /api/admin/discounts/rules/[id]    - Update rule
DELETE /api/admin/discounts/rules/[id]    - Delete rule
GET    /api/admin/discounts/stats         - Discount statistics
```

---

## 3. Static Pages (صفحات ثابتة)

### Pages

```
/about                  - عن المتجر
/contact                - اتصل بنا
/faq                    - الأسئلة الشائعة
/shipping-policy        - سياسة الشحن
/return-policy           - سياسة الإرجاع والاستبدال
/privacy-policy          - سياسة الخصوصية
/terms                   - الشروط والأحكام
/size-guide              - دليل المقاسات
/career                  - فرص العمل
```

### Dashboard Control

```
Dashboard → Content → Pages
├── Static Pages
│   ├── About Us
│   │   ├── Status: Published
│   │   ├── Last Updated: Nov 15, 2024
│   │   └── [Edit] [Preview]
│   ├── Contact Us
│   │   ├── Status: Published
│   │   └── [Edit] [Preview]
│   ├── FAQ
│   │   ├── Status: Published
│   │   ├── Questions: 25
│   │   └── [Edit] [Preview]
│   ├── Shipping Policy
│   │   └── [Edit] [Preview]
│   ├── Return Policy
│   │   └── [Edit] [Preview]
│   ├── Privacy Policy
│   │   └── [Edit] [Preview]
│   ├── Terms & Conditions
│   │   └── [Edit] [Preview]
│   └── Size Guide
│       └── [Edit] [Preview]
└── [+ Create New Page]
```

### Database Schema

```sql
-- Static Pages table
CREATE TABLE static_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  meta_title_ar VARCHAR(255),
  meta_title_en VARCHAR(255),
  meta_description_ar TEXT,
  meta_description_en TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- FAQ Items table
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES static_pages(id),
  question_ar VARCHAR(500) NOT NULL,
  question_en VARCHAR(500) NOT NULL,
  answer_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  category VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
GET    /api/pages/[slug]                  - Get page
GET    /api/pages/faq                     - Get FAQ
GET    /api/pages/size-guide              - Get size guide
GET    /api/admin/pages                   - List all pages
POST   /api/admin/pages                   - Create page
PUT    /api/admin/pages/[id]              - Update page
DELETE /api/admin/pages/[id]              - Delete page
GET    /api/admin/pages/[id]/faq          - Get FAQ items
POST   /api/admin/pages/[id]/faq          - Add FAQ item
```

---

## 4. Guest Order Tracking

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 📦 Track Your Order                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Enter your order details:                                  │
│                                                             │
│ Order Number: [SS-2024-001234]                             │
│ Email: [ahmed@example.com]                                 │
│         OR                                                 │
│ Phone: [01012345678]                                       │
│                                                             │
│ [Track Order]                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📦 Order #SS-2024-001234                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Status: Shipped 🚚                                         │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││ ✅ Confirmed      Nov 15, 2024  10:00 AM                ││
││      │                                                   ││
││ ✅ Processing     Nov 15, 2024  02:30 PM                ││
││      │                                                   ││
││ ✅ Shipped        Nov 16, 2024  09:15 AM                ││
││      │        Carrier: Aramex                           ││
││      │        Tracking: AR123456789                     ││
││      │                                                   ││
││ ⏳ Estimated      Nov 18-19, 2024                       ││
││    Delivery                                              ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Items:                                                      │
│ 👟 Nike Air Max 2024 (Size 42)    EGP 2,500              │
│                                                             │
│ Shipping Address:                                           │
│ Ahmed Mohamed                                               │
│ Cairo, Nasr City, Street 15                                │
│ 01012345678                                                │
│                                                             │
│ [Track on Carrier Website]                                 │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard Control

```
Dashboard → Settings → Orders
├── Guest Tracking
│   ├── Enable Guest Tracking: [Toggle ON/OFF]
│   ├── Require Email: [Toggle ON/OFF]
│   ├── Require Phone: [Toggle ON/OFF]
│   └── Show Carrier Link: [Toggle ON/OFF]
```

### Database Schema

```sql
-- Guest Tracking Tokens
CREATE TABLE guest_tracking_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tracking Access Log
CREATE TABLE tracking_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  accessed_by VARCHAR(255),
  access_type VARCHAR(20) CHECK (access_type IN ('email', 'phone', 'token')),
  ip_address INET,
  accessed_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
POST   /api/orders/track                  - Track order (guest)
GET    /api/orders/track/[token]          - Get order status (token)
GET    /api/orders/track/[orderId]/status - Get order status
```

---

## 5. Seasonal Promotions Engine

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 🎉 Ramadan Sale - Up to 50% OFF!                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││                    [Hero Image]                          ││
││                                                          ││
││            رمضان كريم مع Smart Store                     ││
││                                                          ││
││         خصم يصل إلى 50% على جميع المنتجات              ││
││                                                          ││
││              ⏰ ينتهي العرض خلال:                        ││
││              05 : 12 : 30 : 45                           ││
││                 يوم  ساعة  دقيقة  ثانية                   ││
││                                                          ││
││                  [تسوق الآن]                             ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Featured Products:                                          │
│ [👟] [👟] [👟] [👟] [👟]                                 │
└─────────────────────────────────────────────────────────────┘
```

### Supported Seasons

| Season | Theme | Discount | Duration |
|--------|-------|----------|----------|
| Ramadan | 🌙 Green/Gold | Up to 50% | 30 days |
| Eid Al-Fitr | 🎉 Festive | Up to 40% | 3 days |
| Eid Al-Adha | 🐑 Traditional | Up to 30% | 4 days |
| Back to School | 📚 Blue/White | Up to 35% | 2 weeks |
| Black Friday | 🖤 Black/Red | Up to 60% | 1 week |
| White Friday | ⬜ White/Blue | Up to 50% | 1 week |
| Summer Sale | ☀️ Yellow/Blue | Up to 40% | 1 month |
| Winter Sale | ❄️ Blue/White | Up to 30% | 1 month |
| New Year | 🎆 Gold/Silver | Up to 25% | 1 week |
| Valentine's | ❤️ Red/Pink | Up to 20% | 1 week |

### Dashboard Control

```
Dashboard → Marketing → Seasonal Promotions
├── Active Promotions
│   ├── Ramadan Sale (Active)
│   │   ├── Start: Mar 1, 2024
│   │   ├── End: Mar 30, 2024
│   │   ├── Discount: Up to 50%
│   │   ├── Products: 150
│   │   └── [Edit] [End Now]
│   └── ...
├── Scheduled Promotions
│   ├── Eid Al-Fitr (Scheduled)
│   │   ├── Start: Apr 10, 2024
│   │   └── [Edit] [Delete]
│   └── ...
├── Past Promotions
│   └── ...
└── [+ Create New Promotion]

Promotion Settings:
├── Theme: [Ramadan ▼]
├── Hero Banner: [Upload]
├── Background Color: [#1a5d1a]
├── Text Color: [#FFD700]
├── Countdown Timer: [ON]
├── Featured Products: [Auto ▼]
└── Custom Banner Text: [رمضان كريم مع Smart Store]
```

### Database Schema

```sql
-- Seasonal Promotions table
CREATE TABLE seasonal_promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  season VARCHAR(50) NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  banner_url TEXT,
  theme_color VARCHAR(7),
  text_color VARCHAR(7),
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2),
  min_order_amount DECIMAL(10,2),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Promotion Products table
CREATE TABLE promotion_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id UUID REFERENCES seasonal_promotions(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  original_price DECIMAL(10,2) NOT NULL,
  promo_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Promotion Banners table
CREATE TABLE promotion_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id UUID REFERENCES seasonal_promotions(id) ON DELETE CASCADE,
  position VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Promotion Stats table
CREATE TABLE promotion_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id UUID REFERENCES seasonal_promotions(id) ON DELETE CASCADE,
  views INT DEFAULT 0,
  clicks INT DEFAULT 0,
  orders INT DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
GET    /api/promotions                    - Get active promotions
GET    /api/promotions/[slug]             - Get promotion details
GET    /api/promotions/[slug]/products    - Get promotion products
POST   /api/admin/promotions              - Create promotion
GET    /api/admin/promotions              - List all promotions
PUT    /api/admin/promotions/[id]         - Update promotion
DELETE /api/admin/promotions/[id]         - Delete promotion
POST   /api/admin/promotions/[id]/products - Add products
GET    /api/admin/promotions/[id]/stats   - Get promotion stats
```

---

## Summary

| Feature | Database Tables | API Routes | Dashboard Control |
|---------|----------------|------------|-------------------|
| Abandoned Cart Recovery | abandoned_carts, recovery_emails, recovery_settings | 5 | ✅ |
| Smart Discounts | discount_rules, user_discounts, discount_usage_log | 7 | ✅ |
| Static Pages | static_pages, faq_items | 10 | ✅ |
| Guest Order Tracking | guest_tracking_tokens, tracking_access_log | 3 | ✅ |
| Seasonal Promotions | seasonal_promotions, promotion_products, promotion_banners, promotion_stats | 9 | ✅ |

## Additional Database Tables: 13
## Additional API Routes: 34
## Total New Features: 5
