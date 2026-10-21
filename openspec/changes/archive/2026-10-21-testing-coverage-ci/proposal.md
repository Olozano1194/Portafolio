# SDD Change Proposal: testing-coverage-ci

## Intent
Add meaningful test coverage and a CI test step for the portfolio project. Establish a trustworthy test harness, coverage tooling, and a staged testing strategy that catches real regressions without blocking development.

## Scope

### In Scope
1. **Test harness fixes**
   - Set `globalThis.IS_REACT_ACT_ENVIRONMENT = true` in `src/test/setup.js` (required for React 19)
   - Add jsdom polyfills: `window.scrollTo`, `matchMedia`, `IntersectionObserver`, `ResizeObserver`, `requestAnimationFrame`
   - Add `@` alias resolution in `vitest.config.js` (or migrate to `vitest.config.ts` with `mergeConfig` from `vitest/config`)

2. **Coverage tooling**
   - Install `@vitest/coverage-v8` as devDependency
   - Add `test:coverage` script to `package.json`
   - Configure `coverage.exclude` for: `src/data/**`, `src/types/**`, `src/locales/**`, `src/main.tsx`, `src/i18n.ts`, `**/*.d.ts`, `**/__tests__/**`, dead code
   - Commit updated `package-lock.json`

3. **Tier 1: Pure-logic tests** (high defect-detection, low ceremony)
   - `types/routing.ts` — `getParam`, `getParamAsNumber`, `getParamOptional`
   - `types/demo.ts` / `types/proyecto.ts` — type guards
   - `types/skill.ts` — `skillLevelLabel`
   - `utils/scrollToSection.ts`
   - `hooks/useTheme.ts`

4. **Tier 2: Behavioral component tests** (real interaction paths)
   - `Header` — nav click, language toggle, theme toggle, mobile Disclosure
   - `ProyectosSection` — show-all toggle
   - `Error404` — navigate home
   - `App` — routing smoke test
   - `SEO` — meta tags rendered
   - `ScrollToTop` — scrolls on route change

5. **i18n parity test**
   - Assert ES and EN `translation.json` have identical key sets (would have caught the email-pattern drift)

6. **CI test step**
   - Extend existing `.github/workflows/typecheck.yml` → rename to `ci.yml`
   - Add `npm run test` step (and optionally `npm run build` to match spec quality gate)

### Non-Goals (separate changes)
- Blog section
- Testimonials section
- Animations / motion
- PWA / offline support
- Error boundary wrapper

## Approach
**Staged, low-friction; ratcheting thresholds later.**

1. **Harness fixes first** — make existing tests trustworthy (fix `act(...)` warnings, jsdom gaps, `@` alias)
2. **Coverage tooling second** — install `@vitest/coverage-v8`, add script, configure excludes, report only (no gate)
3. **Tier 1 + Tier 2 tests + i18n parity** — highest defect-detection per effort
4. **CI integration** — add `npm run test` to workflow, rename to `ci.yml`
5. **Ratchet thresholds** — start report-only, then set modest global floor once coverage is meaningful

## Key Decisions Needed

| Decision | Options | Recommendation |
|----------|---------|----------------|
| **Coverage thresholds strategy** | 1) Report only (no gate)<br>2) Global threshold (e.g. 80%)<br>3) Ratcheting floor (start ~40-50%)<br>4) Per-file for critical logic | **Option 1 now → Option 3 later** |
| **Component prioritization** | 1) Pure logic first<br>2) Behavioral components next<br>3) Demo/detail pages last<br>4) Render smoke for rest | **Tier 1 + Tier 2 first** (see Scope) |
| **CI integration approach** | 1) Extend existing workflow (rename `ci.yml`)<br>2) Separate `test.yml`<br>3) Codecov upload | **Option 1** — one workflow, matches quality gate |
| **Handling dead code (`LanguageSwitcher`)** | 1) Test it<br>2) Delete it<br>3) Exclude from coverage | **Option 2** — delete (Header has inline toggle) |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| `act(...)` warnings hide state bugs | Tests pass for wrong reasons | Set `IS_REACT_ACT_ENVIRONMENT = true` first |
| `@` alias not inherited by vitest | Hard blocker when value imports use `@/` | Add `resolve.alias` to `vitest.config.js` |
| i18n mock drift (already present) | Tests assert strings app never renders | Shared i18n helper + parity test |
| jsdom gaps (`scrollTo`, `requestAnimationFrame`, etc.) | Components fail or silently no-op | Polyfills in `setup.js` |
| Strict TS in tests (`noUnusedLocals`, etc.) | CI fails on sloppy test code | Write clean tests; use `vi.hoisted`, proper typing |
| Test speed (~23s for 22 tests) | CI slowdown as coverage grows | Tune `pool`/threads; prefer `fireEvent` for long sequences |
| `max-lines: 250` ESLint near limit on demos | Adding tests to component files pushes over | Keep tests in separate `__tests__` files |
| `npm ci` fails without updated `package-lock.json` | Blocked CI | Commit lockfile with `@vitest/coverage-v8` |
| Node version (Vite 8 needs 20.19+/22.12+) | Future CI breakage | Pin `node-version: '22'` in workflow |

## Success Criteria
- `npm run test` passes with zero `act(...)` warnings
- `npm run test:coverage` produces meaningful report (≥60% statements on Tier 1 + Tier 2 targets)
- CI runs `typecheck` + `lint` + `test` + `build` on every PR
- i18n parity test catches key drift between ES/EN
- No dead code tested (LanguageSwitcher removed)

## Effort Estimate
- **Harness + coverage tooling**: ~2-3 hours
- **Tier 1 tests (pure logic)**: ~3-4 hours
- **Tier 2 tests (behavioral)**: ~4-6 hours
- **i18n parity test + shared helper**: ~1-2 hours
- **CI integration**: ~1 hour
- **Total**: ~11-16 hours (Medium)