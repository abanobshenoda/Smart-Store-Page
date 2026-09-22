# Three.js + React Three Fiber Guide

## Overview

This guide explains how to use Three.js with React Three Fiber (R3F) to create 3D product viewers for the Smart Store shoe e-commerce platform.

## Installation

```bash
# Core Three.js packages
npm install three @react-three/fiber @react-three/drei

# Animation library
npm install @react-spring/three

# TypeScript types
npm install -D @types/three
```

## Project Structure

```
src/
├── components/
│   └── 3d/
│       ├── ProductViewer.tsx        # Main 3D viewer component
│       ├── ShoeModel.tsx            # 3D shoe model loader
│       ├── Environment.tsx          # Lighting and environment
│       ├── Controls.tsx             # User interaction controls
│       └── ProductCard3D.tsx        # 3D product card
├── hooks/
│   └── use3DViewer.ts              # Custom hook for 3D logic
└── utils/
    └── modelLoader.ts              # Model loading utilities
```

## Basic Setup

### 1. ProductViewer Component

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { ShoeModel } from './ShoeModel';

interface ProductViewerProps {
  modelUrl: string;
  color?: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
}

export function ProductViewer({
  modelUrl,
  color = '#000000',
  autoRotate = true,
  enableZoom = true,
}: ProductViewerProps) {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
          />
          <spotLight
            position={[-5, 5, -5]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
          />

          {/* 3D Model */}
          <ShoeModel url={modelUrl} color={color} />

          {/* Ground Shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
          />

          {/* Environment */}
          <Environment preset="studio" />

          {/* Controls */}
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enableZoom={enableZoom}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>

      {/* Loading Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500" />
      </div>
    </div>
  );
}
```

### 2. ShoeModel Component

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ShoeModelProps {
  url: string;
  color?: string;
}

export function ShoeModel({ url, color }: ShoeModelProps) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  // Apply color to model materials
  useEffect(() => {
    if (color && scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            (child.material as THREE.MeshStandardMaterial).color =
              new THREE.Color(color);
          }
        }
      });
    }
  }, [color, scene]);

  // Optional: subtle floating animation
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

// Pre-load model for better performance
useGLTF.preload('/models/shoe.glb');
```

### 3. 3D Product Card

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

interface ProductCard3DProps {
  modelUrl: string;
  price: number;
  name: string;
}

export function ProductCard3D({ modelUrl, price, name }: ProductCard3DProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* 3D Model Container */}
      <div className="h-64 relative">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />

            <ShoeModel url={modelUrl} />

            <OrbitControls
              autoRotate
              autoRotateSpeed={3}
              enableZoom={false}
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sky-600 font-semibold mt-1">
          EGP {price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
```

## Lighting Setup

### Studio Lighting (Product Shots)

```tsx
function StudioLighting() {
  return (
    <>
      {/* Main Key Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill Light */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
      />

      {/* Rim Light */}
      <spotLight
        position={[0, 10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
      />

      {/* Ambient Fill */}
      <ambientLight intensity={0.3} />
    </>
  );
}
```

### Environment Presets

```tsx
// Available presets from @react-three/drei
<Environment preset="apartment" />
<Environment preset="city" />
<Environment preset="dawn" />
<Environment preset="forest" />
<Environment preset="lobby" />
<Environment preset="night" />
<Environment preset="park" />
<Environment preset="studio" />  {/* Best for products */}
<Environment preset="sunset" />
<Environment preset="warehouse" />
```

## Animations

### Auto-Rotation

```tsx
<OrbitControls
  autoRotate
  autoRotateSpeed={2}        // Speed of rotation
  enableZoom={false}          // Disable zoom on cards
  enablePan={false}           // Disable panning
  minPolarAngle={Math.PI / 4} // Min vertical angle
  maxPolarAngle={Math.PI / 1.5} // Max vertical angle
/>
```

### Scroll-Based Animation

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

function ScrollAnimatedModel() {
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <motion.div style={{ scale }}>
      <Canvas>
        <Suspense fallback={null}>
          <ShoeModel url="/models/shoe.glb" />
          <OrbitControls autoRotate={false} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
```

### Hover Animation

```tsx
import { useSpring, animated } from '@react-spring/three';

function HoverModel() {
  const [hovered, setHovered] = useState(false);

  const { scale, rotationY } = useSpring({
    scale: hovered ? 1.1 : 1,
    rotationY: hovered ? Math.PI * 0.1 : 0,
    config: { mass: 1, tension: 280, friction: 20 },
  });

  return (
    <animated.group
      scale={scale}
      rotation-y={rotationY}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <ShoeModel url="/models/shoe.glb" />
    </animated.group>
  );
}
```

## Color Variants

```tsx
function ColorVariantSelector() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const colors = [
    { name: 'أسود', hex: '#000000' },
    { name: 'أبيض', hex: '#FFFFFF' },
    { name: 'أحمر', hex: '#EF4444' },
    { name: 'أزرق', hex: '#3B82F6' },
  ];

  return (
    <div>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.hex}
            onClick={() => setSelectedColor(color.hex)}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color.hex
                ? 'border-sky-500 ring-2 ring-sky-200'
                : 'border-gray-200'
            }`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ShoeModel url="/models/shoe.glb" color={selectedColor} />
          <OrbitControls autoRotate autoRotateSpeed={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

## Performance Optimization

### 1. Model Optimization

```bash
# Install gltf-pipeline for model optimization
npm install -g gltf-pipeline

# Optimize GLB file
gltf-pipeline -i input.glb -o output.glb --draco.compressionLevel 7
```

### 2. Lazy Loading

```tsx
import dynamic from 'next/dynamic';

// Dynamic import with no SSR (Three.js requires browser)
const ProductViewer = dynamic(
  () => import('@/components/3d/ProductViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-gray-100 animate-pulse rounded-xl" />
    ),
  }
);
```

### 3. Model Caching

```tsx
// utils/modelCache.ts
const modelCache = new Map<string, GLTF>();

export async function getCachedModel(url: string): Promise<GLTF> {
  if (modelCache.has(url)) {
    return modelCache.get(url)!;
  }

  const gltf = await useGLTF.load(url);
  modelCache.set(url, gltf);
  return gltf;
}
```

### 4. Preloading Critical Models

```tsx
// In your layout or app component
'use client';

import { useGLTF } from '@react-three/drei';

// Preload hero product model
useGLTF.preload('/models/featured-shoe.glb');

// Preload all main product models
const modelsToPreload = [
  '/models/nike-air-max.glb',
  '/models/adidas-ultraboost.glb',
  '/models/puma-rsx.glb',
];

modelsToPreload.forEach((model) => useGLTF.preload(model));
```

## File Formats

### Supported Formats

| Format | Extension | Notes |
|--------|-----------|-------|
| GLTF | `.gltf` | JSON format, good for web |
| GLB | `.glb` | Binary format, smaller size, recommended |
| OBJ | `.obj` | Legacy format, no animations |
| FBX | `.fbx` | Autodesk format, larger |

### Converting Models

```bash
# Install dependencies
npm install -g gltf-pipeline

# Convert FBX to GLB
fbx2gltf --input shoe.fbx --output shoe.glb

# Optimize existing GLB
gltf-pipeline -i shoe.glb -o shoe-optimized.glb --draco.compressionLevel 7
```

## Model Sources

### Free 3D Models

1. **Sketchfab** (https://sketchfab.com)
   - Search: "sneaker 3D model"
   - Filter: Downloadable + CC license
   - Download as GLB

2. **Turbosquid** (https://turbosquid.com)
   - Free section available
   - Search: "shoe 3D model free"

3. **CGTrader** (https://cgtrader.com)
   - Free models section
   - Search: "sneaker model"

### Creating Custom Models

1. **Blender** (Free)
   - Model shoe in Blender
   - Export as GLB
   - Optimize with gltf-pipeline

2. **Google** 3D Scanner App
   - Scan physical shoes
   - Export as OBJ
   - Convert to GLB

## Common Issues & Solutions

### Issue: Model not loading
```tsx
// Solution: Check file path and format
// Ensure .glb file is in public/ folder
// Use: /models/shoe.glb (not ./models/shoe.glb)
```

### Issue: Model too dark
```tsx
// Solution: Add more lights
<ambientLight intensity={0.8} />
<directionalLight position={[5, 5, 5]} intensity={1.5} />
<directionalLight position={[-5, 5, -5]} intensity={0.5} />
```

### Issue: Performance slow
```tsx
// Solution: Use Suspense and lazy loading
<Suspense fallback={<LoadingSpinner />}>
  <ProductViewer modelUrl="/models/shoe.glb" />
</Suspense>

// Also optimize model with Draco compression
```

### Issue: SSR error
```tsx
// Solution: Dynamic import with ssr: false
const ProductViewer = dynamic(
  () => import('@/components/3d/ProductViewer'),
  { ssr: false }
);
```

## References

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Library](https://github.com/pmndrs/drei)
- [Three.js Docs](https://threejs.org/docs/)
- [R3F Examples](https://codesandbox.io/u/pmndrs)
