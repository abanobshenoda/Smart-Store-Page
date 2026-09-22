# Advanced POS Features

## Overview

ميزات متقدمة لنظام نقاط البيع:
- Barcode Scanner + Printer
- Return/Exchange
- Discount Codes
- Split Payment
- End of Day Reports
- Staff Performance
- Installments (تقسيط)
- Offline Mode

---

## 1. Barcode Scanner & Printer

### Features

#### Barcode Scanner
```
┌─────────────────────────────────────────┐
│ 🔍 Scan Product                        │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │                                 │   │
│  │      📷 Camera Scanner          │   │
│  │                                 │   │
│  │   OR                           │   │
│  │                                 │   │
│  │      ⌨️ Type Barcode            │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Manual Entry] [Camera Scan]           │
│                                         │
└─────────────────────────────────────────┘
```

**Scan Methods:**
- USB Barcode Scanner (keyboard mode)
- Camera Scanner (mobile/tablet)
- Manual Entry
- Search by name/SKU

#### Barcode Printer
```
┌─────────────────────────────────────────┐
│ 🖨️ Print Barcode Labels                │
├─────────────────────────────────────────┤
│                                         │
│ Product: Nike Air Max 2024              │
│ SKU: NAM-2024-BLK-42                   │
│                                         │
│ Label Format:                           │
│ ┌─────────────────────┐                │
│ │ Smart Store         │                │
│ │ Nike Air Max 2024   │                │
│ │ |||||||||||||||||||  │                │
│ │ NAM-2024-BLK-42     │                │
│ │ EGP 2,500           │                │
│ └─────────────────────┘                │
│                                         │
│ Quantity: [5 ▼]                         │
│                                         │
│ [Print] [Preview] [Print Multiple]      │
└─────────────────────────────────────────┘
```

**Label Sizes:**
- 38mm x 25mm (standard)
- 50mm x 30mm (large)
- Custom size

### Database Schema

```sql
-- Barcodes table
CREATE TABLE barcodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID REFERENCES product_variants(id),
  barcode VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(20) CHECK (type IN ('product', 'variant', 'custom')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Barcode Print History
CREATE TABLE barcode_print_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID REFERENCES product_variants(id),
  quantity INT NOT NULL,
  label_size VARCHAR(20),
  printed_by UUID REFERENCES users(id),
  printed_at TIMESTAMP DEFAULT NOW()
);

-- Barcode Scan History
CREATE TABLE barcode_scan_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barcode VARCHAR(100) NOT NULL,
  scanned_by UUID REFERENCES users(id),
  session_id UUID REFERENCES pos_sessions(id),
  result VARCHAR(20) CHECK (result IN ('found', 'not_found', 'error')),
  scanned_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
GET    /api/pos/scan/[barcode]            - Scan barcode
POST   /api/pos/barcode/generate          - Generate barcodes
POST   /api/pos/barcode/print             - Print labels
GET    /api/pos/barcode/history           - Print history
POST   /api/admin/products/[id]/barcodes  - Generate for product
GET    /api/admin/barcodes                - List all barcodes
POST   /api/admin/barcodes/batch          - Batch generate
```

### Implementation

```typescript
// src/lib/pos/barcode.ts
export async function scanBarcode(barcode: string) {
  // 1. Look up barcode
  const variant = await db.query.productVariants.findFirst({
    where: eq(productVariants.barcode, barcode),
    with: {
      product: true,
    },
  });

  if (!variant) {
    return { success: false, error: 'Product not found' };
  }

  // 2. Check stock
  if (variant.stockQuantity <= 0) {
    return { success: false, error: 'Out of stock' };
  }

  // 3. Return product info
  return {
    success: true,
    product: variant.product,
    variant: {
      id: variant.id,
      size: variant.size,
      color: variant.color,
      price: variant.product.basePrice + variant.priceAdjustment,
      stock: variant.stockQuantity,
    },
  };
}

export async function generateBarcode(variantId: string) {
  // Generate unique barcode
  const barcode = `SS${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  
  await db.insert(barcodes).values({
    variantId,
    barcode,
    type: 'variant',
  });

  return barcode;
}

