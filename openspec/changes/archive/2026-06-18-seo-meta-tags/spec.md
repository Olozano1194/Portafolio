# Spec: seo-meta-tags

## Install react-helmet-async
- Version: latest compatible
- HelmetProvider wraps `<App />` in main.jsx

## SEO Component API
```jsx
<SEO 
  title="Page Title"        // optional, defaults to site name
  description="..."          // optional, defaults to site description
  image="/og-image.jpg"      // optional, defaults to profile image
  url="/current-path"        // optional, auto-detected from window.location
  type="website"             // optional, defaults to "website"
/>
```

### What it renders
```html
<title>Page Title | Oscar Lozano</title>
<meta name="description" content="..." />
<meta property="og:title" content="Page Title | Oscar Lozano" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://..." />
<meta property="og:url" content="https://..." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title | Oscar Lozano" />
<meta name="twitter:description" content="..." />
```

## Page-specific SEO

### HomePage
- title: `seo.home.title` (ES: "Oscar Lozano | Desarrollador Full-Stack")
- description: `seo.home.description` (site intro)

### Error404
- title: `seo.error404.title`
- description: `seo.error404.description`

### DemoSection (dynamic per project)
- title: `{projectTitle} | Oscar Lozano`
- description: from `projects.items.{id}.description`
- image: first imgDemo entry as og:image

### VideosSection (dynamic per project)
- title: `{projectTitle} | Oscar Lozano`
- description: from `projects.items.{id}.description`

## index.html defaults
```html
<title>Oscar Lozano | Full-Stack Developer</title>
<meta name="description" content="..." />
```

## Rejection criteria
- SEO component doesn't render correct tags → reject
- HelmetProvider not wrapping correctly (tags don't show) → reject
- Project pages show wrong title → reject
