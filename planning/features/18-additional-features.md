# Additional Features

## Overview

ميزات إضافية شاملة:
- Multi-Store Transfers (نقل بين الفروع)
- Pre-Order System (طلبات مسبقة)
- Waitlist (قائمة الانتظار)
- Smart Shipping Calculator (حاسبة الشحن الذكية)
- Egyptian Tax Invoice (فاتورة ضريبية مصرية)
- QR Codes for Products (أكواد QR للمنتجات)

---

## 1. Multi-Store Transfers

### Features

#### Transfer Request
```
┌─────────────────────────────────────────────────────────────┐
│ 🔄 Transfer Stock Between Stores                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ From Store: [Cairo Festival City ▼]                        │
│ To Store:   [Mall of Egypt ▼]                              │
│                                                             │
│ Products to Transfer:                                       │
│ ┌─────────────────────────────────────────────────────────┐│
││ Product          │ SKU    │ Available │ Transfer │      ││
││ Nike Air Max 42  │ NAM-01 │ 15        │ [5]      │      ││
││ Adidas 40 White  │ ADI-02 │ 8         │ [3]      │      ││
││ Puma 43 Red      │ PUM-03 │ 12        │ [4]      │      ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Notes: [Urgent restock for weekend sale...]                │
│                                                             │
│ [Create Transfer Request]                                  │
└─────────────────────────────────────────────────────────────┘
```

#### Transfer Status
```
┌─────────────────────────────────────────────────────────────┐
│ 📦 Transfer #TR-2024-001                                  │
├─────────────────────────────────────────────────────────────┤
│ Status: [In Transit 🚚]                                   │
│                                                             │
│ From: Cairo Festival City                                  │
│ To:   Mall of Egypt                                        │
│ Date: Nov 15, 2024                                         │
│                                                             │
│ Items:                                                      │
│ ✓ Nike Air Max 42    x5                                   │
│ ✓ Adidas 40 White   x3                                   │
│ ⏳ Puma 43 Red       x4                                   │
│                                                             │
│ [Mark as Received]  [Report Issue]                         │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Store Transfers table
CREATE TABLE store_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transfer_number VARCHAR(50) UNIQUE NOT NULL,
  from_store_id UUID REFERENCES stores(id),
  to_store_id UUID REFERENCES stores(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending', 'approved', 'in_transit', 'received', 'cancelled'
  )),
  notes TEXT,
  requested_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  received_by UUID REFERENCES users(id),
  requested_at TIMESTAMP DEFAULT NOW(),
  approved_at TIMESTAMP,
  shipped_at TIMESTAMP,
  received_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transfer Items table
CREATE TABLE store_transfer_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transfer_id UUID REFERENCES store_transfers(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id),
  quantity_requested INT NOT NULL,
  quantity_sent INT,
  quantity_received INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Store Inventory (per store)
CREATE TABLE store_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INT DEFAULT 0,
  reserved INT DEFAULT 0,
  available INT GENERATED ALWAYS AS (quantity - reserved) STORED,
  last_counted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(store_id, variant_id)
);
```

### API Routes

```
POST   /api/admin/transfers              - Create transfer
GET    /api/admin/transfers              - List transfers
GET    /api/admin/transfers/[id]         - Get transfer details
PUT    /api/admin/transfers/[id]/approve - Approve transfer
PUT    /api/admin/transfers/[id]/ship    - Mark as shipped
PUT    /api/admin/transfers/[id]/receive - Mark as received
GET    /api/admin/stores/[id]/inventory  - Get store inventory
```

---

## 2. Pre-Order System

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 📅 Pre-Order Available                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││                     [3D Product]                         ││
││                                                          ││
││              Nike Air Max 2025                           ││
││              EGP 3,500                                   ││
││                                                          ││
││              📅 Available: Dec 15, 2024                  ││
││                                                          ││
││              ⏰ Pre-order ends: Nov 30, 2024             ││
││                                                          ││
││              Deposit: EGP 500 (refundable)              ││
││              Balance: EGP 3,000 (on delivery)           ││
││                                                          ││
││              [Pre-Order Now]                              ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ ⚠️ Only 50 units available for pre-order                  │
│ 🔥 35 already pre-ordered                                  │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││ Pre-Order Policy:                                        ││
││ • Deposit is refundable until shipping date              ││
││ • Balance charged on shipping                            ││
││ • Estimated delivery: 2-3 weeks after release            ││
│└─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Pre-Order Products
CREATE TABLE pre_order_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  release_date DATE NOT NULL,
  pre_order_start DATE NOT NULL,
  pre_order_end DATE NOT NULL,
  deposit_amount DECIMAL(10,2) NOT NULL,
  max_quantity INT,
  current_orders INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN (
    'active', 'closed', 'released', 'cancelled'
  )),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pre-Order Items
