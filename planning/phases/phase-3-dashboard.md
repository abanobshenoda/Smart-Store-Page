# Phase 3: Dashboard & POS

## Overview

بناء لوحة التحكم الإدارية ونظام نقاط البيع المتقدم.

## Duration: 18-28 Days

## Prerequisites
- Phase 0, 1 & 2 completed
- Admin user created

## Tasks

### Task 3.1: Dashboard Layout
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Admin Layout
  ```typescript
  // src/components/admin/AdminLayout.tsx
  - Sidebar navigation
  - Top header
  - Main content area
  - User menu
  - Notifications
  ```
- [ ] Sidebar Navigation
  ```typescript
  // src/components/admin/Sidebar.tsx
  - Dashboard
  - Products
  - Orders
  - Customers
  - Reports
  - Settings
  - POS
  ```
- [ ] Mobile Navigation
- [ ] Breadcrumbs

### Task 3.2: Dashboard Home
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Stats Cards
  ```typescript
  // src/components/admin/dashboard/StatsCards.tsx
  - Total Revenue
  - Total Orders
  - Total Customers
  - Average Order Value
  - Trend indicators
  ```
- [ ] Revenue Chart
  ```typescript
  // src/components/admin/dashboard/RevenueChart.tsx
  - Line chart
  - Daily/Weekly/Monthly view
  - Compare periods
  ```
- [ ] Recent Orders Table
  ```typescript
  // src/components/admin/dashboard/RecentOrders.tsx
  - Order list
  - Status badges
  - Quick actions
  ```
- [ ] Top Products
- [ ] Low Stock Alerts
- [ ] Quick Actions

### Task 3.3: Product Management
**Priority**: High
**Duration**: 3 days

#### Subtasks:
- [ ] Product List Page
  ```typescript
  // src/app/admin/products/page.tsx
  - Product table/grid
  - Search and filters
  - Bulk actions
  - Pagination
  ```
- [ ] Product Form
  ```typescript
  // src/components/admin/product/ProductForm.tsx
  - Multi-step form
  - Basic info
  - Pricing
  - Images upload
  - Variants management
  - SEO settings
  ```
- [ ] Category Management
  ```typescript
  // src/app/admin/categories/page.tsx
  - Category list
  - Add/Edit category
  - Drag to reorder
  ```
- [ ] Brand Management
  ```typescript
  // src/app/admin/brands/page.tsx
  - Brand list
  - Add/Edit brand
  ```
- [ ] Product API Routes
  ```typescript
  // src/app/api/admin/products/route.ts
  - GET (list)
  - POST (create)
  - PUT (update)
  - DELETE (delete)
  ```

### Task 3.4: Order Management
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Order List Page
  ```typescript
  // src/app/admin/orders/page.tsx
  - Order table
  - Status filters
  - Date range filter
  - Search by order number
  ```
- [ ] Order Details Page
  ```typescript
  // src/app/admin/orders/[id]/page.tsx
  - Order info
  - Customer info
  - Order items
  - Status timeline
  - Actions
  ```
- [ ] Status Update
  ```typescript
  // src/components/admin/order/StatusUpdate.tsx
  - Status dropdown
  - Notes input
  - Confirmation
  ```
- [ ] Invoice Printing
- [ ] Order API Routes

### Task 3.5: Customer Management
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Customer List Page
  ```typescript
  // src/app/admin/customers/page.tsx
  - Customer table
  - Search
  - Filter by group
  ```
- [ ] Customer Details Page
  ```typescript
  // src/app/admin/customers/[id]/page.tsx
  - Customer info
  - Order history
  - Spending summary
  ```
- [ ] Customer Groups
  ```typescript
  // src/app/admin/customers/groups/page.tsx
  - Group list
  - Add/Edit group
  - Assign customers
  ```
- [ ] Customer API Routes

### Task 3.6: POS System
**Priority**: High
**Duration**: 3 days

#### Subtasks:
- [ ] POS Layout
  ```typescript
  // src/components/pos/POSLayout.tsx
  - Product grid
  - Cart area
  - Payment buttons
  - Quick actions
  ```
- [ ] Product Lookup
  ```typescript
  // src/components/pos/ProductLookup.tsx
  - Search by name
  - Search by barcode
  - Category filter
  - Quick add
  ```
- [ ] POS Cart
  ```typescript
  // src/components/pos/POSCart.tsx
  - Item list
  - Quantity controls
  - Remove item
  - Subtotal
  ```
- [ ] Payment Processing
  ```typescript
  // src/components/pos/PaymentModal.tsx
  - Cash payment
  - Card payment
  - Mobile wallet
  - Split payment
  ```
- [ ] Receipt Generation
  ```typescript
  // src/components/pos/Receipt.tsx
  - Receipt template
  - Print function
  - Digital receipt
  ```
