# src/app — App Router guide

This folder contains Next.js App Router routes and top-level layouts used by the site.

What you'll find

- `layout.tsx` — the root layout for the application. Add providers, fonts, and global metadata here.
- `page.tsx` — the homepage UI.
- `template.tsx` — optional template used for page-level re-usable layouts and transitions.
- `globals.css` — Tailwind imports and global CSS.
- Subfolders (e.g. `contact`, `faq`, `pricing`) each map to a route and typically contain `page.tsx` and optionally `head.tsx`, `layout.tsx` or `loading.tsx`.

Conventions and best practices

- Routes: each folder under `src/app` is a route. Keep pages small and extract UI into `src/components`.
- Metadata: prefer exporting `metadata` from page-level files to keep SEO predictable.
- Server vs Client components: Default is server components. Add `"use client"` at the top of a file if it uses state, effects, or browser-only APIs (e.g., `window`).
- Data fetching: use async server components for page-level fetches where possible. For client-side interactions, fetch from client components or use React hooks.
- Loading/UI feedback: use `loading.tsx` per route for skeletons and `error.tsx` for error boundaries.

Small examples

Client component (brief):

```tsx
// src/components/ui/Button.tsx
'use client';
import React from 'react';

export default function Button({ children }: { children: React.ReactNode }) {
	return <button className="btn-primary">{children}</button>;
}
```

Server component using data fetching:

```tsx
// src/app/page.tsx
import { getPlans } from '@/lib/plans';

export default async function HomePage() {
	const plans = await getPlans();

	return <main>{/* render plans */}</main>;
}
```

Troubleshooting

- If a page that should be server-rendered is throwing `window is not defined`, it is a client-only API leaked into a server component. Move it into a `"use client"` component.
- If styles are missing, ensure `globals.css` imports `@tailwind base; @tailwind components; @tailwind utilities;` and that `layout.tsx` includes the stylesheet.

Links

- Next.js App Router docs: https://nextjs.org/docs/app

---

If you want, I can add a short checklist for adding a new route (files to create and tests to run).
