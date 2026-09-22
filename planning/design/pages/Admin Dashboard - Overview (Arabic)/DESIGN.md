---
name: Luxurious Smart Store
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4d4635'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#7f7663'
  outline-variant: '#d0c5af'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#e9c349'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#a200ba'
  on-tertiary: '#ffffff'
  tertiary-container: '#f58bff'
  on-tertiary-container: '#79008b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffd6fd'
  tertiary-fixed-dim: '#fbabff'
  on-tertiary-fixed: '#36003e'
  on-tertiary-fixed-variant: '#7c008e'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  surface-white: '#FFFFFF'
  gold-glow: rgba(212, 175, 55, 0.4)
  royal-blue: '#18509F'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The design system establishes a high-fashion "Smart Store" identity, merging the precision of modern e-commerce with the opulence of Egyptian luxury. The visual narrative centers on **Premium Minimalism** infused with **Glassmorphism**, creating a digital environment that feels like a boutique showroom. 

The brand evokes exclusivity, craftsmanship, and technological sophistication. We employ a high-contrast serif for branding to signal heritage and luxury, paired with a razor-sharp sans-serif for functional UI. The interface prioritizes spaciousness, allowing product photography to breathe within a framework of translucent layers and soft, dimensional lighting.

## Colors

The palette is anchored by **Accent Gold (#d4af37)**, utilized as the primary brand driver to denote quality and Egyptian luxury. It is supported by a sophisticated interplay of **Sky Blue** and **Fuchsia Purple** for interactive accents and high-energy highlights.

The background remains a pristine white to ensure clarity, while text is rendered in a deep **Dark Gray (#171717)** for optimal legibility. Interactive states often utilize a "glow" variant of the gold to simulate metallic reflection.

## Typography

This design system uses a dual-font strategy to balance editorial elegance with functional clarity. 

- **Bodoni Moda** is reserved for headlines and display elements. Its high contrast and vertical stress evoke the aesthetic of high-fashion magazines and luxury branding.
- **Hanken Grotesk** serves as the workhorse for body text, navigation, and labels. Its clean, geometric construction ensures maximum readability across all screen sizes, particularly in data-rich e-commerce environments.

For Arabic contexts, the system defaults to a high-quality sans-serif with similar geometric proportions to maintain the sharp, contemporary feel.

## Layout & Spacing

The layout philosophy follows a **RTL-first (Right-to-Left)** orientation to cater to the primary market, utilizing a 12-column fluid grid for desktop and a 4-column grid for mobile.

- **Margins:** Generous 64px outer margins on desktop create a "boutique" feel, centering the content and emphasizing exclusivity.
- **Gaps:** A 24px gutter provides ample breathing room between product listings.
- **Rhythm:** All vertical spacing is derived from a 4px base unit, ensuring a consistent mathematical cadence across the UI.

## Elevation & Depth

Depth is conveyed through a combination of **Glassmorphism** and **Soft Ambient Shadows**. 

1.  **The Base Layer:** Solid white surfaces.
2.  **The Glass Layer:** Navigation bars and overlaying filters use a semi-transparent blur (backdrop-filter: blur(12px)) to maintain context while adding a sense of lightness.
3.  **The Product Layer:** Cards feature a low-opacity shadow that intensifies (lifts) on hover, creating a 3D effect that suggests the product is physically rising toward the user.
4.  **Lighting:** Shadows are slightly tinted with the Primary Blue or Secondary Purple to add a subtle "glow" effect, rather than using traditional neutral grays.

## Shapes

The design system utilizes a **Soft (1)** roundedness profile. This specific choice (0.25rem base radius) maintains a sharp, professional architectural feel while removing the harshness of literal 0px corners. 

Buttons and input fields feel precise and engineered. Larger components like product cards and modal windows use the `rounded-xl` (0.75rem) value to soften the visual impact of larger surface areas, creating a welcoming luxury environment.

## Components

### Buttons
- **Primary:** Gold background with a subtle "inner glow" and white or dark gray text. On hover, they expand slightly with a `gold-glow` shadow.
- **Secondary:** Transparent with a thin gold border (Ghost style) and Bodoni Moda text.

### Product Cards
Cards are the centerpiece. They use a pure white background, a very soft 0.75rem corner radius, and a subtle drop shadow. On hover, the card "lifts" (transform: translateY(-8px)) and the shadow deepens.

### Sticky Navigation
The main header is a glassmorphic bar that remains at the top of the viewport. It uses a high-blur backdrop with a 1px border at the bottom in a very faint gold tint.

### Input Fields
Sharp, clean lines with a 0.25rem radius. The focus state replaces the border with a Primary Blue stroke and a soft glow to guide the user's eye.

### Chips & Tags
Used for sizes and shoe categories. These are small, pill-shaped elements with light gray backgrounds that transition to Gold or Purple when selected.