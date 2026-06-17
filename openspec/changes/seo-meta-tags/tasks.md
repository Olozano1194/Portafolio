# Tasks: SEO Meta Tags

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 65-80 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Infrastructure

- [x] 1.1 Add `"react-helmet-async": "^2.0.5"` to `package.json` dependencies (run `npm install` to complete)
- [x] 1.2 In `src/main.jsx`, import `HelmetProvider` from `react-helmet-async` and wrap `<Router>` + `<App />` inside `<HelmetProvider>`
- [x] 1.3 In `index.html`, replace `<title>portafolio</title>` with `<title>Oscar Lozano | Full-Stack Developer</title>` and add `<meta name="description" content="Portafolio de Oscar Lozano, Ingeniero de Sistemas y desarrollador Full-Stack especializado en React, TypeScript y Django." />`

## Phase 2: SEO Component

- [x] 2.1 Create `src/components/ui/SEO.jsx` implementing the component from design: props `title`, `description`, `image`, `url`, `type`; renders `<Helmet>` with title, description, og:*, twitter:* tags; uses `useTranslation` for `seo.siteName` and `useLocation` for auto-detected URL
- [x] 2.2 Add `seo` translation keys to `src/locales/es/translation.json`: `seo.siteName`, `seo.home.title`, `seo.home.description`, `seo.error404.title`, `seo.error404.description`
- [x] 2.3 Add same `seo` translation keys to `src/locales/en/translation.json`

## Phase 3: Page Integration

- [x] 3.1 In `src/pages/HomePage.jsx`: uncomment the existing `SEO` import (line 2), update it to `import SEO from '../components/ui/SEO'`, and uncomment/restore the `<SEO>` JSX inside the return (lines 36-39) with `title={t('seo.home.title')}` and `description={t('seo.home.description')}`
- [x] 3.2 In `src/pages/Error404.jsx`: import `SEO` from `../components/ui/SEO` and `useTranslation`, add `<SEO title={t('seo.error404.title')} description={t('seo.error404.description')} />` inside the return
- [x] 3.3 In `src/components/sections/DemoSection.jsx`: import `SEO` from `../ui/SEO`, add `<SEO title={projectTitle} description={projectDescription} image={imgDemo[0]} />` after the `proyecto` guard (inside the main return, near the top)
- [x] 3.4 In `src/components/sections/VideosSection.jsx`: import `SEO` from `../ui/SEO`, add `<SEO title={t(`projects.items.${id}.title`)} description={t(`projects.items.${id}.description`)} />` inside the return

## Phase 4: Verification

- [ ] 4.1 Run `npm run dev` and verify each page renders correct `<title>` in browser tab
- [ ] 4.2 Open DevTools Elements panel and confirm `<meta name="description">`, `og:title`, `og:description`, `og:image`, `twitter:card` tags are present in `<head>`
- [ ] 4.3 Test language switch (ES/EN) and verify `seo.home.title` and `seo.error404.title` change accordingly
- [ ] 4.4 Test DemoSection route (`/demo/:id`) and verify dynamic project title appears in `<title>` tag
- [ ] 4.5 Test VideosSection route (`/videos/:id`) and verify dynamic project title appears in `<title>` tag
