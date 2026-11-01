# Design: lazy-routes-error-boundary-typing

## Technical Approach

Route-level code splitting (`React.lazy` + `Suspense`), one `ErrorBoundary` per route element, one extra split for the contact form, and a typed `proyectos.ts` that the sitemap script can still load with plain `node`.

Baseline from `dist/assets` before the change: one JS chunk, 484.6 KB raw / **152.9 KB gzip**; CSS 9.7 KB gzip.

Lazy scope, from bundle analysis:

| Candidate | Weight | Verdict |
|---|---|---|
| Demo/video subtree (`DemoSection`, `ImageGalleryDemo`, `ImageGalleryLightbox`, `InteractiveDemo`, `VideoDemo`, `VideosSection`) | ≈47 KB source, deep routes only | **Lazy** |
| `react-hook-form` | 144.3 KB raw / **27.5 KB gzip**, imported only by `ContactoSection` | **Lazy** (via extraction) |
| Hero, SobreMi, Formacion, Proyectos, Skills, Hobbies | <30 KB combined, no heavy dep | **Static** |
| `ImageGalleryDemo` on HomePage | Not imported there — covered by the demo split | N/A |

## Architecture Decisions

### D1 — Lazy scope: routes + contact form, nothing else

**Choice**: `VideosSection`, `DemoSection`, and the contact form; every other HomePage section stays static.
**Alternatives**: routes only; lazy every HomePage section.
**Rationale**: only these two exceed the 30 KB rule. The form is split by **extraction**, not by lazying `ContactoSection`: `id="contacto"` and the heading stay in the static section, so `scrollToSection('contacto')` works while the chunk loads. `ContactoSection.tsx` drops 205 → ~45 lines (R4 headroom).

### D2 — Boundary is a class component; retry reloads

