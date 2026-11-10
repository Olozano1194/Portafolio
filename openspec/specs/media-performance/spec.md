# Spec: media-performance

Source: `openspec/changes/media-assets-performance` → New capability `media-performance`

## Requirements

### Requirement: R1 — Video URLs resolve from one environment variable

Project video URLs MUST be built by `getVideoUrl(img)` in `src/utils/videoUrl.ts` from
`import.meta.env.VITE_VIDEO_BASE_URL` plus the `videos-{img}.mp4` file name, so no mp4 file ships in
`dist`. The helper MUST return `undefined` when the env var is missing, blank, or not an absolute
`http(s)` / root-relative URL, and MUST NOT throw for any input.

#### Scenario: absolute base with redundant trailing slashes

- GIVEN `VITE_VIDEO_BASE_URL` is `https://x.test/media///`
- WHEN `getVideoUrl('TaskReact')` is called
- THEN it returns `https://x.test/media/videos-TaskReact.mp4`

#### Scenario: unset or unusable base

- GIVEN `VITE_VIDEO_BASE_URL` is unset, blank, or `example.com/media`
- WHEN `getVideoUrl('TaskReact')` is called
- THEN it returns `undefined` instead of a broken or route-relative URL

### Requirement: R2 — Video sections degrade to a localized message

When `getVideoUrl` returns `undefined`, `VideosSection` and `VideoDemo` MUST render the
`videoProject.videoUnavailable` paragraph instead of a player. They MUST NOT render a `<video>`
element or a source with an empty `src`, and both locales MUST define the same key.

#### Scenario: video route without a configured base

- GIVEN `VITE_VIDEO_BASE_URL` is empty
- WHEN `/videos/3` renders in Spanish
- THEN the page shows "El video no está disponible en este momento."
- AND no `<video>` element is present

#### Scenario: demo route without a configured base

- GIVEN `VITE_VIDEO_BASE_URL` is empty
- WHEN a video demo route renders
- THEN `DemoSection` passes an empty `videos` list
- AND `VideoDemo` renders the fallback paragraph and no carousel arrows

### Requirement: R3 — Every video reuses its project poster

Each video item MUST carry `poster` from `getVideoPoster(img)` → `/assets/proyecto-{img}.webp`,
rendered with `object-fit: cover`, so the first paint shows an image while the video metadata loads.
An empty `img` MUST omit the attribute rather than point at a placeholder.

#### Scenario: poster derived from the project image

- GIVEN the project image key is `HotelAlura`
- WHEN `getVideoPoster('HotelAlura')` is called
- THEN it returns `/assets/proyecto-HotelAlura.webp`

#### Scenario: missing project image

- GIVEN the project image key is empty
- WHEN `getVideoPoster('')` is called
- THEN it returns `undefined` and the `poster` attribute is omitted

### Requirement: R4 — Images declare loading hints and reserve their space

Above-the-fold media MUST load eagerly with a priority hint; below-the-fold images MUST load lazily
with async decoding. An image whose container does not fix the height MUST declare intrinsic
`width`/`height` so no layout shift happens before the bytes arrive. `loading="lazy"` MUST NOT be
combined with `fetchPriority`.

#### Scenario: hero image reserves space

- GIVEN the home page renders
- WHEN the hero image is inspected
- THEN it carries `width="512"`, `height="512"`, and `fetchpriority="high"`

#### Scenario: below-the-fold images are deferred

- GIVEN the about, projects, education, hobbies, and gallery thumbnail images render
- WHEN they are inspected
- THEN each carries `loading="lazy"` and `decoding="async"`

## Non-functional

- No new dependency, no font change (`index.html` untouched), and no `srcset`/`sizes` (no image
  variants exist today).
- Removing `public/videos/*.mp4` is gated on the `media-v1` release answering HTTP 206 for both
  assets; until then the fallback message is the degraded-but-safe state.

Skill Resolution: paths-injected — cognitive-doc-design (user-level `.agents/skills/*/SKILL.md`)