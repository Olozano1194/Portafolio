# Spec: cleanup-small

## Scope
Three independent cleanup tasks in one change. No behavior changes except alt text display.

## Change 6: Remove unused assets

### Verification
- `npm run build` succeeds without missing asset errors
- `git status` shows only expected deletions
- Site renders without broken images in any project card
- Browser DevTools shows no 404 for favicon

### Favicon fix
- Before: `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` (404)
- After: `<link rel="icon" type="image/png" href="/favicon-16x16.png" />` (exists)

## Change 7: Descriptive alt texts

### Current
```jsx
alt={`imagen ${proyecto.img}`}
```
Renders: `"imagen GymReactDjango"`, `"imagen FiadoApp"`, etc.

### Target
Use i18n alt key per project:
```jsx
alt={t(`projects.items.${proyecto.id}.alt`)}
```

### Required translation keys
Add to both ES and EN locales under `projects.items.{id}`:
- `1`: "ControlFit dashboard showing gym management interface"
- `2`: "Hotel Alura desktop reservation management software"
- `3`: "TaskMaster productivity app interface"
- `4`: "Institutional Management platform dashboard"
- `5`: "EduBase academic platform main page"
- `6`: "FiadoApp commercial management dashboard"

## Change 10: Google Fonts

### Before (index.css)
```css
@import url("https://fonts.googleapis.com/css2?family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
```

### After (index.html <head>)
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
```

### index.css
Remove the three `@import` lines.

## Rejection criteria
- Any image 404s → reject
- Fonts render differently (FOIT, wrong weights) → reject
- Translation alt keys missing or wrong → reject
