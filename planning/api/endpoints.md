# API Endpoints Documentation

## Overview

جميع API endpoints للمتجر:
- Authentication
- Products
- Cart
- Checkout
- Orders
- Admin
- POS

## Base URL

```
Development: http://localhost:3000/api
Production: https://smartstore.com/api
```

## Authentication

### Register
```
POST /api/auth/register
```

**Request:**
```json
{
  "email": "ahmed@example.com",
  "password": "Password123",
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "phone": "01012345678"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "ahmed@example.com",
    "firstName": "Ahmed",
    "lastName": "Mohamed"
  }
}
```

### Login
```
POST /api/auth/login
```

**Request:**
```json
{
  "email": "ahmed@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "session": {
    "token": "jwt-token",
    "expiresAt": "2024-12-31"
  }
}
```

### Logout
```
POST /api/auth/logout
```

### Get Current User
```
GET /api/auth/me
```

**Response:**
```json
{
  "id": "uuid",
  "email": "ahmed@example.com",
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "role": "customer"
}
```

### Update Profile
```
PUT /api/auth/profile
```

**Request:**
```json
{
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "phone": "01012345678"
}
```

### Forgot Password
```
POST /api/auth/forgot-password
```

**Request:**
```json
{
  "email": "ahmed@example.com"
}
```

### Reset Password
```
POST /api/auth/reset-password
```

**Request:**
```json
{
  "token": "reset-token",
  "password": "NewPassword123"
}
```

## Products

### Get All Products
```
GET /api/products
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Category slug
- `brand` - Brand slug
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `size` - Size filter
- `color` - Color filter
- `sort` - Sort by (newest, price-asc, price-desc, rating)
- `search` - Search query

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "totalPages": 9
  }
}
```

### Get Featured Products
```
GET /api/products/featured
```

### Get Product by Slug
```
GET /api/products/[slug]
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Nike Air Max 2024",
  "slug": "nike-air-max-2024",
  "price": 2500,
  "salePrice": 2000,
  "images": [...],
  "variants": [...],
  "rating": 4.5,
  "reviewCount": 128,
  "description": "...",
  "sizeGuide": [...]
}
```

### Get Product Reviews
```
GET /api/products/[id]/reviews
```

### Add Product Review
```
POST /api/products/[id]/reviews
```

**Request:**
```json
{
  "rating": 5,
  "title": "Great product!",
  "comment": "Very comfortable and stylish."
}
```

## Categories

### Get All Categories
```
GET /api/categories
```

### Get Category by Slug
```
GET /api/categories/[slug]
```

## Brands

### Get All Brands
```
GET /api/brands
```

### Get Brand by Slug
```
GET /api/brands/[slug]
```

## Search

### Search Products
```
GET /api/search
```

**Query Parameters:**
- `q` - Search query
- `page` - Page number
- `limit` - Items per page

## Cart

### Get Cart
```
GET /api/cart
```

**Response:**
```json
{
  "id": "uuid",
  "items": [
    {
      "id": "uuid",
      "product": {...},
      "variant": {...},
      "quantity": 1,
      "price": 2500
    }
  ],
  "subtotal": 2500,
  "discount": 0,
  "total": 2500
}
```

### Add Item to Cart
```
POST /api/cart/items
```

**Request:**
```json
{
  "productId": "uuid",
  "variantId": "uuid",
  "quantity": 1
}
```

### Update Cart Item
```
PUT /api/cart/items/[id]
```

**Request:**
```json
{
  "quantity": 2
}
```

### Remove Cart Item
```
DELETE /api/cart/items/[id]
```

### Clear Cart
```
DELETE /api/cart
```

### Apply Coupon
```
POST /api/cart/coupon
```

**Request:**
```json
{
  "code": "SAVE10"
}
```

### Remove Coupon
```
DELETE /api/cart/coupon
```

## Wishlist

### Get Wishlist
```
GET /api/wishlist
```

### Add to Wishlist
```
POST /api/wishlist
```

**Request:**
```json
{
  "productId": "uuid"
}
```

### Remove from Wishlist
```
DELETE /api/wishlist/[id]
```

## Checkout

### Get Checkout Data
```
GET /api/checkout
```

### Save Address
```
POST /api/checkout/address
```

**Request:**
```json
{
  "governorate": "Cairo",
  "city": "Nasr City",
  "street": "Street 15",
  "building": "10",
  "apartment": "5",
  "phone": "01012345678"
}
```

### Get Shipping Options
```
GET /api/checkout/shipping
```

**Response:**
```json
{
  "options": [
    {
      "id": "standard",
      "name": "Standard Shipping",
      "price": 40,
      "days": "3-5 business days"
    },
    {
      "id": "express",
      "name": "Express Shipping",
      "price": 70,
      "days": "1-2 business days"
    }
  ]
}
```

### Process Payment
```
POST /api/checkout/payment
```

**Request:**
```json
{
  "paymentMethod": "credit_card",
  "shippingOption": "standard"
}
```

### Confirm Order
```
POST /api/checkout/confirm
```

## Orders

### Get User Orders
```
GET /api/orders
```

### Get Order Details
```
GET /api/orders/[id]
```

### Cancel Order
```
POST /api/orders/[id]/cancel
```

### Request Return
```
POST /api/orders/[id]/return
```

**Request:**
```json
{
  "reason": "Wrong size",
  "items": [
    {
      "orderItemId": "uuid",
      "quantity": 1
    }
  ]
}
```

### Track Order
```
GET /api/orders/[id]/track
```