CREATE TABLE pre_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pre_order_id UUID REFERENCES pre_order_products(id),
  order_id UUID REFERENCES orders(id),
  user_id UUID REFERENCES users(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INT NOT NULL,
  deposit_paid DECIMAL(10,2) NOT NULL,
  balance_due DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
  )),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pre-Order Notifications
CREATE TABLE pre_order_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pre_order_id UUID REFERENCES pre_order_products(id),
  user_id UUID REFERENCES users(id),
  type VARCHAR(30) CHECK (type IN ('release', 'shipping', 'reminder')),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
GET    /api/pre-orders                   - List pre-order products
GET    /api/pre-orders/[id]              - Get pre-order details
POST   /api/pre-orders/[id]/order        - Place pre-order
GET    /api/pre-orders/my-orders         - My pre-orders
POST   /api/admin/pre-orders             - Create pre-order
PUT    /api/admin/pre-orders/[id]        - Update pre-order
POST   /api/admin/pre-orders/[id]/notify - Send notifications
```

---

## 3. Waitlist (المنتجات نفدت)

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️ Out of Stock                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Nike Air Max 2024 - Size 42, Black                         │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││ This product is currently out of stock.                  ││
││                                                          ││
││ Expected restock: 2-3 weeks                              ││
││                                                          ││
││ 📧 Get notified when back in stock:                      ││
││                                                          ││
││ Email: [ahmed@example.com]                               ││
││                                                          ││
││ ☑️ Also notify me for similar products                   ││
││                                                          ││
││ [Join Waitlist]                                          ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ 📊 23 people on waitlist                                   │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Waitlist table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  variant_id UUID REFERENCES product_variants(id),
  email VARCHAR(255) NOT NULL,
  notify_similar BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN (
    'waiting', 'notified', 'ordered', 'expired'
  )),
  notified_at TIMESTAMP,
  ordered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Waitlist Notifications
CREATE TABLE waitlist_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  waitlist_id UUID REFERENCES waitlist(id),
  notification_type VARCHAR(20) CHECK (notification_type IN (
    'back_in_stock', 'similar_product', 'price_drop'
  )),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
POST   /api/waitlist                     - Join waitlist
GET    /api/waitlist/my                  - My waitlist
DELETE /api/waitlist/[id]                - Leave waitlist
GET    /api/admin/waitlist               - View all waitlist
POST   /api/admin/waitlist/notify        - Notify all
```

---

## 4. Smart Shipping Calculator

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 🚚 Shipping Calculator                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Your Location:                                              │
│ Governorate: [Cairo ▼]                                     │
│ City: [Nasr City ▼]                                        │
│                                                             │
│ Package Details:                                            │
│ Weight: 1.2 kg                                              │
│ Dimensions: 30 x 20 x 15 cm                               │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││ Available Shipping Options:                              ││
││                                                          ││
││ 📦 Standard (3-5 days)           EGP 45                 ││
││ 📦 Express (1-2 days)            EGP 85                 ││
││ 📦 Same Day (Cairo only)         EGP 120                ││
││ 📦 Store Pickup                  FREE                   ││
││                                                          ││
││ Estimated Delivery: Nov 18-20, 2024                     ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ [Select Shipping]                                           │
└─────────────────────────────────────────────────────────────┘
```

### Features

- **Weight-based pricing**
- **Dimensional weight** (体积重)
- **Governorate-based rates**
- **Real-time carrier rates** (Aramex, Bosta, etc.)
- **Free shipping threshold**
- **Store pickup option**

### Database Schema

```sql
-- Shipping Rates table
CREATE TABLE shipping_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  governorate VARCHAR(100) NOT NULL,
  carrier VARCHAR(50) NOT NULL,
  service_type VARCHAR(30) CHECK (service_type IN (
    'standard', 'express', 'same_day', 'pickup'
  )),
  base_rate DECIMAL(10,2) NOT NULL,
  per_kg_rate DECIMAL(10,2) DEFAULT 0,
  free_shipping_threshold DECIMAL(10,2),
  estimated_days_min INT,
  estimated_days_max INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Carrier Settings
