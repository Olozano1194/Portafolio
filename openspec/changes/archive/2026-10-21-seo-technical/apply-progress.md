# SDD Apply Progress: seo-technical

## Change ID: seo-technical
**Phase**: 5 - Final verification (locales-seo-keys + AC audit) - **COMPLETE**
**Started**: 2026-10-21
**Status**: All phases complete

---

## Phase 1 Summary (Previous)
- ✅ index.html static meta/JSON-LD with Vite placeholder `%VITE_SITE_URL%`
- ✅ apple-touch-icon added
- ✅ WebSite + Person JSON-LD in index.html

---

## Phase 2 Summary (Previous)
- ✅ SEO.tsx hardening: canonical URL, WebPage JSON-LD, additional meta tags, snapshot-and-restore cleanup
- ✅ Extracted `getSiteUrl()` to `seo-config.ts` for testability
- ✅ 38 tests passing in `SEO.test.tsx` (now split into 4 focused test files)

---

## Phase 3 Summary (Previous)
- ✅ i18n lang sync: `document.documentElement.lang` synced on init and on `languageChanged`
- ✅ 4 new tests in `i18n-lang-sync.test.ts`
- ✅ All 190 tests passing (including regressions)

---

## Phase 4 Summary (Previous)
### Task 4.1: Create `scripts/generate-sitemap.mjs` with `buildRouteManifest(proyectos)` ✅
- **Files**: `scripts/sitemap-manifest.mjs`, `scripts/generate-sitemap.mjs`
- **Implementation**: Reads `src/data/proyectos.js` (ESM), generates 7 routes:
  - `/` (static)
  - `/videos/2`, `/videos/3` (projects with `tipo === 'Video'`)
  - `/demo/1`, `/demo/4`, `/demo/5`, `/demo/6` (projects with `imgDemo`)
- **Behavior**: Uses `pathToFileURL` for Windows-compatible dynamic imports

### Task 4.2: Export `renderSitemapXml(routes, origin, lastmod)` ✅
- **File**: `scripts/sitemap-render.mjs`
- **Output**: Valid XML with absolute `<loc>`, ISO `<lastmod>`, `changefreq` (weekly/monthly), `priority` (1.0/0.8)
- **XML escaping**: Properly escapes `&`, `<`, `>`, `"`, `'` in URLs

### Task 4.3: Export `renderRobotsTxt(origin)` ✅
- **File**: `scripts/robots-render.mjs`
- **Output**: `User-agent: *`, `Allow: /`, absolute `Sitemap:` line

### Task 4.4: Main guard requires `VITE_SITE_URL`, writes `public/sitemap.xml` + `public/robots.txt` ✅
- **File**: `scripts/generate-sitemap.mjs`
- **Hard-fail**: Clear error message + `process.exit(1)` if `VITE_SITE_URL` unset or invalid
- **URL validation**: Accepts only `http:` or `https:` protocols
- **Windows-compatible**: Entry point detection via `import.meta.url` vs `file:///` comparison

### Task 4.5: Add `"prebuild": "node scripts/generate-sitemap.mjs"` to `package.json`; gitignore generated artifacts ✅
- **package.json**: Added prebuild script (runs before `vite build`)
- **.gitignore**: Added `public/sitemap.xml` and `public/robots.txt`
- **Vite behavior**: Generated files in `public/` are copied to `dist/` during build

### Task 4.6: Create `scripts/__tests__/generate-sitemap.test.mjs` ✅
- **File**: `scripts/__tests__/generate-sitemap.test.mjs` (20 tests)
- **Coverage**:
  - `buildRouteManifest` returns exactly 7 routes with correct structure
  - `renderSitemapXml` produces valid XML with absolute URLs, ISO dates, changefreq/priority
  - `renderRobotsTxt` allows all + absolute sitemap URL
  - Missing `VITE_SITE_URL` throws/fails (3 tests)
  - Origin trailing slash handling
  - Lastmod override behavior

---

## Phase 5 Summary (This Batch - COMPLETE)

### Task 5.1: Decision 5 - JSON-LD static Spanish, no new locale keys ✅
- **Confirmed**: `src/locales/es/translation.json` and `src/locales/en/translation.json` have NO new keys beyond existing `seo.*`
- **Confirmed**: `i18n-parity.test.ts` passes (1 test)
- **No code changes needed** - design decision confirmed

### Task 5.2: Full test/lint/typecheck/build gate ✅
```
npm run test      # 190 tests passing (21 test files)
npm run lint      # ESLint clean (0 errors, 0 warnings)
npx tsc --noEmit  # TypeScript clean (0 errors)
VITE_SITE_URL=https://oscarlozano.dev npm run build  # Build succeeds
```
- **Verified**: `dist/sitemap.xml` exists, valid XML, 7 routes, absolute URLs, ISO lastmod
- **Verified**: `dist/robots.txt` exists, allows all, absolute sitemap URL

