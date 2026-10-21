# Tasks: Testing Coverage & CI

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1,200–1,500 authored (13 test files + 2 utils + config/CI/deletion; lockfile generated, excluded) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 → PR 4 → PR 5 |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Harness fixes + coverage tooling | PR 1 | `npm run test && npm run test:coverage` | Existing 22-test vitest suite (real run) | Revert `vitest.config.ts`, `src/test/setup.js`, `package.json` + lockfile |
| 2 | Shared utils + Tier 1 pure-logic tests | PR 2 | `npm run test -- src/test src/types src/utils src/hooks` | Vitest jsdom (real run) | Delete new `src/test/{i18n.tsx,mocks.ts}` + Tier 1 `__tests__` files (purely additive) |
| 3 | Tier 2 behavioral tests | PR 3 | `npm run test -- src/components src/pages src/__tests__` | RTL + `userEvent` via vitest (real run) | Delete component `__tests__` files |
| 4 | i18n parity + dead-code deletion | PR 4 | `npm run test && npm run typecheck` | Vitest + `grep -r LanguageSwitcher src/` | Restore parity test + `LanguageSwitcher.tsx` |
| 5 | CI rename + test/build gates | PR 5 | `npm run test && npm run lint && npm run build` | GitHub Actions run on push/PR (real scenario) | Revert `ci.yml` → `typecheck.yml` |

Units 2–3 estimate 400–500 lines each — sub-split if the reviewer enforces the budget strictly.

## Phase 1: Test Harness (test-harness)

- **1.1 — Vitest config migration** · deps: `[]` · refs: test-harness R3 · est: 0.75h
  - Desc: Replace `vitest.config.js` with `vitest.config.ts` via `mergeConfig(vite.config.ts, { test, coverage })` — single source of truth for `@` alias/plugins.
  - AC: Test importing a value via `@/` resolves; `npm run typecheck` passes.
- **1.2 — Setup flag + jsdom polyfills** · deps: `[]` · refs: test-harness R1, R2 · est: 0.75h
  - Desc: `src/test/setup.js`: set `globalThis.IS_REACT_ACT_ENVIRONMENT = true`; stub `scrollTo`, `matchMedia`, `IntersectionObserver`, `ResizeObserver`, `requestAnimationFrame`; reset localStorage per test.
  - AC: `npm run test` emits zero act warnings; no "Not implemented" errors.
- **1.3 — Existing suite gate** · deps: `["1.1", "1.2"]` · refs: test-harness R1–R3 scenarios · est: 0.25h
  - Desc: Run the full existing suite after harness changes; fix regressions without touching test assertions.
  - AC: 22/22 existing tests green, zero act warnings.

## Phase 2: Coverage Tooling (coverage-tooling)

- **2.1 — Provider + script + lockfile** · deps: `["1.1"]` · refs: coverage-tooling R1, R2 · est: 0.5h
  - Desc: Add `@vitest/coverage-v8` devDep (version-matched to vitest 3.2.x), `test:coverage` script (`vitest run --coverage`) in `package.json`; commit `package-lock.json`.
  - AC: `npm ci` succeeds clean; `npm ls @vitest/coverage-v8` reports it; report summary prints.
- **2.2 — Exclude noise, no gate** · deps: `["2.1"]` · refs: coverage-tooling R3, R4; dead-code-removal R2 · est: 0.5h
  - Desc: In `vitest.config.ts` set `coverage.exclude`: `src/data/**`, `src/types/**`, `src/locales/**`, `src/main.tsx`, `src/i18n.ts`, `**/*.d.ts`, `**/__tests__/**`; NO thresholds, no `LanguageSwitcher` entry.
  - AC: `npm run test:coverage` exits 0 regardless of %; excluded paths absent from report.

## Phase 3: Shared Test Utilities (design; tier2 non-functional)

- [x] **3.1 — `src/test/i18n.tsx`** · deps: `["1.3"]` · refs: tier2 non-functional; design data flow · est: 0.75h
  - Desc: Create `createTestI18n(lng)` (real `src/locales/{es,en}/translation.json`, `escapeValue: false`) + `renderWithProviders(ui, { route, lng })` wrapping I18nextProvider + MemoryRouter.
  - AC: Renders a component in ES and EN with shipped strings; `route` option sets initial entry.
- [x] **3.2 — `src/test/mocks.ts`** · deps: `["1.3"]` · refs: design shared-utilities decision · est: 0.5h
  - Desc: Export `toastModuleMock` (`default.success/error/loading`, `toast`, `Toaster: () => null`) for use via async `vi.mock` factory.
  - AC: `tsc --noEmit` clean; mock shape satisfies `react-hot-toast` usages.

## Phase 4: Tier 1 Pure-Logic Tests (tier1-pure-logic-tests)

- **4.1 — `src/types/__tests__/routing.test.ts`** · deps: `["1.3"]` · refs: tier1 R1 · est: 1.0h
  - Desc: Cover `getParam`, `getParamAsNumber`, `getParamOptional`. Per design open question: keep fail-fast code, assert throw on NaN (spec fallback wording amended).
  - AC: `id=42` → 42; `id=abc` → throws (not NaN); absent optional → documented default.
