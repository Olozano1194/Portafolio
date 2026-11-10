# Design: media-assets-performance (Slice 2)

## Technical Approach

Two levers, one rule: **nothing ships in `dist` that can be fetched elsewhere, and every media box
reserves its space before the bytes arrive.** Videos leave `public/` and resolve from one env-driven
pure helper; images get `loading`/`decoding` hints and explicit dimensions only where the box height
is auto. `/videos/:id` and `/demo/:id` are **routes** — untouched.

Font subsetting was investigated and **dropped from the slice** (D3): the families are variable
fonts, so narrowing the requested weight range returns byte-identical files.

## Blocking Prerequisite (human, before merge)

| Item | Value |
| --- | --- |
| Release tag | `media-v1` on `github.com/Olozano1194/Portafolio` |
| Assets | `videos-HotelAlura.mp4` (9.48 MB), `videos-TaskReact.mp4` (3.95 MB) |
| Env var | `VITE_VIDEO_BASE_URL=https://github.com/Olozano1194/Portafolio/releases/download/media-v1` |
| Resulting URLs | `…/media-v1/videos-HotelAlura.mp4`, `…/media-v1/videos-TaskReact.mp4` |
| Gate | `curl -s -o /dev/null -w "%{http_code}" -r 0-1023 <url>` → `206` on both |

The env var is a **deploy** setting too: unset in Vercel = fallback message in production.

## Architecture Decisions

### D1 — `src/utils/videoUrl.ts` (one env-contract boundary)

```ts
const VIDEO_FILE_PREFIX = 'videos-';
const ABSOLUTE_OR_ROOT_PATH = /^(https?:\/\/|\/)/;

export const getVideoUrl = (img: string): string | undefined => {
  const base = import.meta.env.VITE_VIDEO_BASE_URL?.trim();
  if (!img || !base || !ABSOLUTE_OR_ROOT_PATH.test(base)) return undefined;
  return `${base.replace(/\/+$/, '')}/${VIDEO_FILE_PREFIX}${img}.mp4`;
};

export const getVideoPoster = (img: string): string | undefined => {
  if (!img) return undefined;
  return `/assets/proyecto-${img}.webp`;
};
```

- Missing/empty env var → `undefined`: no throw (white screen), no fallback to `/videos/` (404 once deleted). Components branch to a localized message.
- `replace(/\/+$/, '')` collapses `…media/` and `…media///`.
- Shape check is "absolute `http(s)` or root-relative" only. `new URL()` is rejected (throws on `/media`); a scheme-less typo would resolve against the route and 404 silently.
- `undefined` over `null`: React omits the attribute and the prop is already `poster?: string`.
- Env read **inside the body** — module scope freezes at import and defeats `vi.stubEnv`.
- Two call sites is under the rule of three; justified as an env/asset-naming contract that must be unit-testable, not as an abstraction.
**Rejected**: inline template strings (duplicated env knowledge, untestable).

### D2 — Poster

`poster={getVideoPoster(proyecto.img)}` → `/assets/proyecto-{img}.webp`. All six exist:
`ControlFit 1216×873`, `FiadoApp 833×924`, `HotelAlura 910×539`, `Instituciones 1873×991`,
`InstitucionesV2 1430×736`, `TaskReact 404×594`. Empty `img` → attribute omitted, never a
placeholder URL. `controls` + `preload="metadata"` kept; no autoplay/loop. **No captions**: no
`.vtt`/`.srt` exists, and an empty `<track>` is worse than none. `TaskReact`'s portrait poster (0.68)
hard-crops into 16:9 — **accepted by the human** as a pre-interaction placeholder.
**Rejected**: ffmpeg frames by default (a human step per video); ratio threshold in code (rots when
a project is added).

### D3 — Fonts: investigated, dropped from scope (zero-byte win)

Kept as a recorded finding so nobody re-opens it. Measured with the live Google Fonts API
(Chrome UA, HTTP 200): narrowing Inter `100..900→400..700` and Space Grotesk `300..700→400..700`
returns **identical woff2 URLs** — these are variable fonts, and the sub-range does not change the
served file. Savings: **0 bytes**.

