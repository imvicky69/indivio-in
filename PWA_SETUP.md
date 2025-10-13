# PWA (Progressive Web App) Setup

This application is now configured as an installable Progressive Web App (PWA). Users can install it on their devices for a native app-like experience.

## Features

✅ **Installable** - Users can install the app on their home screen
✅ **Offline Support** - Service worker caches assets for offline access
✅ **App Shortcuts** - Quick access to Pricing and Contact pages
✅ **Optimized Caching** - Smart caching strategies for images, fonts, CSS, and JS
✅ **Mobile Optimized** - Designed for both desktop and mobile devices

## Configuration Files

### 1. Web Manifest (`public/site.webmanifest`)
- Defines app name, colors, icons, and behavior
- Includes app shortcuts for quick navigation
- Configured for standalone display mode

### 2. Next.js Config (`next.config.ts`)
- Uses `@ducanh2912/next-pwa` plugin
- Service worker disabled in development
- Runtime caching strategies configured for:
  - Google Fonts (1 year cache)
  - Static assets (24 hours cache)
  - API calls (Network-first strategy)

### 3. PWA Icons
All required icon sizes are generated in the `public/` folder:
- `icon-192x192.png` - Android Chrome icon
- `icon-512x512.png` - Android Chrome splash screen
- `apple-touch-icon.png` - iOS home screen icon (180x180)
- `favicon-16x16.png` - Browser favicon
- `favicon-32x32.png` - Browser favicon

## How to Test PWA Installation

### On Desktop (Chrome/Edge)
1. Build and run the production version: `npm run build && npm start`
2. Open the app in Chrome or Edge
3. Look for the install icon (⊕) in the address bar
4. Click to install the app

### On Mobile (Chrome/Safari)
1. Open the deployed website on your mobile device
2. **Chrome**: Tap the three-dot menu → "Install app" or "Add to Home Screen"
3. **Safari**: Tap the Share button → "Add to Home Screen"
4. The app icon will appear on your home screen

### Testing Offline Support
1. Install the PWA
2. Open the app
3. Navigate through a few pages
4. Enable airplane mode or disconnect from network
5. Refresh the page - cached content should still load

## Service Worker

The service worker is automatically generated during production build and saved to `public/sw.js`. It handles:
- Asset caching
- Offline functionality
- Background sync (if configured)

**Note**: Service worker files are in `.gitignore` as they are auto-generated.

## Caching Strategies

1. **CacheFirst** - Google Fonts (served from cache if available)
2. **StaleWhileRevalidate** - Images, CSS, JS (serve cached, update in background)
3. **NetworkFirst** - API calls (try network, fallback to cache)

## Deployment

When deploying to production:
1. The service worker will be automatically generated
2. Users will see an "Install App" prompt
3. The app will be installable on all supported platforms

## Browser Support

- ✅ Chrome (Desktop & Mobile)
- ✅ Edge
- ✅ Safari (iOS)
- ✅ Firefox
- ✅ Samsung Internet
- ✅ Opera

## Development Notes

- PWA is **disabled in development mode** to allow hot reloading
- Service worker only works on **HTTPS** or **localhost**
- Clear browser cache and service worker when testing changes
- Use Chrome DevTools → Application → Service Workers to debug

## Verification Checklist

- [x] Web manifest is valid JSON
- [x] All icon files exist with correct dimensions
- [x] Manifest linked in layout.tsx
- [x] PWA plugin configured in next.config.ts
- [x] Service worker files added to .gitignore
- [x] Icons properly sized for all platforms
- [x] Shortcuts configured for quick access
- [x] Theme color and background color set
- [x] Display mode set to "standalone"

## Additional Resources

- [Next PWA Documentation](https://ducanh-next-pwa.vercel.app/)
- [Web App Manifest Spec](https://web.dev/add-manifest/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