- **4.2 — Guard tests: `demo.test.ts` + `proyecto.test.ts`** · deps: `["1.3"]` · refs: tier1 R2 · est: 0.75h
  - Desc: In `src/types/__tests__/`: valid shapes accepted, malformed (missing fields / wrong types) rejected.
  - AC: Valid fixture → true; each malformed fixture → false.
- **4.3 — `src/types/__tests__/skill.test.ts`** · deps: `["1.3"]` · refs: tier1 R3 · est: 0.5h
  - Desc: `skillLevelLabel` maps every valid level to a non-empty label; unknown/out-of-range returns defined fallback.
  - AC: All levels covered; unknown input does not throw.
- **4.4 — `src/utils/__tests__/scrollToSection.test.ts`** · deps: `["1.3"]` · refs: tier1 R4 · est: 0.5h
  - Desc: Spy on scroll API; target-present scrolls toward element, target-missing is a silent no-op.
  - AC: Existing id → scroll called; missing id → no throw, no scroll.
- **4.5 — `src/hooks/__tests__/useTheme.test.ts`** · deps: `["1.3"]` · refs: tier1 R5 · est: 0.75h
  - Desc: Via `renderHook`: toggle flips state + document + localStorage; persisted dark value restored on init.
  - AC: Toggle persists to localStorage; pre-seeded value becomes initial state.

## Phase 5: Tier 2 Behavioral Tests (tier2-behavioral-tests)

- **5.1 — `src/components/layout/__tests__/Header.test.tsx`** · deps: `["3.1"]` · refs: tier2 R1 · est: 1.5h
  - Desc: Nav link click, language toggle (ES→EN real strings), theme toggle persists, mobile Disclosure open/close — via `renderWithProviders` + `userEvent.setup()`.
  - AC: Language switch shows EN copy; theme persists; Disclosure toggles visibility.
- **5.2 — `src/components/sections/__tests__/ProyectosSection.test.tsx`** · deps: `["3.1"]` · refs: tier2 R2 · est: 0.75h
  - Desc: Show-all expands collapsed list to full set; second activation collapses to initial subset.
  - AC: 4 → N → 4 project visibility assertions pass.
- **5.3 — `src/pages/__tests__/Error404.test.tsx`** · deps: `["3.1"]` · refs: tier2 R3 · est: 0.5h
  - Desc: Home affordance activates → router navigates to `/` and home view renders.
  - AC: On unknown route, click → `/` rendered in MemoryRouter.
- **5.4 — `src/__tests__/App.test.tsx`** · deps: `["3.1"]` · refs: tier2 R4 · est: 0.75h
  - Desc: Routing smoke: `/` renders landing content; `/this-route-does-not-exist` renders Error404.
  - AC: Both routes render expected views without errors.
- **5.5 — `src/components/ui/__tests__/SEO.test.tsx`** · deps: `["3.1"]` · refs: tier2 R5 · est: 0.5h
  - Desc: Inspect document head after render: title, meta description, `og:*` present and non-empty.
  - AC: All three metadata groups asserted non-empty.
- **5.6 — `src/components/ui/__tests__/ScrollToTop.test.tsx`** · deps: `["3.1"]` · refs: tier2 R6 · est: 0.75h
  - Desc: Route change triggers `window.scrollTo({top:0})` (spied); `state.scrollTo` path mocks `scrollToSection`.
  - AC: Navigation calls scroll-to-top; state-driven path invokes mocked `scrollToSection`.

## Phase 6: i18n Parity (i18n-parity-test)

- **6.1 — `src/test/__tests__/i18n-parity.test.ts`** · deps: `["1.3"]` · refs: i18n-parity R1, R2 · est: 0.75h
  - Desc: Flatten ES/EN JSONs to dot-paths, set-diff, fail listing every missing/extra path (key sets only; string values out of scope).
  - AC: Passes on current locales; temporarily removing a nested EN key fails naming `contact.form.errors.*` (restore after).

## Phase 7: Dead Code Removal (dead-code-removal)

- **7.1 — Delete `LanguageSwitcher`** · deps: `["5.1"]` · refs: dead-code-removal R1 · est: 0.5h
  - Desc: `grep -r LanguageSwitcher src/` must be zero-ref, then delete `src/components/language/LanguageSwitcher.tsx` + empty dir.
  - AC: Grep returns nothing; Header language-toggle tests still green.
- **7.2 — No bespoke exclude** · deps: `["2.2", "7.1"]` · refs: dead-code-removal R2 · est: 0.25h
  - Desc: Review `coverage.exclude` in `vitest.config.ts` — generic excludes only.
  - AC: No exclude entry names `LanguageSwitcher`.

## Phase 8: CI + Final Gate (ci-test-step)

- [x] **8.1 — Rename workflow + add gates** · deps: `["7.1"]` · refs: ci-test-step R1–R4 · est: 1.0h
  - Desc: `.github/workflows/typecheck.yml` → `ci.yml`; `name: CI`; `node-version: '22'` (npm cache); steps: checkout → setup-node → `npm ci` → typecheck → lint → `npm run test` → `npm run build`; keep push + pull_request triggers.
  - AC: Only `ci.yml` exists; failing test blocks PR; build step fails on broken build; Node 22 installed.
- [x] **8.2 — Full verification run** · deps: `["8.1"]` · refs: all domains · est: 0.25h
  - Desc: Clean-install full gate on final state.
  - AC: `npm ci && npm run test && npm run test:coverage && npm run typecheck && npm run lint && npm run build` all exit 0.