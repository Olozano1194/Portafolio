# Tasks: media-assets-performance (Slice 2)

Videos leave `public/`, images get hints. **Fonts are OUT** (design D3: variable fonts → zero-byte win); no font unit, `index.html` untouched. **TaskReact portrait poster is accepted** (`object-fit: cover`, hard 16:9 crop); no ffmpeg step.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~190–220 authored (4 code units) + 2 binary deletions (−13.43 MB) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR (optional: 4 stacked PRs mirroring Slice 1) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending (not needed at ~200 lines) |

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low
```

No unit approaches the 250-line cap (R4). WU3 is ~10 authored lines but moves a 13.43 MB git blob pair — review it separately if the team prefers. The real gate is not PR size: it is Phase 0.

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| WU1 | env→URL contract | PR 1 | `npx vitest run src/utils/__tests__/videoUrl.test.ts` | N/A — pure function, no DOM | delete `videoUrl.ts` + its test (no importers yet) |
| WU2 | video wiring + fallback | PR 2 | `npx vitest run src/__tests__/App.test.tsx src/test/__tests__/i18n-parity.test.ts` | `npm run dev` → `/videos/3` with env var set and unset | revert 3 components + `demo.ts` + 2 locale keys |
| WU3 | assets out of the build | PR 3 | `npm test` (regression only) | `npm run build` + `dist` size measurement | `git checkout -- public/videos` restores both mp4s |
| WU4 | image hints | PR 4 | `npx vitest run src/components/sections/__tests__/HeroSection.test.tsx` | `npm run dev` → home, scroll, no CLS | remove the attribute sets per section |
| WU5 | verification | none (no commit) | `npm run verify` | `npm run build` + `curl -r 0-1023` | N/A — report only |

## Phase 0 — BLOCKING prerequisite (human, no commit)

- [ ] 0.1 Create release `media-v1` on `Olozano1194/Portafolio` with `videos-HotelAlura.mp4` (9.71 MB) and `videos-TaskReact.mp4` (4.05 MB). The agent cannot: `gh` is unauthenticated.
- [ ] 0.2 Set `VITE_VIDEO_BASE_URL=https://github.com/Olozano1194/Portafolio/releases/download/media-v1` in `.env.local` **and** Vercel (production + preview).
- [ ] 0.3 Gate: `curl -s -o /dev/null -w "%{http_code}" -r 0-1023 <url>` → `206` on **both** URLs.

**Gate rule:** WU1/WU2/WU4 may be developed and merged degraded (video shows the fallback message). **WU3 must not merge** until 0.3 passes — deleting the mp4s without a live release turns every video into a 404.

## Phase 1 — WU1: URL helper (foundation)

Files: `src/utils/videoUrl.ts` (new, ~30) · `src/utils/__tests__/videoUrl.test.ts` (new, ~80).

- [x] 1.1 Create `src/utils/videoUrl.ts` per design D1: env read **inside** the function body, `replace(/\/+$/, '')`, absolute-`http(s)`-or-root shape check, `undefined` for missing/empty/relative input, `getVideoPoster` → `/assets/proyecto-${img}.webp`.
- [x] 1.2 Create the 12-case suite from the design table (`vi.stubEnv` + `vi.unstubAllEnvs()` in `afterEach`), including case 12 "never throws".
- [x] 1.3 Verify: `npx vitest run src/utils/__tests__/videoUrl.test.ts && npm run typecheck && npm run check:size`
- [x] 1.4 Commit: `feat(video): agregar helper de URL de videos por entorno`

Rollback: delete the two new files; nothing imports them. Depends on: nothing. Blocks WU2.

## Phase 2 — WU2: video wiring + fallback

Files: `src/types/demo.ts` (38→39) · `sections/VideosSection.tsx` (120→~140) · `sections/DemoSection.tsx` (113→~125) · `sections/demos/VideoDemo.tsx` (193→~205) · `src/locales/{es,en}/translation.json` (+1 each) · `src/__tests__/App.test.tsx` (+~25).

- [x] 2.1 `demo.ts`: add `readonly poster?: string | undefined` to the video item type (`exactOptionalPropertyTypes` rejects a bare `undefined`).
- [x] 2.2 `VideosSection.tsx:76`: `const src = getVideoUrl(proyecto.img)`; set `poster={getVideoPoster(proyecto.img)}` on `<video>`, `<source src={src}>`; when `!src` render `<p>{t('videoProject.videoUnavailable')}</p>` inside the existing `aspect-video` box instead of the player.
- [x] 2.3 `DemoSection.tsx:104`: `const videoSrc = getVideoUrl(proyecto.img)`; `videos: videoSrc ? [{ src: videoSrc, titulo: projectTitle, poster: getVideoPoster(proyecto.img) }] : []` (never `src: ''`).
- [x] 2.4 `VideoDemo.tsx`: `poster={currentVideo?.poster}`; when `totalVideos === 0` render the localized `videoProject.videoUnavailable` paragraph (same key as 2.5, per D5) and skip the player + arrows.
- [x] 2.5 Add `videoUnavailable` to both locales (strings from D5); `i18n-parity` enforces the twin.
- [x] 2.6 Integration test in `src/__tests__/App.test.tsx`: `vi.stubEnv('VITE_VIDEO_BASE_URL', '')` + `renderApp('/videos/3')` → `findByText('El video no está disponible en este momento.')`.
- [x] 2.7 Verify: `npx vitest run src/__tests__/App.test.tsx src/test/__tests__/i18n-parity.test.ts && npm run typecheck && npm run lint && npm run check:size`
- [x] 2.8 Commit: `feat(video): resolver src, poster y fallback de video`

