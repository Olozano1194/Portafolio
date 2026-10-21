# Delta for tier2-behavioral-tests

Source: proposal.md → Scope §4; Key Decisions: behavioral components second; Risks: i18n mock drift (shared provider helper). No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Header interaction coverage

Header MUST have behavioral tests for nav link click, language toggle, theme toggle, and the mobile menu Disclosure.

#### Scenario: language toggle switches copy

- GIVEN the app renders in ES
- WHEN the user activates the language toggle
- THEN visible strings switch to EN

#### Scenario: theme toggle from Header

- GIVEN the Header is rendered
- WHEN the theme toggle is activated
- THEN the app theme flips and persists (per useTheme contract)

#### Scenario: mobile Disclosure opens and closes

- GIVEN a mobile viewport
- WHEN the user activates the menu toggle
- THEN the nav panel becomes visible; activating it again hides the panel

### Requirement: R2 — ProyectosSection show-all toggle

ProyectosSection MUST be tested for the show-all/collapse behavior of the project list.

#### Scenario: reveal all projects

- GIVEN the project list is collapsed to a subset
- WHEN the user activates "show all"
- THEN previously hidden projects become visible

#### Scenario: collapse again

- GIVEN the project list is fully expanded
- WHEN the user activates the toggle again
- THEN the list returns to the initial subset

### Requirement: R3 — Error404 navigation home

Error404 MUST be tested so its "go home" affordance navigates to the root route.

#### Scenario: navigate home

- GIVEN the user is on an unknown route
- WHEN the home link/button is activated
- THEN the router navigates to `/` and the home view renders

### Requirement: R4 — App routing smoke tests

App MUST have routing smoke tests: the root route renders landing content; an unknown route renders Error404.

#### Scenario: root route renders home

- GIVEN MemoryRouter is at `/`
- WHEN App renders
- THEN the landing/home section renders without errors

#### Scenario: unknown route renders 404

- GIVEN MemoryRouter is at `/this-route-does-not-exist`
- WHEN App renders
- THEN Error404 renders

### Requirement: R5 — SEO meta tags rendered

SEO MUST be tested for rendered document metadata (title, description, Open Graph tags).

#### Scenario: meta tags present

- GIVEN App (including SEO) renders
- WHEN the document head is inspected
- THEN title, meta description, and `og:*` tags are present and non-empty

### Requirement: R6 — ScrollToTop route-change scroll

ScrollToTop MUST be tested so a route change triggers a scroll-to-top.

#### Scenario: scroll on navigation

- GIVEN the user is scrolled down on one route
- WHEN navigation to another route occurs
- THEN `window.scrollTo` (or the equivalent) is called to return to the top

### Non-functional

- Component tests MUST render through a shared provider wrapper (MemoryRouter + i18n) instead of per-file ad-hoc mocks; asserted i18n strings MUST come from the real locale files or one canonical map to prevent mock drift (see i18n-parity-test spec).
- Tests MUST live in separate `__tests__` files to respect the `max-lines: 250` ESLint cap on component files.