- [ ] Cash Register
  ```typescript
  // src/components/pos/CashRegister.tsx
  - Open register
  - Close register
  - Cash in/out
  - Reconciliation
  ```
- [ ] POS API Routes

### Task 3.7: Reports
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Sales Report
  ```typescript
  // src/app/admin/reports/sales/page.tsx
  - Sales summary
  - Charts
  - Date range
  - Export
  ```
- [ ] Product Report
  ```typescript
  // src/app/admin/reports/products/page.tsx
  - Top products
  - Low performers
  - Stock levels
  ```
- [ ] Customer Report
  ```typescript
  // src/app/admin/reports/customers/page.tsx
  - New vs returning
  - Customer segments
  ```
- [ ] Export Functionality (PDF/Excel)

### Task 3.8: Settings
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Store Settings
  ```typescript
  // src/app/admin/settings/page.tsx
  - Store info
  - Tax settings
  - Shipping rates
  ```
- [ ] Payment Settings
- [ ] Email Templates
- [ ] User Management

### Task 3.9: Barcode System
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Barcode Generation
  ```typescript
  // src/lib/pos/barcode.ts
  - Generate unique barcodes
  - Batch generation
  - Custom barcode format
  ```
- [ ] Barcode Scanner Integration
  ```typescript
  // src/components/pos/BarcodeScanner.tsx
  - USB scanner support (keyboard mode)
  - Camera scanner (mobile/tablet)
  - Manual entry
  - Search by barcode/SKU
  ```
- [ ] Barcode Printer Integration
  ```typescript
  // src/components/pos/BarcodePrinter.tsx
  - Thermal printer support
  - Label templates (38x25mm, 50x30mm)
  - Batch printing
  - Print history
  ```
- [ ] Barcode API Routes
  ```typescript
  // src/app/api/pos/scan/[barcode]/route.ts
  // src/app/api/pos/barcode/print/route.ts
  ```

### Task 3.10: Return/Exchange System
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Return Processing
  ```typescript
  // src/lib/pos/return.ts
  - Validate original order
  - Process return items
  - Calculate refund
  - Update stock
  ```
- [ ] Return UI
  ```typescript
  // src/components/pos/ReturnModal.tsx
  - Order lookup
  - Select items to return
  - Choose refund method
  - Process return
  ```
- [ ] Exchange Handling
  ```typescript
  // src/components/pos/ExchangeModal.tsx
  - Select exchange variant
  - Calculate price difference
  - Process exchange
  ```
- [ ] Return Reasons
  ```typescript
  // Seed return reasons
  - Wrong Size
  - Defective Product
  - Changed Mind
  - Manufacturing Defect
  ```

### Task 3.11: Discount System on POS
**Priority**: High
**Duration**: 1 day

#### Subtasks:
- [ ] Manual Discounts
  ```typescript
  // src/components/pos/DiscountModal.tsx
  - Percentage discount
  - Fixed amount discount
  - Apply to order or item
  ```
- [ ] Coupon Validation
  ```typescript
  // src/lib/pos/discount.ts
  - Validate coupon code
  - Check expiry
  - Check usage limits
  - Apply discount
  ```
- [ ] Staff Discounts
  ```typescript
  // Pre-approved staff discounts
  - Staff ID verification
  - Discount limits
  - Tracking
  ```

### Task 3.12: Split Payment
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Split Payment UI
  ```typescript
  // src/components/pos/SplitPaymentModal.tsx
  - Add payment methods
  - Allocate amounts
  - Validate total matches
  ```
- [ ] Payment Processing
  ```typescript
  // src/lib/pos/splitPayment.ts
  - Process each payment method
  - Record all payments
  - Generate receipt
  ```

### Task 3.13: End of Day Reports
**Priority**: High
**Duration**: 1 day

#### Subtasks:
- [ ] X-Report (Mid-Day)
  ```typescript
  // src/components/pos/XReport.tsx
  - Sales summary
  - Payment breakdown
  - Print report
  ```
- [ ] Z-Report (End of Day)
  ```typescript
  // src/components/pos/ZReport.tsx
  - Full day summary
  - Cash reconciliation
  - Difference tracking
  - Close session
  ```
- [ ] Cash Management
  ```typescript
  // src/components/pos/CashManagement.tsx
  - Cash in/out
  - Opening balance
  - Closing balance
  - Movement history
  ```

### Task 3.14: Staff Performance
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Performance Tracking
  ```typescript
  // src/lib/staff/performance.ts
  - Track sales per cashier
  - Track transactions
  - Track discounts given
  ```
- [ ] Performance Dashboard
  ```typescript
  // src/app/admin/staff/performance/page.tsx
  - Leaderboard
  - Individual stats
  - Compare staff
  - Export reports
  ```

### Task 3.15: Installments (تقسيط)
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Installment Plans
  ```typescript
  // src/lib/installments/plans.ts
  - 3 months (3% fee)
  - 6 months (6% fee)
  - 12 months (12% fee)
  ```