export async function printBarcodeLabel(
  variantId: string,
  quantity: number,
  labelSize: string = '38x25'
) {
  // Get variant info
  const variant = await getVariantWithProduct(variantId);
  
  // Generate label data
  const labelData = {
    storeName: 'Smart Store',
    productName: variant.product.name,
    sku: variant.sku,
    barcode: variant.barcode,
    price: variant.product.basePrice + variant.priceAdjustment,
    size: variant.size,
    color: variant.color,
  };

  // Send to printer (thermal printer API)
  await sendToPrinter(labelData, quantity, labelSize);

  // Log print history
  await db.insert(barcodePrintHistory).values({
    variantId,
    quantity,
    labelSize,
  });

  return { success: true };
}
```

---

## 2. Return/Exchange from POS

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 🔄 Return/Exchange                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Order Lookup: [Order # or Scan Receipt]                    │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││ Order #SS-2024-001234                                    ││
││ Date: Nov 15, 2024                                       ││
││ Customer: Ahmed Mohamed                                  ││
││                                                          ││
││ Items:                                                   ││
││ ☑️ Nike Air Max 42 Black         EGP 2,500             ││
││ ☐ Adidas Ultraboost 40 White    EGP 3,200             ││
││ ☑️ Puma RS-X 43 Red             EGP 1,800             ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Action: [Return ▼]                                         │
│ Reason: [Wrong Size ▼]                                     │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││ Return Summary:                                          ││
││ Nike Air Max:      -EGP 2,500                           ││
││ Puma RS-X:         -EGP 1,800                           ││
││                                              ────────────││
││ Total Refund:      -EGP 4,300                           ││
││ Refund Method: [Original Payment ▼]                      ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ [Process Return]  [Cancel]                                 │
└─────────────────────────────────────────────────────────────┘
```

**Return Types:**
- Full Return (all items)
- Partial Return (select items)
- Exchange (different size/color)
- Store Credit

### Database Schema

```sql
-- POS Returns table
CREATE TABLE pos_returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_number VARCHAR(50) UNIQUE NOT NULL,
  original_order_id UUID REFERENCES orders(id),
  session_id UUID REFERENCES pos_sessions(id),
  customer_id UUID REFERENCES users(id),
  type VARCHAR(20) CHECK (type IN ('return', 'exchange')),
  reason VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rejected')),
  refund_amount DECIMAL(10,2) NOT NULL,
  refund_method VARCHAR(30) CHECK (refund_method IN (
    'original', 'cash', 'store_credit', 'exchange'
  )),
  notes TEXT,
  processed_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- POS Return Items table
CREATE TABLE pos_return_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id UUID REFERENCES pos_returns(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES order_items(id),
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  exchange_variant_id UUID REFERENCES product_variants(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Return Reasons
CREATE TABLE return_reasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0
);

-- Seed return reasons
INSERT INTO return_reasons (name_ar, name_en) VALUES
('خطأ في المقاس', 'Wrong Size'),
('.defective product', 'Defective Product'),
('لا يعجبني', 'Changed Mind'),
('عيب في الصنع', 'Manufacturing Defect'),
('مختلف عن الصورة', 'Different from Image');
```

### API Routes

```
POST   /api/pos/return                   - Process return
GET    /api/pos/return/[id]              - Get return details
GET    /api/pos/return/reasons           - Get return reasons
POST   /api/pos/return/[id]/complete     - Complete return
GET    /api/admin/returns                - List all returns
PUT    /api/admin/returns/[id]           - Update return status
```

### Implementation

