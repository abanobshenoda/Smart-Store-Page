# Stitch AI Design Prompts - Product Detail Page

## Prompt: Product Detail Page (PDP)

```
Design a premium product detail page for "Smart Store" - Egyptian shoe e-commerce.

IMPORTANT: RTL (Right-to-Left) Arabic layout.

Design System:
- Primary: Sky Blue (#0ea5e9)
- Secondary: Purple (#d946ef)
- Accent: Gold (#d4af37)
- Background: White
- Text: Dark Gray (#171717)

Page Layout:

1. BREADCRUMBS:
   - Home > Products > Men's > Nike Air Max 2024
   - Small, gray, clickable

2. MAIN CONTENT (Two Column Layout):

   RIGHT COLUMN (60% - for RTL):
   
   a. 3D Product Viewer:
      ┌─────────────────────────────────┐
      │                                 │
      │      ┌─────────────────┐       │
      │      │                 │       │
      │      │    👟           │       │
      │      │   (3D Model)    │       │
      │      │                 │       │
      │      │  🔄 Auto-rotate │       │
      │      │  🔍 Click zoom  │       │
      │      │                 │       │
      │      └─────────────────┘       │
      │                                 │
      │  [📷] [📷] [📷] [📷] [🎬]     │
      │   Thumbnails with video        │
      │                                 │
      │  ← Swipe to rotate →           │
      └─────────────────────────────────┘
   
   b. Image Features:
      - 360° rotation on drag
      - Pinch to zoom on mobile
      - Fullscreen mode
      - Video thumbnail

   LEFT COLUMN (40%):
   
   a. Product Info:
      - Brand: "نايكي" (Nike) - Blue link
      - Name: "نايكي اير ماكس 2024"
      - Name EN: "Nike Air Max 2024"
      
      Rating:
      ⭐⭐⭐⭐⭐ 4.5 (128 تقييم) | 45 تم شراؤه
   
   b. Price:
      ┌─────────────────────────────────┐
      │  EGP 2,500                      │
      │  ~~EGP 3,000~~  -17%           │
      │                                 │
      │  💳 أو 3 دفعات بدون فوائد      │
      │  EGP 833/شهر                    │
      └─────────────────────────────────┘
   
   c. Color Selector:
      اللون: **أسود**
      ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
      │  ●  │ │  ●  │ │  ●  │ │  ●  │
      │Blk  │ │Wht  │ │Red  │ │Blue │
      └─────┘ └─────┘ └─────┘ └─────┘
   
   d. Size Selector:
      المقاس: **42**
      ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
      │  39 │ │  40 │ │  41 │ │  42 │
      └─────┘ └─────┘ └─────┘ └─────┘
      ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
      │  43 │ │  44 │ │  45 │ │  46 │
      └─────┘ └─────┘ └─────┘ └─────┘
      
      📏 دليل المقاسات (Size Guide)
   
   e. Quantity:
      الكمية:
      [-] 1 [+]   |  متوفر في المخزون ✅
   
   f. Action Buttons:
      ┌─────────────────────────────────┐
      │      أضف إلى السلة              │
      │      (Add to Cart)              │
      └─────────────────────────────────┘
      ┌─────┐  ┌─────┐  ┌─────┐
      │  ♡  │  │ 🔄  │  │ ↗️  │
      │Wish │  │Compare│ │Share│
      └─────┘  └─────┘  └─────┘
   
   g. Delivery Info:
      ┌─────────────────────────────────┐
      │ 🚚 الشحن المجاني للطلبات      │
      │    فوق EGP 500                 │
      │                                 │
      │ 📍 التوصيل إلى: القاهرة        │
      │    3-5 أيام عمل                │
      │                                 │
      │ 🔄 استبدال و إرجاع سهل        │
      │    خلال 14 يوم                 │
      └─────────────────────────────────┘

3. PRODUCT TABS:

   a. الوصف (Description):
      - Product description in Arabic
      - Features list with checkmarks
      - Material information
   
   b. المميزات (Features):
      - ✅ جلد طبيعي
      - ✅ نعل مريح
      - ✅ خفيف الوزن
      - ✅ تصميم عصري
   
   c. دليل المقاسات (Size Guide):
      - Size chart table
      - Measurement instructions
      - How to measure foot length
   
   d. التقييمات (Reviews):
      - Rating breakdown (5 stars: 60%, 4 stars: 25%, etc.)
      - Review cards with user name, date, rating, comment
      - "Write a Review" button

4. RELATED PRODUCTS:
   - "منتجات مشابهة" (Similar Products)
   - 4 product cards in row
   - Same card style as listing page

5. FREQUENTLY BOUGHT TOGETHER:
   - "يُشترى معاً عادةً"
   - Main product + 2-3 accessories
   - Bundle price with savings
   - "Add All to Cart" button

Design Features:
- 3D product viewer with auto-rotation
- Smooth color/size selection
- Add to cart animation (fly to cart)
- Sticky "Add to Cart" on mobile
- Image gallery with lightbox
- Responsive layout
```

## Prompt: 3D Product Viewer Component

```
Design a 3D product viewer component for a shoe store.

Style: Interactive, modern, engaging

Component Structure:
┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │                             │   │
│  │        👟                   │   │
│  │       (3D Shoe Model)       │   │
│  │                             │   │
│  │    ↻ Auto-rotate            │   │
│  │    🔍 Scroll to zoom        │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  Controls:                          │
│  [← Rotate] [🔄 Reset] [Rotate →]  │
│  [🔍+] [🔍-] [⛶ Fullscreen]       │
│                                     │
│  Indicators:                        │
│  ● ○ ○ ○  (4 images)              │
│                                     │
└─────────────────────────────────────┘

Features:
1. Auto-rotation (toggle on/off)
2. Mouse drag to rotate
3. Scroll to zoom
4. Touch support (pinch zoom, swipe rotate)
5. Fullscreen mode
6. 360° view
7. Shadow beneath shoe
8. Background gradient option
9. Annotation hotspots (optional)
10. Loading skeleton

States:
- Loading: 3D spinner
- Ready: Full interaction
- Error: Fallback to images
```
