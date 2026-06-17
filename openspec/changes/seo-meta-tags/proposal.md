# Proposal: seo-meta-tags

## Intent
Add proper SEO meta tags (title, description, Open Graph, Twitter Cards) so the portfolio looks good in search results and social media shares.

## Changes

### 1. Install react-helmet-async
- Add `react-helmet-async` to package.json dependencies
- Wrap `<App />` with `<HelmetProvider>` in main.jsx

### 2. Create SEO component
- New file: `src/components/ui/SEO.jsx`
- Props: `title`, `description`, `image`, `url`, `type`
- Renders: `<Helmet>` with title, meta description, og:*, twitter:*

### 3. Update index.html defaults
- Change `<title>portafolio</title>` → `<title>Oscar Lozano | Full-Stack Developer</title>`
- Add default meta description
- Add og:image reference to existing profile image

### 4. Add SEO to pages
- `HomePage.tsx` — main page SEO with site description
- `Error404.tsx` — 404-specific title/description
- `DemoSection.jsx` — per-project dynamic title/description
- `VideosSection.jsx` — per-project dynamic title/description

### 5. Add translation keys
- `seo.home.title`, `seo.home.description`
- `seo.error404.title`, `seo.error404.description`
- `seo.siteName`

## Files affected
- `package.json` (new dep)
- `package-lock.json` (auto)
- `src/main.jsx` (HelmetProvider)
- `src/components/ui/SEO.jsx` (new file)
- `src/pages/HomePage.tsx` (add SEO)
- `src/pages/Error404.tsx` (add SEO)
- `src/components/sections/DemoSection.jsx` (add SEO)
- `src/components/sections/VideosSection.jsx` (add SEO)
- `index.html` (default meta)
- `src/locales/es/translation.json` (seo keys)
- `src/locales/en/translation.json` (seo keys)

## Risk
- Low. Helmet only affects <head>, no visual changes.
- Ensure HelmetProvider wraps correctly (common pitfall).