```typescript
// src/lib/pos/return.ts
export async function processReturn(data: ReturnData) {
  const { originalOrderId, items, reason, refundMethod, sessionId } = data;

  // 1. Validate original order
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, originalOrderId),
    with: { items: true },
  });

  if (!order) throw new Error('Order not found');
  if (order.status === 'cancelled') throw new Error('Order is cancelled');

  // 2. Validate items
  for (const item of items) {
    const orderItem = order.items.find(i => i.id === item.orderItemId);
    if (!orderItem) throw new Error('Item not found in order');
    if (item.quantity > orderItem.quantity) throw new Error('Quantity exceeds ordered');
  }

  // 3. Calculate refund amount
  const refundAmount = items.reduce((sum, item) => {
    const orderItem = order.items.find(i => i.id === item.orderItemId);
    return sum + (orderItem!.unitPrice * item.quantity);
  }, 0);

  // 4. Create return record
  const returnRecord = await db.insert(posReturns).values({
    returnNumber: generateReturnNumber(),
    originalOrderId,
    sessionId,
    customerId: order.userId,
    type: items.some(i => i.exchangeVariantId) ? 'exchange' : 'return',
    reason,
    refundAmount,
    refundMethod,
    processedBy: getCurrentUserId(),
  }).returning();

  // 5. Create return items
  for (const item of items) {
    const orderItem = order.items.find(i => i.id === item.orderItemId);
    await db.insert(posReturnItems).values({
      returnId: returnRecord.id,
      orderItemId: item.orderItemId,
      productId: orderItem!.productId,
      variantId: orderItem!.variantId,
      quantity: item.quantity,
      unitPrice: orderItem!.unitPrice,
      totalPrice: orderItem!.unitPrice * item.quantity,
      exchangeVariantId: item.exchangeVariantId,
    });

    // 6. Update stock
    await updateStock(orderItem!.variantId, item.quantity, 'return');
  }

  // 7. Process refund
  if (refundMethod === 'cash') {
    await processCashRefund(returnRecord.id, refundAmount);
  } else if (refundMethod === 'store_credit') {
    await addStoreCredit(order.userId, refundAmount);
  }

  return returnRecord;
}
```

---

## 3. Discount Codes on POS

### Features

```
┌─────────────────────────────────────────┐
│ 💰 Apply Discount                      │
├─────────────────────────────────────────┤
│                                         │
│ Discount Type:                          │
│ ○ Percentage [10%]                      │
│ ○ Fixed Amount [EGP 50]                │
│ ○ Coupon Code [SAVE10]                 │
│                                         │
│ Apply To:                               │
│ ○ Entire Order                         │
│ ○ Specific Item [Select ▼]            │
│                                         │
│ ┌─────────────────────────────────┐    │
││ Subtotal:           EGP 5,700   │    │
││ Discount (10%):    -EGP 570     │    │
││ VAT (14%):          EGP 718.20  │    │
││ Total:              EGP 5,848.20│    │
│└─────────────────────────────────┘    │
│                                         │
│ [Apply]  [Remove Discount]             │
└─────────────────────────────────────────┘
```

**Discount Types:**
- Percentage (manual)
- Fixed Amount (manual)
- Coupon Code (system coupons)
- Loyalty Points
- Staff Discount

### Database Schema

```sql
-- POS Discounts table
CREATE TABLE pos_discounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES pos_sessions(id),
  order_id UUID REFERENCES orders(id),
  type VARCHAR(20) CHECK (type IN ('percentage', 'fixed', 'coupon', 'loyalty', 'staff')),
  value DECIMAL(10,2) NOT NULL,
  coupon_code VARCHAR(50),
  applied_to VARCHAR(20) CHECK (applied_to IN ('order', 'item')),
  target_item_id UUID,
  reason TEXT,
  applied_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Staff Discounts (pre-approved)
CREATE TABLE staff_discounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  discount_percentage DECIMAL(5,2) NOT NULL,
  max_discount_amount DECIMAL(10,2),
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
POST   /api/pos/discount                 - Apply discount
DELETE /api/pos/discount/[id]            - Remove discount
POST   /api/pos/discount/validate        - Validate coupon
GET    /api/pos/discount/available       - Get available discounts
```

