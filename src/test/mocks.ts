import { vi } from 'vitest';

const toastMethods = {
  success: vi.fn(),
  error: vi.fn(),
  loading: vi.fn(),
};

export const toastModuleMock = {
  default: toastMethods,
  toast: toastMethods,
  Toaster: () => null,
};