```yaml
schema: gentle-ai.verify-result/v1
evidence_revision: sha256:8c4d351265c787c1f72439db38e560f47f8fcfa1eaab7cd9c50fd75f1268ba4e
verdict: pass
blockers: 0
critical_findings: 0
requirements: 4/4
scenarios: 8/8
test_command: npm test
test_exit_code: 0
test_output_hash: sha256:8C4D351265C787C1F72439DB38E560F47F8FCFA1EAAB7CD9C50FD75F1268BA4E
build_command: npm run build
build_exit_code: 0
build_output_hash: sha256:01A4EA12908A76B47C4994B85DCD5A7271153386CF3C24ABD3EC49521B8CB8DD
```

# Verify Report: media-assets-performance

Change: `media-assets-performance`
Version: N/A (new capability `media-performance`)
Mode: Standard (strict_tdd: false)

## Re-verification

Final re-verification run on branch `feat/slice2-media-assets` (7 commits on top of `master` @ 39b931c, not pushed; uncommitted bookkeeping: `openspec/changes/media-assets-performance/tasks.md`).

### Re-verification history

1. **Previous verify — FAIL**: `npm run lint` exited **1** (`@typescript-eslint/consistent-type-imports`) at `src/components/sections/__tests__/DemoSection.fallback.test.tsx:10:46` — the `importOriginal<typeof import('../demos/VideoDemo')>()` type annotation. Introduced by remediation commit `0fb404f`. Because `npm run verify` chains `typecheck && lint && test && check:size`, the phase gate short-circuited at the lint leg.

2. **Remediation (working tree, uncommitted)**: replaced the inline `import()` type generic with a type-only namespace import:
    - `import type * as VideoDemoModule from '../demos/VideoDemo';`
    - `const actual = await importOriginal<typeof VideoDemoModule>();`

3. **Final re-verify — PASS**: full green run (details below).

### Final exit-code table (this pass, real commands, real exit codes)

| Gate | Command | Exit code | Result |
|------|---------|-----------|--------|
| Typecheck | `npm run typecheck` | **0** | ✅ PASS — clean `tsc --noEmit` |
| Lint | `npm run lint` | **0** | ✅ PASS — error resolved via type-only namespace import |
| Tests | `npm test` | **0** | ✅ PASS — 27 files / 27 passed; **217 tests / 217 passed, 0 failed, 0 skipped** |
| Size check | `npm run check:size` | **0** | ✅ PASS — 92 files within the 250-line cap |
| Composite gate | `npm run verify` | **0** | ✅ PASS — `typecheck && lint && test && check:size` all green |

## Build & final asset checks (this pass)

| Check | Method | Result |
|-------|--------|--------|
| Build | `$env:VITE_SITE_URL="https://olozano.vercel.app"; npm run build` | **exit 0** — `✓ built in 720ms` |
| dist total | byte measurement of `dist/` | **2,713,592 bytes (2.59 MB)** — under the 3 MB target (down from 15.71 MB) |
| dist mp4 | `*.mp4` under `dist/` | **0 found** — 50 files emitted, no video in bundle |
| Local video path refs | `git grep -n "/videos/videos-" -- src scripts` | **no output** (exit 1 = no matches) |
| HTTP Range | `curl -r 0-1023 -L` on both release URLs | **206 on both** — `videos-HotelAlura.mp4` + `videos-TaskReact.mp4` |

## Completeness

| Metric | Value |
|--------|-------|
| Tasks total | 34 |
| Tasks complete | 33 |
| Tasks incomplete | 1 |

Incomplete task: `0.2` (Phase 0) — second half only. `VITE_VIDEO_BASE_URL` in `.env.local` is **DONE**; the **Vercel** production + preview half is **PENDING** (human, outside the repo). Classified WARNING, not a code defect.

## Build & Tests Execution

**Build**: ✅ Passed (exit 0). Ran with `$env:VITE_SITE_URL="https://olozano.vercel.app"; npm run build` (prebuild → `scripts/generate-sitemap.mjs` → 7 routes; vite build → `✓ built in 720ms`).

**dist measurement**: total **2,713,592 bytes (2.59 MB)** — no `*.mp4` under `dist/` (0 found), 50 files emitted.

**Tests**: ✅ Passed (exit 0). Standalone `npm test` → 27 test files / 27 passed; **217 tests / 217 passed, 0 failed, 0 skipped**.

```
> portafolio@0.0.0 test
> vitest run

 Test Files  27 passed (27)
      Tests  217 passed (217)
```