---

## 4. Split Payment

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 💳 Split Payment                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Total Due: EGP 10,146                                      │
│                                                             │
│ Payment 1:                                                  │
│ ┌─────────────────────────────────────────────────────────┐│
││ Method: [Cash ▼]          Amount: [5,000]               ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Payment 2:                                                  │
│ ┌─────────────────────────────────────────────────────────┐│
││ Method: [Vodafone Cash ▼]  Amount: [3,000]              ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Payment 3:                                                  │
│ ┌─────────────────────────────────────────────────────────┐│
││ Method: [Credit Card ▼]    Amount: [2,146]              ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ [+ Add Payment Method]                                      │
│                                                             │
│ ───────────────────────────────────────────────────────────│
│ Paid:     EGP 10,146                                       │
│ Remaining: EGP 0                                           │
│                                                             │
│ [Complete Sale]                                             │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Split Payments table
CREATE TABLE split_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  payment_number INT NOT NULL,
  method VARCHAR(30) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  reference VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
POST   /api/pos/split-payment            - Process split payment
GET    /api/pos/split-payment/[orderId]  - Get split payments
```

### Implementation

```typescript
// src/lib/pos/splitPayment.ts
export async function processSplitPayment(
  orderId: string,
  payments: SplitPayment[]
) {
  // 1. Validate total matches order total
  const order = await getOrder(orderId);
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  
  if (Math.abs(totalPaid - order.totalAmount) > 0.01) {
    throw new Error('Payment total does not match order total');
  }

  // 2. Process each payment
  for (const payment of payments) {
    await db.insert(splitPayments).values({
      orderId,
      paymentNumber: payments.indexOf(payment) + 1,
      method: payment.method,
      amount: payment.amount,
      reference: payment.reference,
    });

    // Process based on method
    switch (payment.method) {
      case 'cash':
        await recordCashPayment(payment.amount);
        break;
      case 'credit_card':
        await processCardPayment(payment.amount, payment.reference);
        break;
      case 'vodafone_cash':
        await processMobileWalletPayment('vodafone', payment.amount, payment.reference);
        break;
      // ... other methods
    }
  }

  // 3. Mark order as paid
  await updateOrderStatus(orderId, 'paid');

  return { success: true };
}
```

---

## 5. End of Day Reports (Z-Report / X-Report)

### Features

#### X-Report (Mid-Day Summary)
```
┌─────────────────────────────────────────┐
│ 📊 X-Report (Current Session)          │
├─────────────────────────────────────────┤
│ Session: #1234                         │
│ Cashier: Ahmed Mohamed                 │
│ Opened: 09:00 AM                       │
│                                         │
│ Sales Summary:                          │
│ ┌─────────────────────────────────┐    │
││ Total Sales:        EGP 45,200  │    │
││ Cash Sales:         EGP 25,000  │    │
││ Card Sales:         EGP 15,200  │    │
││ Mobile Wallet:      EGP 5,000   │    │
││─────────────────────────────────│    │
││ Transactions:          28       │    │
││ Returns:                2       │    │
││ Returns Amount:    EGP 1,500    │    │
││─────────────────────────────────│    │
││ Net Sales:         EGP 43,700   │    │
│└─────────────────────────────────┘    │
│                                         │
│ [Print X-Report]  [Close]             │
└─────────────────────────────────────────┘
```

#### Z-Report (End of Day)
```
┌─────────────────────────────────────────┐
│ 📊 Z-Report (End of Day)               │
├─────────────────────────────────────────┤
│ Date: November 15, 2024                │
│ Session: #1234                         │
│ Cashier: Ahmed Mohamed                 │
│                                         │
│ Opening Balance:        EGP 2,000      │
│ Cash Sales:            EGP 25,000      │
│ Cash Refunds:         -EGP 1,000       │
│ Cash In:               EGP 500         │
│ Cash Out:             -EGP 200         │
│                          ──────────────│
│ Expected Cash:         EGP 26,300      │
│ Actual Cash:           EGP 26,250      │
│ Difference:            -EGP 50 ⚠️     │
│                                         │
│ ┌─────────────────────────────────┐    │
││ Payment Breakdown:               │    │
││ Cash:                 EGP 24,000│    │
││ Credit Card:          EGP 15,200│    │
││ Vodafone Cash:         EGP 4,000│    │
││ InstaPay:             EGP 1,000 │    │
││ COD:                   EGP 1,000 │    │
│└─────────────────────────────────┘    │
│                                         │
│ [Print Z-Report]  [Close Session]      │
└─────────────────────────────────────────┘
```

### Database Schema

```sql
-- End of Day Reports
CREATE TABLE end_of_day_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES pos_sessions(id),
  report_type VARCHAR(10) CHECK (report_type IN ('x', 'z')),
  opening_balance DECIMAL(10,2),
  closing_balance DECIMAL(10,2),
  expected_balance DECIMAL(10,2),
  difference DECIMAL(10,2),
  total_sales DECIMAL(10,2),
  total_returns DECIMAL(10,2),
  net_sales DECIMAL(10,2),
  cash_sales DECIMAL(10,2),
  card_sales DECIMAL(10,2),
  mobile_wallet_sales DECIMAL(10,2),
  cash_refunds DECIMAL(10,2),
  cash_in DECIMAL(10,2),
  cash_out DECIMAL(10,2),
  transaction_count INT,
  return_count INT,
  generated_by UUID REFERENCES users(id),
  generated_at TIMESTAMP DEFAULT NOW()
);

