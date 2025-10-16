# Library Documentation

This directory contains shared utilities, data models, and service integrations for the Indivio application.

## Table of Contents

- [Firebase Integration](#firebase-integration)
- [Plans Management](#plans-management)
- [Authentication](#authentication)
- [Content Management](#content-management)

## Firebase Integration

The `firebase.ts` file contains the core Firebase configuration and initialization logic. It exports:

- `db` - Firestore database instance
- `auth` - Firebase authentication instance
- Helper functions for common Firestore operations
- `utils/firestore-helpers.ts` - Utilities for handling Firestore data

### Usage

```typescript
import { db, auth, saveBooking } from '@/lib/firebase';

// Use Firestore directly
const usersRef = collection(db, 'users');

// Or use helper functions
await saveBooking({
	// booking data
});
```

## Data Management

All application data is now stored in Firestore, with local JSON files serving as fallback.

### Plans Management (`plans.ts`)

Manages pricing plans for the application.

#### Key Functions

- `getPricingPlans()` - Fetches all plans from Firestore, sorted by order
- `getPlanById(id)` - Fetches a specific plan by its ID

### Offers Management (`offers.ts`)

Manages promotional offers and discounts.

#### Key Functions

- `getOffers()` - Fetches all active offers from Firestore
- `getOfferById(id)` - Fetches a specific offer by ID
- `getOfferByCode(code)` - Fetches an active offer by its code

### Content Management (`siteContent.ts`)

Manages static content throughout the site.

#### Key Functions

- `getSiteContentBySection<T>(section)` - Fetches content for a specific section from Firestore
- `getAllSiteContent()` - Fetches all content sections at once

### Data Flow

1. Data is defined in JSON files:
   - `plans.json` - Pricing plans
   - `offers.json` - Promotional offers
   - `siteContent.json` - Website content

2. Upload scripts sync the JSON data to Firestore:
   - `scripts/uploadPlansToFirestore.js` - Plans
   - `scripts/uploadOffersToFirestore.js` - Offers
   - `scripts/uploadSiteContentToFirestore.js` - Site content
   - `scripts/uploadAllDataToFirestore.js` - All data at once

3. Application fetches data from Firestore at runtime:
   - Falls back to local JSON if Firestore is unavailable
   - Uses in-memory caching to reduce Firestore reads
   - Sanitizes Firestore data types (like Timestamps) using `sanitizeFirestoreData()`

4. Changes should be made to the JSON files first, then synced to Firestore

### Plan Structure

```typescript
interface Plan {
	id: string;
	name: string;
	price: number;
	setupFee?: number;
	renewalPrice?: number;
	pricePeriod: string;
	badge?: string | null;
	tagline?: string;
	description: string;
	short?: string;
	isMostPopular: boolean;
	features: string[];
	included?: PlanIncluded;
	addOns?: PlanAddOns;
	bestFor?: string[];
	deliveryTime?: string;
	order: number;
	// Computed at runtime if offers are active
	launchOffer?: LaunchOffer;
}
```

## Firestore Helpers

The `utils/firestore-helpers.ts` file provides utilities for working with Firestore data:

### Key Functions

- `sanitizeFirestoreData(data)` - Converts Firestore-specific objects (like Timestamps) to serializable JavaScript types, making them safe for use in Next.js data fetching. This function recursively processes objects and arrays.

### Usage

```typescript
import { sanitizeFirestoreData } from '@/lib/utils/firestore-helpers';

// When fetching data from Firestore
const snapshot = await getDoc(docRef);
const data = sanitizeFirestoreData(snapshot.data());

// Now data is safe to use in components, with Timestamps converted to ISO strings
```

## Authentication

The `auth.ts` file handles user authentication and account management with Firebase Auth.

### Key Functions

- `createUserAccount` - Creates a new user account
- `updatePaymentStatus` - Updates a user's payment status
- `signInUser` - Authenticates a user
- `signOutUser` - Signs out the current user
- `getCurrentUser` - Gets the currently authenticated user

## Content Management

The `siteContent.ts` and `siteContent.json` files manage static content throughout the site.

### Usage

```typescript
import siteContent from '@/lib/siteContent';

const heroTitle = siteContent.home.heroTitle;
const pricingFAQs = siteContent.pricing.faqs;
```
