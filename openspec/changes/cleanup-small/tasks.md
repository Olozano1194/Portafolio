# Tasks: cleanup-small

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~50–60 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | All three cleanup changes in one PR | PR 1 | Single PR, well under 400-line budget |

## Phase 1: Asset Cleanup

- [x] 1.1 Delete 8 orphan `.png` project images from `public/assets/`: `proyecto-TiendaVirtual.png`, `proyecto-GymDjango.png`, `proyecto-Encriptador.png`, `proyecto-DjangoTask.png`, `proyecto-Django.png`, `proyecto-Conversor.png`, `proyecto-ApiInstituciones.png`, `proyecto-Ahorcado.png`
- [x] 1.2 Delete 2 orphan `.png` demo images from `public/demo/tiendaVirtual/`: `demo-login.png`, `demo-index.png`
- [x] 1.3 Delete orphan `public/cerradura.svg`

## Phase 2: Favicon Fix

- [x] 2.1 In `index.html` line 5, replace `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` with `<link rel="icon" type="image/png" href="/favicon-16x16.png" />`

## Phase 3: Google Fonts Optimization

- [x] 3.1 In `src/index.css`, remove lines 1–3 (the three `@import url(...)` statements for Google Fonts)
- [x] 3.2 In `index.html`, add after `<meta name="viewport"...>` (line 6) and before `<title>`: preconnect links to `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin), plus combined stylesheet `<link>` for Ubuntu Sans Mono, Inter, and Space Grotesk with `display=swap`

## Phase 4: Descriptive Alt Texts

- [x] 4.1 Add `alt` keys to `src/locales/es/translation.json` under `projects.items.{1-6}` — values: "ControlFit dashboard showing gym management interface", "Hotel Alura desktop reservation management software", "TaskMaster productivity app interface", "Institutional Management platform dashboard", "EduBase academic platform main page", "FiadoApp commercial management dashboard"
- [x] 4.2 Add same `alt` keys to `src/locales/en/translation.json` under `projects.items.{1-6}` — same values (already English)
- [x] 4.3 In `src/components/sections/ProyectosSection.jsx` line 48, replace `alt={`imagen ${proyecto.img}`}` with `alt={t(`projects.items.${proyecto.id}.alt`)}`

## Phase 5: Verification

- [ ] 5.1 Run `npm run build` — confirm no errors
- [ ] 5.2 Verify each project card image loads (no 404s)
- [ ] 5.3 Verify favicon loads (no 404 in DevTools)
- [ ] 5.4 Inspect alt text in DOM for each project card
- [ ] 5.5 Verify fonts render correctly (Ubuntu Sans Mono, Inter, Space Grotesk) — no FOIT
