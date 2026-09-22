# UI/UX Design System

## Overview

نظام تصميم شامل للمتجر:
- ألوان متناسقة
- خطوط عربية مناسبة
- مكونات تصميم
- إرشادات الاستجابة

## Color Palette

### Primary Colors
```css
--primary-50: #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;
```

### Secondary Colors
```css
--secondary-50: #fdf4ff;
--secondary-100: #fae8ff;
--secondary-200: #f5d0fe;
--secondary-300: #f0abfc;
--secondary-400: #e879f9;
--secondary-500: #d946ef;
--secondary-600: #c026d3;
--secondary-700: #a21caf;
--secondary-800: #86198f;
--secondary-900: #701a75;
```

### Neutral Colors
```css
--neutral-50: #fafafa;
--neutral-100: #f5f5f5;
--neutral-200: #e5e5e5;
--neutral-300: #d4d4d4;
--neutral-400: #a3a3a3;
--neutral-500: #737373;
--neutral-600: #525252;
--neutral-700: #404040;
--neutral-800: #262626;
--neutral-900: #171717;
```

### Accent Colors (Egyptian Theme)
```css
--gold: #d4af37;
--gold-light: #f4d03f;
--gold-dark: #b8860b;
```

### Status Colors
```css
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

## Typography

### Arabic Fonts
```css
/* Primary Arabic Font */
--font-ar-primary: 'Cairo', 'Tajawal', sans-serif;

/* Secondary Arabic Font */
--font-ar-secondary: 'Almarai', 'Tajawal', sans-serif;

/* English Font */
--font-en-primary: 'Inter', 'Poppins', sans-serif;
```

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Spacing System

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* 3D Shadows */
--shadow-3d: 0 20px 40px rgba(0, 0, 0, 0.15);
--shadow-3d-hover: 0 30px 60px rgba(0, 0, 0, 0.2);
```

## Breakpoints

```css
--breakpoint-sm: 640px;    /* Mobile */
--breakpoint-md: 768px;    /* Tablet */
--breakpoint-lg: 1024px;   /* Laptop */
--breakpoint-xl: 1280px;   /* Desktop */
--breakpoint-2xl: 1536px;  /* Large Desktop */
```

## Z-Index Scale

```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
--z-toast: 1080;
```

## Component Styles

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--primary-500);
  border: 2px solid var(--primary-500);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--primary-50);
  transform: translateY(-2px);
}
```

### Cards
```css
/* Product Card */
.card {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
}

.card:hover {
  transform: translateY(-8px) rotateX(2deg);
  box-shadow: var(--shadow-3d-hover);
}
```

### Input Fields
```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--neutral-200);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}
```

## RTL Support

```css
/* Direction */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* RTL Spacing */
[dir="rtl"] .ml-4 {
  margin-left: 0;
  margin-right: var(--space-4);
}

[dir="rtl"] .mr-4 {
  margin-right: 0;
  margin-left: var(--space-4);
}
```

## Design Tokens

```json
{
  "colors": {
    "primary": {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1"
    },
    "secondary": {
      "500": "#d946ef",
      "600": "#c026d3"
    },
    "neutral": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "900": "#171717"
    },
    "gold": "#d4af37"
  },
  "typography": {
    "fontFamily": {
      "arabic": "Cairo, sans-serif",
      "english": "Inter, sans-serif"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  }
}
```
