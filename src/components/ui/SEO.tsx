import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getSiteUrl, normalizeCanonicalPath } from './seo-config';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const setMeta = (name: string, content: string, attr = 'name'): HTMLMetaElement => {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
  return el;
};

const setLink = (rel: string, href: string): HTMLLinkElement => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
};

const createJsonLdScript = (data: object, id: string): HTMLScriptElement => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo-webpage', id);
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
  return script;
};

const SEO = ({ title, description, image, url, type = 'website' }: SEOProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const siteName = t('seo.siteName');
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  const SITE_URL = getSiteUrl();
  const canonicalPath = normalizeCanonicalPath(location.pathname);
  const canonicalUrl = SITE_URL ? `${SITE_URL}${canonicalPath}` : canonicalPath;
  const pageUrl = url || canonicalUrl;
  const ogImage = image || (SITE_URL ? `${SITE_URL}/assets/fotoPerfil.webp` : '/assets/fotoPerfil.webp');
  const locale = i18n.language === 'en' ? 'en_US' : 'es_ES';

  useEffect(() => {
    const managedTags = new Map<string, { attr: string; name: string; originalContent: string | null }>();
    const createdTags = new Set<Element>();
    let webpageScript: HTMLScriptElement | null = null;

    const snapshotTag = (selector: string, attr: string, name: string) => {
      const el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (el) {
        const content = el.getAttribute(attr === 'rel' ? 'href' : 'content');
        managedTags.set(selector, { attr, name, originalContent: content });
      }
    };

    snapshotTag('meta[name="description"]', 'name', 'description');
    snapshotTag('meta[property="og:title"]', 'property', 'og:title');
    snapshotTag('meta[property="og:description"]', 'property', 'og:description');
    snapshotTag('meta[property="og:image"]', 'property', 'og:image');
    snapshotTag('meta[property="og:url"]', 'property', 'og:url');
    snapshotTag('meta[property="og:type"]', 'property', 'og:type');
    snapshotTag('meta[property="og:site_name"]', 'property', 'og:site_name');
    snapshotTag('meta[property="og:locale"]', 'property', 'og:locale');
    snapshotTag('meta[property="og:image:alt"]', 'property', 'og:image:alt');
    snapshotTag('meta[property="og:image:width"]', 'property', 'og:image:width');
    snapshotTag('meta[property="og:image:height"]', 'property', 'og:image:height');
    snapshotTag('meta[name="twitter:card"]', 'name', 'twitter:card');
    snapshotTag('meta[name="twitter:title"]', 'name', 'twitter:title');
    snapshotTag('meta[name="twitter:description"]', 'name', 'twitter:description');
    snapshotTag('meta[name="twitter:image"]', 'name', 'twitter:image');
    snapshotTag('meta[name="twitter:creator"]', 'name', 'twitter:creator');
    snapshotTag('meta[name="twitter:site"]', 'name', 'twitter:site');
    snapshotTag('meta[name="robots"]', 'name', 'robots');
    snapshotTag('link[rel="canonical"]', 'rel', 'canonical');

    document.title = fullTitle;

    const descriptionTag = setMeta('description', description || '');
    createdTags.add(descriptionTag);

    const ogTitleTag = setMeta('og:title', fullTitle, 'property');
    createdTags.add(ogTitleTag);

    const ogDescriptionTag = setMeta('og:description', description || '', 'property');
    createdTags.add(ogDescriptionTag);

    const ogImageTag = setMeta('og:image', ogImage, 'property');
    createdTags.add(ogImageTag);

    const ogUrlTag = setMeta('og:url', pageUrl, 'property');
    createdTags.add(ogUrlTag);

    const ogTypeTag = setMeta('og:type', type, 'property');
    createdTags.add(ogTypeTag);

    const ogSiteNameTag = setMeta('og:site_name', siteName, 'property');
    createdTags.add(ogSiteNameTag);

    const ogLocaleTag = setMeta('og:locale', locale, 'property');
    createdTags.add(ogLocaleTag);

    const ogImageAltTag = setMeta('og:image:alt', `${siteName} - ${title || siteName}`, 'property');
    createdTags.add(ogImageAltTag);

    const ogImageWidthTag = setMeta('og:image:width', '1200', 'property');
    createdTags.add(ogImageWidthTag);

    const ogImageHeightTag = setMeta('og:image:height', '630', 'property');
    createdTags.add(ogImageHeightTag);

    const twitterCardTag = setMeta('twitter:card', 'summary_large_image');
    createdTags.add(twitterCardTag);

    const twitterTitleTag = setMeta('twitter:title', fullTitle);
    createdTags.add(twitterTitleTag);

    const twitterDescriptionTag = setMeta('twitter:description', description || '');
    createdTags.add(twitterDescriptionTag);

    const twitterImageTag = setMeta('twitter:image', ogImage);
    createdTags.add(twitterImageTag);

    const twitterCreatorTag = setMeta('twitter:creator', '@Olozano1194');
    createdTags.add(twitterCreatorTag);

    const twitterSiteTag = setMeta('twitter:site', '@Olozano1194');
    createdTags.add(twitterSiteTag);

    const robotsTag = setMeta('robots', 'index, follow');
    createdTags.add(robotsTag);

    const canonicalLink = setLink('canonical', canonicalUrl);
    createdTags.add(canonicalLink);

    const webpageJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: canonicalUrl,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    };
    webpageScript = createJsonLdScript(webpageJsonLd, 'webpage');

    return () => {
      createdTags.forEach((tag) => {
        const selector = tag.getAttribute('name')
          ? `meta[name="${tag.getAttribute('name')}"]`
          : tag.getAttribute('property')
          ? `meta[property="${tag.getAttribute('property')}"]`
          : tag.getAttribute('rel')
          ? `link[rel="${tag.getAttribute('rel')}"]`
          : null;

        if (selector && managedTags.has(selector)) {
          const snapshot = managedTags.get(selector)!;
          const contentAttr = snapshot.attr === 'rel' ? 'href' : 'content';
          if (snapshot.originalContent === null) {
            tag.remove();
          } else {
            tag.setAttribute(contentAttr, snapshot.originalContent);
          }
        } else {
          tag.remove();
        }
      });

      if (webpageScript) {
        webpageScript.remove();
      }

      document.querySelectorAll('script[data-seo-webpage]').forEach((script) => script.remove());
    };
  }, [title, fullTitle, description, ogImage, pageUrl, canonicalUrl, type, siteName, locale, SITE_URL]);

  return null;
};
export default SEO;