# Indivio Theme Update Summary

## 🎨 Complete Design System Overhaul

This document outlines the comprehensive theme improvements applied to the Indivio showcase website for a consistent, modern, and professional appearance.

---

## 🌈 Color Palette

### Primary Colors

- **Primary**: `hsl(0, 0%, 9%)` - Dark gray/black for CTAs and emphasis
- **Primary Foreground**: `hsl(0, 0%, 98%)` - White text on dark backgrounds
- **Background**: `hsl(0, 0%, 98%)` - Clean white background
- **Foreground**: `hsl(0, 0%, 10%)` - Dark text

### Accent Colors

- **Accent/Success**: `hsl(142, 76%, 36%)` - Green for launch offers (#16a34a)
- **Muted**: `hsl(0, 0%, 96%)` - Light gray for subtle backgrounds
- **Border**: `hsl(0, 0%, 90%)` - Subtle borders

### Launch Campaign Colors

- Green gradients for launch offer banners
- Green badges with `#16a34a` base color
- Animated ping effects for attention

---

## 📐 Spacing System

### Section Padding

- Consistent `section-padding` utility: `py-16 sm:py-20 md:py-24`
- Standardized container max-width: `1280px`
- Responsive padding: `px-6` (mobile) scales appropriately

### Component Spacing

- Card padding: `p-8` for content-heavy cards
- Margin bottom for headings: `mb-16`
- Gap between elements: `gap-4` (mobile), `gap-8` (desktop)

---

## ✍️ Typography

### Font Families

- **Headings**: Inter (var(--font-inter))
- **Body**: Poppins (var(--font-poppins))

### Font Sizes

- **Hero Title**: `clamp(2.5rem, 5vw, 4rem)` - Responsive from 40px to 64px
- **Section Heading**: `clamp(1.75rem, 3vw, 2.5rem)` - Responsive from 28px to 40px
- **Body**: `16px` base with `1.7` line-height
- **Large Text**: `18px-20px` for paragraphs in hero sections

### Font Weights

- **Headings**: `font-bold` (700)
- **Subheadings**: `font-semibold` (600)
- **Body**: `font-medium` (500) or `font-normal` (400)

---

## 🃏 Card Styles

### Standard Card

```css
.card-elevated {
	@apply rounded-2xl border border-border bg-card shadow-lg transition-all duration-300;
}
.card-elevated:hover {
	@apply -translate-y-1 shadow-2xl;
}
```

### Features

- **Border**: `border-2` for pricing cards, `border` for regular cards
- **Border Radius**: `rounded-2xl` (12px) or `rounded-3xl` (24px) for pricing
- **Shadows**: `shadow-lg` base, `shadow-2xl` on hover
- **Hover Effect**: `-translate-y-1` or `y: -8` for slight lift

---

## 🔘 Button Styles

### Primary Button

- Background: `bg-primary` (dark)
- Text: `text-primary-foreground` (white)
- Hover: `hover:bg-primary/90 hover:shadow-lg`
- Padding: `px-8 py-3.5`
- Border Radius: `rounded-full`

### Secondary Button

- Background: `bg-background`
- Border: `border-2 border-border`
- Hover: `hover:bg-muted hover:border-primary/30`

### Accent Button (Launch Offer)

- Background: `bg-green-600`
- Text: `text-white`
- Hover: `hover:bg-green-700 hover:shadow-xl`

---

## 🎭 Animation Patterns

### Fade In

```javascript
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Stagger Children

- Delay increment: `0.1s` or `0.15s` between items
- Used for feature cards, stats, and step indicators

### Hover Animations

- Cards: `y: -8` or `-translate-y-1`
- Icons: `scale: 1.1` or `group-hover:scale-110`
- Buttons: `hover:-translate-y-0.5`

### Background Decorations

- Animated pulse effects with green and primary colors
- Blur: `blur-3xl` for soft gradients
- Opacity: `opacity-10` to `opacity-30` for subtlety

---

## 📱 Component Updates

### Home Page

- **HeroSection**: Animated hero with launch badge, pulsing background effects
- **FeaturesSection**: Grid of 4 cards with icon badges, hover effects
- **HowItWorksSection**: 3-step process with numbered badges and arrow connectors
- **StatsSection**: 4 stats cards with decorative corner elements
- **TechStackSection**: Tech logos with hover tooltips, background highlights

### Pricing Page

- **LaunchOfferBanner**: Bold green banner with animated badge
- **PricingCard**: Enhanced borders, launch offer display, savings badges
- **PricingHero**: Animated hero with decorative background

### Features Page

- **FeaturesHero**: Two-column layout with animated placeholder images
- Consistent button styling and animations

### UI Components

- **Button**: Three variants (primary, secondary, accent) with consistent styling
- **SectionHeading**: Centered headings with optional subtitles
- **CtaSection**: Call-to-action sections with animated buttons

---

## 🎯 Key Improvements

### Before → After

1. **Color Consistency**: Mixed color schemes → Unified green accent with black/white base
2. **Spacing**: Inconsistent padding → Standardized `section-padding` utility
3. **Typography**: Varied sizes → Responsive clamp() with clear hierarchy
4. **Cards**: Different styles → Consistent `card-elevated` pattern
5. **Animations**: Static or inconsistent → Smooth framer-motion animations
6. **Backgrounds**: Solid or varied → Subtle gradients with decorative blurs
7. **Buttons**: Different styles → Three clear variants with hover effects
8. **Launch Campaign**: Scattered indicators → Cohesive green theme throughout

---

## 🚀 Performance Optimizations

- Used CSS variables for theme colors (easy theme switching)
- Framer Motion animations with `viewport={{ once: true }}` (run once per view)
- Optimized image loading with Next.js Image component
- Smooth transitions with GPU-accelerated transforms

---

## 📋 Files Modified

### Core Styles

- `src/app/globals.css` - Updated CSS variables, added utility classes

### Home Components

- `src/components/home/HeroSection.tsx`
- `src/components/home/FeaturesSection.tsx`
- `src/components/home/HowItWorksSection.tsx`
- `src/components/home/StatsSection.tsx`
- `src/components/home/TechStackSection.tsx`

### Pricing Components

- `src/components/pricing/PricingCard.tsx`
- `src/components/pricing/LaunchOfferBanner.tsx`
- `src/components/pricing/PricingHero.tsx`

### Features Components

- `src/components/features/FeaturesHero.tsx`

### UI Components

- `src/components/ui/Button.tsx`
- `src/components/ui/CtaSection.tsx`
- `src/components/SectionHeading.tsx`

---

## 🎨 Design Tokens

### Border Radius

- Small: `0.5rem` (8px)
- Medium: `0.75rem` (12px) - Default
- Large: `1rem` (16px)
- XL: `1.5rem` (24px)
- Full: `9999px` (Pill shape for buttons)

### Shadows

- SM: `shadow-md`
- Base: `shadow-lg`
- Elevated: `shadow-xl`
- Maximum: `shadow-2xl`

### Transitions

- Fast: `duration-200`
- Standard: `duration-300`
- Slow: `duration-500`
- Animations: `duration-600` with easing

---

## 🔄 Next Steps

1. ✅ Core theme system established
2. ✅ Home page components updated
3. ✅ Pricing page refined
4. ✅ Features page enhanced
5. ⏳ Contact/Booking pages polish
6. ⏳ Why Indivio page updates
7. ⏳ FAQ page styling
8. ⏳ Dark mode refinement (if needed)

---

## 📸 Visual Reference

### Color Scheme

- **Launch Green**: Used for badges, success states, launch offer
- **Primary Black**: CTAs, headings, emphasis
- **Neutral Grays**: Backgrounds, borders, muted text
- **Pure White**: Card backgrounds, primary foreground

### Layout Pattern

- Hero sections: Full viewport with decorative backgrounds
- Content sections: Alternating white/subtle gray backgrounds
- Cards: White with subtle shadows and borders
- CTAs: Bold with animated effects

---

_Last Updated: [Current Session]_
_Version: 2.0 - Complete Theme Redesign_
