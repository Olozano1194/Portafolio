import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const testGlobals = {
  vi: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  describe: 'readonly',
  it: 'readonly',
  expect: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  test: 'readonly',
};

const jsdomGlobals = {
  window: 'readonly',
  document: 'readonly',
  localStorage: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  requestAnimationFrame: 'readonly',
  cancelAnimationFrame: 'readonly',
  IntersectionObserver: 'readonly',
  ResizeObserver: 'readonly',
  matchMedia: 'readonly',
  scrollTo: 'readonly',
  HTMLElement: 'readonly',
  HTMLButtonElement: 'readonly',
  HTMLInputElement: 'readonly',
  HTMLFormElement: 'readonly',
};

export default tseslint.config(
  { ignores: ['dist/', 'node_modules/', '*.config.*'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module', ecmaFeatures: { jsx: true } },
      globals: { ...testGlobals, ...jsdomGlobals },
    },
    settings: { react: { version: '19' } },
    plugins: { react: reactPlugin, 'react-hooks': reactHooks },
    rules: {
      'max-lines': ['error', 250],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['src/test/**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: { ...testGlobals, ...jsdomGlobals, global: 'readonly', globalThis: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
    },
  }
);