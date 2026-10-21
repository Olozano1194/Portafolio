import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    coverage: {
      provider: 'v8',
      exclude: [
        'src/data/**',
        'src/types/**',
        'src/locales/**',
        'src/main.tsx',
        'src/i18n.ts',
        '**/*.d.ts',
        '**/__tests__/**',
      ],
    },
  },
}));