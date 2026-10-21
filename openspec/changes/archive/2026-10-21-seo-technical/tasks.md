# Tasks: Technical SEO Foundation (seo-technical)

## Review Workload Forecast

Estimated changed lines: 500–650

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

Delivery strategy: ask-on-risk.

### Suggested Work Units

| Unit | Goal | PR | Focused test | Runtime harness | Rollback |
|------|------|----|--------------|-----------------|----------|
| 1 | index.html static meta/JSON-LD | PR 1 | `npm run build` | `npm run preview` + fetch `/` | `index.html` + icon |
| 2 | SEO.tsx hardening | PR 2 | `npx vitest run SEO.test` | `npm run dev` + route nav | `SEO.tsx` + test |
| 3 | i18n lang sync | PR 3 | `npx vitest run i18n-lang-sync` | `npm run dev` + lang switch | `src/i18n.ts` + test |
| 4 | Generator + prebuild | PR 4 | `npx vitest run generate-sitemap` | `VITE_SITE_URL=… npm run build` | `scripts/`, `package.json`, `.gitignore` |

## Phase 1: Static `index.html` (index-html-static)

- [x] 1.1 `index.html`: change `<html lang="en">` → `lang="es"` (R1)
- [x] 1.2 `index.html`: add static `meta robots` `index, follow` (R2)
- [x] 1.3 `index.html`: add og:site_name/locale/type/title/description/image/url + twitter:card/title/description/image; absolute URLs via `%VITE_SITE_URL%` (R3)
- [x] 1.4 `index.html`: add canonical `href="%VITE_SITE_URL%/"` (R4)
- [x] 1.5 `index.html`: add static Person + WebSite JSON-LD, absolute URLs (R5)
- [x] 1.6 Create `public/apple-touch-icon.png` (180×180), link it in `index.html` (R6)

## Phase 2: SEO component hardening (seo-component-hardening)

- [ ] 2.1 `src/components/ui/SEO.tsx`: replace `window.location.origin` with `import.meta.env.VITE_SITE_URL` (R5)
- [ ] 2.2 Render `<link rel="canonical">` from `location.pathname`: strip query/hash, trailing slash except root (R1)
- [ ] 2.3 Inject per-route `WebPage` JSON-LD tagged `data-seo-webpage`, `url` + `isPartOf` → WebSite (R2)
- [ ] 2.4 Add `og:site_name`, `og:locale`, `og:image:alt/width/height`, `robots`, `twitter:creator`, `twitter:site` (R3)
- [ ] 2.5 Effect cleanup: remove created tags, restore pre-existing snapshot, delete only `[data-seo-webpage]` (R4)
- [ ] 2.6 Extend `src/components/ui/__tests__/SEO.test.tsx`: tags, canonical normalization, single WebPage, cleanup/restore; `vi.stubEnv('VITE_SITE_URL', …)`

## Phase 3: i18n lang sync (i18n-lang-sync)

- [ ] 3.1 `src/i18n.ts`: set `document.documentElement.lang = i18n.language` after init (R1)
- [ ] 3.2 `src/i18n.ts`: subscribe `languageChanged` to sync lang without reload (R2)
- [ ] 3.3 Create `src/test/__tests__/i18n-lang-sync.test.ts`: init, runtime switch, rapid-switch final value; parity green (R1–R3)

## Phase 4: Sitemap/robots generator (sitemap-robots-generator)

- [ ] 4.1 Create `scripts/generate-sitemap.mjs` with `buildRouteManifest(proyectos)`: `/` + Video→`/videos/:id` + imgDemo→`/demo/:id` (R1)
- [ ] 4.2 Export `renderSitemapXml(routes, origin, lastmod)`: absolute `<loc>`, ISO `<lastmod>`, changefreq/priority (R4)
- [ ] 4.3 Export `renderRobotsTxt(origin)`: allow-all + absolute `Sitemap:` line (R5)
- [ ] 4.4 Main guard: require `process.env.VITE_SITE_URL` (hard-fail), write `public/sitemap.xml` + `public/robots.txt` (R2, R3)
- [ ] 4.5 Add `"prebuild": "node scripts/generate-sitemap.mjs"` to `package.json`; gitignore generated artifacts (R2)
- [ ] 4.6 Create `scripts/__tests__/generate-sitemap.test.mjs`: 7 routes, valid XML, robots, missing-env failure

## Phase 5: Locales + verification (locales-seo-keys)

- [x] 5.1 Decision 5: JSON-LD static Spanish, no new locale keys; `seo.*` untouched, parity green (R1-R3)
- [x] 5.2 Run `npm run test`/`lint`/`typecheck`/`build`; confirm `dist/sitemap.xml` + `dist/robots.txt` (AC 7)
- [x] 5.3 Verify `dist/index.html`: `lang="es"`, static tags, canonical, JSON-LD valid; no hreflang/SearchAction (AC 1, 6)
- [x] 5.4 Ops: set `VITE_SITE_URL` for local `prebuild` (shell/`.env`) and Vercel prod+preview
