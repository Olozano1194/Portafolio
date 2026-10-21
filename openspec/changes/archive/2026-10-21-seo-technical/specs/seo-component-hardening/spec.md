# Delta for seo-component-hardening

Source: proposal.md → Scope §`src/components/ui/SEO.tsx`; Approach §2 SEO.tsx Hardening; Key Decisions §JSON-LD scope (Option 2, no SearchAction); Risks §meta cleanup + module-scope `window.location.origin`. No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Per-route canonical link

`SEO.tsx` MUST render `<link rel="canonical">` for the current route, built from an absolute URL normalized to scheme, host, and path — stripping query string, hash, and superfluous trailing slashes.

#### Scenario: canonical for a project route

- GIVEN the app is on `/demo/1?ref=x#top`
- WHEN SEO renders
- THEN the canonical href is `<origin>/demo/1`

#### Scenario: home canonical matches the static one

- GIVEN the route is `/`
- WHEN SEO renders
- THEN the canonical equals the static `index.html` canonical (no conflicting duplicates)

### Requirement: R2 — Per-page WebPage JSON-LD

SEO MUST inject a `WebPage` JSON-LD script whose `url` matches the canonical route and whose `isPartOf` references the `WebSite` declared statically in `index.html`.

#### Scenario: WebPage injected on navigation

- GIVEN the user navigates from `/` to `/videos/2`
- WHEN SEO's effect runs
- THEN exactly one `WebPage` JSON-LD exists with `url = <origin>/videos/2`

#### Scenario: no duplicate accumulation

- GIVEN several route changes occur
- WHEN effects run repeatedly
- THEN only the current route's `WebPage` script remains and the static Person/WebSite block is untouched

### Requirement: R3 — OG/Twitter completeness

SEO MUST additionally set `og:site_name`, `og:locale`, `og:image:alt`, `og:image:width`, `og:image:height`, `robots`, `twitter:creator`, and `twitter:site` alongside the tags it already sets.

#### Scenario: full tag set after hydration

- GIVEN a rendered route with an explicit image
- WHEN the head is inspected
- THEN all listed tags exist and `og:image:width`/`height` are numeric

#### Scenario: defaults when props are omitted

- GIVEN `SEO` receives no `title`, `description`, or `image`
- WHEN it renders
- THEN tags fall back to site name, site description, and the default profile image

### Requirement: R4 — Stale meta cleanup on unmount

SEO's effect MUST return cleanup that removes or reverts only tags SEO itself created, so route changes never leave stale values from the previous page.

#### Scenario: navigation replaces stale tags

- GIVEN route A set `og:title` to A's title
- WHEN the user navigates to route B
- THEN no managed tag still contains A's values

#### Scenario: static tags survive cleanup

- GIVEN tags authored in `index.html`
- WHEN SEO unmounts
- THEN static tags are not deleted — only SEO-managed tags are affected

### Requirement: R5 — SSR-safe SITE_URL

SEO MUST NOT read `window.location` at module scope. The site origin MUST come from `import.meta.env.VITE_SITE_URL` (or an equivalent lazily evaluated constant) so the module loads outside a browser.

#### Scenario: module loads without `window`

- GIVEN an environment without `window.location`
- WHEN the module is imported
- THEN no runtime error is thrown

#### Scenario: origin configurable per environment

- GIVEN `VITE_SITE_URL` points at a preview deployment
- WHEN canonical and OG URLs are built
- THEN they use that origin rather than a hardcoded value

### Non-functional

- No `hreflang` alternates and no `SearchAction` are emitted (proposal Non-Goals / Key Decisions). Documented as a known limitation.