CREATE TABLE carrier_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  api_key VARCHAR(255),
  api_url VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Shipments
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  carrier VARCHAR(50),
  tracking_number VARCHAR(255),
  status VARCHAR(30) DEFAULT 'pending',
  weight DECIMAL(8,2),
  dimensions JSONB,
  shipping_cost DECIMAL(10,2),
  estimated_delivery DATE,
  actual_delivery DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
POST   /api/shipping/calculate           - Calculate shipping
GET    /api/shipping/rates               - Get rates
POST   /api/shipping/track               - Track shipment
GET    /api/admin/shipping/rates         - Manage rates
PUT    /api/admin/shipping/rates/[id]    - Update rate
```

### Implementation

```typescript
// src/lib/shipping/calculator.ts
export async function calculateShipping(data: ShippingRequest) {
  const { governorate, city, weight, dimensions, cartTotal } = data;

  // 1. Get applicable rates
  const rates = await db.query.shippingRates.findMany({
    where: and(
      eq(shippingRates.governorate, governorate),
      eq(shippingRates.isActive, true)
    ),
  });

  // 2. Calculate for each carrier/service
  const options = rates.map(rate => {
    let cost = rate.baseRate;
    
    // Add per-kg charge
    if (weight > 1) {
      cost += (weight - 1) * rate.perKgRate;
    }
    
    // Check free shipping threshold
    if (rate.freeShippingThreshold && cartTotal >= rate.freeShippingThreshold) {
      cost = 0;
    }
    
    return {
      carrier: rate.carrier,
      serviceType: rate.serviceType,
      cost,
      estimatedDays: {
        min: rate.estimatedDaysMin,
        max: rate.estimatedDaysMax,
      },
      freeShipping: cost === 0,
    };
  });

  // 3. Add store pickup (always free)
  options.push({
    carrier: 'store',
    serviceType: 'pickup',
    cost: 0,
    estimatedDays: { min: 0, max: 0 },
    freeShipping: true,
  });

  return options;
}
```

---

## 5. Egyptian Tax Invoice (فاتورة ضريبية مصرية)

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 🧾 Smart Store                                             │
│ VAT Number: 123-456-789                                    │
│ Commercial Registration: 12345                             │
├─────────────────────────────────────────────────────────────┤
│ Invoice #: INV-2024-001234                                 │
│ Date: Nov 15, 2024                                         │
│ Customer: Ahmed Mohamed                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Item                    Qty    Price    Total              │
│ ───────────────────────────────────────────────────────────│
│ Nike Air Max 2024       1     2,500    2,500              │
│ Adidas Ultraboost       2     3,200    6,400              │
│                                                             │
│ ───────────────────────────────────────────────────────────│
│ Subtotal:                      8,900                      │
│ VAT (14%):                    1,246                       │
│ Total:                       10,146                       │
│                                                             │
│ ───────────────────────────────────────────────────────────│
│ Payment: Cash                        EGP 10,146           │
│                                                             │
│ ───────────────────────────────────────────────────────────│
│这件发票 صادرة وفقاً لأحكام قانون الضريبة على القيمة المضافة المصري            │
│ This invoice is issued in accordance with the Egyptian VAT Law                │
└─────────────────────────────────────────────────────────────┘
```

### Features

- **Egyptian VAT Law compliant**
- **VAT number on invoice**
- **Commercial registration**
- **QR code on invoice** (for verification)
- **PDF generation**
- **Email to customer**

### Database Schema

