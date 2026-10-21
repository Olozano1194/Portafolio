import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders } from '../../../test/i18n';
import SEO from '../SEO';

describe('SEO', () => {
  let originalTitle: string;
  let originalHeadHTML: string;

  beforeEach(() => {
    vi.clearAllMocks();
    originalTitle = document.title;
    originalHeadHTML = document.head.innerHTML;
    // Clear any existing meta tags that SEO might have set
    document.title = '';
    const metaTags = document.head.querySelectorAll('meta[name], meta[property]');
    metaTags.forEach(tag => tag.remove());
  });

  afterEach(() => {
    document.title = originalTitle;
    document.head.innerHTML = originalHeadHTML;
  });

  it('sets document title with provided title and site name', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    expect(document.title).toBe('Test Page | Oscar Lozano');
  });

  it('sets document title to site name when no title provided', async () => {
    await renderWithProviders(<SEO description="Test description" />, { lng: 'es' });

    expect(document.title).toBe('Oscar Lozano');
  });

  it('sets meta description tag', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription?.getAttribute('content')).toBe('Test description');
  });

  it('sets og:title meta tag', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toBeInTheDocument();
    expect(ogTitle?.getAttribute('content')).toBe('Test Page | Oscar Lozano');
  });

  it('sets og:description meta tag', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const ogDescription = document.querySelector('meta[property="og:description"]');
    expect(ogDescription).toBeInTheDocument();
    expect(ogDescription?.getAttribute('content')).toBe('Test description');
  });

  it('sets og:image meta tag with default image', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage).toBeInTheDocument();
    expect(ogImage?.getAttribute('content')).toContain('/assets/fotoPerfil.webp');
  });

  it('sets og:url meta tag with current page URL', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es', route: '/test-page' });

    const ogUrl = document.querySelector('meta[property="og:url"]');
    expect(ogUrl).toBeInTheDocument();
    expect(ogUrl?.getAttribute('content')).toContain('/test-page');
  });

  it('sets og:type meta tag with default "website"', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType).toBeInTheDocument();
    expect(ogType?.getAttribute('content')).toBe('website');
  });

  it('sets twitter:card meta tag', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard).toBeInTheDocument();
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
  });

  it('sets twitter:title meta tag', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle).toBeInTheDocument();
    expect(twitterTitle?.getAttribute('content')).toBe('Test Page | Oscar Lozano');
  });

  it('sets twitter:description meta tag', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    expect(twitterDescription).toBeInTheDocument();
    expect(twitterDescription?.getAttribute('content')).toBe('Test description');
  });

  it('uses custom og:image when provided', async () => {
    await renderWithProviders(
      <SEO title="Test Page" description="Test description" image="/custom-image.jpg" />,
      { lng: 'es' }
    );

    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toContain('/custom-image.jpg');
  });

  it('uses custom og:url when provided', async () => {
    await renderWithProviders(
      <SEO title="Test Page" description="Test description" url="https://example.com/custom" />,
      { lng: 'es' }
    );

    const ogUrl = document.querySelector('meta[property="og:url"]');
    expect(ogUrl?.getAttribute('content')).toBe('https://example.com/custom');
  });

  it('uses custom og:type when provided', async () => {
    await renderWithProviders(
      <SEO title="Test Page" description="Test description" type="article" />,
      { lng: 'es' }
    );

    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType?.getAttribute('content')).toBe('article');
  });

  it('all metadata tags are non-empty', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'es' });

    const requiredTags = [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:image"]',
      'meta[property="og:url"]',
      'meta[property="og:type"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
    ];

    requiredTags.forEach(selector => {
      const tag = document.querySelector(selector);
      expect(tag).toBeInTheDocument();
      expect(tag?.getAttribute('content')).toBeTruthy();
      expect(tag?.getAttribute('content')?.length).toBeGreaterThan(0);
    });
  });

  it('works with EN locale', async () => {
    await renderWithProviders(<SEO title="Test Page" description="Test description" />, { lng: 'en' });

    expect(document.title).toBe('Test Page | Oscar Lozano');
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe('Test description');
  });

  });