# Design: setup-tests

## vitest.config.js (new file at project root)
```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
});
```

## src/test/setup.js (new file)
```js
import '@testing-library/jest-dom/vitest';
```

## package.json additions
- `"vitest": "^3.1.0"` + testing libs to devDependencies
- `"test": "vitest run"` and `"test:watch": "vitest"` to scripts

## First test: HeroSection
- File: `src/components/sections/__tests__/HeroSection.test.jsx`
- Mock `react-i18next` useTranslation
- Render HeroSection
- Assert title, description, buttons render
- Assert scrollToSection is called when clicking "Ver Proyectos"

## Mock strategy
- `react-i18next` → mock `useTranslation` to return `{ t: (key) => key }`
- `scrollToSection` → mock via vi.fn()

## No production code changes
- Tests only add new files and devDependencies
- Zero changes to src/ production code