Breakdown vs. previous verify (211 tests): +2 remediation test files, +6 tests (DemoSection.fallback 1, BelowTheFold.loadingHints 5) → 27 files / 217 tests.

**Coverage**: ➖ Not part of the phase verify commands (`npm run test:coverage` exists but was not run).

## Spec Compliance Matrix

Capability delta source: `openspec/changes/media-assets-performance/specs/media-performance/spec.md` (all requirements ADDED).

| Requirement | Scenario | Covering test | Result |
|-------------|----------|---------------|--------|
| R1 | absolute base with redundant trailing slashes | `src/utils/__tests__/videoUrl.test.ts > collapses multiple trailing slashes on the base` | ✅ COMPLIANT |
| R1 | unset or unusable base | `src/utils/__tests__/videoUrl.test.ts > returns undefined when the env var is absent` (+ empty/blank/scheme-less variants) | ✅ COMPLIANT |
| R2 | video route without a configured base | `src/__tests__/App.test.tsx > shows the localized fallback on a video route when no base URL is configured` | ✅ COMPLIANT |
| R2 | demo route without a configured base | `src/components/sections/__tests__/DemoSection.fallback.test.tsx > passes an empty videos list and renders the localized fallback` | ✅ COMPLIANT |
| R3 | poster derived from the project image | `src/utils/__tests__/videoUrl.test.ts > derives the poster path from the project image key` | ✅ COMPLIANT |
| R3 | missing project image | `src/utils/__tests__/videoUrl.test.ts > returns undefined when the project image key is empty` | ✅ COMPLIANT |
| R4 | hero image reserves space | `src/components/sections/__tests__/HeroSection.test.tsx > reserves the hero image space and loads it with high priority` | ✅ COMPLIANT |
| R4 | below-the-fold images are deferred | `src/components/sections/__tests__/BelowTheFold.loadingHints.test.tsx > defers the about section portrait` (plus projects/education/hobbies/gallery siblings) | ✅ COMPLIANT |

**Compliance summary**: **8/8 scenarios COMPLIANT**, 0 FAILING, 0 UNTESTED.

### Per-scenario evidence

- **R1 / trailing-slash scenario — PASS**: `npx vitest run src/utils/__tests__/videoUrl.test.ts` → 12/12 passed. `vi.stubEnv('VITE_VIDEO_BASE_URL', 'https://x.test/media///')` + `getVideoUrl('TaskReact')` → `https://x.test/media/videos-TaskReact.mp4`.
- **R1 / unusable-base scenario — PASS**: same suite → absent / `""` / `"   "` / `example.com/media` → `undefined`; root-relative `/media` → kept.
- **R2 / video-route scenario — PASS**: `src/__tests__/App.test.tsx > shows the localized fallback...` green in the 217-test suite; fallback text found; `document.querySelector('video')` is `null`.
- **R2 / demo-route scenario — PASS (remediated)**: `src/components/sections/__tests__/DemoSection.fallback.test.tsx > passes an empty videos list and renders the localized fallback` green; asserts `videos` prop `[]`, fallback text, no `<video>`, no carousel arrows.
- **R3 / poster scenarios — PASS**: `getVideoPoster('HotelAlura')` → `/assets/proyecto-HotelAlura.webp`; `getVideoPoster('')` → `undefined` (attribute omitted). Suite green.
- **R4 / hero scenario — PASS**: `HeroSection.test.tsx > reserves the hero image space...` green; asserts `width="512"`, `height="512"`, `fetchpriority="high"`.
- **R4 / below-fold scenario — PASS (remediated)**: `BelowTheFold.loadingHints.test.tsx` green (5/5); all five groups carry `loading="lazy"` + `decoding="async"` (gallery: main eager, thumbnails lazy+async).

## Remediation tests — confirmed meaningful

- `src/components/sections/__tests__/DemoSection.fallback.test.tsx` (1/1 passed): wraps `VideoDemo` in a `vi.fn` spy and asserts the prop contract (`videos` equals `[]`) in addition to the localized fallback text, no `<video>` element, and no carousel arrows. The `videos: []` assertion is present — not just rendered-text coverage. ✅ Still meaningful.
- `src/components/sections/__tests__/BelowTheFold.loadingHints.test.tsx` (5/5 passed): covers about portrait (1 img), projects cards (>0), education cards (>0), hobbies (4 imgs), and gallery thumbnails (main eager, remaining deferred). ✅ Still meaningful.

Both files executed green in the final `npm test` run (217/217).

## Correctness (Static Evidence)

