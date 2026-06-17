# Design: seo-meta-tags

## SEO Component

```jsx
// src/components/ui/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://olozano1194.github.io/portafolio'; // or detect from env

const SEO = ({ title, description, image, url, type = 'website' }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const siteName = t('seo.siteName');
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const pageUrl = url || `${SITE_URL}${location.pathname}`;
  const ogImage = image || 'https://.../fotoPerfil.webp'; // public URL

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
```

## main.jsx change
Wrap `<App />` with `<HelmetProvider>`:
```jsx
import { HelmetProvider } from 'react-helmet-async';

<HelmetProvider>
  <Router>
    <App />
  </Router>
</HelmetProvider>
```

## index.html
Update default title and add default meta:
```html
<title>Oscar Lozano | Full-Stack Developer</title>
<meta name="description" content="Portafolio de Oscar Lozano, Ingeniero de Sistemas y desarrollador Full-Stack especializado en React, TypeScript y Django." />
```

## Page integrations

### HomePage.tsx
```jsx
import SEO from '../components/ui/SEO';
// Inside component:
<SEO title={t('seo.home.title')} description={t('seo.home.description')} />
```

### Error404.tsx
```jsx
import SEO from '../components/ui/SEO';
<SEO title={t('seo.error404.title')} description={t('seo.error404.description')} />
```

### DemoSection.jsx
```jsx
import SEO from '../components/ui/SEO';
// Inside component, after proyecto is found:
<SEO 
  title={projectTitle} 
  description={projectDescription}
  image={imgDemo[0]}
/>
```

### VideosSection.jsx
```jsx
import SEO from '../components/ui/SEO';
<SEO 
  title={t(`projects.items.${id}.title`)} 
  description={t(`projects.items.${id}.description`)}
/>
```

## Translation keys (both ES and EN)

```json
"seo": {
  "siteName": "Oscar Lozano",
  "home": {
    "title": "Full-Stack Developer",
    "description": "..."
  },
  "error404": {
    "title": "Página no encontrada",
    "description": "..."
  }
}
```
