# Indivio — developer guide

Short, dev-friendly README with links to focused READMEs for `src/app`, `src/components`, and `src/lib`.

## Quick links

- Root README (this file) — overview & quick start
- `src/app/README.md` — app routes, layout, conventions
- `src/components/README.md` — component groups, naming & styling
- `src/lib/README.md` — utilities, static data, firebase

> Tip: open these files in your editor for more detailed, actionable instructions.

---

## Developer quick start

Prereqs:

- Node.js 18+
- npm (or yarn/pnpm)

Install and run locally:

```powershell
git clone https://github.com/imvicky69/indivio-showcase.git
cd indivio-showcase
npm ci
npm run dev
```

Environment variables

Create `.env.local` (do not commit):

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

# Payments (set in CI / deployment secrets)
CASHFREE_APP_ID=...
CASHFREE_SECRET_KEY=...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Security note: Use your deployment platform's secret manager (Vercel, Netlify, etc.) for production values.

## Scripts (what you'll use most)

- npm run dev — starts the Next.js dev server
- npm run build — production build
- npm run start — run production build locally
- npm run lint — lint the codebase
- npm run upload-plans — uploads plans data from JSON to Firestore
- npm run admin — starts the Next.js dev server with admin features enabled

See `package.json` for the full list.

## Managing Data in Firestore

All site data (plans, offers, and site content) is now stored in Firestore. The local JSON files serve as the source of truth and fallback, and changes should be made there first before syncing to Firestore.

### Workflow for updating data

1. Edit the data files in `src/lib/`:
   - `plans.json` - Pricing plans data
   - `offers.json` - Promotional offers
   - `siteContent.json` - Website content by section

2. Make sure your `serviceAccountKey.json` in the root directory has valid credentials

3. Run one of the following commands to sync the JSON data to Firestore:
   - `npm run upload-plans` - Upload only plans
   - `npm run upload-offers` - Upload only offers
   - `npm run upload-content` - Upload only site content
   - `npm run upload-all` - Upload all data at once (recommended)

4. The website will automatically fetch the latest data from Firestore

### Firebase Service Account

To use Firestore, you need a valid `serviceAccountKey.json` file in the project root with the following structure:

```json
{
	"type": "service_account",
	"project_id": "your-firebase-project-id",
	"private_key_id": "your-private-key-id",
	"private_key": "your-private-key",
	"client_email": "your-service-account-email",
	"client_id": "your-client-id",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "your-client-cert-url",
	"universe_domain": "googleapis.com"
}
```

You can generate this file from the Firebase Console > Project Settings > Service accounts > Generate new private key.

### Monitoring Firestore

Firebase provides several ways to monitor your Firestore database:

1. **Firebase Console**: Access real-time monitoring through the Firebase Console:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Navigate to "Firestore Database"
   - Browse collections, run queries, and monitor usage

2. **Firebase Extensions**: Install the "Firestore Counter" extension to track document counts and usage patterns

3. **Google Cloud Monitoring**:
   - Enable Cloud Monitoring API in Google Cloud Console
   - Create custom dashboards for Firestore operations
   - Set up alerts for quota usage, high latency, or error rates

4. **Firebase Performance Monitoring**:
   - Add Firebase Performance SDK to track Firestore query performance
   - Identify slow queries and optimize accordingly

### Creating an Admin Dashboard for Schools

Follow these steps to implement an admin dashboard for school management:

#### Step 1: Create Admin Routes and Authentication

1. Create a new route structure under `src/app/admin/`:

```
src/app/admin/
  layout.tsx       # Admin layout with authentication check
  page.tsx         # Admin dashboard home
  schools/         # School management pages
    page.tsx       # List all schools
    [id]/          # Dynamic route for individual school
      page.tsx     # School details
      students/    # Manage students
      teachers/    # Manage teachers
      metrics/     # School performance metrics
```

2. Implement admin authentication in `src/app/admin/layout.tsx`:
   - Create an isAdmin check using Firebase Auth custom claims
   - Redirect non-admin users to the login page

#### Step 2: Admin Dashboard Components

Create the following components under `src/components/admin/`:

