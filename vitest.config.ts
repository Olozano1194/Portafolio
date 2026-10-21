import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          name: 'app',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test/setup.js'],
          include: ['src/**/*.test.{ts,tsx}'],
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
      },
      {
        extends: './vite.config.ts',
        test: {
          name: 'scripts',
          environment: 'node',
          globals: true,
          include: ['scripts/**/*.test.mjs'],
        },
      },
    ],
  },
}));