# Animation & Interaction Prompts

## Overview

برومبتات الأنيميشن والتفاعل:
- أنيميشن الصفحة
- تأثيرات التمرير
- أنيميشن المكونات
- تفاعلات المستخدم

## Page Animations

### Page Enter
```
Prompt: "Create page enter animation:
- Content fades in (opacity: 0 → 1)
- Elements slide up (translateY: 20px → 0)
- Staggered timing (50ms delay per element)
- Duration: 0.4s
- Easing: ease-out"
```

### Page Exit
```
Prompt: "Design page exit animation:
- Content fades out (opacity: 1 → 0)
- Elements slide down (translateY: 0 → -20px)
- Duration: 0.3s
- Easing: ease-in"
```

### Page Transition
```
Prompt: "Implement smooth page transitions:
- Current page slides out left
- New page slides in from right
- Overlay fades during transition
- Duration: 0.3s
- Easing: ease-in-out"
```

## Scroll Animations

### Parallax Scrolling
```
Prompt: "Create parallax scrolling effect:
- Background moves slower than foreground
- Multiple depth layers
- Smooth, subtle movement
- Performance optimized"
```

### Reveal on Scroll
```
Prompt: "Implement reveal on scroll:
- Elements hidden initially
- Fade in and slide up on scroll
- Trigger at 80% viewport
- One-time animation"
```

### Sticky Elements
```
Prompt: "Create sticky elements:
- Header sticks on scroll
- Sidebar follows scroll
- Smooth shadow on stick
- Back to top button"
```

### Scroll Progress
```
Prompt: "Add scroll progress indicator:
- Progress bar at top
- Shows scroll percentage
- Brand color
- Smooth animation"
```

## Component Animations

### Card Hover
```
Prompt: "Design card hover animation:
- Card lifts up (translateY: -8px)
- Shadow expands
- Subtle rotation (1deg)
- Duration: 0.3s
- Easing: ease-out"
```

### Button Animations
```
Prompt: "Create button animations:
- Hover: Lift + shadow
- Active: Press down
- Loading: Spinner
- Success: Checkmark
- Ripple on click"
```

### Input Focus
```
Prompt: "Implement input focus animation:
- Border color change
- Subtle glow
- Label moves up
- Helper text fades in"
```

### Modal Animations
```
Prompt: "Design modal animations:
- Backdrop fades in
- Modal scales up (0.9 → 1)
- Content fades in
- Duration: 0.3s
- Easing: ease-out"
```

## 3D Animations

### Product Rotation
```
Prompt: "Create product rotation animation:
- Continuous auto-rotation
- Speed: 3s per rotation
- Pause on hover
- Smooth acceleration/deceleration"
```

### 3D Card Effect
```
Prompt: "Implement 3D card effect:
- Card tilts based on mouse position
- Max rotation: 10deg
- Smooth spring animation
- Shadow responds to tilt"
```

### Floating Effect
```
Prompt: "Create floating animation:
- Element floats up and down
- Amplitude: 10px
- Duration: 3s infinite
- Easing: ease-in-out"
```

### Particle Effect
```
Prompt: "Design particle effect:
- Small particles float
- Respond to mouse
- Subtle parallax
- Low opacity"
```

## Loading Animations

### Skeleton Loader
```
Prompt: "Create skeleton loader:
- Gray placeholder blocks
- Shimmer effect
- Match content layout
- Smooth transition"
```

### Spinner
```
Prompt: "Design spinner animation:
- 3D shoe model
- Continuous rotation
- Brand colors
- Smooth animation"
```

### Progress Bar
```
Prompt: "Implement progress bar:
- Linear progress
- Brand color
- Smooth animation
- Percentage display"
```

### Dots Loading
```
Prompt: "Create dots loading animation:
- Three dots
- Sequential bounce
- Brand colors
- Continuous loop"
```

## Micro-Interactions

### Like/Wishlist
```
Prompt: "Design wishlist animation:
- Heart icon fills
- Scale up then down
- Particle burst
- Color change"
```

### Add to Cart
```
Prompt: "Create add to cart animation:
- Button changes to checkmark
- Product flies to cart
- Cart badge bounces
- Success toast"
```

### Quantity Change
```
Prompt: "Implement quantity animation:
- Number flips
- Smooth transition
- Color flash on change"
```

### Remove Item
```
Prompt: "Design remove item animation:
- Item slides out
- Fade to transparent
- Height collapses"
```

## Navigation Animations

### Menu Toggle
```
Prompt: "Create menu toggle animation:
- Hamburger to X
- Smooth rotation
- Menu slides in
- Backdrop fades"
```

### Dropdown
```
Prompt: "Implement dropdown animation:
- Menu drops down
- Fade in
- Scale from top
- Smooth transition"
```

### Tab Switch
```
Prompt: "Design tab switch animation:
- Active indicator slides
- Content crossfade
- Smooth transition"
```

## Feedback Animations

### Success
```
Prompt: "Create success animation:
- Checkmark draws
- Green color
- Scale up
- Confetti (optional)"
```

### Error
```
Prompt: "Design error animation:
- Shake effect
- Red color
- Error icon
- Message slide in"
```

### Warning
```
Prompt: "Implement warning animation:
- Pulse effect
- Yellow color
- Warning icon
- Gentle animation"
```

### Info
```
Prompt: "Create info animation:
- Fade in
- Blue color
- Info icon
- Slide from right"
```

## Performance Optimization

### GPU Acceleration
```
Prompt: "Optimize animations for performance:
- Use transform and opacity
- Avoid layout thrashing
- Use requestAnimationFrame
- Implement will-change"
```

### Reduced Motion
```
Prompt: "Implement reduced motion:
- Check prefers-reduced-motion
- Disable non-essential animations
- Keep functional animations
- Respect user preference"
```

### Lazy Animation
```
Prompt: "Create lazy animation system:
- Only animate visible elements
- Pause off-screen animations
- Resume on scroll
- Performance monitoring"
```

## Animation Library

### Framer Motion Config
```javascript
const framerMotionConfig = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  // Card hover
  cardHover: {
    hover: { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" },
    tap: { scale: 0.98 },
    transition: { duration: 0.3 }
  },
  
  // Stagger children
  staggerChildren: {
    animate: { transition: { staggerChildren: 0.1 } }
  }
};
```

### GSAP Config
```javascript
const gsapConfig = {
  // Scroll trigger
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  
  // Timeline
  timeline: {
    defaults: { duration: 0.5, ease: "power2.out" }
  }
};
```

## Animation Checklist

- [ ] Page transitions
- [ ] Scroll animations
- [ ] Card hover effects
- [ ] Button animations
- [ ] Loading states
- [ ] 3D animations
- [ ] Micro-interactions
- [ ] Navigation animations
- [ ] Feedback animations
- [ ] Performance optimization
- [ ] Reduced motion support
- [ ] Mobile optimization
