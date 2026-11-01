# Proposal: lazy-routes-error-boundary-typing

## Intent

Cut the initial JavaScript bundle of the Portafolio SPA and remove the blank-screen failure mode on deep demo routes. `VideosSection` and `DemoSection` are statically imported in `src/App.tsx`, so the video player, gallery, and lightbox ship in the entry chunk even though they are only reachable via `/videos/:id` and `/demo/:id`. The `proyectos` data module is also untyped end to end.

## Scope

### In Scope

- `src/App.tsx`: `React.lazy(() => import(...))` for `VideosSection` and `DemoSection`; wrap route elements in `<Suspense fallback={...}>`.
- `src/components/ui/ErrorBoundary.tsx`: new class error boundary; fallback with demo-specific message + retry button + `console.error`; no external reporting.
- `src/data/proyectos.js` → `src/data/proyectos.ts`: annotate `readonly Proyecto[]`; add optional `desktop`/`packaging` to `ProyectoVerProyecto.architecturalStack`; delete `src/data/proyectos.d.ts`.
- HomePage: evaluate heavy sections (e.g. `ImageGalleryDemo`) via bundle analysis and lazy-load those over ~30 KB or below the fold; final decision deferred to design.

### Out of Scope

- Videos outside the build (Slice 2).
- Font subsetting (Slice 2).
- axe-core / a11y (Slice 3).
- Sentry / external reporting.

## Capabilities

### New Capabilities

- `lazy-routing`: deep demo/video routes are code-split via `React.lazy` + `Suspense` and excluded from the initial bundle.
- `error-boundary`: demo route failures render a retryable fallback and log via `console.error`.

### Modified Capabilities

- `tier2-behavioral-tests`: App routing smoke tests must keep passing under async lazy resolution and the error fallback.
- `sitemap-robots-generator`: route manifest source moves from `src/data/proyectos.js` to the typed `src/data/proyectos.ts`.

## Approach

1. Add `ErrorBoundary` UI primitive (class component, retry resets state).
2. Wire `React.lazy` + `Suspense` + `ErrorBoundary` in `App.tsx`.
3. Convert data file to typed TS, adjust `architecturalStack`, remove `.d.ts`.
4. Run typecheck/lint/tests/size/build.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/App.tsx` | Modified | lazy + Suspense + ErrorBoundary wiring |
| `src/components/ui/ErrorBoundary.tsx` | New | Error boundary primitive |
| `src/data/proyectos.js` → `src/data/proyectos.ts` | Modified/Removed | Typed `readonly Proyecto[]` |
| `src/types/proyecto.ts` | Modified | optional `desktop`/`packaging` |
| `src/data/proyectos.d.ts` | Removed | superseded by inline TS types |
| `scripts/sitemap-manifest.mjs` | Modified | route manifest source path `.js` → `.ts` |
| `src/__tests__/App.test.tsx` | Modified | lazy/Suspense + boundary tests |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| TS errors surface on branded `ProyectoId` literals / missing optional fields after typing | Medium | cast via `asProyectoId` or adjust types; run typecheck |
| ErrorBoundary copy must pass i18n parity | Medium | add keys to both locales before apply |
| Sitemap script Node ESM import of `.ts` | Medium | update script path/import strategy |
| Lazy chunk tests need async handling | Low | Testing Library async utils |

## Rollback Plan

Revert `App.tsx` wiring, delete new `ErrorBoundary`, restore `proyectos.js` + `proyectos.d.ts` from git. No data content changes.

## Dependencies

- None new. No new dependency for the boundary (R5).

## Success Criteria

- [ ] Initial bundle < 300 KB gzip.
- [ ] Lighthouse Performance ≥ 90 (mobile).
- [ ] Zero white screen on demo crash; retry recovers.
- [ ] `proyectos` typed `readonly Proyecto[]` in `proyectos.ts`; `.d.ts` removed; typecheck green.

Skill Resolution: paths-injected — cognitive-doc-design (user-level SKILL.md) + sdd-propose phase skill
