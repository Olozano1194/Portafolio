# Exploration — media-assets-performance

## Summary

Slice 2 investigation: videos out of the build, font subsetting, image lazy loading.

## 1. Videos out of the build

- Videos live in `public/videos/`: `videos-HotelAlura.mp4` (9.48 MB) and `videos-TaskReact.mp4` (3.95 MB). Total 13.43 MB of the 15.71 MB dist.
- Referenced via absolute path in `src/components/sections/VideosSection.tsx:76` and `DemoSection.tsx:104`: `/videos/videos-${proyecto.img}.mp4`. Vite copies `public/` verbatim to `dist/`, hence they ship.
- No `poster` image exists per video. The `<video>` has no `poster` attribute. Could derive from existing project poster images (`public/assets/proyecto-*.webp`) but none is wired.
- No tests assert on video src strings (grep of `__tests__` shows only navigation smoke tests).

### Recommendation
Move videos to external hosting and reference via env var `VITE_VIDEO_BASE_URL` (pattern already used for `VITE_SITE_URL`, `VITE_CONTACTFORM_URL`). Keep the same `/videos/videos-{img}.mp4` path suffix so no component logic change beyond base URL. Vercel Blob or Cloudinary both work; recommend a plain public URL env var to avoid vendor lock-in and keep R5 (no new deps). Product decision: accept external hosting cost/bandwidth and whether to add a `poster` image.

### Rejected
- YouTube/Vimeo embed: changes player UI/branding and breaks the existing `<video controls>` UX + adds third-party iframe weight; product decision needed if branding acceptable.
- Committing videos to git LFS: still ships bytes to Vercel build, no benefit.

## 2. Font subsetting

- `index.html:13` loads 3 families: Ubuntu Sans Mono (400..700), Inter (100..900), Space Grotesk (300..700), with `display=swap` and preconnect already present.
- `src/index.css` maps `--font-body` → Ubuntu Sans Mono, `--font-headline` → Inter, `--font-label` → Space Grotesk.
- Actually used weights across src: 300 (font-light), 400 (default), 500 (font-medium), 600 (font-semibold), 700 (font-bold), 800 (font-extrabold). So 100,200,900 are unused; 300 only SobreMi paragraph.
- Recommendation: restrict Google Fonts URL to used weights (`wght@300;400;500;600;700;800` per family where available) and add `&display=swap` (already there). Keep Google Fonts (no new dependency, R5). Self-host via @fontsource rejected (adds 3 deps + build complexity for marginal gain). System font stack rejected (changes brand identity).

## 3. Image lazy loading

- All images are in `public/` (served statically) plus `src/assets/` (4 hobby images imported). No width/height attributes on most `<img>` (grep shows only a few). Above-the-fold: HeroSection image and Header logo; the rest below fold.
- Recommendation: add `loading="lazy" decoding="async"` to all below-fold images; keep eager for hero/header logo. Add explicit `width`/`height` (or aspect-ratio via Tailwind) to prevent CLS. Defer srcset/sizes unless real responsive variants exist (none do today — only .webp).

## Product decisions needed
1. External video host URL / Vercel Blob vs Cloudinary.
2. Accept YouTube branding if embed route chosen.
3. Whether to add poster images per video.

Skill Resolution: paths-injected — loaded react-best-practices and vite SKILL.md.