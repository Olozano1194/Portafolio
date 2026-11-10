# Archive Report: media-assets-performance

**Change ID:** media-assets-performance  
**Archive date:** 2026-11-10  
**Branch:** `feat/slice2-media-assets`  
**Verdict:** PASS — 8/8 scenarios COMPLIANT  

## What shipped

The media-assets-performance slice moved all demo videos out of the Vite build output and into GitHub Release assets, deferred below-the-fold images with lazy loading and async decoding, and added explicit intrinsic dimensions to reserve space for images and avoid layout shift. Key changes:

- **Video hosting:** `public/videos/*.mp4` deleted; videos now resolve from `VITE_VIDEO_BASE_URL` + `/videos-{img}.mp4` GitHub Release assets (tag `media-v1`). Both assets answer HTTP `206` Range requests.
- **Poster images:** `poster` attribute on each `<video>` reuses existing `/assets/proyecto-{img}.webp` with `object-fit: cover`. TaskReact's portrait poster is accepted with a hard 16:9 crop.
- **Image hints:** Hero image given `width="512" height="512" fetchPriority="high"` (eager); below-the-fold images (sobre mi, proyectos, educacion, hobbies, gallery) given `loading="lazy" decoding="async"` and explicit `width`/`height` where the container height is auto.
- **Fallback:** When the env var is unset, `VideosSection` and `VideoDemo` render the `videoProject.videoUnavailable` localized paragraph; no `<video>` or empty `src` is rendered.
- **Fonts:** Deliberately dropped after measurement — variable fonts make weight-range subsetting a zero-byte lever; `index.html` untouched.

## Final measured numbers

| Metric | Value | Baseline |
|--------|-------|----------|
| `dist` total | **2,713,592 bytes (2.59 MB)** | 15.71 MB |
| Reduction | **−83.5%** | — |
| `*.mp4` under `dist/` | **0 found** (50 files emitted) | 13.43 MB of video |
| HTTP Range (`curl -r 0-1023`) | **206 on both** release URLs | — |
| Zero `/videos/videos-` refs in `src/` + `scripts/` | **PASS** (git grep → no output) | — |
| `npm test` | **217 passed** (217/217) | 197 baseline |
| `npm run verify` | **exit 0** (typecheck + lint + test + check:size) | — |
| `npm run build` | **exit 0** (dist built in 720ms) | — |

## Spec scenarios count

All **8/8** scenarios COMPLIANT:

| Requirement | Scenario | Result |
|---|---|---|
| R1 | absolute base with redundant trailing slashes | ✅ COMPLIANT |
| R1 | unset or unusable base | ✅ COMPLIANT |
| R2 | video route without a configured base | ✅ COMPLIANT |
| R2 | demo route without a configured base | ✅ COMPLIANT |
| R3 | poster derived from the project image | ✅ COMPLIANT |
| R3 | missing project image | ✅ COMPLIANT |
| R4 | hero image reserves space | ✅ COMPLIANT |
| R4 | below-the-fold images are deferred | ✅ COMPLIANT |

## Deviations from the original plan

- **env typing + `.env.example` moved from WU3 to WU1:** The `VITE_VIDEO_BASE_URL` typing in `src/vite-env.d.ts` and its documentation in `.env.example` were promoted to Work Unit 1 (the URL helper foundation) because the helper needs the documented contract from the start; without it the env read is typed `any`, violating the project's R5 readability rule.
- **Test count:** 14 feature tests + 6 remediation tests were implemented instead of the planned 13. The +1 came from the hero section test added in WU4, and the +6 remediation tests cover the `DemoSection.fallback` assertion (`videos: []`) and the `BelowTheFold.loadingHints` suite (5 groups: about, projects, education, hobbies, gallery thumbnails).
- **Fonts dropped after measurement:** The original proposal investigated font subsetting, but measured against the live Google Fonts API the three variable families (Ubuntu Sans Mono, Inter, Space Grotesk) produce byte-identical woff2 files when narrowing the weight range — zero-byte win, so the feature was dropped with a recorded finding (D3 Deltas).
- **TaskReact portrait poster accepted with a crop:** The portrait poster for TaskReact hard-crops into a 16:9 frame; this was accepted by the human reviewer as a pre-interaction placeholder. No ffmpeg step was added.
- **Hero 394 KB remote PNG:** The hero image remains a remote PNG (394 KB, 512×512) flagged out of scope for this slice; it may be localized in a later slice.

## Open follow-ups

1. **Vercel `VITE_VIDEO_BASE_URL`** — Task 0.2 second half: the env var is set in `.env.local` locally, but not yet configured in Vercel production + preview. Until set, production serves the fallback message `El video no está disponible en este momento.`
2. **Runtime CLS unmeasured** — Layout shift was addressed by design, not measured: only the hero declares explicit `width`/`height` (its container height is auto), while every other image relies on a container that already fixes the height (`aspect-*` or `h-*`). A field CLS audit is still a follow-up.
3. **Hero 394 KB remote PNG** — The hero image is a remote PNG that could be optimized or locally hosted in a later slice.
4. **Captions if the videos are narrated** — No `.vtt`/`.srt` captions exist today; if the videos contain narration, WCAG 1.2.2 captions are a follow-up item.

## Rollback recipe

1. Revert the env-based video URL: unset `VITE_VIDEO_BASE_URL` in `.env.local` and Vercel.
2. Restore `public/videos/*.mp4` from git: `git checkout -- public/videos/videos-HotelAlura.mp4 public/videos/videos-TaskReact.mp4`.
3. Remove the lazy/dimension attributes from all image elements (hero dims, below-the-fold `loading`/`decoding`, poster attributes).
4. Re-run `npm run build`; `dist` returns to the 15.71 MB baseline.

Skill Resolution: paths-injected — cognitive-doc-design (user-level `.agents/skills/*/SKILL.md`); sdd-archive phase skill

## Related archives

- `openspec/changes/archive/2026-11-01-lazy-routes-error-boundary-typing/` — precedent for structure and tone
- `openspec/specs/media-performance/spec.md` — standing capability spec promoted from this change