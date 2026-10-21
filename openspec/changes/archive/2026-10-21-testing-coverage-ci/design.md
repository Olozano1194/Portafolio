# Design: Testing Coverage & CI

## Technical Approach

Staged, additive hardening of the existing Vitest setup: fix the harness first (act flag, jsdom polyfills, `@` alias), layer coverage tooling (report-only), add shared test utilities, then Tier 1 (pure logic), Tier 2 (behavioral), and i18n-parity tests; delete dead code; fold tests into a renamed `ci.yml`. No production behavior changes; the existing 22 tests stay untouched. Maps to specs: test-harness, coverage-tooling, tier1-pure-logic-tests, tier2-behavioral-tests, i18n-parity-test, ci-test-step, dead-code-removal.

## Architecture Decisions

### Config & alias (test-harness R3)

| Option | Tradeoff | Decision |
|---|---|---|
| Add `resolve.alias` inline to `vitest.config.js` | Minimal diff; alias duplicated in two configs, can drift | Rejected |
| Migrate to `vitest.config.ts` + `mergeConfig(viteConfig, { test })` | Single source of truth for alias/plugins; tailwind plugin loads in test env but is inert (no CSS imports in tested modules) | ✅ Chosen |
| Vitest-only `test.alias` | Still duplicates the alias | Rejected |

### Shared utilities (tier2 Non-functional, i18n-parity)

| Option | Tradeoff | Decision |
|---|---|---|
| Per-file i18n mocks (status quo) | Drift confirmed: mock `email.pattern` ≠ shipped EN string | Rejected |
| Canonical mock-map module | One map, but still a fake the app never runs | Partial |
| Real locale resources: `createTestI18n()` + `renderWithProviders()` | Assertions use shipped strings; enables language-switch tests; eliminates drift | ✅ Chosen |
| Toast via `vi.mock('react-hot-toast', async () => (await import('@/test/mocks')).toastMock)` | `vi.mock` hoisting forbids top-level refs; async factory is the sanctioned pattern | ✅ Chosen |

### CI (ci-test-step)

Single job on renamed `ci.yml`: checkout → setup-node `22` (cache npm) → `npm ci` → typecheck → lint → test → build. Parallel jobs/matrix rejected (portfolio scale; one ordered job is fail-fast and simplest). CI runs plain `npm run test`; coverage stays local until thresholds are ratcheted (coverage-tooling R4: report-only).

### Coverage (coverage-tooling)

