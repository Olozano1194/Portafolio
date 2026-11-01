# Tasks: lazy-routes-error-boundary-typing

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~980–1120 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 → PR 4 → PR 5 (stacked) |
| Chain strategy | pending (`stacked-to-main`) |

```text
Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High
```

### Suggested Work Units

| Unit | Goal | PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|----|----------------------|-----------------|-------------------|
| 1 | Typed data + sitemap path | PR 1 | `npx vitest run src/data/__tests__/proyectos.test.ts scripts/__tests__/generate-sitemap.test.mjs` | `node scripts/generate-sitemap.mjs` → 7 routes | `src/data/*`, `types/proyecto.ts`, `sitemap-manifest.mjs`, `package.json` |
| 2 | Accessible `Skeleton` | PR 2 | `npx vitest run src/components/ui/__tests__/Skeleton.test.tsx` | N/A — presentational primitive | `Skeleton.tsx`, its test, `loading.label` |
| 3 | `ErrorBoundary` + retry | PR 3 | `npx vitest run src/components/ui/__tests__/ErrorBoundary.test.tsx src/test/__tests__/i18n-parity.test.ts` | `preview`: stale chunk → fallback → Reintentar | `ErrorBoundary.tsx`, its test, `errorBoundary.*` |
| 4 | Lazy route wiring | PR 4 | `npx vitest run src/__tests__/App.test.tsx` | `build` + `preview`: chunk split on deep routes | `src/App.tsx`, `App.test.tsx`, capability specs |
| 5 | Contact-form extraction | PR 5 | `npx vitest run src/components/sections/__tests__/ContactoSection` | `dev`: "Contacto" heading before chunk | `ContactoSection.tsx`, `contacto/ContactoForm.tsx`, form tests |

Split over 400 lines: 1a data / 1b sitemap; 5a form / 5b section.

## Phase 1: Typed data + build pipeline (PR 1)

- [x] 1.1 `src/data/proyectos.ts`: `readonly Proyecto[]`, ids via `asProyectoId()`, import from `'../types/branded.ts'` (extension required); content unchanged.
- [x] 1.2 `ProyectoVerProyecto.architecturalStack`: add optional `desktop?` / `packaging?`.
- [x] 1.3 Delete `proyectos.js` + `proyectos.d.ts`; confirm imports resolve.
- [x] 1.4 `sitemap-manifest.mjs` path `.js` → `.ts`; same in `sitemap-robots-generator/spec.md`.
- [x] 1.5 `package.json`: `engines.node: ">=22.18"`.
- [x] 1.6 `src/data/__tests__/proyectos.test.ts`: unique ids, `Ver proyecto` has `imgDemo.img`.

## Phase 2: Skeleton (PR 2)

- [x] 2.1 `Skeleton.tsx`: `role="status"`, `aria-busy`, `sr-only` label, `motion-reduce:animate-none`, `className` sets `min-h-*`.
- [x] 2.2 `loading.label` in both locales.
- [x] 2.3 `Skeleton.test.tsx`: role, `aria-busy`, name, `className`.

## Phase 3: ErrorBoundary (PR 3)

- [x] 3.1 `ErrorBoundary.tsx`: class boundary, `componentDidCatch` → `console.error`, `ErrorFallback` (`role="alert"`, `titleKey`, focused retry), `onRetry ?? reload`.
- [x] 3.2 `errorBoundary.{homeTitle,demoTitle,videoTitle,contactTitle,description,retry}` in both locales.
- [x] 3.3 `ErrorBoundary.test.tsx`: children, throw → alert, `onRetry`, `console.error`, focus.

## Phase 4: Lazy route wiring (PR 4)

- [x] 4.1 `App.tsx`: `lazy()` routes, `key={pathname}`, `ErrorBoundary` + `Suspense`.
- [x] 4.2 `App.test.tsx`: `findBy*` on deep routes.
- [x] 4.3 Create `specs/lazy-routing/spec.md` + `specs/error-boundary/spec.md` (missing input).

## Phase 5: Contact extraction (PR 5)

- [x] 5.1 `contacto/ContactoForm.tsx` (~150 lines): move form JSX + submit logic verbatim.
- [x] 5.2 `ContactoSection.tsx` (~45 lines): keep `id="contacto"`, heading; lazy form in `ErrorBoundary` + `Suspense`, `scrollToSection` unaffected.
- [x] 5.3 Update `ContactoSection.{submit,validation}.test.tsx` to `findBy*` / `findByLabelText`.

## Phase 6: Verification

- [x] 6.1 `npm run verify`; `npm run build` + `preview` walk; entry vs 152.9 KB gzip.

Skill Resolution: paths-injected — sdd-tasks, work-unit-commits, chained-pr + AGENTS.md R3/R4/R5/R6.
