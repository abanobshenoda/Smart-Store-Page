# Product Catalog & Display

## Overview

نظام عرض المنتجات بتقنية 3D وتמקובל للسوق المصري:
- عرض المنتجات بتصميم 3D متحرك
- فلاتر ذكية (المقاس، اللون، البراند، السعر)
- بحث سريع
- صفحات تفاصيل المنتج بتأثيرات 3D
- دعم اللغة العربية (RTL)

## Features

### 1. Product Listing Page
- Grid/List view toggle
- Infinite scroll or pagination
- Sort by: Newest, Price (Low/High), Best Selling, Rating
- Quick view modal
- 3D product cards with hover effects

### 2. Product Filters
- **Category**: Men, Women, Kids
- **Size**: Egyptian sizes (39-46 for men, 36-41 for women, 28-38 for kids)
- **Color**: Visual color picker
- **Brand**: Nike, Adidas, Puma, etc.
- **Price Range**: Slider with EGP values
- **Availability**: In Stock, Pre-order

### 3. Product Search
- Autocomplete suggestions
- Search by name, brand, category
- Recent searches
- Popular searches

### 4. Product Detail Page
- 3D product viewer (360° rotation)
- Image gallery with zoom
- Size guide
- Size availability checker
- Add to cart with animation
- Related products
- Product reviews

### 5. 3D Product Display
- Interactive 3D model rotation
- Auto-rotate on scroll
- Zoom in/out
- Full-screen mode
- AR preview (future)

## Database Schema

```sql
-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Brands
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  category_id UUID REFERENCES categories(id),
  brand_id UUID REFERENCES brands(id),
  base_price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  cost_price DECIMAL(10,2),
  sku VARCHAR(100) UNIQUE,
  barcode VARCHAR(100),
  weight DECIMAL(8,2),
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  model_3d_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Product Images
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product Variants (Size + Color combinations)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(20) NOT NULL,
  color VARCHAR(50) NOT NULL,
  color_hex VARCHAR(7),
  sku VARCHAR(100) UNIQUE,
  stock_quantity INT DEFAULT 0,
  price_adjustment DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product Reviews
CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Wishlists
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

## API Routes

```
GET    /api/products              - Get all products (with filters)
GET    /api/products/featured     - Get featured products
GET    /api/products/[slug]       - Get product by slug
GET    /api/products/[id]/reviews - Get product reviews
POST   /api/products/[id]/reviews - Add product review
GET    /api/categories            - Get all categories
GET    /api/brands                - Get all brands
GET    /api/search                - Search products
GET    /api/wishlist              - Get user wishlist
POST   /api/wishlist              - Add to wishlist
DELETE /api/wishlist/[id]         - Remove from wishlist
```

## Frontend Pages

```
/                    - Home page with featured products
/products            - Product listing page
/products/[slug]     - Product detail page
/categories/[slug]   - Category page
/brands/[slug]       - Brand page
/search              - Search results page
/wishlist            - Wishlist page
```

## 3D Product Card Design

```typescript
// Product Card Component Structure
interface ProductCard {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  model3dUrl?: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  colors: string[];
  sizes: string[];
}
```

## Tasks

### Task 1: Product Data Setup
- [ ] Create seed data for categories
- [ ] Create seed data for brands
- [ ] Create sample products
- [ ] Add product images

### Task 2: Product Listing
- [ ] Build product grid component
- [ ] Implement infinite scroll
- [ ] Add sort functionality
- [ ] Create filter sidebar
- [ ] Add view toggle (grid/list)

### Task 3: Product Filters
- [ ] Build filter components
- [ ] Implement URL-based filters
- [ ] Add price range slider
- [ ] Create color picker
- [ ] Add size filter

### Task 4: Product Detail Page
- [ ] Create product gallery
- [ ] Implement 3D viewer
- [ ] Build size selector
- [ ] Add to cart functionality
- [ ] Create related products section

### Task 5: Search
- [ ] Implement search API
- [ ] Create autocomplete component
- [ ] Add search results page
- [ ] Implement search history

## Design Guidelines

### Product Card (3D Effect)
- Card has subtle shadow and depth
- On hover: card lifts up with enhanced shadow
- Product image rotates slightly on hover
- Price badge with animation
- Quick add button appears on hover

### Product Detail (3D)
- 3D model viewer takes center stage
- Scroll-triggered rotation
- Smooth transitions between views
- Size selector with visual feedback
- Add to cart with particle animation