| Family | Google offers | Used in `src/` | Requested today (`index.html:13`) |
| --- | --- | --- | --- |
| Ubuntu Sans Mono | 400–700 + italic 400–700 | 400/500/600/700; italic inherits 800 → clamps to 700 | `ital,wght@0,400..700;1,400..700` |
| Inter | 100–900 | 400/500/600/700 | `wght@100..900` |
| Space Grotesk | 300–700 (**800 returns HTTP 400**) | 400/500/700 | `wght@300..700` |

**Decision:** no change to `index.html`. The only measurable win would be dropping a family, which
changes the visual identity and is out of scope.
**Rejected**: `@fontsource` self-hosting (3 deps, R5); `&text=` subsetting (brittle across locales);
declarative-only re-declaration (a diff that buys nothing).

### D4 — Images

Rule: `width`/`height` set only the intrinsic ratio — CSS controls final size — so they are needed
**only where the box height is auto**.

| File:line | Image | Box fixing height | Fold | Change |
| --- | --- | --- | --- | --- |
| `layout/Header.tsx:76` | `logo.webp` 1024×1024 | `h-8` + `h-16` bar | above | none |
| `sections/HeroSection.tsx:37` | remote PNG 512×512 (394 KB) | none — inline `<picture>`, height auto | above | `width={512} height={512} loading="eager" fetchPriority="high"` |
| `sections/SobreMiSection.tsx:14` | `fotoPerfil.webp` 1126×1397 | `div.aspect-4/5` | below | `lazy` + `async` |
| `sections/ProyectosSection.tsx:45` | `proyecto-*.webp` ×6 | `article.h-112.5` | below | `lazy` + `async` |
| `sections/FormacionAcademicaSection.tsx:26` | `formacion-*.webp` ×7 | `div.h-40` | below | `lazy` + `async` |
| `sections/HobbiesSection.tsx:39–42` | `img*.webp` ×4 (1376×768) | `h-48` on `<img>` | below | `lazy` + `async` |
| `demos/ImageGalleryDemo.tsx:169` | demo screenshot | `div.aspect-16/10` | above | `eager` + `async` |
| `demos/ImageGalleryDemo.tsx:187` | thumbnails | `div.aspect-square` | below | `lazy` + `async` |
| `demos/ImageGalleryLightbox.tsx:32` | lightbox | `max-h/max-w` + `object-contain` | user-triggered | none |

Side finding (out of scope): `aspect-square md:aspect-3/2` on the inline `<picture>` is inert;
`block` would activate it but changes the desktop crop. Hero dims alone kill the pre-load CLS.
`loading="lazy"` is never combined with `fetchPriority`.

### D5 — One i18n key

