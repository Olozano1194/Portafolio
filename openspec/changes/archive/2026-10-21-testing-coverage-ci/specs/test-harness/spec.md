# Delta for test-harness

Source: proposal.md → Scope §1 (Test harness fixes); Risks: act warnings, jsdom gaps, `@` alias. No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — React act environment flag

Test setup MUST set `globalThis.IS_REACT_ACT_ENVIRONMENT = true` before any test executes, so React 19 flushes state updates inside `act(...)` and emits no environment warnings.

#### Scenario: act warnings eliminated

- GIVEN the full test suite runs in the Vitest jsdom environment
- WHEN `npm run test` executes the existing ContactoSection submit tests
- THEN no "testing environment is not configured to support act(...)" warning appears on stderr
- AND state updates triggered inside `act(...)` are flushed deterministically

### Requirement: R2 — jsdom polyfills in setup

Test setup MUST polyfill the browser APIs jsdom does not implement — `window.scrollTo`, `window.matchMedia`, `IntersectionObserver`, `ResizeObserver`, and `requestAnimationFrame` — so components relying on them render and interact without throwing or silently no-oping.

#### Scenario: scroll-dependent component renders

- GIVEN a component calls `window.scrollTo` (or `scrollIntoView`) on mount or interaction
- WHEN it renders under the test setup
- THEN no "Not implemented" error is thrown

#### Scenario: media-query and observer-dependent component renders

- GIVEN a component reads `window.matchMedia` or constructs `IntersectionObserver`/`ResizeObserver`
- WHEN it renders under the test setup
- THEN the APIs return functional stubs and the component renders successfully

### Requirement: R3 — `@` import alias resolves in Vitest

The Vitest configuration MUST resolve the `@` alias to `src/`, because `vitest.config` overrides `vite.config` and does not inherit its aliases. This is currently latent (all `@/` imports are type-only) but any value import would hard-fail module resolution.

#### Scenario: value import via alias

- GIVEN a test or tested module imports a value via `@/...`
- WHEN Vitest resolves the module
- THEN resolution succeeds without "Cannot find module" errors

#### Scenario: existing type-only imports keep working

- GIVEN existing files use `import type ... from '@/...'`
- WHEN typecheck and tests run
- THEN both still pass with no new errors