Rollback: revert those 6 files — components fall back to the `/videos/videos-*.mp4` strings, which still resolve until WU3. Depends on: WU1. Soft-gated by 0.2.

## Phase 3 — WU3: assets out of the build

Files: `public/videos/videos-HotelAlura.mp4` (delete) · `public/videos/videos-TaskReact.mp4` (delete) · `.env.example` (5→10) · `src/vite-env.d.ts` (26→30).

- [ ] 3.1 `git rm public/videos/videos-HotelAlura.mp4 public/videos/videos-TaskReact.mp4` — only after 0.3 passes.
- [x] 3.2 `.env.example`: document `VITE_VIDEO_BASE_URL` + comment "unset = fallback message". *(moved to WU1 — the helper needs the documented contract)*
- [x] 3.3 `src/vite-env.d.ts`: `interface ImportMetaEnv { readonly VITE_VIDEO_BASE_URL?: string }`. Keep the file free of top-level `import`/`export` — one would turn it into a module and silently break the `vite/client` merge. *(moved to WU1 — without it the env read is typed `any`, which violates R5)*
- [ ] 3.4 Verify: `git grep -n "/videos/videos-" -- src scripts` → no output · `npm run typecheck && npm run lint && npm test && npm run check:size && npm run build` · `(Get-ChildItem -Recurse dist | Measure-Object Length -Sum).Sum / 1MB` < 3.
- [ ] 3.5 Commit: `build(video): sacar los mp4 del build y documentar la URL`

WU3 is now a single-purpose unit: delete the two mp4 files. It stays gated on Phase 0.3.

Rollback: `git revert` restores both mp4s; unset the env var and the old local paths work again. Depends on: WU2 (no remaining local-path reference) + Phase 0 gate.

## Phase 4 — WU4: image hints

Files: `HeroSection.tsx` (48→49) · `SobreMiSection.tsx` (38→40) · `ProyectosSection.tsx` (94→96) · `FormacionAcademicaSection.tsx` (48→50) · `HobbiesSection.tsx` (47→51) · `demos/ImageGalleryDemo.tsx` (213→216) · `sections/__tests__/HeroSection.test.tsx` (+~6).

- [x] 4.1 `HeroSection.tsx:37`: `width={512} height={512} loading="eager" fetchPriority="high"`.
- [x] 4.2 `SobreMiSection.tsx:14`: `loading="lazy" decoding="async"` (box is `aspect-4/5`, no dims needed).
- [x] 4.3 `ProyectosSection.tsx:45`: `loading="lazy" decoding="async"` (box is `h-112.5`).
- [x] 4.4 `FormacionAcademicaSection.tsx:26`: `loading="lazy" decoding="async"` (box is `h-40`).
- [x] 4.5 `HobbiesSection.tsx:39–42`: `loading="lazy" decoding="async"` on all four images.
- [x] 4.6 `ImageGalleryDemo.tsx:169` → `loading="eager" decoding="async"`; `:187` → `loading="lazy" decoding="async"`.
- [x] 4.7 `HeroSection.test.tsx`: assert the hero `<img>` carries `width="512"`, `height="512"`, `fetchpriority="high"`.
- [x] 4.8 Verify: `npx vitest run src/components/sections/__tests__/HeroSection.test.tsx && npm run typecheck && npm run lint && npm run check:size`
- [x] 4.9 Commit: `perf(imagenes): agregar lazy loading y dimensiones explícitas`

Never combine `loading="lazy"` with `fetchPriority` (D4). `ImageGalleryLightbox.tsx` untouched. Rollback: revert the attribute sets — no structural change. Depends on: nothing; can merge before WU1.

## Phase 5 — Verification (no commit)

- [x] 5.1 `npm run verify` — 211 tests green (197 baseline + 12 unit + 1 integration + 1 hero).
- [ ] 5.2 `npm run build`; `dist` < 3 MB (≈2.3 MB expected) and no `videos-*.mp4` under `dist/`.
- [x] 5.3 `git grep -n "/videos/videos-" -- src scripts` → 0 hits.
- [ ] 5.4 `curl -r 0-1023` on both production URLs → `206`.
- [x] 5.5 Write `openspec/changes/media-assets-performance/specs/media-performance/spec.md` (capability delta is missing today) and tick the proposal success criteria.

Out of scope (recorded, not fixed): hero 394 KB remote PNG; inert `aspect-square md:aspect-3/2` on the hero `<picture>`; captions if the videos are narrated.

Skill Resolution: paths-injected — work-unit-commits, chained-pr, sdd-tasks (user-level `~/.config/opencode/skills/*/SKILL.md`)