```sql
-- Tax Settings
CREATE TABLE tax_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vat_rate DECIMAL(5,2) DEFAULT 14.00,
  vat_number VARCHAR(50),
  commercial_registration VARCHAR(50),
  company_name_ar VARCHAR(255),
  company_name_en VARCHAR(255),
  company_address TEXT,
  company_phone VARCHAR(20),
  is_vat_registered BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tax Exempt Products
CREATE TABLE tax_exempt_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Invoice Template

```typescript
// src/lib/invoice/egyptian-invoice.ts
export interface EgyptianInvoice {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate?: Date;
  
  // Seller Info
  seller: {
    name: string;
    vatNumber: string;
    commercialRegistration: string;
    address: string;
    phone: string;
  };
  
  // Buyer Info
  buyer: {
    name: string;
    vatNumber?: string;
    address: string;
    phone: string;
  };
  
  // Items
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    vatRate: number;
    vatAmount: number;
  }>;
  
  // Totals
  subtotal: number;
  totalVat: number;
  grandTotal: number;
  
  // Payment
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending';
}
```

### API Routes

```
GET    /api/invoice/[orderId]            - Get invoice
GET    /api/invoice/[orderId]/pdf        - Download PDF
POST   /api/invoice/[orderId]/email      - Email invoice
GET    /api/admin/tax/settings           - Get tax settings
PUT    /api/admin/tax/settings           - Update tax settings
```

---

## 6. QR Codes for Products

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 📱 QR Code Product Page                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││                                                         ││
││              ┌─────────────────────┐                    ││
││              │  █▀▀▀▀▀█           │                    ││
││              │  █     █           │                    ││
││              │  █▀▀▀▀▀█           │                    ││
││              │  █     █           │                    ││
││              │  ▀▀▀▀▀▀▀           │                    ││
││              └─────────────────────┘                    ││
││                                                         ││
││              Scan to view product                       ││
││              smartstore.com/p/nike-air-max              ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Product: Nike Air Max 2024                                 │
│ Price: EGP 2,500                                           │
│                                                             │
│ [View Product]  [Add to Cart]                              │
└─────────────────────────────────────────────────────────────┘
```

### Features

- **Unique QR per product**
- **QR on product page** (for sharing)
- **QR on barcode labels** (for in-store)
- **QR on receipts** (for reorder)
- **Trackable QR** (analytics)

### Implementation

```typescript
// src/lib/qr/generator.ts
import QRCode from 'qrcode';

export async function generateProductQR(productId: string) {
  const url = `${process.env.NEXT_PUBLIC_URL}/p/${productId}`;
  
  const qrDataUrl = await QRCode.toDataURL(url, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
  
  return {
    url,
    qrDataUrl,
    shortUrl: await createShortUrl(url),
  };
}

export async function generateReceiptQR(orderId: string) {
  const url = `${process.env.NEXT_PUBLIC_URL}/orders/${orderId}/reorder`;
  
  return QRCode.toDataURL(url, {
    width: 200,
    margin: 1,
  });
}
```

### Database Schema

```sql
-- QR Code Tracking
CREATE TABLE qr_code_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  scan_count INT DEFAULT 0,
  last_scanned_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- QR Scan Log
CREATE TABLE qr_scan_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  scanned_by UUID REFERENCES users(id),
  scan_source VARCHAR(20) CHECK (scan_source IN (
    'product_page', 'barcode_label', 'receipt', 'other'
  )),
  device_info JSONB,
  scanned_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
GET    /api/products/[id]/qr             - Get product QR
GET    /api/products/[id]/qr/tracking    - Get QR analytics
POST   /api/qr/scan                      - Log QR scan
GET    /api/admin/qr/analytics           - QR analytics dashboard
```

---

## Summary

| Feature | Database Tables | API Routes | Dashboard Control |
|---------|----------------|------------|-------------------|
| Multi-Store Transfers | store_transfers, store_transfer_items, store_inventory | 6 | ✅ |
| Pre-Order System | pre_order_products, pre_order_items | 6 | ✅ |
| Waitlist | waitlist, waitlist_notifications | 4 | ✅ |
| Smart Shipping | shipping_rates, carrier_settings, shipments | 5 | ✅ |
| Egyptian Tax Invoice | tax_settings, tax_exempt_products | 5 | ✅ |
| QR Codes | qr_code_tracking, qr_scan_log | 4 | ✅ |

## Additional Database Tables: 12
## Additional API Routes: 30
## Total New Features: 6
