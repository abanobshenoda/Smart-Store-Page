# SEO Plan - Smart Store Egypt

## Target: Egyptian Arabic Market

---

## 1. Primary Keywords (Arabic)

### High Volume Keywords (use in H1/H2 & title)
- أحذية رجالي مصر
- أحذية نسائي في مصر
- شراء أحذية اونلاين مصر
- متجر أحذية
- حذاء رياضي اون لاين

### Brand/Product Keywords
- نايكي مصر
- أديداس مصر
- بوما مصر
- أحذية نايكي اونلاين
- أحذية أديداس مصر

### Long-tail Keywords (use in product descriptions)
- أفضل حذاء رياضي للجري في مصر
- حذاء نسائي مريح للمشي اليومي
- شراء حذاء رجالي بالتقسيط
- توصيل أحذية لجميع المحافظات

---

## 2. Technical SEO

### Next.js Metadata API
```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://smartstore.com'),
  title: {
    default: 'Smart Store | متجر الأحذية الأول في مصر',
    template: '%s | Smart Store',
  },
  description: 'تسوق أفضل الأحذية من أكبر العلامات التجارية في مصر. توصيل سريع لجميع المحافظات. تقسيط متاح.',
  keywords: ['أحذية مصر', 'متجر أحذية', ...],
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://smartstore.com',
    siteName: 'Smart Store',
    title: 'Smart Store | متجر الأحذية الأول في مصر',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Store Egypt',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Per-Page Metadata (Dynamic)
```tsx
// app/products/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: product.nameAr,
    description: product.metaDescriptionAr || product.shortDescriptionAr,
    alternates: {
      canonical: `/products/p/${product.slugAr}`,
    },
    openGraph: {
      images: [product.images[0].url],
    },
  };
}
```

---

## 3. Structured Data (Schema.org)

### Product Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "نايكي اير ماكس 2024",
  "brand": "Nike",
  "image": "https://smartstore.com/images/nike-air-max.jpg",
  "description": "حذاء رياضي كلاسيكي بتصميم عصري",
  "sku": "NK-AM-2024",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EGP",
    "price": "2500",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "128"
  }
}
```

### Store/Business Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Smart Store",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cairo",
    "addressCountry": "EG"
  },
  "telephone": "+20228101234",
  "openingHours": "Sa-Th 10:00-22:00",
  "priceRange": "EGP 500 - EGP 5000"
}
```

### How to Implement in Next.js:
```tsx
<Script
  id="product-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
```

---

## 4. URL Structure (Arabic Slugs)

- **Products**: `/products/p/naiki-air-max-2024` (slugAr)
- **Categories**: `/products/category/ahziya-rijali`
- **Pages**: `/about-us`, `/size-guide`
- **Keep**: Short, descriptive, use Arabic transliteration

---

## 5. Local SEO (Egypt)

### Google Business Profile
- Create listing for each physical store
- Name: "Smart Store - مدينة نصر"
- Category: "متجر أحذية" / Shoe Store
- Add photos, hours, phone

### Store Locator (Leaflet)
Helps Google index each store location.

### Reviews
Encourage customers to leave Google reviews after purchase.

---

## 6. Content SEO

### Blog (Optional - phase 5):
Article ideas:
- "دليل اختيار الحذاء الرياضي المناسب"
- "أفضل 10 أحذية للجري في مصر 2024"
- "كيف تختار مقاس حذائك الصحيح"
- "أحذية رجالي شتوية: أفضل الاختيارات"

### Static Pages Optimization:
Each page gets unique title + meta description + keyword focus.

---

## 7. Performance SEO (Core Web Vitals)

- [ ] Use Next.js image optimization (`next/image`)
- [ ] Lazy load 3D models (only on product page)
- [ ] Lazy load below-fold images
- [ ] Preconnect to Neon DB
- [ ] Cache API responses (SWR)
- [ ] Efficient bundling (Next.js auto)

---

## 8. Analytics & Tracking

```tsx
// app/layout.tsx - Google Analytics
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### Key Metrics to Track:
- Organic traffic (Arabic searches)
- Add-to-cart rate
- Checkout completion rate
- Mobile vs Desktop split (Egypt heavy mobile)
- all page speed

---

## 9. Social Media Integration

- Facebook & Instagram (dominant in Egypt)
- Link website in bios
- Post product images/videos
- Share 3D product views (unique selling point)
- TikTok for showroom videos

---

## 10. Pre-Launch SEO Checklist

- [ ] Robots.txt (allow all, block /dashboard, /account, /pos)
- [ ] Sitemap.xml (via next-sitemap)
- [ ] Canonical URLs on all pages
- [ ] Arabic meta descriptions on all pages
- [ ] Product schema on all product pages
- [ ] Google Search Console setup
- [ ] Google Analytics setup
- [ ] Submit sitemap to Search Console
- [ ] 404 page with search + popular products
