# SDD Change Proposal: seo-technical

**Project:** Portafolio
**Change ID:** seo-technical
**Status:** Proposed
**Created:** 2026-10-21
**Topic Key:** sdd/seo-technical/proposal

---

## Intent

Complete the technical SEO foundation for the portfolio SPA so that search engines and social scrapers can correctly discover, crawl, and present every public route. The portfolio is a pure client-rendered SPA (no SSR, no prerender) — every URL serves the same `index.html` via Vercel's SPA rewrite, and all SEO metadata is currently injected *after* JavaScript executes. This change moves the highest-impact metadata into the static HTML that crawlers read immediately, adds missing structured data, canonical URLs, a build-time sitemap, and synchronizes the document language with the i18n configuration.

---

## Scope

### In Scope

| Area | Changes |
|------|---------|
| **`index.html`** | Fix `lang="es"` (matches i18n default/fallback); add static `title`, `description`, `robots`, `og:site_name`, `og:locale`, OG/Twitter identity tags, `apple-touch-icon`, canonical for `/`, and **static `Person` + `WebSite` JSON-LD** (name, jobTitle, url, image, sameAs GitHub/LinkedIn, inLanguage). |
| **`src/components/ui/SEO.tsx`** | Add per-route `<link rel="canonical">`, `og:site_name`, `og:locale`, `og:image:alt`, `twitter:creator`/`site`, `og:image:width`/`height`, `robots` meta; inject per-page **`WebPage` JSON-LD** (`isPartOf` → WebSite); make `SITE_URL` SSR-safe (lazy getter or config constant); **cleanup stale meta tags on unmount**. |
| **`src/i18n.ts`** | Sync `document.documentElement.lang` on init and `languageChanged` event; ensures a11y + SEO alignment from first paint. |
| **Build-time generation** | Vite `writeBundle` hook or `prebuild` script that emits `dist/sitemap.xml` + `dist/robots.txt` from a **single route manifest** (static routes `/`, `/videos/2`, `/videos/3`, `/demo/1`, `/demo/4`, `/demo/5`, `/demo/6` derived from `src/data/proyectos.js`). One shared origin constant. |
| **`public/robots.txt`** | Generated alongside sitemap (or static fallback); references the generated sitemap with absolute origin. |
| **`src/locales/*/translation.json`** | Add JSON-LD schema strings if JSON-LD text is localized (currently only `seo.*` keys: `siteName`, `home`, `error404`). |
| **Tests** | Update `SEO.test.tsx` for new tags/behavior; keep `i18n-parity.test.ts` green. |

### Non-Goals

| Item | Reason |
|------|--------|
| **hreflang alternates** | Requires distinct URLs per language (locale prefixes `/es/...`, `/en/...`). Current app has no locale prefix; faking alternates is worse than omitting. Defer to a separate locale-prefix refactor proposal. |
| **Prerender / SSR** | Full per-URL static HTML generation is a separate architectural change. This proposal covers static-first improvements only. |
| **Blog / content section** | Not in the current product scope. |
| **SearchAction / sitelinks searchbox** | No site search exists. |
| **`openspec/config.yaml` cleanup** | Stale (says `language: JavaScript (JSX)`, `testing.runner: none`); unrelated to SEO. |

---

## Approach

### 1. Static-First `index.html` (Highest Crawlability Impact)
- Correct `lang="es"` to match i18n `fallbackLng: 'es'` and `lng: 'es'`.
- Static `title`/`description` in Spanish (default language).
- Static `robots` meta, `og:site_name`, `og:locale`, OG/Twitter identity tags (`og:image`, `twitter:card`, etc.).
- Static canonical `<link rel="canonical" href="https://<origin>/">` for home.
- Static `apple-touch-icon` (currently only 16×16 favicon exists).
- Static `Person` + `WebSite` JSON-LD in `<script type="application/ld+json">` — crawlable without JS.

### 2. `SEO.tsx` Hardening (Per-Route, Post-Hydration)
- Canonical `<link>` per route using normalized absolute URL (scheme/host/trailing-slash, no query/hash).
- Per-page `WebPage` JSON-LD injected via `useEffect` (`isPartOf` → WebSite).
- Add missing OG/Twitter fields: `og:site_name`, `og:locale`, `og:image:alt`, `twitter:creator`/`site`, `og:image:width`/`height`, `robots`.
- **Meta cleanup**: on unmount, remove tags that `SEO.tsx` itself added so route changes don't leave stale values.
- Make `SITE_URL` SSR-safe: replace `window.location.origin` at module scope with a lazy getter or a Vite-injected constant (`import.meta.env.VITE_SITE_URL` or config file).

### 3. Language Sync
- `index.html` starts with `lang="es"`.
- `i18n.ts` sets `document.documentElement.lang = i18n.language` on init and on `languageChanged` event.

### 4. Build-Time Sitemap + Robots
- Single route manifest: static routes + project-derived routes (`/videos/:id`, `/demo/:id` from `src/data/proyectos.js`).
- Generator runs in Vite `writeBundle` hook or `npm run prebuild` script; writes `dist/sitemap.xml` and `dist/robots.txt`.
- Origin constant: **decision needed** — hardcode production origin vs `VITE_SITE_URL` env var (see Key Decisions).
- `public/robots.txt` generated (or static fallback) with `Sitemap: <origin>/sitemap.xml`.

