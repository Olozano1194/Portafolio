# Proposal: media-assets-performance

## Intent

Cut the production footprint of the Portafolio: `dist` is 15.71 MB, 13.43 MB of it demo videos shipped through the Vite build; fonts load full ranges, images lack dimensions.

## Scope

### In Scope

- Videos served from GitHub Release assets (tag `media-v1`) via `VITE_VIDEO_BASE_URL` + `/videos-{proyecto.img}.mp4`; delete `public/videos/*.mp4`.
- `poster` per video reusing existing `public/assets/proyecto-*.webp` with `object-fit: cover`.
- Below-the-fold images: `loading="lazy"` + `decoding="async"` + explicit dimensions; hero and header logo eager.

### Out of Scope

- Font subsetting — **investigated and dropped**: the three families are variable fonts, so narrowing the requested weight range returns byte-identical woff2 files (measured against the live API). Zero-byte win.
- srcset/sizes responsive images (no variants exist).
- YouTube/Vimeo embed.
- axe-core / a11y audit (Slice 3).

## Capabilities

### New Capabilities

- `media-performance`: media delivery performance requirements (off-build video hosting, font subsetting, image lazy loading).

### Modified Capabilities

- `lazy-routing`: deep demo/video routes keep media out of the build output.

## Approach

1. Videos: resolve src from `VITE_VIDEO_BASE_URL` + `/videos-{img}.mp4`; delete `public/videos/`; upload release assets.
2. Poster: add `poster` from existing project webp, `object-fit: cover`; portrait poster (TaskReact) accepted with a hard 16:9 crop.
3. Images: add `loading="lazy"` + `decoding="async"` + explicit dimensions below the fold; hero/logo eager.
4. Fonts: **no change** — variable fonts make the weight range a zero-byte lever (see Out of Scope).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `VideosSection.tsx` | Modified | Video base URL + poster |
| `demos/VideoDemo.tsx` | Modified | Video src base URL |
| `DemoSection.tsx` | Modified | Video src base URL |
| `public/videos/` | Removed | Shipped mp4 assets |
| `.env.example` | Modified | Document `VITE_VIDEO_BASE_URL` |
| Image sections | Modified | Lazy + dimensions |

`index.html` is not touched: font subsetting was dropped after measurement.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Release assets not uploaded before merge | High | Blocking prerequisite (human); verify HTTP 206 before merge |
| Portrait poster (TaskReact) hard-crops into 16:9 | Certain | Accepted by the human; revisit if it reads badly in production |
| Hero image is a 394 KB remote PNG | Medium | Out of scope, flagged for a later slice |

Risk level: Medium.

## Rollback Plan

Revert env-based video URL and restore `public/videos/*.mp4` from git; remove lazy/dimension attributes. `dist` returns to 15.71 MB baseline.

## Dependencies

- Blocking: human must upload `videos-HotelAlura.mp4` (9.48 MB) and `videos-TaskReact.mp4` (3.95 MB) to release `media-v1` before merge. `gh` unauthenticated in agent env.

## Success Criteria

- [ ] `dist` total < 3 MB (from 15.71 MB).
- [x] `npm test` green, no regressions (197 today).
- [x] No new layout shift (CLS 0 from missing dimensions).
- [x] Zero references to `/videos/videos-` as a local path in `src/` and `scripts/`.
- [ ] Videos seek via HTTP Range on release host.

Skill Resolution: paths-injected — cognitive-doc-design (user-level SKILL.md) + sdd-propose phase skill
