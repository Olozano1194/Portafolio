# Tasks: improve-project-data

## T-001: Actualizar demoProject.projectDetails.1 (ControlFit)

**Archivos**: `src/locales/es/translation.json`, `src/locales/en/translation.json`

**Acción**: Reemplazar `demoProject.projectDetails.1` con nuevas description, features (6 items), performance en ambos idiomas.

**Verificación**: `npm run dev` + navegar a `/demo/1` y verificar texto actualizado.

---

## T-002: Actualizar demoProject.projectDetails.4 (Gestión Institucional)

**Archivos**: `src/locales/es/translation.json`, `src/locales/en/translation.json`

**Acción**: Reemplazar `demoProject.projectDetails.4` con nuevas description, features (4 items), performance en ambos idiomas.

**Verificación**: `npm run dev` + navegar a `/demo/4` y verificar texto actualizado.

---

## T-003: Actualizar demoProject.projectDetails.5 (EduBase)

**Archivos**: `src/locales/es/translation.json`, `src/locales/en/translation.json`

**Acción**: Reemplazar `demoProject.projectDetails.5` con nuevas description, features (5 items), performance en ambos idiomas.

**Verificación**: `npm run dev` + navegar a `/demo/5` y verificar texto actualizado.

---

## T-004: Actualizar demoProject.projectDetails.6 (FiadoApp)

**Archivos**: `src/locales/es/translation.json`, `src/locales/en/translation.json`

**Acción**: Reemplazar `demoProject.projectDetails.6` con nuevas description, features (7 items), performance en ambos idiomas.

**Verificación**: `npm run dev` + navegar a `/demo/6` y verificar texto actualizado.

---

## T-005: Corregir stacks en proyectos.js

**Archivo**: `src/data/proyectos.js`

**Acción**: Reemplazar array `stack` de IDs 1, 3, 5, 6.

**Verificación**: `git diff` mostrar los cambios correctos.

---

## T-006: Limpiar archivos huérfanos

**Acción**: 
- Eliminar `public/demo/tiendaVirtual/`
- Listar `public/videos/` y eliminar MP4 no referenciados

**Verificación**: Los únicos videos en `public/videos/` son `videos-HotelAlura.mp4` y `videos-TaskReact.mp4`.
