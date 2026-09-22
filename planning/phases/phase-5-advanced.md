# Phase 5: Advanced Features

## Overview

إضافة الميزات المتقدمة: إدارة المخزون، برنامج الولاء، التسويق، دعم اللغات، العروض السريعة، الباقات، فروع المتاجر، نقل المخزون، الطلبات المسبقة، قوائم الانتظار، الشحن الذكي، الفواتير الضريبية، أكواد QR، استعادة السلة، الخصومات الذكية، الصفحات الثابتة، تتبع الطلب، العروض الموسمية.

## Duration: 24-30 Days

## Prerequisites
- Phase 0, 1, 2, 3 & 4 completed

## Tasks

### Task 5.1: Inventory Management
**Priority**: High
**Duration**: 3 days

#### Subtasks:
- [ ] Stock Tracking
  ```typescript
  // src/lib/inventory/stock.ts
  export async function getStockLevel(variantId: string) { ... }
  export async function updateStock(variantId: string, quantity: number, type: string) { ... }
  export async function getStockHistory(variantId: string) { ... }
  ```
- [ ] Low Stock Alerts
  ```typescript
  // src/lib/inventory/alerts.ts
  export async function checkLowStock() { ... }
  export async function sendLowStockAlert() { ... }
  ```
- [ ] Stock Adjustment API
  ```typescript
  // src/app/api/admin/inventory/adjust/route.ts
  export async function POST(req: Request) {
    const { variantId, quantity, type, notes } = await req.json();
    // Update stock
    // Log movement
    // Check alerts
  }
  ```
- [ ] Inventory Dashboard
  ```typescript
  // src/app/admin/inventory/page.tsx
  - Stock levels
  - Low stock alerts
  - Recent movements
  - Quick adjust
  ```

### Task 5.2: Inventory Counts
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Create Count Session
- [ ] Count Interface
- [ ] Count Comparison
- [ ] Adjust After Count

### Task 5.3: Loyalty Program
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Points System
  ```typescript
  // src/lib/loyalty/points.ts
  export async function earnPoints(userId: string, orderId: string, amount: number) { ... }
  export async function redeemPoints(userId: string, points: number) { ... }
  export async function getPointsBalance(userId: string) { ... }
  ```
- [ ] Points earning rules
  ```typescript
  // 1 point per EGP 10 spent
  // Bonus points for first order
  // Birthday bonus points
  ```
- [ ] Points redemption
  ```typescript
  // 100 points = EGP 5 discount
  // Minimum redemption: 100 points
  ```
- [ ] Tier system
  ```typescript
  // Bronze: 0-999 points
  // Silver: 1000-4999 points
  // Gold: 5000+ points
  ```

### Task 5.4: Email Marketing
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Newsletter Subscription
  ```typescript
  // src/app/api/newsletter/subscribe/route.ts
  export async function POST(req: Request) {
    const { email } = await req.json();
    // Validate email
    // Add to subscribers
    // Send welcome email
  }
  ```
- [ ] Email Templates
  ```typescript
  // src/lib/email/templates/
  - order-confirmation.tsx
  - shipping-notification.tsx
  - delivery-confirmation.tsx
  - newsletter.tsx
  - abandoned-cart.tsx
  ```
- [ ] Abandoned Cart Recovery
  ```typescript
  // src/lib/email/abandoned-cart.ts
  export async function checkAbandonedCarts() { ... }
  export async function sendRecoveryEmail(cartId: string) { ... }
  ```

### Task 5.5: Reviews & Ratings
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Review Form
- [ ] Review Display
- [ ] Rating Summary
- [ ] Verified Purchase Badge

### Task 5.6: Wishlist Enhancement
**Priority**: Low
**Duration**: 0.5 day

#### Subtasks:
- [ ] Wishlist page
- [ ] Move to cart
- [ ] Share wishlist

### Task 5.7: Size Guide
**Priority**: Low
**Duration**: 0.5 day

#### Subtasks:
- [ ] Size guide modal
- [ ] Egyptian sizes
- [ ] Measurement instructions

### Task 5.8: Social Sharing
**Priority**: Low
**Duration**: 0.5 day

#### Subtasks:
- [ ] Share buttons
- [ ] Open Graph tags
- [ ] Social meta tags

### Task 5.9: Multi-Language Support (AR/EN)
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Setup i18n (next-intl)
  ```bash
  npm install next-intl
  ```
- [ ] Create translation files (AR/EN)
  ```typescript
  // src/i18n/dictionaries/ar.json
  // src/i18n/dictionaries/en.json
  ```