`videoProject.videoUnavailable` (ES "El video no está disponible en este momento." / EN "This video
is not available right now."), used by `VideosSection` and `VideoDemo`; `i18n-parity` forces the
twin. Plain `<p>`, no `role="status"` — present on first render.

## Data Flow

```
proyectos.ts .img ──► getVideoUrl(img) ──► import.meta.env.VITE_VIDEO_BASE_URL
                          │                          │
                          ▼                          ▼
              VideosSection <video src>      GitHub Release media-v1
              DemoSection ──► VideoDemo <video src>
                          │
                          └──► getVideoPoster(img) ──► /assets/proyecto-{img}.webp
```

## Interfaces

```ts
// src/types/demo.ts — | undefined is explicit: exactOptionalPropertyTypes rejects bare undefined
readonly videos: readonly { readonly src: string; readonly titulo: string; readonly poster?: string | undefined }[];

// src/vite-env.d.ts — merges with vite/client
interface ImportMetaEnv { readonly VITE_VIDEO_BASE_URL?: string; }
```

`.env.example`: `VITE_VIDEO_BASE_URL=https://github.com/Olozano1194/Portafolio/releases/download/media-v1`
plus a comment that unset = fallback message.

## Testing Strategy

| Layer | What | How |
| --- | --- | --- |
| Unit | 12 cases below | Vitest, `vi.stubEnv` + `vi.unstubAllEnvs()` in `afterEach` |
| Integration | `/videos/3` shows the fallback when the env var is absent | `renderWithProviders(<App />, { route: '/videos/3' })` + `findByText` |
| Regression | 197 existing tests (routing smoke, i18n parity) | `npm test` |

`src/utils/__tests__/videoUrl.test.ts`:

| Case | Input | Expected |
| --- | --- | --- |
| 1–4 | `https://x.test/media`, `…/media/`, `…/media///`, `"  …/media  "` + `TaskReact` | `https://x.test/media/videos-TaskReact.mp4` |
| 5–6 | env absent; `""`; `"   "` | `undefined` |
| 7 | `example.com/media` | `undefined` |
| 8 | `/media` + `HotelAlura` | `/media/videos-HotelAlura.mp4` |
| 9 | `img === ''` | `undefined` |
| 10–11 | `getVideoPoster('HotelAlura')`; `('')` | `/assets/proyecto-HotelAlura.webp`; `undefined` |
| 12 | any input above | never throws |

## File Changes

| File | Action | Est. lines |
| --- | --- | --- |
| `src/utils/videoUrl.ts` | Create | 30 |
| `src/utils/__tests__/videoUrl.test.ts` | Create | 80 |
| `VideosSection.tsx` | URL + poster + fallback | 125 → 140 |
| `DemoSection.tsx` | build `videos[]` from helper | 120 → 132 |
| `demos/VideoDemo.tsx` | poster + empty state | 193 → 206 |
| `src/types/demo.ts` | `poster?` | 45 |
| `src/vite-env.d.ts` | `ImportMetaEnv` | 32 → 38 |
| `HeroSection.tsx` | dims + eager + priority | 51 → 52 |
| `SobreMiSection.tsx` / `ProyectosSection.tsx` / `FormacionAcademicaSection.tsx` / `HobbiesSection.tsx` | lazy + async | unchanged |
| `demos/ImageGalleryDemo.tsx` | eager main / lazy thumbs | 210 |
| `.env.example` | document env var | 6 → 10 |
| `src/locales/{es,en}/translation.json` | `videoUnavailable` | +1 each |
| `public/videos/videos-HotelAlura.mp4`, `videos-TaskReact.mp4` | Delete | −13.43 MB |

`index.html` is **not** touched (D3). No file approaches the 250-line cap. Work units (≤10):
(1) helper + tests, (2) video wiring + i18n, (3) delete mp4s + env docs + typing, (4) image hints,
(5) verification.

## Threat Matrix

N/A — no routing change, shell/subprocess, VCS/PR automation, executable classification, or process
integration.

## Migration / Rollout

1. Human creates `media-v1`, verifies `206`.
2. Env var set in `.env.local` and Vercel (production + preview).
3. Merge: wiring, `public/videos/` deletion, image hints.
4. Verify: `rg "/videos/videos-" src scripts` → 0 hits; `npm run typecheck && npm run lint && npm
   test && npm run check:size && npm run build`; `dist` < 3 MB (≈2.3 MB expected).
5. Rollback: `git revert` restores both mp4s; unset the env var.

## Open Questions

- [x] Font work unit: **dropped** — variable fonts make the sub-range a zero-byte change (D3).
- [x] `TaskReact` portrait poster: **accepted**, `object-fit: cover` hard-crops into 16:9.
- [ ] Are the videos narrated? If yes, WCAG 1.2.2 captions are a follow-up (no `.vtt` today).
- [ ] The hero is a 394 KB remote PNG upscaled on desktop — localize it in a later slice?

Skill Resolution: paths-injected — frontend-design, tailwind-css-patterns, accessibility, react-best-practices (project `.agents/skills/*/SKILL.md`)