1. **Dashboard Components**:
   - SchoolList.tsx - Display and filter schools
   - SchoolMetrics.tsx - Show key performance indicators
   - UserManagement.tsx - Manage admin users and permissions

2. **Data Management Components**:
   - SchoolForm.tsx - Create/edit school details
   - StudentTable.tsx - List and manage students
   - TeacherTable.tsx - List and manage teachers

#### Step 3: Firebase Admin SDK Setup

1. Create a new file `src/lib/firebase-admin.ts` for server-side admin operations:

```typescript
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin if not already initialized
const apps = getApps();
const serviceAccount = require('../../serviceAccountKey.json');

if (!apps.length) {
	initializeApp({
		credential: cert(serviceAccount),
	});
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
```

2. Create admin-specific Firestore helpers in `src/lib/admin/firestore-helpers.ts`:
   - Functions for CRUD operations on schools, students, and teachers
   - Data validation and sanitization functions
   - Batch operations for efficient updates

#### Step 4: Implement Role-Based Access Control

1. Add custom claims to user accounts:
   - schoolAdmin: Access to specific school data
   - superAdmin: Access to all schools and system settings

2. Update Firestore rules to enforce role-based access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin access functions
    function isAdmin() {
      return request.auth != null && request.auth.token.admin == true;
    }
    function isSchoolAdmin(schoolId) {
      return request.auth != null &&
        (request.auth.token.admin == true ||
         request.auth.token.schoolAdmin == schoolId);
    }

    // School collection access
    match /schools/{schoolId} {
      allow read: if request.auth != null;
      allow write: if isAdmin() || isSchoolAdmin(schoolId);

      // Nested collections for school data
      match /students/{studentId} {
        allow read: if request.auth != null;
        allow write: if isAdmin() || isSchoolAdmin(schoolId);
      }
      match /teachers/{teacherId} {
        allow read: if request.auth != null;
        allow write: if isAdmin() || isSchoolAdmin(schoolId);
      }
      match /metrics/{metricId} {
        allow read: if isAdmin() || isSchoolAdmin(schoolId);
        allow write: if isAdmin();
      }
    }
  }
}
```

#### Step 5: Real-time Monitoring Components

1. Create a dashboard component with real-time updates:

```typescript
// src/components/admin/RealTimeMetrics.tsx
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function RealTimeMetrics({ schoolId }) {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const q = query(
      collection(db, 'schools', schoolId, 'metrics'),
      where('isActive', '==', true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = {};
      snapshot.forEach(doc => {
        data[doc.id] = doc.data();
      });
      setMetrics(data);
    });

    return () => unsubscribe();
  }, [schoolId]);

  return (
    <div className="metrics-dashboard">
      {/* Render metrics visualization components */}
    </div>
  );
}
```

2. Add data visualization components using chart libraries like Chart.js or Recharts

## Project structure (short)

Root highlights:

- `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs` — framework configs
- `public/` — static assets
- `src/app/` — Next.js App Router routes and layouts
- `src/app/admin/` — Admin dashboard routes and pages
- `src/components/` — UI and page-specific components
- `src/components/admin/` — Admin-specific UI components
- `src/lib/` — utilities, data and integrations (firebase)
- `src/lib/admin/` — Admin-specific utilities and helpers

This repo uses the App Router pattern (folder routes in `src/app`) and TypeScript.

## Contribution & development notes

- Branching: `feature/*`, `chore/*`, `fix/*` naming
- Pre-commit: run `npm run lint` and basic type checks before creating PRs
- Tests: add unit tests near the code they cover (not present by default)

## Build & Deployment Process

### Branch Strategy

This project follows a structured branch strategy:

- `dev`: Development branch for ongoing work and feature integration
- `build`: Stable production-ready code with optimized dependencies
- `main`: Production branch deployed to live environment

### Creating a Production Build

1. Create a build branch from dev:
   ```bash
   git checkout dev
   git pull
   git checkout -b build
   ```

2. Clean up development files:
   ```bash
   # Remove any development-only files
   rm -rf .vscode/ scripts/ test/
   ```

3. Optimize package.json (already done in this branch):
   - Remove development scripts
   - Move required dev dependencies to dependencies
   - Keep only production-necessary scripts

4. Build the application:
   ```bash
   npm ci
   npm run build
   ```

5. Test the production build:
   ```bash
   npm start
   ```

6. Merge to main:
   ```bash
   git checkout main
   git merge build
   git push
   ```

## Next steps (what I'll add now)

1. Create `src/app/README.md`
2. Create `src/components/README.md`
3. Create `src/lib/README.md`

When those are added you'll have actionable instructions per area (how to add routes, components, and utilities).

## Admin Dashboard Development Guide

### Overview

The admin dashboard provides a comprehensive interface for schools to manage their data, monitor performance metrics, and handle user accounts. This guide explains how to set up, extend, and maintain the admin dashboard.

### Setting Up the Admin Environment

1. **Install Required Dependencies**:

```bash
npm install firebase-admin recharts @tremor/react @tanstack/react-table
```

2. **Configure Environment Variables**:

Add these variables to your `.env.local` file:

```env
# Admin Dashboard
NEXT_PUBLIC_ENABLE_ADMIN_FEATURES=true
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account-email
FIREBASE_ADMIN_PRIVATE_KEY=your-private-key
```

3. **Run in Admin Mode**:

```bash
npm run admin
```

### Admin Dashboard Architecture

The admin dashboard follows a modular architecture:

1. **Authentication Layer**:
   - Admin-specific login and session management
   - Role-based access controls (RBAC)
   - Admin user management

2. **Core Modules**:
   - School Management
   - User Management (students, teachers, staff)
   - Performance Analytics
   - Content Management
   - System Configuration

3. **Technical Implementation**:
   - Server Components for data fetching
   - Client Components for interactive elements
   - Firebase Admin SDK for privileged operations
   - Real-time subscriptions for live updates

### Firestore Monitoring Features

The admin dashboard includes several monitoring capabilities:

1. **Database Health Monitoring**:
   - Document count by collection
   - Storage usage metrics
   - Query performance statistics

2. **User Activity Tracking**:
   - Active users count and trends
   - Registration completion rates
   - User engagement metrics

3. **Performance Dashboards**:
   - School performance comparisons
   - Student progress tracking
   - System performance metrics

4. **Alerting System**:
   - Quota usage alerts
   - Error rate monitoring
   - Unusual activity detection

### Adding New School Dashboard Features

To extend the school dashboard with new features:

1. **Define the Data Model**:
   - Create appropriate Firestore collections
   - Define security rules for access control
   - Implement data validation schemas

2. **Create Admin UI Components**:
   - Add a new section under `src/components/admin/`
   - Create data tables, forms, and visualization components
   - Implement filtering and search functionality

3. **Add API Routes**:
   - Create new API routes under `src/app/api/admin/`
   - Implement server-side logic with Firebase Admin SDK
   - Add proper authentication and validation

4. **Update Navigation**:
   - Add new routes to the admin navigation sidebar
   - Configure role-based visibility for menu items

### Best Practices for Admin Dashboard Development

1. **Security**:
   - Always validate user permissions on both client and server
   - Use Firebase Admin SDK for privileged operations
   - Implement proper input sanitization for all forms

2. **Performance**:
   - Use pagination for large data sets
   - Implement efficient querying with proper indexes
   - Use client-side caching for frequently accessed data

3. **User Experience**:
   - Provide clear feedback for all actions
   - Implement consistent loading states
   - Design intuitive navigation and workflows

4. **Code Organization**:
   - Keep admin code separate from user-facing components
   - Use TypeScript interfaces for data models
   - Document all admin-specific functions and components

### Deployment Considerations

When deploying the admin dashboard:

1. **Security Rules**:
   - Deploy separate Firestore rules for admin functionality
   - Test rules thoroughly before deployment
   - Consider using environment-specific rule sets

2. **Performance Optimization**:
   - Configure proper Firestore indexes
   - Enable caching for static assets
   - Use Edge functions for region-specific performance

3. **Monitoring**:
   - Set up logging for admin operations
   - Configure alerts for critical failures
   - Monitor resource usage to control costs

---

If you'd like I can: add these three README files now, or customize the content to a specific onboarding flow (e.g., set up Firebase locally, run checkout demo, or add test scaffolding).
