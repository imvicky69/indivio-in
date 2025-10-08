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

See `package.json` for the full list.

## Project structure (short)

Root highlights:

- `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs` — framework configs
- `public/` — static assets
- `src/app/` — Next.js App Router routes and layouts
- `src/components/` — UI and page-specific components
- `src/lib/` — utilities, data and integrations (firebase)

This repo uses the App Router pattern (folder routes in `src/app`) and TypeScript.

## Contribution & development notes

- Branching: `feature/*`, `chore/*`, `fix/*` naming
- Pre-commit: run `npm run lint` and basic type checks before creating PRs
- Tests: add unit tests near the code they cover (not present by default)

## Next steps (what I'll add now)

1. Create `src/app/README.md`
2. Create `src/components/README.md`
3. Create `src/lib/README.md`

When those are added you'll have actionable instructions per area (how to add routes, components, and utilities).

---

If you'd like I can: add these three README files now, or customize the content to a specific onboarding flow (e.g., set up Firebase locally, run checkout demo, or add test scaffolding).
