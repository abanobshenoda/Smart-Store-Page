# Sitemap - Smart Store

## Structure of all pages & routes

## Public Pages (Frontend)

### Storefront
| Path | Page | RTL |
|------|------|-----|
| `/` | Home Page | ✓ |
| `/search` | Search Results | ✓ |
| `/cart` | Shopping Cart | ✓ |
| `/checkout` | Checkout (3 steps) | ✓ |
| `/checkout/confirmation` | Order Confirmation | ✓ |

### Products
| Path | Page |
|------|------|
| `/products` | All Products (listing) |
| `/products/category/[slug]` | Category products |
| `/products/brand/[slug]` | Brand products |
| `/products/p/[slug]` | Product Detail (PDP) |
| `/products/new-arrivals` | New Arrivals |
| `/products/sale` | Sale/Deals |

### Auth
| Path | Page |
|------|------|
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Forgot Password |
| `/reset-password` | Reset Password |

### Account (Customer)
| Path | Page |
|------|------|
| `/account` | Dashboard |
| `/account/orders` | Order History |
| `/account/orders/[id]` | Order Detail + Tracking |
| `/account/wishlist` | Wishlist |
| `/account/addresses` | Address Book |
| `/account/payment-methods` | Payment Methods |
| `/account/loyalty` | Loyalty Points |
| `/account/settings` | Account Settings |

### Other Public
| Path | Page |
|------|------|
| `/stores` | Store Locator |
| `/flash-sales` | Flash Sales |
| `/guest-tracking` | Guest Order Tracking |
| `/faq` | FAQ |
| `/contact` | Contact Us |
| `/about` | About Us |
| `/shipping-policy` | Shipping Policy |
| `/return-policy` | Return Policy |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |
| `/size-guide` | Size Guide |

---

## Admin Dashboard (Protected)

### Dashboard
| Path | Page |
|------|------|
| `/dashboard` | Overview / Stats |
| `/dashboard/analytics` | Analytics & Reports |

### Product Management
| Path | Page |
|------|------|
| `/dashboard/products` | Product List |
| `/dashboard/products/new` | Add Product |
| `/dashboard/products/[id]` | Edit Product |
| `/dashboard/categories` | Categories |
| `/dashboard/brands` | Brands |

### Order Management
| Path | Page |
|------|------|
| `/dashboard/orders` | All Orders |
| `/dashboard/orders/[id]` | Order Detail |
| `/dashboard/returns` | Returns & Refunds |

### Customer Management
| Path | Page |
|------|------|
| `/dashboard/customers` | Customers List |
| `/dashboard/customers/[id]` | Customer Detail |
| `/dashboard/customer-groups` | Customer Groups |

### Inventory
| Path | Page |
|------|------|
| `/dashboard/inventory` | Inventory Overview |
| `/dashboard/inventory/transfers` | Store Transfers |
| `/dashboard/inventory/counts` | Inventory Counts |

### Marketing
| Path | Page |
|------|------|
| `/dashboard/promotions` | Promotions |
| `/dashboard/flash-sales` | Flash Sales |
| `/dashboard/bundles` | Bundles |
| `/dashboard/coupons` | Coupons |
| `/dashboard/discounts` | Smart Discounts |
| `/dashboard/abandoned-carts` | Abandoned Cart Recovery |
| `/dashboard/seasonal` | Seasonal Promotions |
| `/dashboard/cart-recovery` | Cart Recovery Settings |

### Content
| Path | Page |
|------|------|
| `/dashboard/pages` | Static Pages |
| `/dashboard/pages/new` | Add Page |
| `/dashboard/pages/[id]` | Edit Page |
| `/dashboard/faq` | FAQ Manager |
| `/dashboard/banners` | Banner Manager |

### Translation
| Path | Page |
|------|------|
| `/dashboard/translations` | Language Translations |
| `/dashboard/translations/[key]` | Edit Translation |

### Store Management
| Path | Page |
|------|------|
| `/dashboard/stores` | Stores |
| `/dashboard/stores/[id]` | Store Detail |
| `/dashboard/shipping-rates` | Shipping Rates |

---

## POS (Protected - Store Staff)
| Path | Page |
|------|------|
| `/pos` | POS Main Interface |
| `/pos/history` | POS Transactions |
| `/pos/reports` | POS Reports (X/Z) |

---

## API Routes (Backend)

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/session
```

### User
```
GET    /api/user/me
PUT    /api/user/me
GET    /api/user/addresses
POST   /api/user/addresses
PUT    /api/user/addresses/[id]
DELETE /api/user/addresses/[id]
```

### Products
```
GET    /api/products
GET    /api/products/[slug]
GET    /api/products/search
GET    /api/categories
GET    /api/brands
GET    /api/products/[id]/reviews
POST   /api/products/[id]/reviews
GET    /api/products/featured
GET    /api/products/new-arrivals
GET    /api/products/sale
```

### Cart
```
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/[id]
DELETE /api/cart/items/[id]
GET    /api/cart/coupon
POST   /api/cart/coupon
```

### Checkout & Orders
```
POST   /api/checkout
POST   /api/payment/create
POST   /api/payment/webhook
GET    /api/orders
GET    /api/orders/[id]
POST   /api/orders/track
```

### Wishlist
```
GET    /api/wishlist
POST   /api/wishlist/[productId]
DELETE /api/wishlist/[productId]
```

### Recently Viewed
```
POST   /api/recently-viewed
GET    /api/recently-viewed
```

### Stores
```
GET    /api/stores
GET    /api/stores/nearby
GET    /api/stores/[id]
```

### Misc
```
GET    /api/faq
GET    /api/pages/[slug]
POST   /api/newsletter
GET    /api/flash-sales
GET    /api/bundles
POST   /api/shipping/calculate
GET    /api/loyalty/points
```

### Admin (Protected)
```
GET    /api/admin/stats
GET    /api/admin/products
POST   /api/admin/products
PUT    /api/admin/products/[id]
DELETE /api/admin/products/[id]
GET    /api/admin/orders
PUT    /api/admin/orders/[id]/status
GET    /api/admin/customers
GET    /api/admin/inventory
POST   /api/admin/inventory/adjust
POST   /api/admin/transfers
GET    /api/admin/promotions
POST   /api/admin/promotions
...
```

### Webhooks
```
POST   /api/webhooks/stripe
POST   /api/webhooks/fawry
POST   /api/webhooks/instapay
POST   /api/webhooks/uploadthing
```
