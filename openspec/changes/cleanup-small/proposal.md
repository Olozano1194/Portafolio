# Proposal: cleanup-small

## Intent
Clean up unused assets, improve image accessibility, and optimize font loading.

## Changes

### Change 6: Remove unused assets
- Delete 8 orphan `.png` project images from `public/assets/`
- Delete 2 orphan `.png` demo images from `public/demo/tiendaVirtual/`
- Delete orphan `public/cerradura.svg`
- Fix favicon link in `index.html` — point to existing `/favicon-16x16.png`

### Change 7: Descriptive alt texts in ProyectosSection
- Add `alt` translation keys to both ES/EN locales (`projects.items.{id}.alt`)
- Update `ProyectosSection.jsx` to use `t('projects.items.{id}.alt')`

### Change 10: Google Fonts optimization
- Remove three `@import` statements from `index.css`
- Add `<link rel="preconnect">` + `<link rel="stylesheet">` in `index.html` `<head>`
- Keep `display=swap` behavior

## Files affected
- `public/assets/*.png` (8 deletes)
- `public/demo/tiendaVirtual/*.png` (2 deletes)
- `public/cerradura.svg` (1 delete)
- `index.html` (favicon fix + fonts)
- `src/index.css` (remove font @imports)
- `src/components/sections/ProyectosSection.jsx` (alt text)
- `src/locales/es/translation.json` (new alt keys)
- `src/locales/en/translation.json` (new alt keys)

## Risk
- Visual: fonts may load slightly differently (same CSS, different delivery)
- Accessibility: alt texts change from generic to descriptive — improvement only
