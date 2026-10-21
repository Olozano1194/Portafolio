# Design: Technical SEO Foundation (seo-technical)

## Technical Approach

Four static-first layers over the existing client-rendered SPA (Vite 8, React 19, React Router 7, no SSR). Each layer covers a gap the previous cannot:

1. `index.html` — serve-time metadata scrapers/crawlers read **without JS** (identity, JSON-LD, canonical `/`).
2. `SEO.tsx` — post-hydration per-route metadata (canonical, WebPage JSON-LD, full OG/Twitter, cleanup).
3. `i18n.ts` — keeps `<html lang>` synced with the runtime language.
4. `scripts/generate-sitemap.mjs` — build-time `sitemap.xml` + `robots.txt` from one route manifest.

Maps 1:1 to the 5 delta specs. `locales-seo-keys` resolves to "no new keys" (Decision 5).

## Architecture Decisions

| # | Topic | Options | Choice + Rationale |
|---|-------|---------|--------------------|
| 1 | Origin source | Hardcode domain / `VITE_SITE_URL` | **`import.meta.env.VITE_SITE_URL`** (component) + `process.env.VITE_SITE_URL` (generator). No local/preview/prod drift; generator hard-fails if unset. |
| 2 | Generator wiring | Vite `writeBundle` / standalone `prebuild` | **`prebuild` script** — testable standalone, no Vite plugin coupling. |
| 3 | Generator output target | Direct `dist/` / staged via `public/` | **Emit to `public/`**; Vite copies to `dist/`. Critical: `prebuild` runs BEFORE `vite build`, which empties `dist/` — direct `dist/` writes would be wiped. |
| 4 | JSON-LD scope | Static only / static + per-page | **Static `Person`+`WebSite`** in `index.html` (crawlable at serve time) + per-route **`WebPage`** (`isPartOf` → WebSite) via `SEO.tsx`. No `SearchAction` (no site search). |
| 5 | JSON-LD localization | Localize / static Spanish | **Static Spanish** — allowed by spec `locales-seo-keys` R3; zero new locale keys; `i18n-parity.test.ts` untouched and green. Existing `seo.*` keys stay consumed by SEO. |
| 6 | Meta cleanup | Remove all managed / snapshot-restore | **Snapshot-and-restore**: tags SEO *created* are removed on unmount; tags authored in `index.html` (`og:site_name`, `og:locale`, …) get original `content` restored — cleanup never deletes static identity tags. |

Route manifest (single source: `src/data/proyectos.js`): static `/`; `tipo === 'Video'` → `/videos/:id`; has `imgDemo` → `/demo/:id`. With current data → exactly `/`, `/videos/2`, `/videos/3`, `/demo/1`, `/demo/4`, `/demo/5`, `/demo/6`. New projects extend the sitemap with no generator code change.

## Data Flow

```
proyectos.js ──→ generate-sitemap.mjs ──→ public/sitemap.xml ────┐
       │                    ▲                                    │ vite build
       │        VITE_SITE_URL (process.env)                      ▼
       │                              dist/sitemap.xml + dist/robots.txt
App routes ──→ <SEO> per route ──→ head: canonical, WebPage JSON-LD, OG/Twitter
i18n.ts   ──→ document.documentElement.lang (init + languageChanged)
index.html ──→ serve-time: lang="es", static meta, canonical /, Person+WebSite JSON-LD
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modify | `lang="es"`; static `robots`, `og:site_name`, `og:locale`, OG/Twitter identity, canonical `/`, `apple-touch-icon`, `Person`+`WebSite` JSON-LD |
| `src/components/ui/SEO.tsx` | Modify | Canonical, WebPage JSON-LD, OG/Twitter completeness, cleanup, SSR-safe `SITE_URL` |
| `src/i18n.ts` | Modify | Sync `documentElement.lang` on init + `languageChanged` |
| `scripts/generate-sitemap.mjs` | Create | Pure manifest/XML/robots builders + main guard writing `public/` |
| `package.json` | Modify | Add `"prebuild": "node scripts/generate-sitemap.mjs"` |
| `.gitignore` | Modify | Ignore generated `public/sitemap.xml`, `public/robots.txt` |
| `public/apple-touch-icon.png` | Create | 180×180 PNG derived from existing favicon/logo |
| `src/components/ui/__tests__/SEO.test.tsx` | Modify | New tags, canonical normalization, WebPage JSON-LD, cleanup/restore |
| `scripts/__tests__/generate-sitemap.test.mjs` | Create | Unit tests for generator pure functions |
| `src/test/__tests__/i18n-lang-sync.test.ts` | Create | Lang attribute sync verification |

## Interfaces / Contracts

**SEO managed-tag protocol**: the effect records a per-tag undo — created tag → remove; pre-existing tag → restore prior `content`. WebPage script is tagged `type="application/ld+json" data-seo-webpage`; cleanup removes only `[data-seo-webpage]`, never the static Person/WebSite block.

**Canonical normalization**: strip query/hash (use `location.pathname`), remove trailing slash except root, join to origin — `/demo/1?x#y` → `<origin>/demo/1`; home equals the static canonical (no duplicates).

**SITE_URL**: `const SITE_URL = import.meta.env.VITE_SITE_URL` at module scope — build-time constant, no `window` access (SSR-safe per spec R5).

**Generator exports** (pure, side-effect-free until main guard):

```js
export function buildRouteManifest(proyectos)          // → path strings
export function renderSitemapXml(routes, origin, lastmod) // → XML
export function renderRobotsTxt(origin)                 // → txt
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|--------------|----------|
| Unit | Manifest = exactly 7 routes; valid XML, absolute `<loc>`, ISO `<lastmod>`; robots allows + absolute sitemap; missing `VITE_SITE_URL` fails loudly | Vitest on exported functions (`scripts/__tests__/generate-sitemap.test.mjs`) |
| Unit | New meta tags; canonical normalization; single WebPage instance across navigations; cleanup removes created / restores static tags | Extend `SEO.test.tsx`; `vi.stubEnv('VITE_SITE_URL', …)` |
| Unit | `documentElement.lang` matches active lang after init and `changeLanguage` | New `i18n-lang-sync.test.ts` |
| Integration | `npm run build` emits `dist/sitemap.xml` + `dist/robots.txt` at origin root | Verify phase (AC 7/8) |
| Regression | Full suite, `i18n-parity.test.ts`, `npm run lint` stay green | CI run |

## Threat Matrix

N/A — no routing changes, no subprocess/VCS/PR automation, no executable-path handling. The generator is a `prebuild`-invoked Node script writing fixed filenames from static data; its only env input (`VITE_SITE_URL`) is validated and required.

## Migration / Rollout

Phased, each independently shippable:

1. `index.html` static meta + JSON-LD + `lang` fix (+ `apple-touch-icon` asset)
2. `SEO.tsx` hardening (canonical, WebPage, OG/Twitter, cleanup, `VITE_SITE_URL`)
3. `i18n.ts` lang sync
4. Generator + `prebuild` wiring + `.gitignore`
5. Test updates, lint, build verification

Operational prerequisite (not a design blocker): set `VITE_SITE_URL` in Vercel project env (prod + preview) before Phase 4 deploys — generator hard-fails otherwise. `dist/` artifacts are never committed (build-produced). Known limitation documented: no hreflang (requires locale-prefixed URLs — separate proposal).

## Open Questions

None blocking. All 3 proposal decisions resolved as recommended (env var origin, standalone `prebuild`, Person+WebSite+WebPage). Residual ops item: exact production value of `VITE_SITE_URL` confirmed at apply time.
