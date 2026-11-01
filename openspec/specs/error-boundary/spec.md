# Spec: error-boundary

Source: proposal.md → New Capabilities §error-boundary; design.md D2, D3; tasks.md Phase 3.

## Requirements

### Requirement: R1 — Render failures show a fallback instead of a blank screen

A class component (`ErrorBoundary`) MUST catch errors thrown by its children during render or lazy import and render an accessible fallback (`role="alert"`) with a scoped message and a retry button. Healthy children MUST render untouched.

#### Scenario: child throws

- GIVEN a boundary wraps a component that throws during render
- WHEN the tree renders
- THEN the fallback with `role="alert"` replaces the children and keeps the layout around it

#### Scenario: nothing throws

- GIVEN a boundary wraps healthy children
- WHEN the tree renders
- THEN the children render and no alert is present

### Requirement: R2 — Retry recovers the page

The retry button MUST call the injected `onRetry` when present, and fall back to `window.location.reload()` otherwise. A reload is required because `React.lazy` memoises a rejected import, so resetting state cannot retry a failed chunk.

#### Scenario: injected handler

- GIVEN a boundary receives `onRetry`
- WHEN the retry button is pressed
- THEN `onRetry` is called once

#### Scenario: no injected handler

- GIVEN a boundary receives no `onRetry`
- WHEN the retry button is pressed
- THEN the page reloads (verified manually in the preview build)

### Requirement: R3 — Failures are logged

`componentDidCatch` MUST report the error through `console.error`. External reporting is out of scope for this slice.

#### Scenario: error is logged

- GIVEN a child throws
- WHEN the boundary catches it
- THEN `console.error` receives the error and its component stack

### Requirement: R4 — One boundary per route element, remounted by pathname

Each route element and the contact form MUST be wrapped in its own boundary, and route boundaries MUST be keyed by `pathname`, so a failure on one route does not stick to the next one and Header/Footer stay usable.

#### Scenario: navigation clears a previous failure

- GIVEN `/demo/1` failed and shows the fallback
- WHEN the user navigates to `/demo/2`
- THEN the boundary remounts and the new route renders its content

### Requirement: R5 — Fallback copy lives in both locales

Every fallback string (`errorBoundary.*`) MUST exist in `es` and `en`; the `i18n-parity` test enforces the match.

#### Scenario: locale parity

- GIVEN both locale files
- WHEN the parity test runs
- THEN `errorBoundary` has the same keys in `es` and `en`

### Non-functional

- No new dependency: the boundary is hand-written (design D2, AGENTS.md R5).
- The retry button receives focus when the fallback mounts, so the keyboard path keeps working.