-- Cash Movements
CREATE TABLE cash_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES pos_sessions(id),
  type VARCHAR(20) CHECK (type IN ('opening', 'sale', 'return', 'cash_in', 'cash_out', 'closing')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  reference_id UUID,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
GET    /api/pos/reports/x-report          - Generate X-Report
GET    /api/pos/reports/z-report          - Generate Z-Report
POST   /api/pos/reports/close             - Close session with Z-Report
GET    /api/pos/reports/history           - Report history
GET    /api/admin/reports/daily           - Daily summary
GET    /api/admin/reports/weekly          - Weekly summary
```

---

## 6. Staff Performance

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 👥 Staff Performance                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Period: [Today ▼]  [This Week ▼]  [This Month ▼]          │
│                                                             │
│ Top Performers:                                             │
│ ┌─────────────────────────────────────────────────────────┐│
││ #  Name           Sales     Txns   Avg     Rating       ││
││ 1  Ahmed M.      EGP 45,200  28   1,614   ⭐⭐⭐⭐⭐     ││
││ 2  Mona S.       EGP 38,500  24   1,604   ⭐⭐⭐⭐       ││
││ 3  Ali H.        EGP 32,100  22   1,459   ⭐⭐⭐⭐       ││
││ 4  Sara A.       EGP 28,900  20   1,445   ⭐⭐⭐⭐⭐     ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ Ahmed M. - Detailed Stats:                                 │
│ ┌─────────────────────────────────────────────────────────┐│
││ Total Sales:         EGP 45,200                         ││
││ Transactions:            28                              ││
││ Average Sale:        EGP 1,614                          ││
││ Items Sold:              42                              ││
││ Returns Processed:         2                              ││
││ Discounts Given:    EGP 1,200 (3)                       ││
││ Hours Worked:            8                               ││
││ Sales per Hour:     EGP 5,650                           ││
│└─────────────────────────────────────────────────────────┘│
│                                                             │
│ [Export Report]  [Compare Staff]                           │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Staff Performance (daily aggregation)
CREATE TABLE staff_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  total_sales DECIMAL(10,2) DEFAULT 0,
  transaction_count INT DEFAULT 0,
  items_sold INT DEFAULT 0,
  returns_processed INT DEFAULT 0,
  discounts_given DECIMAL(10,2) DEFAULT 0,
  discount_count INT DEFAULT 0,
  hours_worked DECIMAL(4,2),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

### API Routes

```
GET    /api/admin/staff/performance       - Get staff performance
GET    /api/admin/staff/[id]/performance  - Get specific staff
GET    /api/admin/staff/leaderboard       - Get leaderboard
GET    /api/admin/staff/[id]/history      - Performance history
```

---

## 7. Installments (تقسيط)

### Features

```
┌─────────────────────────────────────────────────────────────┐
│ 💳 Installment Payment                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Order Total: EGP 12,000                                    │
│                                                             │
│ Select Installment Plan:                                   │
│                                                             │
│ ○ 3 Months                                                 │
│   EGP 4,000/month                                          │
│   Service Fee: EGP 360 (3%)                                │
│   Total: EGP 12,360                                        │
│                                                             │
│ ○ 6 Months                                                 │
│   EGP 2,000/month                                          │
│   Service Fee: EGP 720 (6%)                                │
│   Total: EGP 12,720                                        │
│                                                             │
│ ○ 12 Months                                                │
│   EGP 1,000/month                                          │
│   Service Fee: EGP 1,440 (12%)                             │
│   Total: EGP 13,440                                        │
│                                                             │
│ Customer Info:                                              │
│ Name: [________________]                                   │
│ Phone: [________________]                                  │
│ National ID: [________________]                            │
│                                                             │
│ [Process Installment]                                       │
└─────────────────────────────────────────────────────────────┘
```

### Egyptian Installment Services

#### 1. valU (Easy Payment Solutions)
```typescript
// src/lib/payments/valu.ts
export async function createValuInstallment(data: InstallmentData) {
  const response = await fetch('https://api.valu.com/merchant/create', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VALU_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      merchantId: process.env.VALU_MERCHANT_ID,
      orderId: data.orderId,
      amount: data.amount,
      tenure: data.tenure, // 3, 6, 12
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerNationalId: data.customerNationalId,
    }),
  });

  return response.json();
}
```

#### 2. United Bank (UBFS) Installments
```typescript
// src/lib/payments/ubfs.ts
export async function createUBFSInstallment(data: InstallmentData) {
  // United Bank installment integration
}
```

#### 3. Banco Misr Installments
```typescript
// src/lib/payments/banco-misr.ts
export async function createBancoMisrInstallment(data: InstallmentData) {
  // Banco Misr installment integration
}
```

#### 4. Insurance Companies
- AIG Egypt
- AXA Egypt
- Allianz Egypt

### Database Schema

```sql
-- Installment Plans
CREATE TABLE installment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  tenure_months INT NOT NULL,
  service_fee_percentage DECIMAL(5,2) NOT NULL,
  min_amount DECIMAL(10,2),
  max_amount DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Installment Orders
