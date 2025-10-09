# 🎨 FlowSense Visual Guide

## Home Page Experience

### 🌈 Background
```
Full-screen gradient background:
┌─────────────────────────────────────┐
│  Emerald (#00EF8B)                  │
│         ↘                           │
│           Cyan (#00D4FF)            │
│                  ↘                  │
│                    Purple (#7B3FF2) │
└─────────────────────────────────────┘

+ 3 animated orbs (floating, rotating)
+ Subtle blur effects
+ Adapts to dark/light mode
```

### 🎯 Layout Structure
```
┌─────────────────────────────────────────────────┐
│  [Logo] FlowSense    [Templates][Dashboard] [🌙] │  ← Floating Header
│                                                  │
│                                                  │
│          ╔═══════════════════════╗              │
│          ║   FlowSense Logo +    ║              │
│          ║      FlowSense        ║              │
│          ║  "Transform ideas..." ║              │
│          ╠═══════════════════════╣              │
│          ║                       ║              │
│          ║  🪄 Describe your     ║  ← Main Card │
│          ║     dApp idea         ║  (Glass)     │
│          ║                       ║              │
│          ║  ┌──────────────────┐ ║              │
│          ║  │  Text Area       │ ║              │
│          ║  │  (Your idea...)  │ ║              │
│          ║  └──────────────────┘ ║              │
│          ║                       ║              │
│          ║  [Generate Contract→] ║  ← CTA       │
│          ║                       ║              │
│          ║  Powered by AI • ...  ║              │
│          ╚═══════════════════════╝              │
│                                                  │
│     [Cadence] [Security] [Best] [Instant]       │  ← Feature Pills
│                                                  │
│          [Flow Logo] Powered by Flow & AI       │  ← Footer
└─────────────────────────────────────────────────┘

         [Flow Logo Watermark] ← Top-right corner
```

### 🎭 Animation Sequence (Page Load)

```
Timeline:
0.0s  │ ▓▓▓▓░░░░░░░░░░░░░░░░ Header fades in
0.3s  │ ░░░░▓▓▓▓░░░░░░░░░░░░ Logo appears
0.5s  │ ░░░░░░░░▓▓▓▓░░░░░░░░ Title fades in
0.6s  │ ░░░░░░░░░░░░▓▓▓▓▓▓░░ Card scales up (spring)
0.9s  │ ░░░░░░░░░░░░░░░░▓▓▓▓ Feature pills pop in
1.0s  │ ░░░░░░░░░░░░░░░░░░▓▓ Watermark fades in
1.2s  │ ░░░░░░░░░░░░░░░░░░░▓ Footer slides up
```

### 🎨 Glass Card Design

```
┌────────────────────────────────┐
│ Background: white/10% opacity  │
│ Backdrop Blur: 40px            │
│ Border: white/30% opacity      │
│ Shadow: 2xl (large)            │
│ Border Radius: 24px (3xl)      │
│ Padding: 40px                  │
└────────────────────────────────┘
```

### 💫 Interactive States

#### Generate Button
```
IDLE STATE:
┌────────────────────────────────────┐
│  ✨ Generate Smart Contract  →    │  ← Gradient BG
└────────────────────────────────────┘
         ↓ (Arrow pulses)

HOVER STATE:
┌────────────────────────────────────┐
│  ✨ Generate Smart Contract  →    │  ← Scale 102%
└────────────────────────────────────┘  ← Lift -2px

LOADING STATE:
┌────────────────────────────────────┐
│  ⚡ Generating your smart...       │  ← Icon spins
└────────────────────────────────────┘

DISABLED STATE:
┌────────────────────────────────────┐
│  ✨ Generate Smart Contract  →    │  ← 50% opacity
└────────────────────────────────────┘  ← No cursor
```

### 📱 Right-Side Panel (Collapsed)

```
CLOSED:
  (Not visible)

TRIGGERED:
┌────────────┬───────────────────────────┐
│            │ ╔═══════════════════════╗ │
│  Main Card │ ║  [📋] Generated [✕]  ║ │ ← Slides in
│            │ ╠═══════════════════════╣ │
│            │ ║ pub contract MyDApp { ║ │
│            │ ║                       ║ │
│            │ ║   // Your code...    ║ │
│            │ ║                       ║ │
│            │ ║ }                     ║ │
│            │ ╚═══════════════════════╝ │
└────────────┴───────────────────────────┘
             ← Backdrop blur overlay
```

