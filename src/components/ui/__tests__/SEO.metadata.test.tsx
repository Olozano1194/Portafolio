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

describe('SEO - canonical URL normalization (R1)', () => {
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

  it('uses mocked getSiteUrl for canonical', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es', route: '/about' });

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeInTheDocument();
    expect(canonical?.getAttribute('href')).toBe('https://test.example.com/about');
  });

  it('strips trailing slash from canonical except root', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es', route: '/projects/' });

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://test.example.com/projects');
  });

  it('keeps trailing slash for root path', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es', route: '/' });

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://test.example.com/');
  });

  it('og:url matches canonical URL', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es', route: '/contact' });

    const ogUrl = document.querySelector('meta[property="og:url"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(ogUrl?.getAttribute('content')).toBe(canonical?.getAttribute('href'));
  });
});

describe('SEO - WebPage JSON-LD injection (R2)', () => {
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

  it('injects WebPage JSON-LD with data-seo-webpage attribute', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es', route: '/about' });

    const script = document.querySelector('script[data-seo-webpage="webpage"]');
    expect(script).toBeInTheDocument();
    expect(script?.getAttribute('type')).toBe('application/ld+json');
  });

  it('WebPage JSON-LD has correct @context, @type, url, and isPartOf', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es', route: '/projects' });

    const script = document.querySelector('script[data-seo-webpage="webpage"]');
    const jsonLd = JSON.parse(script?.textContent || '{}');

    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('WebPage');
    expect(jsonLd.url).toBe('https://test.example.com/projects');
    expect(jsonLd.isPartOf).toEqual({ '@id': 'https://test.example.com/#website' });
  });

  it('only one WebPage JSON-LD script exists', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es', route: '/about' });

    const scripts = document.querySelectorAll('script[data-seo-webpage="webpage"]');
    expect(scripts.length).toBe(1);
  });
});

describe('SEO - additional meta tags (R3)', () => {
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

  it('sets og:site_name', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es' });

    const ogSiteName = document.querySelector('meta[property="og:site_name"]');
    expect(ogSiteName).toBeInTheDocument();
    expect(ogSiteName?.getAttribute('content')).toBe('Oscar Lozano');
  });

  it('sets og:locale based on current language', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es' });
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute('content')).toBe('es_ES');

    const { unmount } = await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'en' });
    unmount();
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'en' });
    ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute('content')).toBe('en_US');
  });

  it('sets og:image:alt, og:image:width, og:image:height', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es' });

    const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    const ogImageWidth = document.querySelector('meta[property="og:image:width"]');
    const ogImageHeight = document.querySelector('meta[property="og:image:height"]');

    expect(ogImageAlt).toBeInTheDocument();
    expect(ogImageAlt?.getAttribute('content')).toContain('Oscar Lozano');
    expect(ogImageWidth?.getAttribute('content')).toBe('1200');
    expect(ogImageHeight?.getAttribute('content')).toBe('630');
  });

  it('sets robots meta tag', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es' });

    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).toBeInTheDocument();
    expect(robots?.getAttribute('content')).toBe('index, follow');
  });

  it('sets twitter:creator and twitter:site', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test" />, { lng: 'es' });

    const twitterCreator = document.querySelector('meta[name="twitter:creator"]');
    const twitterSite = document.querySelector('meta[name="twitter:site"]');

    expect(twitterCreator).toBeInTheDocument();
    expect(twitterCreator?.getAttribute('content')).toBe('@Olozano1194');
    expect(twitterSite).toBeInTheDocument();
    expect(twitterSite?.getAttribute('content')).toBe('@Olozano1194');
  });
});

describe('SEO - VITE_SITE_URL fallback behavior (R5)', () => {
  let originalTitle: string;
  let originalHeadHTML: string;

  beforeEach(() => {
    vi.clearAllMocks();
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

  it('falls back to empty string when getSiteUrl returns empty', async () => {
    (getSiteUrl as Mock).mockReturnValue('');
    await renderWithProviders(<SEO title="Test" description="Test" />, { lng: 'es', route: '/about' });

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('/about');
  });

  it('uses mocked getSiteUrl value (simulating build-time constant)', async () => {
    (getSiteUrl as Mock).mockReturnValue('https://build-time.example.com');
    await renderWithProviders(<SEO title="Test" description="Test" />, { lng: 'es', route: '/page' });

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://build-time.example.com/page');
  });
});