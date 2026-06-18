# Proposal: setup-tests

## Intent
Set up testing infrastructure with Vitest + Testing Library so the project has a foundation for automated testing.

## Changes

### 1. Install dependencies
- `vitest` — test runner (native Vite integration)
- `@testing-library/react` — React component testing
- `@testing-library/jest-dom` — DOM matchers (toBeInTheDocument, etc.)
- `@testing-library/user-event` — user event simulation
- `jsdom` — DOM environment for tests
- `happy-dom` or keep jsdom

### 2. Create test config
- `vitest.config.js` (or inline in vite.config.js) with jsdom environment

### 3. Add test script to package.json
- `"test": "vitest run"`
- `"test:watch": "vitest"`

### 4. Create test setup file
- `src/test/setup.js` — imports @testing-library/jest-dom

### 5. Create first test
- `src/components/sections/__tests__/HeroSection.test.jsx` — basic smoke test

## Files affected
- `package.json` (deps + scripts)
- `vite.config.js` (or new `vitest.config.js`)
- `src/test/setup.js` (new)
- `src/components/sections/__tests__/HeroSection.test.jsx` (new)

## Risk
- Low. Tests are additive — no production code changes.
- Ensure jsdom is configured correctly for React 19.
