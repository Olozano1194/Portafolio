# Tasks: Setup Testing Infrastructure

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~70–90 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Infrastructure

- [x] 1.1 Install devDependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`
- [x] 1.2 Add scripts to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`

## Phase 2: Configuration

- [x] 2.1 Create `vitest.config.js` at project root with jsdom environment, react plugin, and setup file path
- [x] 2.2 Create `src/test/setup.js` importing `@testing-library/jest-dom/vitest`

## Phase 3: First Test

- [x] 3.1 Create `src/components/sections/__tests__/HeroSection.test.jsx`
- [x] 3.2 Mock `react-i18next` `useTranslation` to return `{ t: (key) => key }`
- [x] 3.3 Mock `scrollToSection` via `vi.fn()`
- [x] 3.4 Assert heading renders with translation key
- [x] 3.5 Assert both buttons render with correct text
- [x] 3.6 Assert `scrollToSection('proyectos')` called on "Ver Proyectos" click

## Phase 4: Verification

- [x] 4.1 Run `npm run test` — confirm at least 1 test passes
- [x] 4.2 Confirm test uses Vitest (not Jest) and file lives in `__tests__` directory
