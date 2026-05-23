# Brisbane West Toy Library — CLAUDE.md

## Project

Website for **Brisbane West Toy Library** (briswesttoylibrary.org.au), a community toy library in Kenmore, Brisbane. Built by a solo developer from a phone using Claude Code on the web.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js **15.4.11** (App Router) — pinned, 15.5.x incompatible with Payload 3.84.1 |
| CMS | Payload CMS v3 (3.84.1) — runs inside Next.js, admin at `/admin` |
| Styling | Tailwind CSS v4 — CSS-first `@theme` config in `src/styles/globals.css` |
| Database (dev) | SQLite file (`file:./payload.db`) via `@payloadcms/db-sqlite` |
| Database (prod) | Turso (LibSQL cloud) — same adapter, `libsql://` URL in `DATABASE_URL` |
| Package manager | pnpm 10 |
| Deployment | Vercel (main branch → auto-deploy) |

## Common Commands

```bash
pnpm dev                                              # local dev server
pnpm build                                            # payload migrate && next build
pnpm payload migrate:create <name>                    # generate migration after schema change
pnpm payload migrate                                  # apply pending migrations to DB
```

## Repository

- GitHub: `vivian-farrell/briswesttoylibrary-org-au`, branch `main`
- Every push to `main` triggers a Vercel deployment
- GitHub Pages serves `mockup.html` (Phase 0 visual prototype)

## Secrets

Stored in **1Password**. Manually entered into Vercel environment variables:
- `PAYLOAD_SECRET` — same across environments
- `DATABASE_URL` — different per environment (`file:./payload.db` local, `libsql://...` prod)
- `DATABASE_AUTH_TOKEN` — Turso auth token (if not embedded in DATABASE_URL)

## Current Status

| Phase | Status |
|---|---|
| Phase 0 — HTML/CSS mockup (`mockup.html`) | ✅ Done |
| Phase 1 — Next.js + Payload bootstrap | ✅ Done |
| Phase 2 — Content schemas (collections + globals) | ✅ Done |
| Phase 3 — Home page sections | ✅ Done |
| **Phase 4 — Separate pages** | ⬅ **Next** |
| Phase 5 — Polish + production | Pending |
| Phase 6 — SETLS integration | Future |

## Coming Soon Mode

Controlled via **Site Settings → Coming Soon mode** checkbox in the Payload admin.

When enabled, all public frontend routes (`/`, `/join`, `/news`, etc.) render a holding page instead of normal content. `/admin` is unaffected.

**Bypass for stakeholder previews:**

| Action | URL |
|---|---|
| Enable bypass | `https://briswesttoylibrary.org.au/?testmode=true` |
| Disable bypass | `https://briswesttoylibrary.org.au/?testmode=false` |

Visiting with `?testmode=true` sets a `testmode` session cookie (via `src/middleware.ts`). The cookie persists for the browser session — no need to append it to every link. Share the `?testmode=true` URL with anyone who needs to see the real site while it's behind the Coming Soon page.

**Relevant files:**
- `src/globals/SiteSettings.ts` — `comingSoon` checkbox field
- `src/middleware.ts` — sets/clears the `testmode` cookie from the query param
- `src/app/(frontend)/layout.tsx` — checks `comingSoon` flag and `testmode` cookie
- `src/components/ComingSoon.tsx` — the holding page UI

## Content Architecture

### Collections (`src/collections/`)
`Users`, `Media`, `Posts`, `FAQs`, `Toys`

### Globals (`src/globals/`)
`SiteSettings`, `Navigation`, `Footer`, `Homepage`, `MembershipPage`, `ContactPage`

### Key global: Homepage
Controls the full long-scroll home page. Fields include: `heroType` (carousel/video toggle), `heroSlides[]`, `heroVideo`, headline/tagline/CTA, and section groups for Location, About, How It Works, Membership, Contact.

## Design System

**Navigation:** No traditional header bar. Floating translucent hamburger button (top-left, frosted glass) expands to full-screen dark-green overlay. Scroll-target links smooth-scroll to home page sections; page links navigate normally. Home page has a floating right-side dot nav.

**Colour palette** (defined in `src/styles/globals.css`):
```
--color-forest: #1d5c3a   (primary green)
--color-green:  #2e8b5a
--color-mint:   #a8d5b5
--color-cream:  #f7faf8   (background)
--color-orange: #e8632a   (CTA accent)
--color-yellow: #f5c842
--color-dark:   #142b1e
--color-muted:  #5a7060
```

## Phase 4 — What to Build Next

Separate pages for returning visitors. Each page fetches its data from Payload and has `generateMetadata`.

| Route | File | Notes |
|---|---|---|
| `/toys` | `src/app/(frontend)/toys/page.tsx` | SETLS catalogue embed (iframe) or link card using `SiteSettings.setlsCatalogueUrl` |
| `/volunteer` | `src/app/(frontend)/volunteer/page.tsx` | Prose layout |
| `/news` | `src/app/(frontend)/news/page.tsx` | Post grid index |
| `/news/[slug]` | `src/app/(frontend)/news/[slug]/page.tsx` | Post detail with `generateStaticParams` |
| `/join` | `src/app/(frontend)/join/page.tsx` | Membership detail — tiers, eligibility, how to join |
| `/how-it-works` | `src/app/(frontend)/how-it-works/page.tsx` | Expanded step-by-step guide |
| `/faq` | `src/app/(frontend)/faq/page.tsx` | Accordion grouped by category |
| `/about` | `src/app/(frontend)/about/page.tsx` | Prose about page |
| `/contact` | `src/app/(frontend)/contact/page.tsx` | Static contact form (wired in Phase 5) |

Also add `src/app/(frontend)/sitemap.ts` for SEO.

## Known Gotchas

- `next@15.5.x` incompatible with `payload@3.84.1` — stay on `15.4.11`
- Import `withPayload` from `@payloadcms/next/withPayload` (no default export on root package)
- `serverExternalPackages` must include `['@payloadcms/db-sqlite', 'libsql', '@libsql/client']`
- **Do NOT** add `drizzle-kit` or `@payloadcms/drizzle` to `serverExternalPackages` → causes `WebpackError is not a constructor` during build
- **Do NOT** add `src/instrumentation.ts` with dynamic payload imports → same webpack error
- `"type": "module"` is required in `package.json` — without it tsx serves TypeScript as CJS, causing ESM loading cycles in Node 22
- Vercel Framework Preset must be **Next.js** (not "Other")
- `payload migrate` runs as part of `pnpm build` — after any schema change, run `migrate:create`, commit the output, then push