CREATE TABLE installment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  plan_id UUID REFERENCES installment_plans(id),
  provider VARCHAR(50) NOT NULL,
  provider_reference VARCHAR(255),
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_national_id VARCHAR(20),
  original_amount DECIMAL(10,2) NOT NULL,
  service_fee DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  monthly_payment DECIMAL(10,2) NOT NULL,
  tenure INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending', 'approved', 'rejected', 'active', 'completed', 'defaulted'
  )),
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Installment Payments
CREATE TABLE installment_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installment_id UUID REFERENCES installment_orders(id),
  payment_number INT NOT NULL,
  due_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending', 'paid', 'late', 'missed'
  )),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes

```
POST   /api/pos/installment              - Create installment
GET    /api/pos/installment/plans        - Get available plans
GET    /api/pos/installment/[id]         - Get installment details
POST   /api/pos/installment/[id]/verify  - Verify with provider
GET    /api/admin/installments           - List all installments
GET    /api/admin/installments/[id]      - Get installment details
```

---

## 8. Offline Mode

### Features

```
┌─────────────────────────────────────────┐
│ 📴 Offline Mode Active                 │
├─────────────────────────────────────────┤
│                                         │
│ ⚠️ You are currently offline.          │
│ Sales will sync when connection is      │
│ restored.                               │
│                                         │
│ Pending Sync: 5 transactions            │
│ Last Synced: 2 minutes ago              │
│                                         │
│ [View Pending]  [Retry Sync]            │
└─────────────────────────────────────────┘
```

