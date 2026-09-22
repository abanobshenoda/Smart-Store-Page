# Color & Typography System

## Color System

### Brand Colors

#### Primary Blue (Sky Blue)
- **Usage**: Main brand color, CTAs, links, active states
- **Hex**: #0ea5e9
- **RGB**: 14, 165, 233
- **HSL**: 199, 89%, 48%

#### Secondary Purple (Fuchsia)
- **Usage**: Accents, highlights, special offers
- **Hex**: #d946ef
- **RGB**: 217, 70, 239
- **HSL**: 291, 83%, 61%

#### Gold (Egyptian Theme)
- **Usage**: VIP elements, premium features, special badges
- **Hex**: #d4af37
- **RGB**: 212, 175, 55
- **HSL**: 43, 74%, 52%

### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| White | #ffffff | Backgrounds, cards |
| Gray 50 | #fafafa | Subtle backgrounds |
| Gray 100 | #f5f5f5 | Borders, dividers |
| Gray 200 | #e5e5e5 | Input borders |
| Gray 300 | #d4d4d4 | Placeholder text |
| Gray 400 | #a3a3a3 | Disabled states |
| Gray 500 | #737373 | Secondary text |
| Gray 600 | #525252 | Body text |
| Gray 700 | #404040 | Headings |
| Gray 800 | #262626 | Dark text |
| Gray 900 | #171717 | Darkest text |

### Status Colors

| Status | Hex | Usage |
|--------|-----|-------|
| Success | #22c55e | Success messages, in stock |
| Warning | #f59e0b | Warnings, low stock |
| Error | #ef4444 | Errors, out of stock |
| Info | #3b82f6 | Information messages |

### Semantic Colors

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | #ffffff | #0a0a0a |
| Surface | #f5f5f5 | #171717 |
| Border | #e5e5e5 | #262626 |
| Text Primary | #171717 | #fafafa |
| Text Secondary | #525252 | #a3a3a3 |

## Typography System

### Font Families

#### Arabic (Primary)
```css
--font-ar-primary: 'Cairo', sans-serif;
```
- **Weight 300**: Light
- **Weight 400**: Regular
- **Weight 500**: Medium
- **Weight 600**: Semi Bold
- **Weight 700**: Bold

#### English (Secondary)
```css
--font-en-primary: 'Inter', sans-serif;
```

### Font Sizes

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| xs | 12px | 16px | Captions, labels |
| sm | 14px | 20px | Small text, descriptions |
| base | 16px | 24px | Body text |
| lg | 18px | 28px | Large body text |
| xl | 20px | 28px | Subheadings |
| 2xl | 24px | 32px | Section headings |
| 3xl | 30px | 36px | Page titles |
| 4xl | 36px | 40px | Hero headings |
| 5xl | 48px | 48px | Display text |

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Decorative text |
| 400 | Regular | Body text |
| 500 | Medium | Emphasized text |
| 600 | Semi Bold | Subheadings |
| 700 | Bold | Headings, buttons |

### Line Heights

| Name | Value | Usage |
|------|-------|-------|
| tight | 1.25 | Headings |
| snug | 1.375 | Short paragraphs |
| normal | 1.5 | Body text |
| relaxed | 1.625 | Long form content |
| loose | 2 | Captions |

### Letter Spacing

| Name | Value | Usage |
|------|-------|-------|
| tighter | -0.05em | Large headings |
| tight | -0.025em | Headings |
| normal | 0 | Body text |
| wide | 0.025em | Labels |
| wider | 0.05em | Button text |
| widest | 0.1em | Uppercase text |

## Text Colors

### Primary Text
```css
.text-primary {
  color: var(--neutral-900);
}
```

### Secondary Text
```css
.text-secondary {
  color: var(--neutral-600);
}
```

### Muted Text
```css
.text-muted {
  color: var(--neutral-400);
}
```

### Brand Text
```css
.text-brand {
  color: var(--primary-500);
}
```

### Gold Text (VIP)
```css
.text-gold {
  color: var(--gold);
}
```

## Text Styles

### Headings
```css
/* H1 - Page Title */
h1 {
  font-family: var(--font-ar-primary);
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
}

/* H2 - Section Title */
h2 {
  font-family: var(--font-ar-primary);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.375;
}

/* H3 - Subsection Title */
h3 {
  font-family: var(--font-ar-primary);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.375;
}
```

### Body Text
```css
/* Body Large */
.body-lg {
  font-size: var(--text-lg);
  line-height: 1.625;
}

/* Body Default */
.body {
  font-size: var(--text-base);
  line-height: 1.5;
}

/* Body Small */
.body-sm {
  font-size: var(--text-sm);
  line-height: 1.5;
}
```

### Special Text
```css
/* Price Display */
.price {
  font-family: var(--font-en-primary);
  font-weight: 700;
  color: var(--primary-600);
}

/* Price Sale */
.price-sale {
  font-family: var(--font-en-primary);
  font-weight: 700;
  color: var(--error);
  text-decoration: line-through;
}

/* Badge */
.badge {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Arabic Text Considerations

### Text Alignment
```css
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .text-center {
  text-align: center;
}
```

### Number Display
```css
/* Arabic numerals */
.numbers-ar {
  font-variant-numeric: arabic-indic;
}

/* Western numerals (preferred for prices) */
.numbers-en {
  font-variant-numeric: tabular-nums;
}
```

### Line Height Adjustment
```css
/* Arabic text needs slightly more line height */
[dir="rtl"] .body {
  line-height: 1.7;
}
```

## Responsive Typography

```css
/* Mobile */
@media (max-width: 640px) {
  h1 { font-size: var(--text-3xl); }
  h2 { font-size: var(--text-2xl); }
  h3 { font-size: var(--text-xl); }
}

/* Tablet */
@media (max-width: 768px) {
  h1 { font-size: var(--text-3xl); }
  h2 { font-size: var(--text-2xl); }
}

/* Desktop */
@media (min-width: 1024px) {
  h1 { font-size: var(--text-5xl); }
  h2 { font-size: var(--text-4xl); }
}
```
