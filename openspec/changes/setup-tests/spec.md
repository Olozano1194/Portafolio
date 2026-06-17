# Spec: setup-tests

## Packages to install
```json
{
  "devDependencies": {
    "vitest": "^3.1.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/user-event": "^14.6.1",
    "jsdom": "^26.0.0"
  }
}
```

## Test config (vitest.config.js)
```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
});
```

## Package.json scripts
```json
"test": "vitest run",
"test:watch": "vitest"
```

## Test setup file (src/test/setup.js)
```js
import '@testing-library/jest-dom';
```

## First test (HeroSection)
- Render HeroSection with i18n mock
- Assert heading renders
- Assert buttons render with correct text
- Assert scrollToSection is called on button click

## Acceptance criteria
- `npm run test` passes (at least 1 test)
- Test uses Vitest, not Jest
- Test file lives in `__tests__` directory next to component
