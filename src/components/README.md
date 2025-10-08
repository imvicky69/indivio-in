# src/components — component library guide

This folder contains reusable UI components (inside `ui/`) and page-specific component groups (e.g., `home/`, `pricing/`, `checkout/`). The project follows a component-driven approach: small, focused components composed into pages.

Folder structure (high level)

- `ui/` — primitive and shared UI components (Button, Navbar, Footer, etc.)
- `home/`, `pricing/`, `checkout/`, etc. — page-specific component groups
- shared files at the root of this folder: `SectionHeading.tsx`, `PrivacyPolicyContent.tsx`, etc.

Naming & placement conventions

- File names use PascalCase and export a default component: `Button.tsx` -> `export default function Button(...) {}`.
- Place components used across multiple pages in `ui/`.
- Place page-specific, multi-file features in their own folder (e.g., `src/components/checkout/`).
- Keep components small: prefer many single-responsibility components over large multi-purpose ones.

Styling patterns

- Tailwind CSS is used for styling. Use utility classes and prefer composition via `cn()` from `src/lib/utils` when combining classes.
- For variants (primary/secondary button), prefer small props (e.g., `variant?: 'primary' | 'ghost'`) and map them to Tailwind classes.
- Avoid deep nested CSS; prefer utility-first approach.

Client vs Server components

- Prefer server components for data-heavy rendering and client components for interactivity.
- If a component uses hooks (useState/useEffect/useRef) or browser APIs, mark it with `"use client"` at the top.

Examples

Button component (variant pattern):

```tsx
// src/components/ui/Button.tsx
'use client';
import React from 'react';
import cn from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'ghost';
};

export default function Button({
	variant = 'primary',
	className,
	...props
}: ButtonProps) {
	const base = 'px-4 py-2 rounded-md text-sm font-medium';
	const styles =
		variant === 'primary'
			? 'bg-indigo-600 text-white'
			: 'bg-transparent text-indigo-600';

	return <button className={cn(base, styles, className)} {...props} />;
}
```

Composing page components

- Keep the page component in `src/app/<route>/page.tsx` minimal. Import composed components from `src/components/*`.
- Example: the pricing page imports `PricingHero`, `ComparisonTable`, and `GetStartedSection` from `src/components/pricing`.

Testing components

- Add unit tests next to components (e.g., `Button.test.tsx`) when adding new interactive behavior.
- Use React Testing Library and Vitest or Jest (not present by default) and wire a basic test runner in CI when needed.

Tips

- If you add a new shared UI primitive, update `components.json` if you rely on shadcn/ui tooling.
- Document non-obvious props with JSDoc comments to help future maintainers.

---

If you'd like, I can scaffold a `Button.test.tsx` and a small story/example file for Storybook or MDX documentation.
