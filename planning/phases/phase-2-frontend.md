# Phase 2: Frontend Store

## Overview

بناء واجهة المتجر الأمامية مع تصميم 3D.

## Duration: 14-21 Days

## Prerequisites
- Phase 0 & 1 completed
- 3D models ready (or placeholder)

## Tasks

### Task 2.1: Layout Components
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Create Navbar component
  ```typescript
  // src/components/layout/Navbar.tsx
  - Logo with 3D effect
  - Navigation links
  - Search bar
  - Cart icon with badge
  - User menu
  - Language toggle (AR/EN)
  - Mobile hamburger menu
  ```
- [ ] Create Footer component
  ```typescript
  // src/components/layout/Footer.tsx
  - Company info
  - Quick links
  - Contact info
  - Social media
  - Newsletter signup
  - Payment methods
  ```
- [ ] Create Sidebar component (for filters)
- [ ] Create Breadcrumbs component

### Task 2.2: Home Page
**Priority**: High
**Duration**: 3 days

#### Subtasks:
- [ ] Hero Section with 3D
  ```typescript
  // src/components/home/HeroSection.tsx
  - 3D shoe model (or image placeholder)
  - Animated text
  - CTA buttons
  - Background effects
  - Responsive design
  ```
- [ ] Featured Products Section
  ```typescript
  // src/components/home/FeaturedProducts.tsx
  - Product carousel
  - 3D product cards
  - Quick view
  - Navigation arrows
  ```
- [ ] Categories Section
  ```typescript
  // src/components/home/CategoriesSection.tsx
  - Category grid
  - Hover effects
  - Image backgrounds
  ```
- [ ] Brands Section
  ```typescript
  // src/components/home/BrandsSection.tsx
  - Brand logos
  - Infinite scroll
  - Hover effects
  ```
- [ ] Newsletter Section
- [ ] Testimonials Section

### Task 2.3: Product Listing Page
**Priority**: High
**Duration**: 3 days

#### Subtasks:
- [ ] Create product grid
  ```typescript
  // src/components/product/ProductGrid.tsx
  - Responsive grid (1-4 columns)
  - Product cards with 3D
  - Loading skeletons
  - Empty state
  ```
- [ ] Create filter sidebar
  ```typescript
  // src/components/product/FilterSidebar.tsx
  - Category filter
  - Size filter
  - Color filter
  - Brand filter
  - Price range slider
  - Clear all button
  ```
- [ ] Create sort dropdown
  ```typescript
  // src/components/product/SortDropdown.tsx
  - Newest
  - Price: Low to High
  - Price: High to Low
  - Best Selling
  - Rating
  ```
- [ ] Implement infinite scroll / pagination
- [ ] Add view toggle (grid/list)

### Task 2.4: Product Detail Page
**Priority**: High
**Duration**: 3 days

#### Subtasks:
- [ ] 3D Product Viewer
  ```typescript
  // src/components/3d/ProductViewer.tsx
  - Interactive 3D model
  - Auto-rotation
  - Zoom controls
  - Full-screen mode
  - Touch support
  ```
- [ ] Product Gallery
  ```typescript
  // src/components/product/ProductGallery.tsx
  - Image carousel
  - Thumbnail navigation
  - Zoom on hover
  - Lightbox
  ```
- [ ] Product Info
  ```typescript
  // src/components/product/ProductInfo.tsx
  - Product name
  - Price display
  - Rating
  - Description
  - Size selector
  - Color selector
  - Add to cart button
  - Wishlist button
  ```
- [ ] Related Products
- [ ] Product Reviews
- [ ] Size Guide

### Task 2.5: Shopping Cart
**Priority**: High
**Duration**: 2 days

#### Subtasks:
- [ ] Cart Sidebar
  ```typescript
  // src/components/cart/CartSidebar.tsx
  - Slide-in from right
  - Cart items list
  - Quantity controls
  - Remove item
  - Subtotal
  - Checkout button
  ```
