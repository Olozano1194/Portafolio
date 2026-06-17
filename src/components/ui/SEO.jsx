import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://portafolio-phi-sepia.vercel.app';

const SEO = ({ title, description, image, url, type = 'website' }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const siteName = t('seo.siteName');
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const pageUrl = url || `${SITE_URL}${location.pathname}`;
  const ogImage = image || 'https://portafolio-phi-sepia.vercel.app/assets/fotoPerfil.webp';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
export default SEO;