**Offline Capabilities:**
- Process sales offline
- Store in IndexedDB
- Auto-sync when online
- Product catalog cached
- Queue receipts for printing

### Implementation

```typescript
// src/lib/offline/db.ts
import { openDB } from 'idb';

const dbPromise = openDB('smart-store-offline', 1, {
  upgrade(db) {
    // Store pending sales
    db.createObjectStore('pendingSales', { keyPath: 'id' });
    
    // Cache products
    db.createObjectStore('products', { keyPath: 'id' });
    
    // Cache customers
    db.createObjectStore('customers', { keyPath: 'id' });
    
    // Store receipts
    db.createObjectStore('receipts', { keyPath: 'id' });
  },
});

export async function saveOfflineSale(sale: OfflineSale) {
  const db = await dbPromise;
  await db.put('pendingSales', {
    id: generateOfflineId(),
    ...sale,
    timestamp: Date.now(),
    synced: false,
  });
}

export async function syncOfflineSales() {
  const db = await dbPromise;
  const pendingSales = await db.getAll('pendingSales');
  
  for (const sale of pendingSales) {
    try {
      await fetch('/api/pos/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
      });
      
      // Remove from pending after successful sync
      await db.delete('pendingSales', sale.id);
    } catch (error) {
      console.error('Sync failed for sale:', sale.id);
    }
  }
}

export async function cacheProducts() {
  const response = await fetch('/api/products?limit=1000');
  const data = await response.json();
  
  const db = await dbPromise;
  const tx = db.transaction('products', 'readwrite');
  
  for (const product of data.products) {
    await tx.store.put(product);
  }
  
  await tx.done;
}
```

### Database Schema (Local)

```typescript
// IndexedDB Schema (offline)
interface OfflineSale {
  id: string;
  items: Array<{
    productId: string;
    variantId: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  payments: Array<{
    method: string;
    amount: number;
  }>;
  timestamp: number;
  synced: boolean;
  sessionId: string;
}
```

### Service Worker

```typescript
// public/sw.js
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/pos/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Return cached data or queue request
        return caches.match(event.request);
      })
    );
  }
});

// Listen for online event
self.addEventListener('online', () => {
  // Trigger sync
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: 'SYNC_OFFLINE_SALES' });
    });
  });
});
```

### API Routes

```
POST   /api/pos/offline/sync             - Sync offline sales
GET    /api/pos/offline/pending          - Get pending sales
DELETE /api/pos/offline/pending/[id]     - Delete pending sale
POST   /api/pos/offline/cache            - Cache product data
```

---

## Summary Table

| Feature | Database Tables | API Routes | Dashboard Control |
|---------|----------------|------------|-------------------|
| Barcode Scanner/Printer | barcodes, barcode_print_history | 4 | ✅ |
| Return/Exchange | pos_returns, pos_return_items | 5 | ✅ |
| Discount Codes | pos_discounts, staff_discounts | 3 | ✅ |
| Split Payment | split_payments | 2 | - |
| End of Day Reports | end_of_day_reports, cash_movements | 5 | ✅ |
| Staff Performance | staff_performance | 4 | ✅ |
| Installments | installment_plans, installment_orders | 5 | ✅ |
| Offline Mode | IndexedDB (local) | 3 | ✅ |