- [ ] Language switcher component
- [ ] RTL layout support
- [ ] Translated navigation
- [ ] Product translation (name, description)
- [ ] Category translation
- [ ] URL structure (/ar/... , /en/...)
- [ ] Dashboard language settings
- [ ] User language preference
- [ ] SEO meta tags for each language

### Task 5.10: Recently Viewed Products
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Create recently_viewed table
- [ ] Tracking hook (localStorage + API)
- [ ] RecentlyViewed component
- [ ] Add to home page
- [ ] Add to product page
- [ ] Add to cart page
- [ ] Dashboard toggle

### Task 5.11: Flash Sales & Countdown
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create flash_sales table
- [ ] Create flash_sale_products table
- [ ] Countdown timer component
- [ ] Flash sale banner
- [ ] Flash sale product card
- [ ] Dashboard flash sale management
- [ ] Auto-start/end sales
- [ ] Stock limit enforcement
- [ ] Statistics tracking

### Task 5.12: Bundle Deals
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Create bundles table
- [ ] Create bundle_products table
- [ ] Bundle card component
- [ ] Frequently bought together
- [ ] Add bundle to cart
- [ ] Dashboard bundle management
- [ ] Pricing logic
- [ ] Statistics tracking

### Task 5.13: Store Locator
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Create stores table
- [ ] Create store_working_hours table
- [ ] Setup Leaflet map (free)
- [ ] Store locator page
- [ ] Store card component
- [ ] Working hours display
- [ ] Distance calculation
- [ ] Directions integration
- [ ] Dashboard store management

### Task 5.14: Multi-Store Transfers
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create store_transfers table
- [ ] Create store_transfer_items table
- [ ] Create store_inventory table
- [ ] Transfer request form
- [ ] Transfer approval workflow
- [ ] Transfer status tracking
- [ ] Stock update on transfer
- [ ] Dashboard transfer management

### Task 5.15: Pre-Order System
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create pre_order_products table
- [ ] Create pre_order_items table
- [ ] Pre-order product page
- [ ] Deposit payment handling
- [ ] Pre-order notifications
- [ ] Release date tracking
- [ ] Balance collection on shipping
- [ ] Dashboard pre-order management

### Task 5.16: Waitlist System
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Create waitlist table
- [ ] Join waitlist button
- [ ] Waitlist notification system
- [ ] Email on back in stock
- [ ] Dashboard waitlist view

### Task 5.17: Smart Shipping Calculator
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create shipping_rates table
- [ ] Create carrier_settings table
- [ ] Weight-based pricing
- [ ] Governorate-based rates
- [ ] Free shipping threshold
- [ ] Store pickup option
- [ ] Real-time carrier rates
- [ ] Dashboard rate management

### Task 5.18: Egyptian Tax Invoice
**Priority**: High
**Duration**: 1 day

#### Subtasks:
- [ ] Create tax_settings table
- [ ] Invoice template (Egyptian compliant)
- [ ] VAT calculation
- [ ] PDF generation
- [ ] Email invoice
- [ ] QR code on invoice

### Task 5.19: QR Codes for Products
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Install qrcode library
- [ ] Generate product QR codes
- [ ] QR code on product page
- [ ] QR on barcode labels
- [ ] QR scan tracking
- [ ] QR analytics

### Task 5.20: Abandoned Cart Recovery
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create abandoned_carts table
- [ ] Create recovery_emails table
- [ ] Track abandoned carts
- [ ] Email templates (4 emails)
- [ ] Discount code generation
- [ ] Recovery statistics
- [ ] Dashboard settings

### Task 5.21: Smart Discounts System
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create discount_rules table
- [ ] Create user_discounts table
- [ ] Welcome discount
- [ ] Birthday discount
- [ ] Student discount
- [ ] Loyalty discount
- [ ] Auto-apply logic
- [ ] Dashboard management

### Task 5.22: Static Pages
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Create static_pages table
- [ ] Create faq_items table
- [ ] About Us page
- [ ] Contact Us page
- [ ] FAQ page
- [ ] Shipping Policy
- [ ] Return Policy
- [ ] Privacy Policy
- [ ] Terms & Conditions
- [ ] Size Guide
- [ ] Dashboard CMS editor

### Task 5.23: Guest Order Tracking
**Priority**: High
**Duration**: 1 day

#### Subtasks:
- [ ] Create guest_tracking_tokens table
- [ ] Track order page
- [ ] Email/phone lookup
- [ ] Token-based tracking
- [ ] Carrier link integration
- [ ] Dashboard settings