| Requirement | Status | Notes |
|-------------|--------|-------|
| R1 helper contract | ✅ Implemented | `src/utils/videoUrl.ts` env read inside body, trim, collapse trailing slashes, shape-check, `undefined` for missing/empty/relative, no throw (12 unit cases). |
| R2 fallback wiring | ✅ Implemented | `VideosSection.tsx` ternary on `videoSrc`; `DemoSection.tsx` empty-list branch; `VideoDemo.tsx` fallback. |
| R3 poster wiring | ✅ Implemented | `VideosSection.tsx`, `VideoDemo.tsx` pass `poster`; unit-tested. |
| R4 image hints | ✅ Implemented | Hero dims/eager/priority; below-fold lazy+async; containers fix height. |

## Design Coherence

| Decision | Followed? | Notes |
|----------|-----------|-------|
| D1 — `src/utils/videoUrl.ts` env contract | ✅ Yes | Env read inside body; `undefined` over `null`; shape check; env-stub friendly. |
| D2 — poster reuse | ✅ Yes | `poster={getVideoPoster(img)}`. |
| D3 — fonts dropped | ✅ Yes | `index.html` untouched. |
| D4 — image hints | ✅ Yes | Hero dims/eager/priority; below-fold lazy+async; height reserved by container. |
| D5 — one i18n key | ✅ Yes | `videoProject.videoUnavailable` in `es` + `en`; parity test green. |

## Accessibility & SEO evidence

- **Accessibility**: localized fallback string present in both locales (`es`: "El video no está disponible en este momento."; `en`: "This video is not available right now."); i18n-parity test green (1/1). No autoplay introduced; fallback is text-only. Open question (WARNING): whether videos are narrated → WCAG 1.2.2 captions follow-up (no `.vtt` exists).
- **SEO**: no `/videos/videos-` local-path references in `src/` or `scripts/`; build emits no `*.mp4`; sitemap prebuild generated 7 routes; SEO meta flows through `src/components/ui/SEO.tsx` untouched.

## Issues Found

**CRITICAL**: **0** — the previous lint CRITICAL is resolved in this final run (fixed via type-only namespace import; `npm run lint` now exits 0).

**WARNING** (3):

1. Task `0.2` second half pending — Vercel `VITE_VIDEO_BASE_URL` not set (human, outside repo). Until set, production serves the fallback message.
2. Runtime CLS not measured (source-verified only).
3. Open question: whether videos are narrated → WCAG 1.2.2 captions follow-up (no `.vtt` exists).

**SUGGESTION** (2):

1. Hero remote PNG (~394 KB) flagged out of scope for a later slice.
2. `TaskReact` portrait poster hard-crops to 16:9 — accepted by human, revisit if it reads badly.

## Proposal Success Criteria

| Criterion | Result |
|-----------|--------|
| `dist` total < 3 MB (from 15.71 MB) | ✅ PASS — 2,713,592 bytes (2.59 MB) |
| `npm test` green, no regressions (197 today) | ✅ PASS — 217 passed (197 + 14 new: 12 unit + 1 integration + 1 hero; + 6 remediation) |
| No new layout shift (CLS 0 from missing dimensions) | ⚠️ Source-verified; runtime not measured |
| Zero references to `/videos/videos-` as a local path in `src/` and `scripts/` | ✅ PASS — `git grep -n "/videos/videos-" -- src scripts` → no output, exit 1 |
| Videos seek via HTTP Range on release host | ✅ PASS — `curl -r 0-1023 -L` → `206` on both release URLs |

## Final Verdict

**PASS** — Final re-verification: the previously FAILing lint gate (`DemoSection.fallback.test.tsx:10:46`) is fixed in the working tree (type-only namespace import), and the full `npm run verify` chain now exits **0**.

- typecheck ✅ (exit 0)
- lint ✅ (exit 0 — post-fix)
- test ✅ (exit 0 — 217/217)
- check:size ✅ (exit 0)
- `npm run verify` ✅ (exit 0)
- build ✅ (exit 0 — dist 2.59 MB, no `*.mp4`, 50 files)
- local video paths ✅ (0 hits)
- HTTP Range ✅ (206 both)

All 8 spec scenarios COMPLIANT (8/8, 0 FAILING, 0 UNTESTED). No CRITICAL findings remain.

Remaining human-owned WARNING: Vercel `VITE_VIDEO_BASE_URL` (task 0.2 second half). The change is code-complete and green; deployment prerequisite outstanding.

Skill Resolution: paths-injected — vitest, accessibility, seo (project `.agents/skills/<name>/SKILL.md`)
