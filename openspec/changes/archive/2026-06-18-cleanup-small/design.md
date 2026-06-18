# Design: cleanup-small

## Change 6: File operations

### Delete commands
```
rm public/assets/proyecto-TiendaVirtual.png
rm public/assets/proyecto-GymDjango.png
rm public/assets/proyecto-Encriptador.png
rm public/assets/proyecto-DjangoTask.png
rm public/assets/proyecto-Django.png
rm public/assets/proyecto-Conversor.png
rm public/assets/proyecto-ApiInstituciones.png
rm public/assets/proyecto-Ahorcado.png
rm public/demo/tiendaVirtual/demo-login.png
rm public/demo/tiendaVirtual/demo-index.png
rm public/cerradura.svg
```

### index.html favicon edit
```
- <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
+ <link rel="icon" type="image/png" href="/favicon-16x16.png" />
```

## Change 7: Alt text edit

### ProyectosSection.jsx (line 48)
```
- alt={`imagen ${proyecto.img}`}
+ alt={t(`projects.items.${proyecto.id}.alt`)}
```

### Translation additions (both ES and EN locales)
Insert under each `projects.items.{id}`:
```
"alt": "Screenshot of [project name] showing [feature]"
```

## Change 10: Font delivery change

### index.css — remove lines 1-3 (the @import statements)

### index.html — add before the existing dark-theme script (after <head> line ~6):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
```

## Verification
1. `npm run build` — no errors
2. Manual: visit each project card, verify image loads
3. Manual: check favicon loads (no 404 in DevTools)
4. Manual: inspect alt text in DOM for each project card
5. Manual: fonts render correctly (Ubuntu Sans Mono, Inter, Space Grotesk)
