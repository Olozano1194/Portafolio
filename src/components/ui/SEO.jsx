import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://portafolio-phi-sepia.vercel.app';

const setMeta = (name, content, attr = 'name') => {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
};

const SEO = ({ title, description, image, url, type = 'website' }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const siteName = t('seo.siteName');
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const pageUrl = url || `${SITE_URL}${location.pathname}`;
  const ogImage = image || 'https://portafolio-phi-sepia.vercel.app/assets/fotoPerfil.webp';

  useEffect(() => {
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:url', pageUrl, 'property');
    setMeta('og:type', type, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
  });

  return null;
};

export default SEO;