**Choice**: `class ErrorBoundary extends Component` (`getDerivedStateFromError` + `componentDidCatch` → `console.error`); fallback is a small function component owning i18n + a11y; retry = `window.location.reload()` behind an injectable `onRetry`.
**Alternatives**: state-reset retry (proposal's wording); `react-error-boundary` dependency.
**Rationale**: React 19 has no hook boundary. A state reset **cannot** retry a failed chunk: `React.lazy` memoizes the rejection (`_status = 2`, `_result = error` — verified in `react.development.js`), so it re-throws instantly. Reload also fixes the usual real cause (stale chunk hash after deploy). `onRetry` exists because jsdom's `window.location.reload` is non-configurable and cannot be spied. No new dependency (R5).

### D3 — One boundary per route element, remounted by key

**Choice**: a boundary around each route element (`/`, `videos/:id`, `demo/:id`) plus one around the form, all `key={pathname}`.
**Alternatives**: single boundary around `<Routes>`; `resetKeys` + `componentDidUpdate`.
**Rationale**: a boundary above `<Routes>` would replace Header/Footer with the fallback. Key-remount is one prop instead of lifecycle code; without it a failure on `/demo/1` stays stuck when navigating to `/demo/2`.

### D4 — One `Skeleton` primitive for every Suspense fallback

**Choice**: `role="status"`, `aria-busy="true"`, `sr-only` "Cargando…", `motion-reduce:animate-none`, height from a `className` prop.
**Alternatives**: `null` fallback; bespoke skeletons.
**Rationale**: `null` gives a blank frame and no announcement. `min-h-*` reserves space, so the swap does not shift the page.

### D5 — Typed data with branded ids

**Choice**: `proyectos.js` → `proyectos.ts` with `readonly Proyecto[]`, `id: asProyectoId(n)`, `import type` for `Proyecto`; delete `proyectos.d.ts`. `ProyectoVerProyecto.architecturalStack` gains optional `desktop`/`packaging`, matching `src/types/demo.ts`.
**Rationale**: keeps `ProyectoId` instead of weakening it to `number`; the `.d.ts` was why the data went unchecked.
**Critical detail**: import `asProyectoId` from `'../types/branded.ts'` **with the extension**. `scripts/sitemap-manifest.mjs` loads this file with `node`, which requires real extensions. `allowImportingTsExtensions` is already `true` and Vite 8 resolves it (verified with a scratch build). No other runtime imports are allowed there.

### D6 — Sitemap script uses Node's TypeScript stripping

**Choice**: resolved path `.js` → `.ts`, relying on Node's built-in stripping (unflagged since 22.18). Add `engines.node: ">=22.18"`.
**Alternatives**: keep `.js` + `.d.ts` (no compile-time check); esbuild transform (Vite 8 is Rolldown-based, esbuild not guaranteed); duplicate route data (breaks single source).
**Rationale**: one line changed, zero dependencies. Local Node 24.14.0; CI `'22'` resolves ≥22.18. `engines` fails a stale Node at install instead of at `prebuild`.

## Data Flow

```
/demo/:id ─► <ErrorBoundary key={pathname} titleKey="errorBoundary.demoTitle">
               ├─ hasError ─► <ErrorFallback role="alert"> ─► onRetry → reload
               └─ ok ──────► <Suspense fallback={<Skeleton/>}> ─► DemoSection chunk
                                  ▲ import() rejects ─► getDerivedStateFromError

/proyectos ─► ContactoSection (static: id="contacto") ─► Suspense ─► ContactoForm chunk (RHF)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/App.tsx` | Modify | `lazy` + `Suspense` + `ErrorBoundary`, keyed by `pathname`; ~55 lines |
| `src/components/ui/ErrorBoundary.tsx` | Create | Class boundary + `ErrorFallback` (~90 lines) |
| `src/components/ui/Skeleton.tsx` | Create | Accessible loading placeholder (~35 lines) |
| `src/components/sections/contacto/ContactoForm.tsx` | Create | Form extracted from `ContactoSection` (~150 lines) |
| `src/components/sections/ContactoSection.tsx` | Modify | Static section + lazy form; 205 → ~45 lines |
| `src/data/proyectos.ts` | Create | Typed `readonly Proyecto[]`, branded ids (renamed) |
| `src/data/proyectos.js`, `proyectos.d.ts` | Delete | Superseded |
| `src/types/proyecto.ts` | Modify | optional `desktop`/`packaging` |
| `scripts/sitemap-manifest.mjs` | Modify | path `.js` → `.ts` |
| `package.json` | Modify | `engines.node` |
| `src/locales/{es,en}/translation.json` | Modify | `errorBoundary.*`, `loading.label` |
| `src/__tests__/App.test.tsx`, `ContactoSection.*.test.tsx` | Modify | async (`findBy*`) assertions |
| `src/components/ui/__tests__/{ErrorBoundary,Skeleton}.test.tsx` | Create | boundary + a11y contract |
| `src/data/__tests__/proyectos.test.ts` | Create | data invariants |
| `openspec/specs/sitemap-robots-generator/spec.md` | Modify | `proyectos.js` → `proyectos.ts` |

## Interfaces / Contracts

```tsx
interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly titleKey: string;       // i18n key resolved inside ErrorFallback
  readonly onRetry?: () => void;   // defaults to window.location.reload()
}

interface SkeletonProps {
  readonly className?: string;     // reserves height (min-h-*) at each call site
}
```

i18n keys, es + en, identical shape (`i18n-parity` enforces). Titles carry the
per-scope message; `description` and `retry` are shared:

```json
"errorBoundary": { "homeTitle": "No pudimos cargar el inicio",
                   "demoTitle": "No pudimos cargar la demo",
                   "videoTitle": "No pudimos cargar el video",
                   "contactTitle": "No pudimos cargar el formulario",
                   "description": "Algo falló al cargar esta sección. Inténtalo de nuevo.",
                   "retry": "Reintentar" },
"loading": { "label": "Cargando…" }
```

## Testing Strategy

| Layer | What to test | Approach |
|-------|--------------|----------|
| Unit | Boundary: children render; fallback on throw (`role="alert"`, copy, retry focused); `onRetry` called; `console.error` called | `ErrorBoundary.test.tsx` + `createTestI18n` |
| Unit | Skeleton: `role="status"`, `aria-busy`, accessible name | `Skeleton.test.tsx` |
| Unit | Data: unique `id`, every `Ver proyecto` has `imgDemo.img` | `proyectos.test.ts` |
| Integration | `/videos/:id`, `/demo/:id` render after resolution | `App.test.tsx` with `findBy*` |
| Integration | Contact form still validates and submits | existing `ContactoSection.*.test.tsx`, `findByLabelText` |
| Build | Manifest still emits 7 routes; real Node path works | `generate-sitemap.test.mjs` + `node scripts/generate-sitemap.mjs` |
| Manual | Keyboard path through the fallback; axe/Lighthouse deferred to Slice 3 | manual |

No "skeleton shows first" assertion — timing-sensitive and flaky. The Skeleton unit test covers the contract instead.

## Threat Matrix

N/A — no shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. The only build-script change is a path constant.

## Migration / Rollout

No migration, no flag. Five work units: (1) typed data + sitemap path + `engines`, (2) `Skeleton`, (3) `ErrorBoundary`, (4) App wiring, (5) contact-form extraction. Rollback = revert the commits.

Deviations from proposal, both evidence-backed: retry reloads instead of resetting state (D2); HomePage scope resolves to the contact form only (D1).

## Open Questions

- [ ] None blocking.

Skill Resolution: paths-injected — frontend-design, tailwind-css-patterns, accessibility, typescript-advanced-types (repo `.agents/skills/`), plus `sdd-design` and `_shared/sdd-phase-common.md`.