- [ ] Provider Integration
  ```typescript
  // src/lib/installments/providers/
  - valU integration
  - United Bank (UBFS)
  - Banco Misr
  - Insurance companies
  ```
- [ ] Installment UI
  ```typescript
  // src/components/pos/InstallmentModal.tsx
  - Select plan
  - Customer info
  - National ID
  - Process installment
  ```
- [ ] Installment Management
  ```typescript
  // src/app/admin/installments/page.tsx
  - Active installments
  - Payment tracking
  - Status updates
  ```

### Task 3.16: Offline Mode
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Offline Database (IndexedDB)
  ```typescript
  // src/lib/offline/db.ts
  - Store pending sales
  - Cache products
  - Cache customers
  ```
- [ ] Service Worker
  ```typescript
  // public/sw.js
  - Cache static assets
  - Cache API responses
  - Queue requests when offline
  ```
- [ ] Sync Mechanism
  ```typescript
  // src/lib/offline/sync.ts
  - Detect online status
  - Auto-sync pending sales
  - Handle conflicts
  ```
- [ ] Offline UI
  ```typescript
  // src/components/pos/OfflineIndicator.tsx
  - Show offline status
  - Pending sync count
  - Retry sync button
  ```

## Deliverables

- [ ] Admin dashboard
- [ ] Product management
- [ ] Order management
- [ ] Customer management
- [ ] POS system with all advanced features:
  - [ ] Barcode Scanner + Printer
  - [ ] Return/Exchange
  - [ ] Discount Codes
  - [ ] Split Payment
  - [ ] End of Day Reports (X/Z Reports)
  - [ ] Staff Performance
  - [ ] Installments (تقسيط)
  - [ ] Offline Mode
- [ ] Reports
- [ ] Settings

## Verification

- [ ] Dashboard loads with stats
- [ ] Products can be managed
- [ ] Orders can be processed
- [ ] POS sales work
- [ ] Barcode scanning works
- [ ] Barcode printing works
- [ ] Returns can be processed
- [ ] Discounts apply correctly
- [ ] Split payment works
- [ ] X/Z reports generate
- [ ] Staff performance tracked
- [ ] Installments process
- [ ] Offline mode works
- [ ] Sync works when online
- [ ] Reports generate correctly
- [ ] Settings can be updated

## Pages Created

```
/admin                         - Dashboard home
/admin/products                - Product list
/admin/products/new            - Add product
/admin/products/[id]           - Edit product
/admin/categories              - Category management
/admin/brands                  - Brand management
/admin/orders                  - Order list
/admin/orders/[id]             - Order details
/admin/customers               - Customer list
/admin/customers/[id]          - Customer details
/admin/customers/groups        - Customer groups
/admin/reports                 - Reports overview
/admin/reports/sales           - Sales report
/admin/reports/products        - Product report
/admin/reports/customers       - Customer report
/admin/staff/performance       - Staff performance
/admin/installments            - Installment management
/admin/settings                - Settings
/admin/users                   - User management
/pos                           - POS interface
/pos/register                  - Register management
/pos/reports                   - POS reports
/pos/returns                   - Returns processing
/pos/installments              - Installment processing
```

## Components Created

```
Admin:
- AdminLayout
- Sidebar
- StatsCards
- RevenueChart
- RecentOrders
- ProductForm
- OrderTable
- CustomerTable
- StaffPerformance
- InstallmentManagement

POS:
- POSLayout
- ProductLookup
- POSCart
- PaymentModal
- SplitPaymentModal
- ReturnModal
- ExchangeModal
- DiscountModal
- BarcodeScanner
- BarcodePrinter
- Receipt
- CashRegister
- XReport
- ZReport
- OfflineIndicator
- InstallmentModal
```

## API Routes Created

```
POS:
POST   /api/pos/sales                  - Create sale
GET    /api/pos/scan/[barcode]         - Scan barcode
POST   /api/pos/barcode/print          - Print barcode labels
POST   /api/pos/return                 - Process return
POST   /api/pos/discount               - Apply discount
POST   /api/pos/split-payment          - Process split payment
GET    /api/pos/reports/x-report       - Generate X-Report
GET    /api/pos/reports/z-report       - Generate Z-Report
POST   /api/pos/installment            - Create installment
POST   /api/pos/offline/sync           - Sync offline sales

Admin:
GET    /api/admin/staff/performance    - Staff performance
GET    /api/admin/installments         - List installments
GET    /api/admin/barcodes             - Manage barcodes
```

## Notes

- Implement role-based access
- Add audit logging
- Handle real-time updates (future)
- Optimize for speed
- Add keyboard shortcuts for POS
- Barcode scanner works as keyboard input
- Thermal printer uses ESC/POS commands
- Offline mode uses IndexedDB
- Sync handles conflicts gracefully
- Installments require customer verification

