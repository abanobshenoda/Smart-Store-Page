# 3D Product Visualization Prompts

## Overview

برومبتات تصميم المنتجات ثلاثية الأبعاد:
- نماذج 3D للمنتجات
- تأثيرات الإضاءة
- الخلفيات
- الأنيميشن

## 3D Model Requirements

### Product Types

#### 1. Athletic Shoes (Sport)
```
3D Model Specifications:
- Polygon count: 15,000 - 30,000
- Texture resolution: 2048x2048
- Format: GLTF/GLB
- Materials: PBR (Physically Based Rendering)
- Details: Lace holes, stitching, sole pattern
```

#### 2. Casual Shoes
```
3D Model Specifications:
- Polygon count: 10,000 - 20,000
- Texture resolution: 1024x1024
- Format: GLTF/GLB
- Materials: PBR
- Details: Leather texture, stitching
```

#### 3. Sandals/Slippers
```
3D Model Specifications:
- Polygon count: 5,000 - 15,000
- Texture resolution: 1024x1024
- Format: GLTF/GLB
- Materials: PBR
- Details: Strap details, sole texture
```

## Lighting Setup

### Product Studio Lighting
```javascript
const lightingSetup = {
  ambient: {
    color: "#ffffff",
    intensity: 0.4
  },
  directional: {
    color: "#ffffff",
    intensity: 0.8,
    position: [5, 5, 5],
    castShadow: true
  },
  point: {
    color: "#ffffff",
    intensity: 0.3,
    position: [-3, 3, -3]
  },
  rim: {
    color: "#0ea5e9",  // Brand blue
    intensity: 0.2,
    position: [0, 0, -5]
  }
};
```

### Lighting Presets

#### Day Light
```javascript
const dayLightPreset = {
  ambient: { intensity: 0.6, color: "#f0f9ff" },
  directional: { intensity: 1.0, color: "#ffffff" },
  environment: "day"
};
```

#### Studio Light
```javascript
const studioLightPreset = {
  ambient: { intensity: 0.3, color: "#ffffff" },
  directional: { intensity: 0.8, color: "#ffffff" },
  point: { intensity: 0.4, color: "#ffffff" },
  environment: "studio"
};
```

#### Dramatic Light
```javascript
const dramaticLightPreset = {
  ambient: { intensity: 0.1, color: "#171717" },
  directional: { intensity: 1.2, color: "#d946ef" },
  rim: { intensity: 0.5, color: "#0ea5e9" },
  environment: "night"
};
```

## Background Options

### Gradient Backgrounds
```javascript
const gradientBackgrounds = {
  brandGradient: {
    type: "gradient",
    colors: ["#0ea5e9", "#d946ef"],
    direction: "135deg"
  },
  neutralGradient: {
    type: "gradient",
    colors: ["#f5f5f5", "#e5e5e5"],
    direction: "180deg"
  },
  darkGradient: {
    type: "gradient",
    colors: ["#171717", "#262626"],
    direction: "180deg"
  }
};
```

### Solid Backgrounds
```javascript
const solidBackgrounds = {
  white: "#ffffff",
  lightGray: "#f5f5f5",
  darkGray: "#171717",
  brandBlue: "#0ea5e9",
  brandPurple: "#d946ef"
};
```

### Pattern Backgrounds
```javascript
const patternBackgrounds = {
  dots: {
    type: "dots",
    color: "#e5e5e5",
    size: 2,
    spacing: 20
  },
  grid: {
    type: "grid",
    color: "#e5e5e5",
    size: 1,
    spacing: 40
  },
  waves: {
    type: "waves",
    color: "#0ea5e9",
    opacity: 0.1
  }
};
```

## Animation Prompts

### 1. Auto-Rotation
```
Prompt: "Create a smooth auto-rotation animation for a 3D shoe model.
The rotation should be:
- Continuous and smooth
- Speed: 2-3 seconds per full rotation
- Axis: Y-axis (vertical)
- Easing: linear
- Pause on hover"
```

### 2. Scroll-Triggered Rotation
```
Prompt: "Implement scroll-triggered rotation for 3D product viewer.
When user scrolls:
- Model rotates based on scroll position
- Speed proportional to scroll speed
- Smooth damping effect
- Bounce back at limits
- Visual indicator for scroll direction"
```

