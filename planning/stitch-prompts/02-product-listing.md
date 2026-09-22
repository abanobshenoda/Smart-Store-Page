# Stitch AI Design Prompts - Product Listing Page

## Prompt: Product Listing Page (PLP)

```
Design a product listing page for "Smart Store" - an Egyptian shoe e-commerce website.

IMPORTANT: RTL (Right-to-Left) Arabic layout.

Design System:
- Primary: Sky Blue (#0ea5e9)
- Secondary: Purple (#d946ef)
- Accent: Gold (#d4af37)
- Background: Light Gray (#f5f5f5)
- Cards: White
- Text: Dark Gray (#171717)

Page Layout:

1. BREADCRUMBS:
   - Home > Products > Men's Shoes
   - Small text, gray color
   - Links are blue on hover

2. PAGE HEADER:
   - Title: "أحذية رجالي" (Men's Shoes)
   - Product count: "120 منتج"
   - View toggle: Grid | List icons
   - Sort dropdown: "الأحدث" (Newest)

3. FILTER SIDEBAR (Right side for RTL):
   
   a. Search Box:
      - Placeholder: "ابحث عن منتج..."
      - Search icon
   
   b. Categories:
      - رجالي (45)
      - نسائي (38)
      - أطفال (25)
      - رياضي (32)
      - Checkbox style
   
   c. Size Filter:
      - Grid of size buttons
      - 39, 40, 41, 42, 43, 44, 45, 46
      - Selected: Blue border
      - Unavailable: Gray with line through
   
   d. Color Filter:
      - Color circles
      - Black, White, Red, Blue, Green, Brown
      - Selected: Checkmark inside
   
   e. Brand Filter:
      - Nike (20)
      - Adidas (15)
      - Puma (12)
      - Reebok (8)
      - Checkbox style
   
   f. Price Range:
      - Slider from 500 to 5000 EGP
      - Min/Max input fields
      - Current range display
   
   g. Clear All Button:
      - "مسح الفلاتر" (Clear Filters)
      - Red text

4. PRODUCT GRID (Left side):
   
   Product Card Design:
   ┌─────────────────────────────┐
   │  [NEW]           [♡]       │
   │                             │
   │      👟                     │
   │   (3D Shoe Image)          │
   │   Hover: Rotate Effect      │
   │                             │
   │  ⭐⭐⭐⭐⭐ (128)            │
   │                             │
   │  نايكي اير ماكس 2024       │
   │  Nike Air Max 2024          │
   │                             │
   │  EGP 2,500                  │
   │  ~~EGP 3,000~~ -17%        │
   │                             │
   │  Colors: ● ● ● ●           │
   │                             │
   │  [أضف إلى السلة]            │
   └─────────────────────────────┘

5. PAGINATION:
   - Page numbers: 1, 2, 3, ..., 10
   - Previous/Next buttons
   - Active page: Blue background

6. MOBILE FILTER:
   - Filter button at top
   - Opens bottom sheet
   - Apply button

Design Features:
- Cards with subtle shadow
- Hover: lift effect + shadow
- 3D shoe rotation on hover
- Smooth transitions
- Responsive grid: 1 col mobile, 2 tablet, 3-4 desktop
- Loading skeleton states
```

## Prompt: Product Card Component

```
Design a product card component for an Egyptian shoe store.

Style: Modern, clean, 3D effects
RTL Arabic layout

Card Structure:
┌─────────────────────────────┐
│                             │
│  ┌─────┐      ┌─────┐     │
│  │ NEW │      │  ♡  │     │
│  └─────┘      └─────┘     │
│                             │
│    ┌─────────────────┐     │
│    │                 │     │
│    │   👟            │     │
│    │   (3D Shoe)     │     │
│    │                 │     │
│    │  Auto-rotate    │     │
│    │  on scroll      │     │
│    └─────────────────┘     │
│                             │
│    ⭐⭐⭐⭐⭐ (128)          │
│                             │
│    نايكي اير ماكس          │
│    Nike Air Max 2024        │
│                             │
│    EGP 2,500                │
│    ~~EGP 3,000~~ -17%      │
│                             │
│    ● ● ● ●  (Colors)       │
│                             │
│  ┌─────────────────────┐   │
│  │   أضف إلى السلة     │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘

States:
1. Default: White background, subtle shadow
2. Hover: Lift up 8px, shadow expands, shoe rotates slightly
3. Loading: Skeleton placeholder
4. Out of Stock: Gray overlay, "نفدت" badge

Features:
- 3D depth effect
- Smooth transitions (0.3s)
- Touch-friendly
- Responsive sizing
```

## Prompt: Filter Components

```
Design filter components for a product listing page.

Style: Clean, functional, Arabic RTL

Components:

1. SIZE FILTER:
┌─────────────────────────┐
│ المقاس (Size)           │
├─────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐│
│ │  39 │ │  40 │ │  41 ││
│ └─────┘ └─────┘ └─────┘│
│ ┌─────┐ ┌─────┐ ┌─────┐│
│ │  42 │ │  43 │ │  44 ││
│ └─────┘ └─────┘ └─────┘│
│ ┌─────┐ ┌─────┐        │
│ │  45 │ │  46 │        │
│ └─────┘ └─────┘        │
└─────────────────────────┘

States:
- Default: White, gray border
- Selected: Blue border, blue background
- Unavailable: Gray, strikethrough, no cursor

2. COLOR FILTER:
┌─────────────────────────┐
│ اللون (Color)           │
├─────────────────────────┤
│ ●  ●  ●  ●  ●  ●       │
│ Blk Wht Red Blu Grn Brn │
└─────────────────────────┘

States:
- Default: Color circle
- Selected: Checkmark inside, ring around
- Hover: Scale up slightly

3. PRICE RANGE SLIDER:
┌─────────────────────────┐
│ السعر (Price)           │
├─────────────────────────┤
│ [500]     ←——●——→  [5000]│
│                         │
│ EGP 500 - EGP 5,000    │
└─────────────────────────┘

Features:
- Dual thumb slider
- Input fields for exact values
- Blue track for selected range
- Smooth drag

4. BRAND FILTER:
┌─────────────────────────┐
│ البراند (Brand)         │
├─────────────────────────┤
│ ☑ نايكي           (20)  │
│ ☑ أديداس          (15)  │
│ ☐ بوما            (12)  │
│ ☐ ريبوك           (8)   │
└─────────────────────────┘

Style: Checkbox with count
```
