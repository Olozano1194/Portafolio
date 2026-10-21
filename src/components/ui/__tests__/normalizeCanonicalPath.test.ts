import { describe, it, expect } from 'vitest';
import { normalizeCanonicalPath } from '../seo-config';

describe('normalizeCanonicalPath utility', () => {
  it('strips trailing slash from non-root paths', () => {
    expect(normalizeCanonicalPath('/about/')).toBe('/about');
    expect(normalizeCanonicalPath('/projects///')).toBe('/projects');
    expect(normalizeCanonicalPath('/contact/')).toBe('/contact');
  });

  it('keeps trailing slash for root path', () => {
    expect(normalizeCanonicalPath('/')).toBe('/');
  });

  it('handles paths without trailing slash', () => {
    expect(normalizeCanonicalPath('/about')).toBe('/about');
    expect(normalizeCanonicalPath('/projects')).toBe('/projects');
  });
});