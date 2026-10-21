# Delta for sitemap-robots-generator

Source: proposal.md → Scope §Build-time generation + `public/robots.txt`; Approach §4; Key Decisions §origin = `VITE_SITE_URL` (Option 2), generation = standalone script via `prebuild` (Option 2); Acceptance Criteria 4, 5, 8. No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Single route manifest

The generator MUST derive its route list from one manifest combining static routes (`/`, `/videos/2`, `/videos/3`, `/demo/1`, `/demo/4`, `/demo/5`, `/demo/6`) with project-derived routes read from `src/data/proyectos.js`, so new projects appear without editing the generator.

#### Scenario: manifest contains all 7 crawlable URLs

- GIVEN the current `proyectos.js` data
- WHEN the manifest is built
- THEN it contains exactly the 7 routes listed in Acceptance Criteria 4

#### Scenario: new project extends the sitemap

- GIVEN a project with `videos`/`demo` entries is added to `proyectos.js`
- WHEN the generator runs
- THEN its routes appear in the manifest with no generator code change

### Requirement: R2 — Build-time generation via prebuild

A standalone Node script MUST generate the artifacts and be wired as the `prebuild` npm script, so `npm run build` (and the Vercel build) always regenerates them into `dist/`.

#### Scenario: build produces the artifacts

- GIVEN a clean checkout with `VITE_SITE_URL` set
- WHEN `npm run build` runs
- THEN `dist/sitemap.xml` and `dist/robots.txt` exist

#### Scenario: generator runs standalone

- GIVEN the script exists
- WHEN it is executed directly with Node
- THEN it writes both files without requiring the Vite build to run first

### Requirement: R3 — Origin from VITE_SITE_URL

All absolute URLs MUST use `VITE_SITE_URL` read at generation time as the single origin source; the origin MUST NOT be hardcoded, so local, preview, and production do not drift.

#### Scenario: preview deployment origin

- GIVEN `VITE_SITE_URL=https://preview.example.dev`
- WHEN the generator runs
- THEN every URL in both files starts with that origin

#### Scenario: missing variable fails loudly

- GIVEN `VITE_SITE_URL` is unset
- WHEN the generator runs
- THEN it fails with a clear error instead of emitting relative or localhost URLs

### Requirement: R4 — sitemap.xml content

`dist/sitemap.xml` MUST be valid XML listing every manifest route as an absolute `<loc>` URL, with `<lastmod>` equal to the build date and sensible `<changefreq>`/`<priority>` defaults.

#### Scenario: valid sitemap with absolute locs

- GIVEN a generated sitemap
- WHEN parsed as XML
- THEN it contains one `<url>` per route, each with an absolute `<loc>` and an ISO `<lastmod>` date

#### Scenario: only crawlable routes

- GIVEN the manifest
- WHEN the sitemap is emitted
- THEN only the 7 crawlable routes appear — no query strings and no hreflang alternates

### Requirement: R5 — robots.txt content

`dist/robots.txt` MUST allow all crawlers and reference the sitemap with an absolute URL (`Sitemap: <origin>/sitemap.xml`).

#### Scenario: robots allows and points to the sitemap

- GIVEN a generated `dist/robots.txt`
- WHEN read by a crawler
- THEN it contains `User-agent: *` with `Allow: /` and an absolute `Sitemap:` line

#### Scenario: served at origin root

- GIVEN a production deploy
- WHEN `https://<origin>/robots.txt` is fetched
- THEN the generated file is returned (Acceptance Criteria 8)

### Non-functional

- `dist/` is gitignored: artifacts are produced by the build, never committed (proposal Risks).
- No new runtime dependencies; Node built-ins + existing `src/data/proyectos.js` only (proposal Dependencies).