### Task 5.3: `dist/index.html` audit ✅
| Requirement | Status | Evidence |
|-------------|--------|----------|
| `lang="es"` | ✅ | `<html lang="es">` |
| Static `title`, `description`, `robots` | ✅ | All present |
| OG/Twitter identity tags | ✅ | `og:site_name`, `og:locale`, `og:type`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` |
| Canonical `href="https://oscarlozano.dev/"` | ✅ | Present |
| Person + WebSite JSON-LD (valid JSON, absolute URLs) | ✅ | `@graph` with both types, all URLs absolute |
| `apple-touch-icon` | ✅ | `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />` |
| **NO** `hreflang` tags | ✅ | Not present |
| **NO** `SearchAction` | ✅ | Not present |

### Task 5.4: Ops documentation ✅
- **Created**: `OPS.md` documenting `VITE_SITE_URL` setup
- **Local**: `.env` file or shell export
- **Vercel**: Project Settings → Environment Variables for Production + Preview
- **Build fails fast** without it (by design)

---

## Files Modified (All Phases)

### New Files
- `scripts/sitemap-manifest.mjs` - Route manifest builder (57 lines)
- `scripts/sitemap-render.mjs` - Sitemap XML renderer (50 lines)
- `scripts/robots-render.mjs` - Robots.txt renderer (15 lines)
- `scripts/generate-sitemap.mjs` - Main entry point (86 lines)
- `scripts/__tests__/generate-sitemap.test.mjs` - 20 comprehensive tests (~200 lines)
- `src/test/__tests__/i18n-lang-sync.test.ts` - 4 tests
- `src/components/ui/__tests__/normalizeCanonicalPath.test.ts` - 3 tests
- `src/components/ui/__tests__/SEO.integration.test.tsx` - 5 tests
- `src/components/ui/__tests__/SEO.metadata.test.tsx` - 14 tests
- `OPS.md` - Operations documentation

### Modified Files
- `index.html` - Static meta tags, JSON-LD, canonical, apple-touch-icon
- `src/components/ui/SEO.tsx` - Hardened with canonical, WebPage JSON-LD, additional tags, cleanup
- `src/components/ui/seo-config.ts` - Extracted `getSiteUrl()` and `normalizeCanonicalPath()`
- `src/i18n.ts` - Lang sync on init and languageChanged
- `package.json` - Added `"prebuild"` script
- `.gitignore` - Added `public/sitemap.xml`, `public/robots.txt`
- `vitest.config.ts` - Added `scripts` project with Node.js environment
- `eslint.config.js` - Added Node.js globals for scripts

### Split/Refactored Files
- `src/components/ui/__tests__/SEO.test.tsx` - Split from 435 lines into 4 focused files (all ≤250 lines):
  - `SEO.test.tsx` - 16 tests (basic tags)
  - `SEO.metadata.test.tsx` - 14 tests (canonical, JSON-LD, additional meta, fallback)
  - `SEO.integration.test.tsx` - 5 tests (cleanup/restore)
  - `normalizeCanonicalPath.test.ts` - 3 tests (utility)

---

## Verification Summary

### Tests
```bash
npx vitest run
# 21 test files, 190 tests passing
```

### TypeScript
```bash
npx tsc --noEmit
# No errors
```

### Lint
```bash
npm run lint
# No errors, no warnings
```

### Build
```bash
VITE_SITE_URL=https://oscarlozano.dev npm run build
# ✅ prebuild generates sitemap.xml + robots.txt
# ✅ vite build succeeds
# ✅ dist/sitemap.xml valid (7 routes)
# ✅ dist/robots.txt valid
# ✅ dist/index.html passes all AC checks
```

### Generated Output (dist/)
- `dist/sitemap.xml` - 7 routes, valid XML, absolute URLs, ISO lastmod
- `dist/robots.txt` - Allow all + absolute Sitemap URL
- `dist/index.html` - All static SEO tags, canonical, JSON-LD, no hreflang/SearchAction

---

## Risks / Notes
- **Windows ESM imports**: Used `pathToFileURL()` for dynamic imports in `sitemap-manifest.mjs`
- **Entry point detection**: `import.meta.url` vs `process.argv[1]` comparison required normalization
- **File size compliance**: All files ≤ 250 lines (split SEO tests into 4 files)
- **Test isolation**: Main script exports `generate()` for testing; auto-execution only when run directly
- **Vite env handling**: `VITE_SITE_URL` read at runtime from `process.env`, must be set in build environment
- **Prebuild script**: Runs before `vite build`; generated files in `public/` automatically copied to `dist/`
- **Test split**: Original 38 SEO tests split into 4 files for lint compliance (max-lines: 250)

---

## Next Recommended Action
**sdd-archive** — Sync delta specs and archive the completed change.