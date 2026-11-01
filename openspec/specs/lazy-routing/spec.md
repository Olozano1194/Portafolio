# Spec: lazy-routing

Source: proposal.md → New Capabilities §lazy-routing; design.md D1, D3, D4; tasks.md Phase 4.

## Requirements

### Requirement: R1 — Deep routes load on demand

`VideosSection` and `DemoSection` MUST be imported with `React.lazy` in `src/App.tsx`, so the video player, gallery, and lightbox are not part of the entry chunk and load only when `/videos/:id` or `/demo/:id` is visited.

#### Scenario: deep routes become separate chunks

- GIVEN a production build
- WHEN `dist/assets` is inspected
- THEN the demo/video code is emitted outside the entry chunk

#### Scenario: route renders after the chunk resolves

- GIVEN the app renders at `/videos/3`
- WHEN the lazy chunk finishes loading
- THEN the video section renders its content

### Requirement: R2 — Every lazy route has a Suspense fallback

Each lazy route element MUST be wrapped in `<Suspense>` whose fallback is the shared `Skeleton` primitive, which reserves height (`min-h-*`) and announces the loading state.

#### Scenario: fallback while the chunk is in flight

- GIVEN the chunk for `/demo/1` has not loaded yet
- WHEN the route renders
- THEN the `Skeleton` placeholder is shown in place of the section

### Requirement: R3 — Contact form is split without losing the section anchor

`ContactoSection` MUST keep `id="contacto"` and its heading in the static section, and load only the form through a lazy `ContactoForm` chunk, so `scrollToSection('contacto')` still finds its target while the form is loading.

#### Scenario: scroll target exists before the form loads

- GIVEN the home page is rendered and the form chunk has not loaded
- WHEN `scrollToSection('contacto')` runs
- THEN the element with `id="contacto"` is already in the DOM

### Requirement: R4 — Sections without a heavy dependency stay static

HomePage sections that carry no heavy dependency (Hero, SobreMi, Formacion, Proyectos, Skills, Hobbies) MUST remain static imports; only routes and the contact form are split.

#### Scenario: landing content is not deferred

- GIVEN the app renders at `/`
- WHEN the entry chunk executes
- THEN the landing sections render without waiting for an extra chunk

### Non-functional

- No new dependency and no `manualChunks` configuration: Vite splits dynamic imports on its own (design D1).
- `React.lazy` keeps the existing default exports of `VideosSection` and `DemoSection` untouched.