`@vitest/coverage-v8` (version-matched to vitest 3.2.x); `test:coverage` = `vitest run --coverage`; `coverage.exclude`: `src/data/**`, `src/types/**`, `src/locales/**`, `src/main.tsx`, `src/i18n.ts`, `**/*.d.ts`, `**/__tests__/**`; no thresholds; no `LanguageSwitcher`-specific exclude (dead-code-removal R2 — it's deleted, not excluded).

## Data Flow

    renderWithProviders(ui, { route, lng })
      ├─ createTestI18n(lng) ──► real src/locales/{es,en}/translation.json
      └─ I18nextProvider + MemoryRouter(initialEntries=[route])
             └──► RTL render ──► Header / App / Error404 / …

    i18n-parity.test:  es.json ─┐
                                 ├─► flatten(dot-paths) ─► set diff ─► fail lists missing/extra paths
                     en.json ───┘

## File Changes

| File | Action | Description |
|---|---|---|
| `vitest.config.js` → `vitest.config.ts` | Replace | `mergeConfig` with `vite.config.ts` (alias, react plugin) + `test` block + `coverage` excludes |
| `src/test/setup.js` | Modify | `globalThis.IS_REACT_ACT_ENVIRONMENT = true`; stubs: `scrollTo`, `matchMedia`, `IntersectionObserver`, `ResizeObserver`, `requestAnimationFrame`; localStorage reset |
| `src/test/i18n.tsx` | Create | `createTestI18n(lng)`, `renderWithProviders` |
| `src/test/mocks.ts` | Create | `toastModuleMock` (success/error/Toaster) |
| `src/test/__tests__/i18n-parity.test.ts` | Create | ES/EN key-set diff with dot-path output |
| `package.json`, `package-lock.json` | Modify | devDep `@vitest/coverage-v8`; `test:coverage` script; lockfile committed |
| `src/types/__tests__/{routing,demo,proyecto,skill}.test.ts` | Create | Tier 1 R1–R3 |
| `src/utils/__tests__/scrollToSection.test.ts` | Create | Tier 1 R4 |
| `src/hooks/__tests__/useTheme.test.ts` | Create | Tier 1 R5 (via `renderHook`) |
| `src/components/layout/__tests__/Header.test.tsx` | Create | Tier 2 R1 |
| `src/components/sections/__tests__/ProyectosSection.test.tsx` | Create | Tier 2 R2 |
| `src/pages/__tests__/Error404.test.tsx` | Create | Tier 2 R3 |
| `src/__tests__/App.test.tsx` | Create | Tier 2 R4 routing smoke |
| `src/components/ui/__tests__/{SEO,ScrollToTop}.test.tsx` | Create | Tier 2 R5–R6 |
| `.github/workflows/typecheck.yml` → `ci.yml` | Rename + Modify | `name: CI`; `node-version: '22'`; add `npm run test` + `npm run build` |
| `src/components/language/LanguageSwitcher.tsx` (+ empty dir) | Delete | Dead code; zero imports verified via grep |

All tests co-located in `__tests__/` dirs to respect ESLint `max-lines: 250` and strict `tsc --noEmit` over `src/`.

## Interfaces / Contracts

```ts
// src/test/i18n.tsx
createTestI18n(lng: 'es' | 'en'): i18n.Instance        // real JSONs, escapeValue: false
renderWithProviders(ui: ReactElement, opts?: { route?: string; lng?: 'es' | 'en' }): RenderResult
// src/test/mocks.ts
toastModuleMock: { default: { success; error; loading }, toast, Toaster: () => null }
```

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | routing params, demo/proyecto guards, `skillLevelLabel`, `scrollToSection`, `useTheme`, i18n parity | vitest; spies (`window.scrollTo`, `getBoundingClientRect`), `renderHook`, localStorage fixtures; parity test runs node-environment with real JSONs |
| Integration | Header (nav/lang/theme/Disclosure), ProyectosSection (4→N→4), Error404 (navigate `/`), App (`/` and unknown), SEO (title/meta/og non-empty), ScrollToTop (`scrollTo({top:0})`; `state.scrollTo` path mocks `scrollToSection`) | RTL + `userEvent.setup()` via `renderWithProviders` |
| E2E | None — out of scope | — |

## Threat Matrix

N/A — no routing-config, shell-command composition, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. The CI workflow contains only fixed, repo-authored npm scripts; no user input reaches a shell. No matrix RED tests required.

## Migration / Rollout

1. Harness (`setup.js` + `vitest.config.ts`) → verify existing 3 suites green, zero act warnings.
2. Coverage tooling → `npm run test:coverage` exits 0.
3. Shared utils (`src/test/i18n.tsx`, `mocks.ts`) — purely additive.
4. Tier 1 tests → 5. Tier 2 tests → 6. i18n parity test.
7. Delete `LanguageSwitcher` (grep-clean) → 8. CI rename + test/build steps last, on a green suite.

No breaking changes: ContactoSection/HeroSection suites keep their local mocks; migrating them to shared helpers is an optional follow-up. Lockfile committed with `@vitest/coverage-v8` so `npm ci` succeeds.

## Open Questions

- Tier 1 R1 scenario specifies `getParamAsNumber('id', fallback)` returning a fallback; the real signature is `(params, key)` and throws on NaN (`src/types/routing.ts`). Recommendation: keep the fail-fast code, assert the throw, and amend the spec scenario wording. Not blocking.