### Task 5.24: Seasonal Promotions Engine
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Create seasonal_promotions table
- [ ] Create promotion_products table
- [ ] Theme system (Ramadan, Eid, etc.)
- [ ] Hero banner management
- [ ] Countdown timer
- [ ] Featured products
- [ ] Promotion statistics
- [ ] Dashboard management

## Deliverables

- [ ] Inventory management
- [ ] Low stock alerts
- [ ] Loyalty program
- [ ] Email marketing
- [ ] Reviews system
- [ ] Enhanced wishlist
- [ ] Multi-language support (AR/EN)
- [ ] Recently viewed products
- [ ] Flash sales with countdown
- [ ] Bundle deals
- [ ] Store locator
- [ ] Multi-store transfers
- [ ] Pre-order system
- [ ] Waitlist system
- [ ] Smart shipping calculator
- [ ] Egyptian tax invoice
- [ ] QR codes for products
- [ ] Abandoned cart recovery
- [ ] Smart discounts system
- [ ] Static pages (CMS)
- [ ] Guest order tracking
- [ ] Seasonal promotions engine

## Verification

- [ ] Stock tracks correctly
- [ ] Alerts send properly
- [ ] Points earn/redeem works
- [ ] Emails send correctly
- [ ] Reviews can be added
- [ ] Language switcher works
- [ ] RTL layout correct
- [ ] Recently viewed tracks properly
- [ ] Flash sale countdown works
- [ ] Bundle pricing correct
- [ ] Store map displays
- [ ] Transfers work between stores
- [ ] Pre-orders process correctly
- [ ] Waitlist notifications send
- [ ] Shipping calculates correctly
- [ ] Tax invoice compliant
- [ ] QR codes generate
- [ ] Abandoned cart emails send
- [ ] Discounts auto-apply
- [ ] Static pages editable
- [ ] Guest tracking works
- [ ] Seasonal themes apply

## API Routes Created

```
GET    /api/admin/inventory               - Get inventory
GET    /api/admin/inventory/low-stock     - Get low stock
POST   /api/admin/inventory/adjust        - Adjust stock
GET    /api/loyalty/points                - Get points
POST   /api/loyalty/earn                  - Earn points
POST   /api/loyalty/redeem                - Redeem points
POST   /api/newsletter/subscribe          - Subscribe
GET    /api/reviews/[productId]           - Get reviews
POST   /api/reviews                       - Add review
GET    /api/languages                     - Get languages
GET    /api/translations/[language]       - Get translations
POST   /api/recently-viewed               - Track view
GET    /api/recently-viewed               - Get recently viewed
GET    /api/flash-sales                   - Get active sales
GET    /api/bundles                       - Get active bundles
GET    /api/stores                        - Get stores
GET    /api/stores/nearby                 - Get nearby stores
POST   /api/admin/transfers               - Create transfer
GET    /api/admin/transfers               - List transfers
PUT    /api/admin/transfers/[id]/receive  - Receive transfer
GET    /api/pre-orders                    - List pre-orders
POST   /api/pre-orders/[id]/order         - Place pre-order
POST   /api/waitlist                      - Join waitlist
POST   /api/shipping/calculate            - Calculate shipping
GET    /api/invoice/[orderId]             - Get invoice
GET    /api/products/[id]/qr              - Get product QR
GET    /api/admin/cart-recovery/stats     - Recovery stats
PUT    /api/admin/cart-recovery/settings  - Update settings
GET    /api/discounts/my                  - My discounts
POST   /api/discounts/validate            - Validate code
GET    /api/pages/[slug]                  - Get page
GET    /api/pages/faq                     - Get FAQ
POST   /api/orders/track                  - Track order
GET    /api/promotions                    - Get promotions
GET    /api/promotions/[slug]             - Get promotion
```

## Notes

- Implement proper stock locking
- Handle concurrent updates
- Send emails asynchronously
- Queue email jobs
- Monitor email delivery
- Use Leaflet for free mapping
- Arabic is default (RTL)
- All features controllable from Dashboard
- Egyptian tax invoice must comply with VAT law
- QR codes should be trackable for analytics
- Pre-orders need deposit handling
- Waitlist should send timely notifications
- Shipping calculator should support multiple carriers
- Abandoned cart recovery increases conversions by 10-15%
- Seasonal promotions should auto-activate
- Guest tracking should not require login
- Static pages should be SEO-optimized
