# Exploration — lazy-routes-error-boundary-typing

Change ID: `lazy-routes-error-boundary-typing`
Slice: 1 — lazy routes + ErrorBoundary + tipado de proyectos.js

## Current state

- `src/App.tsx` (24 lines): imports `VideosSection` and `DemoSection` statically; renders routes `videos/:id` and `demo/:id`. No lazy loading, no ErrorBoundary.
- `src/main.tsx`: renders `<App />` inside `<Router>`. No global boundary.
- `src/data/proyectos.js` (138 lines): untyped JS array; typed indirectly via `src/data/proyectos.d.ts` (`readonly Proyecto[]`). Existing `Proyecto` type in `src/types/proyecto.ts` with two discriminated variants.
- No `ErrorBoundary` component anywhere in `src/`.
- `vite.config.ts` (9 lines): plain React + Tailwind, target es2022. No `manualChunks`.

## Findings

### 1. Lazy-loading routes

`VideosSection` and `DemoSection` are heavy (video player, iframe gallery, image lightbox, SEO). They're only reached via deep routes. Wrapping with `React.lazy(() => import(...))` + `<Suspense fallback>` splits them into separate chunks. Vite handles dynamic imports natively; no extra config needed.

Risk: default exports exist (`export default VideosSection/DemoSection`), so `lazy(() => import('./...'))` works directly. Need a fallback (e.g. spinner or null). Keep fallback simple, junior-readable.

### 2. ErrorBoundary

No class component exists. React 19 supports `use`/error boundaries via class components still (no hook yet). Create `src/components/ui/ErrorBoundary.tsx` (class component, ~60 lines) with a fallback prop and `componentDidCatch` logging. Wrap the lazy routes (or whole `<App>`). Recommend wrapping the route elements individually or a single boundary around `<Routes>` in App. Keep within 250-line cap.

### 3. Typing proyectos.js

Two options:
- A) Rename to `proyectos.ts` and annotate `export const proyectos: readonly Proyecto[] = [...]`. This requires data to conform to the type; `architecturalStack` for FiadoApp has extra `desktop`/`packaging` keys not in `ProyectoVerProyecto` (only frontend/backend/database/infrastructure). Need to either make those optional or widen type. Also `imgDemo` is optional in data? All Ver proyecto have it. `ver_proyecto` present.
- B) Keep `.js` + `.d.ts` (current). Type stays external; no compile-time check of data shape.

Recommended: Option A with type adjustments: make `architecturalStack` allow optional `desktop`/`packaging` (or an index signature). But R5 forbids type gymnastics; simple optional fields are fine. Also `credenciales` optional already. `metrics` items use `labelES`/`labelEN` required.

Also `img` field is a project name string, not an image path — naming quirk, leave as is.

Constraints: renaming breaks import path `../../data/proyectos`? No, extension resolved by TS/Vite. Update `proyectos.d.ts` removal (delete it) to avoid conflict. Check `tsconfig` include.

Risks: type errors may surface (e.g. `architecturalStack.desktop`). Need to run typecheck.

## Recommended approach

1. Create `ErrorBoundary` UI primitive.
2. Update `App.tsx`: lazy import VideosSection/DemoSection, wrap each route element in `<Suspense>` + `<ErrorBoundary>`.
3. Convert `proyectos.js` → `proyectos.ts` with `Proyecto[]` annotation; adjust `ProyectoVerProyecto.architecturalStack` to include optional `desktop`/`packaging`; remove `.d.ts`.
4. Run typecheck/lint/tests/check:size/build.

## Skill Resolution
paths-injected — react-best-practices (bundle-dynamic-imports, bundle-barrel-imports). 
No tests added in this phase (explore only).