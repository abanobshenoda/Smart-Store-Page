# Three.js Animations Guide

## Scroll-Based Animations

### Auto-Rotation on Scroll

```tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import * as THREE from 'three';

function RotatingModel() {
  const ref = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  
  useFrame(() => {
    if (ref.current) {
      // Rotate based on scroll position
      ref.current.rotation.y = scrollYProgress.get() * Math.PI * 2;
    }
  });

  return (
    <group ref={ref}>
      {/* Your 3D model here */}
    </group>
  );
}

export function ScrollViewer() {
  return (
    <div className="h-screen">
      <Canvas>
        <RotatingModel />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
```

## Hover Effects

### Scale on Hover

```tsx
'use client';

import { useState } from 'react';
import { useSpring, animated } from '@react-spring/three';

function HoverableModel() {
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { mass: 1, tension: 280, friction: 20 },
  });

  return (
    <animated.group
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Your 3D model */}
    </animated.group>
  );
}
```

### Rotation on Hover

```tsx
'use client';

import { useState } from 'react';
import { useSpring, animated } from '@react-spring/three';

function RotateOnHover() {
  const [hovered, setHovered] = useState(false);

  const { rotationY } = useSpring({
    rotationY: hovered ? Math.PI * 0.2 : 0,
    config: { mass: 1, tension: 280, friction: 20 },
  });

  return (
    <animated.group
      rotation-y={rotationY}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Your 3D model */}
    </animated.group>
  );
}
```

## Page Transition Animations

### Fade In

```tsx
'use client';

import { motion } from 'framer-motion';

export function FadeIn3DViewer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-[500px]"
    >
      <Canvas>
        {/* Your 3D scene */}
      </Canvas>
    </motion.div>
  );
}
```

### Slide Up

```tsx
'use client';

import { motion } from 'framer-motion';

export function SlideUp3DViewer() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="h-[500px]"
    >
      <Canvas>
        {/* Your 3D scene */}
      </Canvas>
    </motion.div>
  );
}
```

### Scale In

```tsx
'use client';

import { motion } from 'framer-motion';

export function ScaleIn3DViewer() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="h-[500px]"
    >
      <Canvas>
        {/* Your 3D scene */}
      </Canvas>
    </motion.div>
  );
}
```

## Parallax Effects

### Multi-Layer Parallax

```tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function ParallaxLayer({
  speed,
  children,
}: {
  speed: number;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = state.mouse.y * speed;
    }
  });

  return <group ref={ref}>{children}</group>;
}

export function ParallaxScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />

      {/* Background layer - slow */}
      <ParallaxLayer speed={0.1}>
        {/* Background elements */}
      </ParallaxLayer>

      {/* Middle layer - medium */}
      <ParallaxLayer speed={0.3}>
        {/* Middle elements */}
      </ParallaxLayer>

      {/* Foreground layer - fast */}
      <ParallaxLayer speed={0.5}>
        {/* Main product */}
      </ParallaxLayer>
    </Canvas>
  );
}
```

## Loading Animations

### Spinner

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

export function Loading3DViewer() {
  return (
    <div className="relative h-[500px]">
      <Canvas>
        <ambientLight intensity={0.5} />
        <OrbitControls autoRotate />
      </Canvas>

      {/* Overlay spinner */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center bg-white/80"
      >
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </motion.div>
    </div>
  );
}
```

### Skeleton

```tsx
'use client';

import { motion } from 'framer-motion';

export function Skeleton3DViewer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[500px] bg-gray-100 rounded-xl overflow-hidden"
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full animate-pulse" />
          <div className="w-32 h-4 mx-auto bg-gray-200 rounded animate-pulse" />
          <div className="w-24 h-4 mx-auto bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
```

## Product Card Animations

### Card Hover Effect

```tsx
'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  modelUrl: string;
}

export function AnimatedProductCard({ name, price, modelUrl }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    >
      {/* 3D Model */}
      <div className="h-64 relative">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            {/* Your shoe model */}
            <OrbitControls autoRotate autoRotateSpeed={3} enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800">{name}</h3>
        <p className="text-sky-600 font-semibold">EGP {price}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600"
        >
          أضف إلى السلة
        </motion.button>
      </div>
    </motion.div>
  );
}
```

## Integration Examples

### Full Product Page with Animations

```tsx
'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useState } from 'react';

const colors = [
  { name: 'أسود', hex: '#000000' },
  { name: 'أبيض', hex: '#FFFFFF' },
  { name: 'أحمر', hex: '#EF4444' },
];

export function ProductPage() {
  const [selectedColor, setSelectedColor] = useState('#000000');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3D Viewer */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="h-[500px] bg-gray-50 rounded-xl"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />

              {/* Shoe with selected color */}
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={selectedColor} />
              </mesh>

              <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.4}
                scale={5}
              />
              <Environment preset="studio" />
              <OrbitControls autoRotate autoRotateSpeed={2} />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold">نايكي اير ماكس 2024</h1>
          <p className="text-2xl text-sky-600 mt-2">EGP 2,500</p>

          {/* Color Selector */}
          <div className="mt-6">
            <p className="font-semibold mb-2">اللون:</p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <motion.button
                  key={color.hex}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedColor(color.hex)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color.hex
                      ? 'border-sky-500 ring-2 ring-sky-200'
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full bg-sky-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-sky-600"
          >
            أضف إلى السلة
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
```

## References

- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Spring](https://www.react-spring.io/)
- [React Three Fiber Examples](https://codesandbox.io/u/pmndrs)
