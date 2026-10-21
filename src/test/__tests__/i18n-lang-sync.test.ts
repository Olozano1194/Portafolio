import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock document.documentElement.lang
const originalLang = document.documentElement.lang;

describe('i18n lang sync', () => {
  beforeEach(() => {
    // Reset document.documentElement.lang before each test
    document.documentElement.lang = originalLang;
    vi.resetModules();
  });

  afterEach(() => {
    document.documentElement.lang = originalLang;
  });

  it('should set document.documentElement.lang to "es" on init (R1)', async () => {
    // Ensure we start with a different lang
    document.documentElement.lang = 'en';

    // Dynamic import to trigger i18n init
    const i18n = await import('../../i18n');
    
    // Wait for the init promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(document.documentElement.lang).toBe('es');
    expect(i18n.default.language).toBe('es');
  });

  it('should update document.documentElement.lang on languageChanged (R2)', async () => {
    const i18n = await import('../../i18n');
    
    // Wait for init
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Verify initial state
    expect(document.documentElement.lang).toBe('es');
    
    // Change language
    await i18n.default.changeLanguage('en');
    
    // Verify document.documentElement.lang was updated
    expect(document.documentElement.lang).toBe('en');
    expect(i18n.default.language).toBe('en');
  });

  it('should handle rapid language switches and settle on final value (R3)', async () => {
    const i18n = await import('../../i18n');
    
    // Wait for init
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Rapid switches: es -> en -> es -> en
    await i18n.default.changeLanguage('en');
    await i18n.default.changeLanguage('es');
    await i18n.default.changeLanguage('en');
    
    // Should settle on final value 'en'
    expect(document.documentElement.lang).toBe('en');
    expect(i18n.default.language).toBe('en');
  });

  it('should maintain consistency with static index.html lang="es" (R3)', async () => {
    // index.html has lang="es" (Phase 1)
    // i18n defaults to 'es' (fallbackLng)
    // After init, both should be 'es' → no flicker
    
    document.documentElement.lang = 'es'; // Simulate static HTML
    
    const i18n = await import('../../i18n');
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // No flicker - should remain 'es'
    expect(document.documentElement.lang).toBe('es');
    expect(i18n.default.language).toBe('es');
  });
});