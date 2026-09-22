# Multi-Language Support (AR/EN)

## Overview

دعم كامل للعربية والإنجليزية مع التحكم من الـ Dashboard:
- تبديل اللغة بضغطة واحدة
- حفظ تفضيل اللغة
- RTL/LTR تلقائي
- SEO محسّن لكل لغة

## Dashboard Control

### Feature Toggle
```
Dashboard → Settings → General → Language Settings
├── Enable Arabic: [Toggle ON/OFF]
├── Enable English: [Toggle ON/OFF]
├── Default Language: [Arabic ▼]
├── Auto-detect Language: [Toggle ON/OFF]
└── Force Language: [Toggle OFF]
```

### Language Management
```
Dashboard → Settings → Languages
├── Arabic
│   ├── Status: Active
│   ├── Completeness: 95%
│   └── [Edit Translations]
├── English
│   ├── Status: Active
│   ├── Completeness: 100%
│   └── [Edit Translations]
└── [+ Add New Language]
```

## Features

### 1. Language Switcher
```
┌─────────────────────────────────────┐
│ 🏠 Smart Store    🔍    👤   🛒    │
│                         [AR | EN]   │
└─────────────────────────────────────┘
```

### 2. URL Structure
```
Arabic: smartstore.com/المنتجات/nike-air-max
English: smartstore.com/products/nike-air-max
```

### 3. Content Translation
- Product names (AR/EN)
- Descriptions (AR/EN)
- Category names (AR/EN)
- UI text
- Error messages
- Email templates

## Database Schema

```sql
-- Languages table
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) UNIQUE NOT NULL,  -- 'ar', 'en'
  name VARCHAR(100) NOT NULL,        -- 'Arabic', 'English'
  native_name VARCHAR(100) NOT NULL, -- 'العربية', 'English'
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE,
  direction VARCHAR(3) DEFAULT 'ltr', -- 'ltr' or 'rtl'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Translations table
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_code VARCHAR(10) NOT NULL,
  key VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  context VARCHAR(100),  -- 'ui', 'product', 'email'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(language_code, key)
);

-- Product Translations
CREATE TABLE product_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(product_id, language_code)
);

-- Category Translations
CREATE TABLE category_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(category_id, language_code)
);

-- User Language Preference
ALTER TABLE users ADD COLUMN preferred_language VARCHAR(10) DEFAULT 'ar';
```

## API Routes

```
GET    /api/languages                    - Get available languages
GET    /api/translations/[language]      - Get translations
PUT    /api/admin/settings/languages     - Update language settings
GET    /api/admin/translations           - Get all translations
PUT    /api/admin/translations/[key]     - Update translation
POST   /api/admin/translations/import    - Import translations
GET    /api/admin/translations/export    - Export translations
```

## Frontend Implementation

### i18n Setup
```typescript
// src/i18n/config.ts
export const i18n = {
  defaultLocale: 'ar',
  locales: ['ar', 'en'],
  localeDetection: true,
};

// src/i18n/dictionaries/ar.json
{
  "nav": {
    "home": "الرئيسية",
    "products": "المنتجات",
    "categories": "التصنيفات",
    "cart": "سلة التسوق",
    "account": "حسابي"
  },
  "product": {
    "addToCart": "أضف إلى السلة",
    "size": "المقاس",
    "color": "اللون",
    "price": "السعر"
  }
}

// src/i18n/dictionaries/en.json
{
  "nav": {
    "home": "Home",
    "products": "Products",
    "categories": "Categories",
    "cart": "Cart",
    "account": "Account"
  },
  "product": {
    "addToCart": "Add to Cart",
    "size": "Size",
    "color": "Color",
    "price": "Price"
  }
}
```

### Language Switcher Component
```typescript
// src/components/ui/LanguageSwitcher.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    router.push(`/${newLocale}${pathname}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage('ar')}
        className={locale === 'ar' ? 'active' : ''}
      >
        AR
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={locale === 'en' ? 'active' : ''}
      >
        EN
      </button>
    </div>
  );
}
```

## Tasks

### Task 1: Language Infrastructure
- [ ] Create languages table
- [ ] Create translations table
- [ ] Setup i18n library (next-intl)
- [ ] Create translation files

### Task 2: Dashboard Controls
- [ ] Language settings page
- [ ] Enable/disable languages
- [ ] Set default language
- [ ] Translation editor

### Task 3: Frontend Implementation
- [ ] Language switcher component
- [ ] RTL layout support
- [ ] Translated navigation
- [ ] Translated UI elements

### Task 4: Product Translation
- [ ] Product name translation
- [ ] Description translation
- [ ] Category translation
- [ ] SEO metadata translation

### Task 5: URL Structure
- [ ] Locale-based routing
- [ ] SEO-friendly URLs
- [ ] Redirects for old URLs

## Notes

- Arabic is default (RTL)
- English is secondary (LTR)
- All content should be translatable
- SEO tags for each language
- User preference saved in profile
