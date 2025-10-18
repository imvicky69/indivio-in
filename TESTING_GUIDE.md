# Testing Guide for Pricing Page Improvements

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: `http://localhost:3000/pricing`

## What to Test

### Desktop View (1920x1080)
- [ ] Hero section displays correctly with title and trust badges
- [ ] Pricing cards show in 3-column grid
- [ ] ROI points section visible under each card
- [ ] Tooltips appear on hover over info icons
- [ ] Comparison table displays as full table layout
- [ ] "How It Works" shows horizontal timeline with 4 steps
- [ ] Built with Indivio cards show in 3-column grid
- [ ] Hover effects work on demo cards ("View Demo" button appears)
- [ ] Testimonials display in 3-column grid
- [ ] FAQ accordion expands/collapses correctly
- [ ] Final CTA section with dual buttons
- [ ] Section dividers visible between sections

### Tablet View (768x1024 - iPad)
- [ ] Pricing cards show in 2-column grid
- [ ] Comparison table switches to stacked cards
- [ ] "How It Works" maintains horizontal layout
- [ ] Demo cards show in 2-column grid
- [ ] Testimonials show in 2-column grid
- [ ] All text remains readable
- [ ] Touch targets are appropriately sized

### Mobile View (375x667 - iPhone)
- [ ] Pricing cards stack vertically (1 column)
- [ ] Comparison table shows as individual plan cards
- [ ] "How It Works" switches to vertical timeline
- [ ] Demo cards stack vertically
- [ ] Testimonials stack vertically
- [ ] All CTAs are easily tappable
- [ ] Text is readable without horizontal scrolling
- [ ] Section dividers don't overflow

### Interactive Elements
- [ ] All "Get Started" buttons link to `/checkout?plan=...`
- [ ] "View Full Details" buttons link to `/plans/{planId}`
- [ ] "Contact our team" links work
- [ ] "Schedule a Call" links work
- [ ] Demo card hover states work
- [ ] Tooltip appears on hover/click
- [ ] FAQ items expand/collapse smoothly
- [ ] Animations are smooth and not jarring

### Dark Mode
- [ ] Enable dark mode (if theme switcher exists)
- [ ] All sections maintain proper contrast
- [ ] Card backgrounds are visible
- [ ] Text is readable
- [ ] Borders and dividers are visible
- [ ] Icons maintain appropriate colors
- [ ] Hover states work in dark mode

### Accessibility
- [ ] Tab through all interactive elements (keyboard navigation)
- [ ] Focus states are visible
- [ ] Screen reader can read all content (test with NVDA/VoiceOver)
- [ ] All images have alt text (once real images added)
- [ ] Color contrast meets WCAG AA standards
- [ ] Semantic HTML structure is correct

### Performance
- [ ] Page loads in under 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No console errors or warnings
- [ ] Images load progressively (once implemented)
- [ ] Lighthouse score > 90 (run in Chrome DevTools)

## Browser Testing

Test in the following browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Known Limitations

### Development Environment
- Firebase configuration required for data fetching
- Without Firebase, fallback data is used
- Build may fail without proper environment variables

### Placeholder Content
- Demo showcase uses placeholder images (replace with actual screenshots)
- Testimonials are static (can be moved to Firestore)
- Some data is in `pricing-config.ts` (consider moving to CMS)

## Manual Testing Checklist

### Visual QA
- [ ] All spacing looks consistent
- [ ] Typography hierarchy is clear
- [ ] Colors match design system
- [ ] Shadows and borders are subtle
- [ ] Gradients render smoothly
- [ ] Icons are aligned properly

### Content Review
- [ ] All text is grammatically correct
- [ ] Pricing information is accurate
- [ ] Feature comparisons are correct
- [ ] ROI points are compelling
- [ ] FAQ answers are helpful
- [ ] Testimonials sound authentic

### UX Review
- [ ] User can easily compare plans
- [ ] Renewal pricing is clear
- [ ] Process workflow is easy to understand
- [ ] CTAs are prominent and actionable
- [ ] Navigation flow makes sense
- [ ] Help text is readily available

## Automated Testing

### TypeScript Check
```bash
npx tsc --noEmit
```

### Build Test
```bash
npm run build
```
Note: May fail without Firebase config in test environment

### Lint Check
```bash
npm run lint
```

## Reporting Issues

When reporting issues, please include:
1. Device/browser information
2. Screenshot or video
3. Steps to reproduce
4. Expected vs actual behavior
5. Console errors (if any)

## Additional Resources

- [Pricing Page Documentation](./PRICING_PAGE_IMPROVEMENTS.md)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