- [ ] Cart Page
  ```typescript
  // src/components/cart/CartPage.tsx
  - Full cart view
  - Product images
  - Size/color display
  - Quantity controls
  - Coupon input
  - Order summary
  ```
- [ ] Cart State (Zustand)
  ```typescript
  // src/stores/cartStore.ts
  - Add item
  - Remove item
  - Update quantity
  - Clear cart
  - Persist to localStorage
  ```
- [ ] Add to Cart Animation

### Task 2.6: Checkout Flow
**Priority**: High
**Duration**: 3 days

#### Subtasks:
- [ ] Checkout Layout
  ```typescript
  // src/components/checkout/CheckoutLayout.tsx
  - Multi-step form
  - Step indicator
  - Progress bar
  ```
- [ ] Address Step
  ```typescript
  // src/components/checkout/AddressStep.tsx
  - Saved addresses
  - Add new address
  - Governorate selector
  - City selector
  ```
- [ ] Payment Step
  ```typescript
  // src/components/checkout/PaymentStep.tsx
  - Payment method selection
  - Card form (future)
  - Mobile wallet selection
  - COD option
  ```
- [ ] Order Review Step
- [ ] Order Confirmation Page

### Task 2.7: Search
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Search Bar Component
  ```typescript
  // src/components/search/SearchBar.tsx
  - Autocomplete
  - Recent searches
  - Popular searches
  ```
- [ ] Search Results Page
  ```typescript
  // src/app/(shop)/search/page.tsx
  - Search results grid
  - Filters
  - Sort options
  ```
- [ ] Search API

### Task 2.8: Wishlist
**Priority**: Medium
**Duration**: 1 day

#### Subtasks:
- [ ] Wishlist Page
- [ ] Add to Wishlist
- [ ] Remove from Wishlist
- [ ] Move to Cart

### Task 2.9: User Account
**Priority**: Medium
**Duration**: 2 days

#### Subtasks:
- [ ] Account Dashboard
- [ ] Order History
- [ ] Order Details
- [ ] Address Management
- [ ] Profile Settings

## Deliverables

- [ ] Complete home page
- [ ] Product listing with filters
- [ ] Product detail with 3D viewer
- [ ] Shopping cart functionality
- [ ] Checkout flow
- [ ] Search functionality
- [ ] Wishlist
- [ ] User account pages

## Verification

- [ ] Home page loads with 3D effects
- [ ] Products display correctly
- [ ] Filters work properly
- [ ] Cart persists across sessions
- [ ] Checkout flow completes
- [ ] Search returns relevant results
- [ ] Mobile responsive

## Pages Created

```
/                         - Home page
/products                 - Product listing
/products/[slug]          - Product detail
/cart                     - Shopping cart
/checkout                 - Checkout flow
/checkout/address         - Address step
/checkout/payment         - Payment step
/checkout/confirmation    - Order confirmation
/search                   - Search results
/wishlist                  - Wishlist
/account                  - Account dashboard
/account/orders           - Order history
/account/orders/[id]      - Order details
/account/addresses        - Address management
/account/settings         - Profile settings
```

## Components Created

```
Layout:
- Navbar
- Footer
- Sidebar
- Breadcrumbs

Home:
- HeroSection
- FeaturedProducts
- CategoriesSection
- BrandsSection
- Newsletter

Product:
- ProductCard
- ProductGrid
- ProductGallery
- ProductInfo
- FilterSidebar
- SortDropdown

Cart:
- CartSidebar
- CartPage
- CartItem

Checkout:
- CheckoutLayout
- AddressStep
- PaymentStep
- OrderReview

Search:
- SearchBar
- SearchResults

3D:
- ProductViewer
- ProductCard3D
```

## Notes

- Focus on mobile-first design
- Implement lazy loading for images
- Add loading skeletons
- Handle empty states
- Add error boundaries
- Optimize for SEO
