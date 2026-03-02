# Mobile Responsive Testing Guide - Karrar.ai

## Quick Start: Testing Mobile View in Chrome

### Step 1: Open Chrome DevTools
1. Open your Karrar.ai app in Chrome
2. Press `F12` (Windows/Linux) or `Cmd+Option+I` (Mac)
3. Or right-click → "Inspect"

### Step 2: Enable Device Toolbar
1. Click the **Device Toolbar** icon (phone/tablet icon) in top-left of DevTools
   - Keyboard shortcut: `Ctrl+Shift+M` (Windows/Linux) or `Cmd+Shift+M` (Mac)
2. You should now see your app in mobile view

### Step 3: Test Different Screen Sizes
Chrome provides preset devices. Click the device dropdown and select:

**Mobile Phones:**
- iPhone SE (375×667)
- iPhone 12 Pro (390×844)
- iPhone 14 Pro (393×852)
- Pixel 5 (393×851)
- Samsung Galaxy S20 (360×800)

**Tablets:**
- iPad (768×1024)
- iPad Pro 12.9 (1024×1366)

**Custom Size:**
- Type custom width/height at the top

## What to Check on Mobile

### Critical Responsive Elements
✓ **Login/Home Page**
- Logo and heading should scale properly
- Form inputs take full width
- Buttons are 44px+ height (touch targets)
- No horizontal scrolling

✓ **Dashboard**
- Stats cards stack to single column
- Tabs scroll horizontally (not wrap)
- Content stays within viewport
- Sidebar hidden (hamburger icon visible)

✓ **Contracts Page**
- Contract list items stack properly
- Risk badges align correctly on mobile
- Action buttons don't overflow
- File names truncate instead of break

✓ **Report Page**
- Report tabs scroll horizontally
- Summary cards stack vertically
- Action buttons full-width
- Charts/tables scale down

✓ **Navigation**
- Hamburger menu visible on mobile
- Sidebar appears as overlay with dark background
- Navigation items readable on small screens

## Viewport Breakpoints in Karrar.ai

| Breakpoint | Screen Size | Purpose |
|-----------|-----------|---------|
| Mobile | < 640px | Full vertical stacking |
| Tablet | 640px - 1024px | 2-column layouts |
| Desktop | 1024px+ | 3-column layouts |
| Small Phone | < 375px | Extra compact styling |

## Media Queries Active

All responsive CSS is in `/app/mobile.css` with these media queries:

```css
/* Mobile phones */
@media screen and (max-width: 639px)

/* Small phones */
@media screen and (max-width: 374px)

/* Tablets */
@media screen and (min-width: 640px) and (max-width: 1023px)

/* Desktop */
@media screen and (min-width: 1024px)

/* Landscape */
@media (orientation: landscape)

/* Touch devices */
@media (hover: none) and (pointer: coarse)

/* Accessibility */
@media (prefers-reduced-motion: reduce)
```

## Testing in Chrome DevTools

### 1. Slow Network (Mobile)
1. Open DevTools → Network tab
2. Click the throttling dropdown (currently "No throttling")
3. Select "Slow 4G" or "Fast 3G"
4. Reload the page
5. Check if app loads gracefully

### 2. Touch Simulation
1. DevTools → More tools → Sensors
2. Check "Emulate touch screen"
3. Click/drag elements - they should respond to touch events

### 3. Device Pixel Ratio
1. Ensure "Device Pixel Ratio: 2" for Retina displays
2. Text should remain crisp
3. Icons/buttons should scale properly

### 4. Safe Area (iPhone Notch)
- Karrar.ai uses `viewport-fit=cover` in metadata
- Safe area padding applies automatically
- Content stays visible on notched devices

## Common Issues & Fixes

### Horizontal Scrolling on Mobile
**Problem:** Content extends beyond screen width
**Fix:** Check mobile.css - all elements should be `width: 100%`

### Buttons Too Small to Tap
**Problem:** Buttons < 44px height
**Fix:** Mobile.css enforces `min-height: 44px`

### Text Too Small/Large
**Problem:** Typography not scaling
**Fix:** Using `clamp()` for fluid sizing
- Example: `font-size: clamp(12px, 3vw, 16px)`

### Sidebar Broken on Mobile
**Problem:** Sidebar blocks content
**Fix:** Mobile.css hides sidebar, shows hamburger menu

## Deployment Testing

After deploying to Vercel:

1. Open your deployed URL on mobile browser
2. Or use Chrome DevTools on desktop to preview

**Test URLs:**
- `/login` - Login form
- `/home` - Home page
- `/dashboard` - Dashboard
- `/contracts` - Contracts list
- `/report` - Report view

## Performance on Mobile

### Optimized For:
- Low bandwidth (CSS media queries, not heavy JS)
- Touch interactions (44px+ targets)
- Battery life (smooth animations with reduced-motion)
- Viewport sizes from 320px to 2560px

### Network Throttling Test
1. DevTools → Network tab
2. Throttle to "Slow 4G"
3. Reload - check if pages load in < 3 seconds
4. Images should lazy-load
5. Essential content visible without JavaScript

## Future Enhancements

- [ ] Test on real iOS Safari devices
- [ ] Test on Android Chrome
- [ ] Check voice-over accessibility
- [ ] Test with system dark mode disabled
- [ ] Verify splash screen on PWA