### 5. Deferred hreflang
- Document as known limitation: "hreflang requires locale-prefixed URLs; not emitted today."
- If multilingual SEO becomes a priority, propose locale-prefix refactor as a separate change.

---

## Key Decisions Needed

| Decision | Options | Recommendation |
|----------|---------|----------------|
| **Production origin for sitemap/robots/JSON-LD** | 1. Hardcode `https://oscarlozano.dev` (or actual domain) in generator.<br>2. Use `VITE_SITE_URL` env var (set in Vercel project settings). | **Option 2 (env var)** — avoids drift between local/preview/production, single source of truth, works with Vercel preview deployments. |
| **Generation approach** | 1. Vite `writeBundle` hook in `vite.config.ts`.<br>2. Standalone `scripts/generate-sitemap.mjs` called via `prebuild` script. | **Option 2 (standalone script)** — clearer separation, easier to test/run independently, no Vite plugin API coupling. |
| **JSON-LD scope** | 1. Static `Person` + `WebSite` only.<br>2. Static `Person` + `WebSite` + per-page `WebPage` via `SEO.tsx`. | **Option 2** — static identity always crawlable; per-page `WebPage` enhances post-hydration. No `SearchAction`. |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **SPA crawlability limitation** — social scrapers (FB, Twitter, LinkedIn, WhatsApp) don't execute JS; only static `index.html` tags are seen. | High | High | Static `index.html` identity tags (OG, Twitter, JSON-LD) cover the biggest gap. Prerender is the only complete fix — track as follow-up. |
| **`SITE_URL = window.location.origin` at module scope** breaks if SSR/prerender is ever added. | Medium | Medium | Replace with lazy getter or `import.meta.env.VITE_SITE_URL` constant in this change. |
| **Fake hreflang worse than omitting** — no distinct URLs for alternates. | N/A (deferred) | High | Explicitly do not emit hreflang. Document limitation. Propose locale-prefix refactor separately if needed. |
| **`index.html` lang vs i18n default mismatch** (`en` attribute, `es` default) currently mislabels document. | High (current bug) | Medium | Fix `index.html` to `lang="es"` + sync from `i18n.ts` on init. |
| **Meta cleanup** — `SEO.tsx` never removes tags; route changes leave stale values. | Medium | Low | Add cleanup in `useEffect` return; remove only tags `SEO.tsx` created. |
| **Hardcoded origin drift** between environments (local, preview, prod). | Medium | Medium | Use single `VITE_SITE_URL` env var; generator reads it at build time. |
| **`dist/` is gitignored** — generated artifacts not committed. | N/A (expected) | Low | Generator runs during Vercel build (`npm run build` → `prebuild` → `writeBundle`). |
| **Strict TS + ESLint** — new build script must satisfy `noUnusedLocals`, `exactOptionalPropertyTypes`. | Low | Low | Write script in TypeScript/ESM matching project config; run `npm run lint` in CI. |
| **Existing tests** — `SEO.test.tsx` asserts current tag set; `i18n-parity.test.ts` must stay green. | Medium | Low | Update test snapshots/assertions for new tags; add JSON-LD test cases. |
| **Vite 8 / Node baseline** — build script must target same ESM/Node version. | Low | Low | Use `node --version` from CI; script uses same `package.json` `"type": "module"`. |

---

## Acceptance Criteria

1. **Static `index.html`** served for all routes contains:
   - `lang="es"`
   - Static `title`, `description`, `robots`, `og:site_name`, `og:locale`, OG/Twitter identity tags, `apple-touch-icon`
   - Canonical for `/`
   - `Person` + `WebSite` JSON-LD
2. **Per-route** (after hydration): canonical, `WebPage` JSON-LD, all OG/Twitter fields, no stale meta on navigation.
3. **Language sync**: `document.documentElement.lang` matches `i18n.language` from first paint and on every change.
4. **`dist/sitemap.xml`** lists all 7 crawlable URLs with absolute origin, `lastmod` = build date, `changefreq`/`priority` sensible defaults.
5. **`dist/robots.txt`** allows all, references sitemap with absolute origin.
6. **No hreflang tags** emitted (documented as known limitation).
7. **Tests pass**: `npm run test`, `npm run lint`, `npm run build` (generates sitemap/robots).
8. **Vercel build** produces `dist/sitemap.xml` and `dist/robots.txt` at the origin root.

---

## Dependencies

- No new runtime dependencies.
- Build-time: Node built-ins (`fs`, `path`, `url`) + project's existing `src/data/proyectos.js`.
- Optional: if generator uses a small XML helper, `xml2js` or similar (devDependency only).

---

## Rollout Plan

1. **Phase 1** (independent, low risk): `index.html` static meta + JSON-LD + `lang` fix.
2. **Phase 2**: `SEO.tsx` canonical, OG/Twitter completeness, JSON-LD injection, meta cleanup, SSR-safe `SITE_URL`.
3. **Phase 3**: `i18n.ts` language sync.
4. **Phase 4**: Build-time sitemap/robots generator (requires origin decision).
5. **Phase 5**: Test updates, lint, build verification.
6. **Follow-up (separate PR)**: Prerender for fully crawlable per-URL HTML (if social previews are a priority).

---

## Review Notes

- Proposal is ~350 lines (within 400-line budget).
- Key decisions are explicit and require user input before spec phase.
- Risks are acknowledged with concrete mitigations.
- Non-goals are clearly bounded to prevent scope creep.
- Sequencing allows early value (static `index.html` fixes) before build-time generator.