### 🎨 Color Palette

```css
/* Light Mode Gradient */
Primary: #00EF8B (Emerald)
Secondary: #00D4FF (Cyan)
Accent: #7B3FF2 (Purple)

/* Dark Mode Gradient */
Primary: #0a4d3c (Dark Emerald)
Secondary: #0c3b5e (Dark Cyan)
Accent: #2d1854 (Dark Purple)

/* Text */
Light: white with drop-shadow
Dark: Adapts to background

/* Glass Elements */
Light: white/10 + blur
Dark: black/20 + blur
```

### ⚡ Animation Details

#### Background Orbs
```
Orb 1 (Top-Left, Emerald):
  - Scale: 1 → 1.2 → 1 (20s loop)
  - Rotate: 0° → 360° (20s loop)

Orb 2 (Bottom-Right, Cyan):
  - Scale: 1.2 → 1 → 1.2 (15s loop)
  - Rotate: 360° → 0° (15s loop)

Orb 3 (Center, Purple):
  - Scale: 1 → 1.3 → 1 (18s loop)
  - Y-axis: 0 → 50px → 0 (18s loop)
```

#### Card Entrance
```
Initial State:
  opacity: 0
  scale: 0.9
  y: 50px

Final State:
  opacity: 1
  scale: 1.0
  y: 0px

Duration: 0.8s
Easing: ease-out
```

#### Panel Slide
```
Initial: x: 100% (off-screen right)
Final: x: 0

Type: Spring
Damping: 30
Stiffness: 300
```

### 🎯 Feature Pills

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Cadence      │ │ Security     │ │ Best         │ │ Instant      │
│ Expert       │ │ First        │ │ Practices    │ │ Results      │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
   Delay: 0.9s     Delay: 1.0s     Delay: 1.1s     Delay: 1.2s
```

### 📐 Spacing System

```
Card Padding: 40px (10 Tailwind units)
Section Gaps: 24px (6 units)
Element Gaps: 12px (3 units)
Button Padding: 20px vertical, 24px horizontal
Text Line Height: Relaxed (1.625)
```

### 🌓 Dark Mode Toggle

```
LIGHT MODE:
  Icon: 🌙 Moon (gray-700)
  Background: white/10 + blur
  
DARK MODE:
  Icon: ☀️ Sun (yellow-400)
  Background: white/10 + blur
  
Transition: Icon rotates 180° in 0.3s
```

## Visual Impact Features

### ✨ Premium Details

1. **Drop Shadows**: Text has subtle shadow for readability on gradient
2. **Backdrop Blur**: All glass elements use heavy blur (40px)
3. **Border Glow**: Subtle white borders create definition
4. **Smooth Transitions**: Everything animates (never instant)
5. **Micro-interactions**: Hover states on all interactive elements

### 🎬 Attention Grabbers

1. **Animated orbs**: Constant subtle movement
2. **Pulsing arrow**: On CTA button
3. **Rotating theme icon**: When toggling
4. **Spring physics**: Natural, bouncy feel
5. **Staggered reveals**: Professional polish

### 📊 Visual Hierarchy

```
Level 1: Full-screen gradient (foundation)
Level 2: Main glass card (primary focus)
Level 3: Input & CTA (action area)
Level 4: Feature pills (supporting info)
Level 5: Footer & watermark (branding)
```

### 🎨 Typography Scale

```
Main Title: 6xl (60px)
Subtitle: xl (20px)
Label: lg (18px)
Input: lg (18px)
Button: xl (20px)
Features: sm (14px)
Footer: sm (14px)
```

## Responsive Breakpoints

```
Mobile (< 768px):
  - Full-width card
  - Hide navigation pills
  - Stack elements vertically
  - Full-width code panel

Tablet (768px - 1024px):
  - Show navigation pills
  - Wider card (max-w-2xl)
  - Side-by-side when space allows

Desktop (> 1024px):
  - Maximum card width (4xl)
  - 50% code panel width
  - All features visible
  - Optimal spacing
```

---

**Visual Philosophy**: Create a premium, futuristic experience that embodies the Flow blockchain's cutting-edge technology while maintaining clarity, accessibility, and delightful interactions.