### 3. Hover Effects
```
Prompt: "Create hover effects for 3D product card:
- Card lifts up (translateY: -10px)
- Shadow expands and softens
- Product rotates slightly (5-10 degrees)
- Quick view button fades in
- Price badge glows
- Duration: 0.3s ease-out"
```

### 4. Add to Cart Animation
```
Prompt: "Design add-to-cart animation sequence:
1. Product image shrinks to 50%
2. Image flies toward cart icon
3. Particle trail follows (gold particles)
4. Cart badge bounces
5. Success notification slides in
- Duration: 0.8s total
- Easing: ease-in-out"
```

### 5. Page Transition
```
Prompt: "Create page transition animation:
1. Current page fades out (opacity: 0)
2. 3D elements float away (translateZ: -100px)
3. New page elements float in
4. Content fades in (opacity: 1)
- Duration: 0.5s
- Easing: ease-in-out"
```

### 6. Loading Animation
```
Prompt: "Design 3D loading animation:
- Shoe model assembles from parts
- Parts fly in from different directions
- Assemble in center
- Spin once complete
- Duration: 2s loop
- Colors: Brand blue and purple"
```

### 7. Parallax Effect
```
Prompt: "Implement parallax effect for hero section:
- Background moves slower than foreground
- 3D shoe model has subtle movement
- Mouse movement affects perspective
- Depth layers create 3D feel
- Smooth, subtle movement"
```

## 3D Product Viewer Configuration

### Basic Viewer
```javascript
const basicViewerConfig = {
  autoRotate: true,
  autoRotateSpeed: 2,
  enableZoom: true,
  minDistance: 2,
  maxDistance: 5,
  enablePan: false,
  cameraPosition: [0, 0, 3],
  backgroundColor: "#f5f5f5"
};
```

### Advanced Viewer
```javascript
const advancedViewerConfig = {
  autoRotate: true,
  autoRotateSpeed: 2,
  enableZoom: true,
  minDistance: 1.5,
  maxDistance: 6,
  enablePan: false,
  cameraPosition: [0, 0.5, 3],
  backgroundColor: "#f5f5f5",
  environmentMap: "studio",
  shadows: true,
  contactShadow: true,
  groundPlane: true,
  annotations: [
    {
      position: [0, 0.5, 0],
      label: "Breathable Mesh",
      detail: "Engineered mesh upper for ventilation"
    },
    {
      position: [0, -0.5, 0],
      label: "Air Cushion",
      detail: "Max Air unit for impact absorption"
    }
  ]
};
```

## Material Presets

### Leather
```javascript
const leatherMaterial = {
  color: "#262626",
  roughness: 0.8,
  metalness: 0.0,
  normalMap: "leather-normal.jpg",
  roughnessMap: "leather-roughness.jpg"
};
```

### Mesh
```javascript
const meshMaterial = {
  color: "#ffffff",
  roughness: 0.6,
  metalness: 0.0,
  normalMap: "mesh-normal.jpg",
  alphaMap: "mesh-alpha.jpg"
};
```

### Rubber Sole
```javascript
const rubberMaterial = {
  color: "#171717",
  roughness: 0.9,
  metalness: 0.0,
  normalMap: "rubber-normal.jpg"
};
```

### Metallic
```javascript
const metallicMaterial = {
  color: "#d4af37",  // Gold
  roughness: 0.3,
  metalness: 0.9,
  envMapIntensity: 1.0
};
```

## Performance Optimization

### Model Optimization
- Use Draco compression for GLTF
- Reduce polygon count for mobile
- Use texture atlasing
- Implement LOD (Level of Detail)

### Rendering Optimization
```javascript
const optimizationConfig = {
  antialias: true,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
  powerPreference: "high-performance",
  toneMapping: "ACESFilmicToneMapping",
  toneMappingExposure: 1.0
};
```

### Mobile Optimization
```javascript
const mobileConfig = {
  autoRotate: true,
  autoRotateSpeed: 3,
  enableZoom: false,
  shadows: false,
  pixelRatio: 1,
  polygonReduction: 0.5  // 50% fewer polygons
};
```
