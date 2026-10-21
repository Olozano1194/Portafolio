# Delta for index-html-static

Source: proposal.md → Scope §`index.html`; Approach §1 Static-First index.html; Key Decisions §JSON-LD scope (Option 2: static Person + WebSite). No existing main spec for this domain — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Document language is Spanish at serve time

`index.html` MUST declare `<html lang="es">`, matching i18n `lng`/`fallbackLng: 'es'`, so the served document is correctly labeled before any JavaScript executes.

#### Scenario: served HTML declares Spanish

- GIVEN the built `dist/index.html`
- WHEN a crawler fetches a route before hydration
- THEN `<html>` carries `lang="es"`

#### Scenario: no mismatch with i18n defaults

- GIVEN `src/i18n.ts` defaults to `es`
- WHEN the static attribute is compared with the i18n configuration
- THEN both resolve to `es`

### Requirement: R2 — Static identity meta tags

The static `<head>` MUST contain non-empty `title`, `meta name="description"`, and `meta name="robots"` tags that are complete without JavaScript.

#### Scenario: metadata readable without JS

- GIVEN a fetch of `/` with scripts disabled
- WHEN the HTML head is inspected
- THEN `title`, `description`, and `robots` are present and `robots` permits indexing

### Requirement: R3 — Static OG/Twitter identity tags

The static `<head>` MUST include `og:site_name`, `og:locale`, `og:type`, `og:title`, `og:description`, `og:image` (absolute URL), `og:url`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`, because social scrapers do not execute JavaScript.

#### Scenario: social preview without JS

- GIVEN a scraper reads only the served HTML
- WHEN OG/Twitter tags are parsed
- THEN site name, locale, and an absolute image URL are present

### Requirement: R4 — Static canonical for home

The static `<head>` MUST declare `<link rel="canonical">` pointing to the absolute production origin root (`https://<origin>/`).

#### Scenario: canonical resolves to origin root

- GIVEN the canonical tag in served HTML
- WHEN its href is resolved
- THEN it equals the absolute origin with trailing slash and no query or hash

### Requirement: R5 — Static Person + WebSite JSON-LD

`index.html` MUST embed a `<script type="application/ld+json">` block containing a `Person` node (name, jobTitle, url, image, sameAs GitHub/LinkedIn) and a `WebSite` node (name, url, inLanguage), crawlable without JavaScript.

#### Scenario: structured data present at serve time

- GIVEN HTML fetched with scripts disabled
- WHEN the JSON-LD script is parsed
- THEN it yields valid `Person` and `WebSite` objects with absolute URLs

#### Scenario: syntactically valid JSON

- GIVEN the JSON-LD block is emitted at build time
- WHEN a structured-data validator parses it
- THEN it succeeds (no trailing commas or template artifacts)

### Requirement: R6 — Apple touch icon

The static `<head>` MUST reference an `apple-touch-icon`, since only a 16×16 favicon exists today.

#### Scenario: icon declared

- GIVEN the served HTML
- WHEN the head is inspected
- THEN a `<link rel="apple-touch-icon">` with a resolvable href exists