**Response:**
```json
{
  "status": "shipped",
  "tracking": {
    "carrier": "Aramex",
    "trackingNumber": "AR123456789",
    "estimatedDelivery": "2024-11-19",
    "history": [
      {
        "status": "confirmed",
        "date": "2024-11-15T10:00:00Z"
      },
      {
        "status": "shipped",
        "date": "2024-11-17T14:30:00Z"
      }
    ]
  }
}
```

## Payments

### Create Checkout Session (Stripe)
```
POST /api/payments/checkout
```

**Request:**
```json
{
  "items": [...],
  "shippingAddress": {...}
}
```

### Process Fawry Payment
```
POST /api/payments/fawry
```

### Process InstaPay
```
POST /api/payments/instapay
```

### Process COD
```
POST /api/payments/cod
```

### Check Payment Status
```
GET /api/payments/[id]/status
```

## Webhooks

### Stripe Webhook
```
POST /api/webhooks/stripe
```

### Fawry Webhook
```
POST /api/webhooks/fawry
```

## Admin Endpoints

### Dashboard

#### Get Dashboard Stats
```
GET /api/admin/dashboard/stats
```

**Response:**
```json
{
  "revenue": {
    "today": 45200,
    "yesterday": 38900,
    "thisMonth": 1250000,
    "lastMonth": 1100000
  },
  "orders": {
    "today": 12,
    "yesterday": 10,
    "pending": 5,
    "processing": 3
  },
  "customers": {
    "total": 1500,
    "new": 8
  }
}
```

#### Get Chart Data
```
GET /api/admin/dashboard/charts
```

### Products

#### Get All Products
```
GET /api/admin/products
```

#### Create Product
```
POST /api/admin/products
```

**Request:**
```json
{
  "nameAr": "نايكي اير ماكس",
  "nameEn": "Nike Air Max",
  "descriptionAr": "...",
  "descriptionEn": "...",
  "categoryId": "uuid",
  "brandId": "uuid",
  "basePrice": 2500,
  "salePrice": 2000,
  "sku": "NAM-001",
  "variants": [...]
}
```

#### Update Product
```
PUT /api/admin/products/[id]
```

#### Delete Product
```
DELETE /api/admin/products/[id]
```

#### Bulk Import
```
POST /api/admin/products/import
```

#### Export Products
```
GET /api/admin/products/export
```

### Orders

#### Get All Orders
```
GET /api/admin/orders
```

**Query Parameters:**
- `status` - Filter by status
- `dateFrom` - Start date
- `dateTo` - End date
- `search` - Search by order number or customer

#### Get Order Details
```
GET /api/admin/orders/[id]
```

#### Update Order Status
```
PUT /api/admin/orders/[id]/status
```

**Request:**
```json
{
  "status": "shipped",
  "notes": "Package shipped via Aramex"
}
```

#### Process Refund
```
POST /api/admin/orders/[id]/refund
```

### Customers

#### Get All Customers
```
GET /api/admin/customers
```

#### Get Customer Details
```
GET /api/admin/customers/[id]
```

#### Get Customer Orders
```
GET /api/admin/customers/[id]/orders
```

### Reports

#### Sales Report
```
GET /api/admin/reports/sales
```

**Query Parameters:**
- `period` - daily, weekly, monthly
- `dateFrom` - Start date
- `dateTo` - End date

#### Product Report
```
GET /api/admin/reports/products
```

#### Customer Report
```
GET /api/admin/reports/customers
```

#### Export Report
```
POST /api/admin/reports/export
```

### Inventory

#### Get Inventory
```
GET /api/admin/inventory
```

#### Get Low Stock
```
GET /api/admin/inventory/low-stock
```

#### Adjust Stock
```
POST /api/admin/inventory/adjust
```

**Request:**
```json
{
  "variantId": "uuid",
  "quantity": 10,
  "type": "purchase",
  "notes": "Received shipment"
}
```

#### Bulk Update Stock
```
POST /api/admin/inventory/bulk-update
```

#### Get Stock History
```
GET /api/admin/inventory/movements
```

### Settings

#### Get Settings
```
GET /api/admin/settings
```

#### Update Settings
```
PUT /api/admin/settings
```

### Audit Log

#### Get Audit Logs
```
GET /api/admin/audit-log
```

## POS Endpoints

### Sessions

#### Open Register
```
POST /api/pos/sessions
```

**Request:**
```json
{
  "registerNumber": "REG-001",
  "openingBalance": 1000
}
```

#### Close Register
```
PUT /api/pos/sessions/close
```

**Request:**
```json
{
  "closingBalance": 5000
}
```

#### Get Current Session
```
GET /api/pos/sessions/current
```

### Transactions

#### Create Transaction
```
POST /api/pos/transactions
```

**Request:**
```json
{
  "items": [...],
  "paymentMethod": "cash",
  "amount": 2500,
  "tendered": 3000
}
```

#### Get Transactions
```
GET /api/pos/transactions
```

### Product Lookup

#### Quick Product Lookup
```
POST /api/pos/products/lookup
```

**Request:**
```json
{
  "query": "nike air"
}
```

### Reports

#### Daily Report
```
GET /api/pos/reports/daily
```

#### Sales Report
```
GET /api/pos/reports/sales
```

### Receipt

#### Print Receipt
```
POST /api/pos/receipt/print
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Rate Limiting

- Auth routes: 5 requests per minute
- API routes: 100 requests per minute
- POS routes: 200 requests per minute

## Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12, max: 100)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "totalPages": 9
  }
}
```
