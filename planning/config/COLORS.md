# Color Guide - Smart Store

## Unified Design System for Developers

### Brand Colors

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Primary | `#0ea5e9` | `sky-500` | Buttons, links, active states |
| Primary Dark | `#0369a1` | `sky-700` | Hover states, darker elements |
| Primary Light | `#bae6fd` | `sky-200` | Backgrounds, borders |
| Secondary | `#d946ef` | `fuchsia-500` | Gradients, highlights |
| Accent (Gold) | `#d4af37` | custom `gold` | Premium, special offers, VIP |
| Success | `#22c55e` | `green-500` | Confirmed, delivered |
| Warning | `#f97316` | `orange-500` | In progress, alerts |
| Danger | `#ef4444` | `red-500` | Errors, out of stock |
| Info | `#3b82f6` | `blue-500` | Information, POS |

### Neutral / Grayscale

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Background | `#ffffff` | `white` | Page background |
| Background Alt | `#f5f5f5` | `gray-100` | Alternate sections |
| Surface | `#fafafa` | `gray-50` | Cards, containers |
| Border | `#e5e7eb` | `gray-200` | Borders, dividers |
| Text Primary | `#171717` | `gray-900` | Headings, body text |
| Text Secondary | `#4b5563` | `gray-600` | Subtle text |
| Text Muted | `#9ca3af` | `gray-400` | Placeholders, captions |
| Dark Surface | `#171717` | `gray-900` | Footer, dark sections |
| Dark Border | `#262626` | `gray-800` | Dark mode borders |

### Sale / Discount Colors

| Name | Hex | Usage |
|------|-----|-------|
| Sale Red | `#dc2626` | Discount badges |
| Sale Orange | `#ea580c` | Flash sale banners |
| Success Green | `#16a34a` | Free shipping badges |

### Payment Method Colors

| Method | Hex |
|--------|-----|
| Visa | `#1a1f71` |
| Mastercard | `#eb001b` |
| Fawry | `#f58220` |
| InstaPay | `#00a5d2` |
| Vodafone Cash | `#e60000` |
| valU | `#c8102e` |

---

## RTL / LTR

- **Default**: RTL (Arabic) - `dir="rtl"`
- **Secondary**: LTR (English) - `dir="ltr"`
- Text alignment flips automatically

## Gradients

```css
/* Primary Gradient (Hero) */
background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%);

/* Gold Gradient (CTA) */
background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);

/* Dark Gradient (Footer) */
background: linear-gradient(180deg, #171717 0%, #000000 100%);
```

## Tailwind Config (extend)

```js
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
          light: '#bae6fd',
        },
        accent: {
          gold: '#d4af37',
          goldDark: '#b8860b',
        },
        brand: {
          secondary: '#d946ef',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
        english: ['Inter', 'sans-serif'],
      },
    },
  },
};
```

## CSS Variables (for dark mode)

```css
:root {
  --primary: #0ea5e9;
  --primary-dark: #0369a1;
  --accent-gold: #d4af37;
  --bg: #ffffff;
  --text: #171717;
}

.dark {
  --bg: #171717;
  --text: #ffffff;
}
```
