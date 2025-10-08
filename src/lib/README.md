# src/lib — utilities, data, and integrations

This folder contains application utilities, static data (JSON), and integration setup (Firebase). Keep this layer thin: utilities should be generic and testable.

Files of note

- `firebase.ts` — Firebase initialization and exported helpers for Auth and Firestore.
- `plans.ts` — TypeScript helpers around `plans.json` (types, fetch helpers).
- `utils.ts` — small helpers (e.g., `cn()` for className merging) used across components.
- `siteContent.ts` — central content used to populate pages.
- `plans.json`, `offers.json`, `siteContent.json` — static data used by pages/components.

Common patterns

- Export typed helpers from `.ts` files and keep the JSON files as source-of-truth for static content.
- Prefer `async` server functions inside `src/lib` that pages can call from server components.

Firebase setup (local dev)

1. Create a Firebase project in the Firebase console.
2. Add a Web app and copy the config values.
3. Add the values to `.env.local` (see root README).

Example `firebase.ts` (pattern used in this repo):

```ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!getApps().length) {
	initializeApp(firebaseConfig);
}

export const auth = getAuth();
```

Utilities example (`cn` helper)

```ts
// src/lib/utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...inputs: Parameters<typeof clsx>) {
	return twMerge(clsx(...inputs));
}
```

Working with static data

- Use `import plans from './plans.json'` in server components or `await import('./plans.json')` for dynamic imports.
- When creating or updating static JSON used by pages, keep the shape stable and update TypeScript types in `plans.ts`.

Tips

- Never commit real API keys or payment secrets. Use env files locally and deployment secrets in CI.
- Add unit tests for utility functions in this folder to keep behavior predictable.

---

Would you like me to also scaffold a minimal `firebase.example.env` or a helper script to validate env vars during startup?
