# Checkout & Payment Integration

## Overview

نظام الدفع الكامل يدعم:
- خطوات الدفع المتعددة
- طرق الدفع المتعددة
- حساب الشحن
- تأكيد الطلب
- إشعارات البريد الإلكتروني

## Features

### 1. Checkout Flow
```
Cart → Address → Payment → Confirmation
```

### 2. Address Selection
- Saved addresses
- Add new address
- Governorate-based shipping

### 3. Payment Methods
- Credit/Debit Card (Visa, Mastercard)
- Mobile Wallets (Vodafone Cash, Orange Cash, Etisalat Cash)
- InstaPay
- Cash on Delivery (COD)
- Bank Transfer

### 4. Shipping Options
- Standard (3-5 business days)
- Express (1-2 business days)
- Same day (Cairo & Giza only)
- Store pickup

## Database Schema

```sql
-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'processing', 'shipped', 
    'delivered', 'cancelled', 'refunded'
  )),
  subtotal DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  coupon_code VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order Addresses
CREATE TABLE order_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  type VARCHAR(20) CHECK (type IN ('shipping', 'billing')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  governorate VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  street TEXT NOT NULL,
  building VARCHAR(50),
  apartment VARCHAR(50),
  landmark VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  method VARCHAR(30) CHECK (method IN (
    'credit_card', 'debit_card', 'vodafone_cash',
    'orange_cash', 'etisalat_cash', 'instapay',
    'cod', 'bank_transfer'
  )),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending', 'processing', 'completed', 'failed', 'refunded'
  )),
  amount DECIMAL(10,2) NOT NULL,
  transaction_id VARCHAR(255),
  gateway_response JSONB,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Shipping
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  carrier VARCHAR(100),
  tracking_number VARCHAR(255),
  status VARCHAR(30) DEFAULT 'pending',
  estimated_delivery DATE,
  actual_delivery DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Governorates & Shipping Rates
CREATE TABLE governorates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  standard_rate DECIMAL(10,2) NOT NULL,
  express_rate DECIMAL(10,2) NOT NULL,
  same_day_rate DECIMAL(10,2),
  standard_days INT DEFAULT 3,
  express_days INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE
);
```

## API Routes

```
GET    /api/checkout                 - Get checkout data
POST   /api/checkout/address         - Save address
GET    /api/checkout/shipping        - Get shipping options
POST   /api/checkout/payment         - Process payment
POST   /api/checkout/confirm         - Confirm order
GET    /api/orders                   - Get user orders
GET    /api/orders/[id]              - Get order details
POST   /api/orders/[id]/cancel       - Cancel order
GET    /api/orders/[id]/track        - Track order
POST   /api/payments/webhook         - Payment gateway webhook
```

## Frontend Pages

```
/checkout              - Checkout page (multi-step)
/checkout/address      - Address step
/checkout/payment      - Payment step
/checkout/confirmation - Order confirmation
/orders                - Order history
/orders/[id]           - Order details
/orders/[id]/track     - Order tracking
```

## Checkout UI Design

### Step 1: Address
```
┌─────────────────────────────────────────┐
│ Checkout                    Step 1/3     │
├─────────────────────────────────────────┤
│ 📍 Select Delivery Address              │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🏠 Home                            │ │
│ │ Cairo, Nasr City, St 15...         │ │
│ │ 01012345678                        │ │
│ │                        [Selected ✓] │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🏢 Office                           │ │
│ │ Giza, Downtown, St 20...           │ │
│ │ 01098765432                        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [+ Add New Address]                     │
│                                         │
│ [Continue to Payment →]                 │
└─────────────────────────────────────────┘
```

### Step 2: Payment
```
┌─────────────────────────────────────────┐
│ Checkout                    Step 2/3     │
├─────────────────────────────────────────┤
│ 💳 Select Payment Method                │
│                                         │
│ ○ 💳 Credit/Debit Card                 │
│ ○ 📱 Vodafone Cash                     │
│ ○ 📱 Orange Cash                       │
│ ○ 📱 Etisalat Cash                     │
│ ○ 📱 InstaPay                         │
│ ○ 💵 Cash on Delivery                  │
│                                         │
│ Order Summary:                          │
│ Subtotal:        EGP 8,900             │
│ Shipping:         EGP 50               │
│ VAT:             EGP 1,176             │
│ Total:          EGP 10,126             │
│                                         │
│ [← Back]              [Place Order →]   │
└─────────────────────────────────────────┘
```

## Tasks

### Task 1: Checkout Flow
- [ ] Create multi-step checkout
- [ ] Implement address management
- [ ] Build shipping calculator
- [ ] Create payment selection

### Task 2: Payment Integration
- [ ] Integrate Stripe (cards)
- [ ] Integrate Fawry (mobile wallets)
- [ ] Implement COD
- [ ] Create payment webhook handler

### Task 3: Order Management
- [ ] Create order confirmation page
- [ ] Build order history page
- [ ] Implement order tracking
- [ ] Add order cancellation

### Task 4: Email Notifications
- [ ] Order confirmation email
- [ ] Shipping notification
- [ ] Delivery confirmation
- [ ] Refund notification

## Validation Rules

### Address
- Governorate: Required
- City: Required
- Street: Required, min 5 chars
- Phone: Egyptian format

### Payment
- Card: Valid card number, expiry, CVV
- Mobile wallet: Valid phone number
- COD: No validation needed

## Shipping Rates (Egypt)

| Governorate | Standard (3-5 days) | Express (1-2 days) | Same Day |
|-------------|---------------------|-------------------|----------|
| Cairo | EGP 40 | EGP 70 | EGP 100 |
| Giza | EGP 40 | EGP 70 | EGP 100 |
| Alexandria | EGP 50 | EGP 80 | N/A |
| Other | EGP 60-80 | EGP 100-120 | N/A |
