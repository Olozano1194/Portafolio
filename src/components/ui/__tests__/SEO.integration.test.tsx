import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { renderWithProviders } from '../../../test/i18n';

vi.mock('../seo-config', () => ({
  getSiteUrl: vi.fn(() => 'https://test.example.com'),
  normalizeCanonicalPath: (pathname: string) => {
    if (pathname === '/') return '/';
    return pathname.replace(/\/+$/, '');
  },
}));

import SEO from '../SEO';
import { getSiteUrl } from '../seo-config';

describe('SEO - effect cleanup and snapshot restore (R4)', () => {
  let originalTitle: string;
  let originalHeadHTML: string;

  beforeEach(() => {
    vi.clearAllMocks();
    (getSiteUrl as Mock).mockReturnValue('https://test.example.com');
    originalTitle = document.title;
    originalHeadHTML = document.head.innerHTML;
    document.title = '';
    const metaTags = document.head.querySelectorAll('meta[name], meta[property]');
    metaTags.forEach(tag => tag.remove());
    const linkTags = document.head.querySelectorAll('link[rel="canonical"]');
    linkTags.forEach(tag => tag.remove());
    const jsonLdScripts = document.head.querySelectorAll('script[data-seo-webpage]');
    jsonLdScripts.forEach(tag => tag.remove());
  });

  afterEach(() => {
    document.title = originalTitle;
    document.head.innerHTML = originalHeadHTML;
  });

  it('removes created tags on unmount', async () => {
    const { unmount } = await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es', route: '/about' });
    unmount();

    const canonical = document.querySelector('link[rel="canonical"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const webpageScript = document.querySelector('script[data-seo-webpage="webpage"]');

    expect(canonical).not.toBeInTheDocument();
    expect(ogTitle).not.toBeInTheDocument();
    expect(webpageScript).not.toBeInTheDocument();
  });

  it('restores pre-existing meta tag content on unmount', async () => {
    const staticOgTitle = document.createElement('meta');
    staticOgTitle.setAttribute('property', 'og:title');
    staticOgTitle.setAttribute('content', 'Static Title');
    document.head.appendChild(staticOgTitle);

    const { unmount } = await renderWithProviders(<SEO title="Dynamic Page" description="Test" />, { lng: 'es' });
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Dynamic Page | Oscar Lozano');

    unmount();

    const restored = document.querySelector('meta[property="og:title"]');
    expect(restored?.getAttribute('content')).toBe('Static Title');
  });

  it('restores pre-existing canonical link on unmount', async () => {
    const staticCanonical = document.createElement('link');
    staticCanonical.setAttribute('rel', 'canonical');
    staticCanonical.setAttribute('href', 'https://static.example.com/original');
    document.head.appendChild(staticCanonical);

    const { unmount } = await renderWithProviders(<SEO title="Test" description="Test" />, { lng: 'es', route: '/dynamic' });
    unmount();

    const restored = document.querySelector('link[rel="canonical"]');
    expect(restored?.getAttribute('href')).toBe('https://static.example.com/original');
  });

  it('deletes only [data-seo-webpage] scripts on cleanup', async () => {
    const otherScript = document.createElement('script');
    otherScript.type = 'application/ld+json';
    otherScript.textContent = JSON.stringify({ '@type': 'OtherThing' });
    document.head.appendChild(otherScript);

    const { unmount } = await renderWithProviders(<SEO title="Test" description="Test" />, { lng: 'es' });
    unmount();

    expect(document.querySelector('script[data-seo-webpage="webpage"]')).not.toBeInTheDocument();
    expect(document.querySelector('script[type="application/ld+json"]:not([data-seo-webpage])')).toBeInTheDocument();
  });

  it('does not remove static index.html og:site_name and og:locale on unmount', async () => {
    const staticSiteName = document.createElement('meta');
    staticSiteName.setAttribute('property', 'og:site_name');
    staticSiteName.setAttribute('content', 'Oscar Lozano');
    document.head.appendChild(staticSiteName);

    const staticLocale = document.createElement('meta');
    staticLocale.setAttribute('property', 'og:locale');
    staticLocale.setAttribute('content', 'es_ES');
    document.head.appendChild(staticLocale);

    const { unmount } = await renderWithProviders(<SEO title="Test" description="Test" />, { lng: 'es' });
    unmount();

    expect(document.querySelector('meta[property="og:site_name"]')?.getAttribute('content')).toBe('Oscar Lozano');
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('es_ES');
  });
});