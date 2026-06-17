# Propuesta: improve-project-data

## Intención

Actualizar `demoProject.projectDetails` en ES/EN para que las descripciones, features y rendimiento reflejen fielmente lo que cada proyecto realmente hace. Correcciones secundarias de stacks y limpieza de archivos huérfanos.

## Alcance

### In Scope
1. **`demoProject.projectDetails`** (ES/EN) — descripciones, features y performance reales de IDs 1, 4, 5, 6
2. **`proyectos.js` stacks** — corregir IDs 1, 3, 5, 6
3. **Archivos huérfanos** — eliminar `public/demo/tiendaVirtual/` y videos MP4 no referenciados

### Out of Scope
- IDs 2 y 4 sin tocar en stacks
- Sin tocar componentes, traducciones existentes (solo reemplazar contenido de projectDetails)
- Sin agregar proyectos a demo/video

## Descripciones Realistas (según READMEs de GitHub)

### ID 1 — ControlFit (GimnasioReactDjango)
**Real**: Fullstack gym management. React 18 + Vite + TypeScript + Tailwind. Django 5 + DRF + PostgreSQL/MySQL. JWT auth con refresh tokens. Multi-tenant (cada usuario tiene su gym). Admin gestiona miembros y membresías. Usuarios gestionan perfiles. Excel export.
**Features reales**: Login JWT con refresh automático, CRUD miembros/membresías, panel con estadísticas, multi-tenant, registro público, diseño responsivo, exportación Excel.

### ID 4 — Gestión Institucional (entidadesReact)
**Real**: Frontend React + TypeScript + Vite. Backend Express + MongoDB en repo separado. Plataforma educativa con CRUD de instituciones y usuarios por roles.
**Features reales**: CRUD instituciones, gestión usuarios por roles, dashboard con métricas, diseño responsivo.

### ID 5 — EduBase (InstitucionesV1)
**Real**: Full-Stack del curso MinTic. Frontend HTML5 + Tailwind + JavaScript. Backend Express + MongoDB. CRUD de instituciones educativas con roles.
**Features reales**: Registro de instituciones, CRUD completo, login/registro, frontend HTML+Tailwind, backend Express+MongoDB.

### ID 6 — FiadoApp
**Real**: POS (Punto de Venta) para tiendas de barrio con gestión de fiado. React 19 + Vite + TypeScript + Zustand + Tailwind. Django 6 + DRF + MySQL. Tauri v2 para desktop. Dashboard, inventario, clientes, reportes.
**Features reales**: POS con carrito y métodos de pago, inventario con alertas stock bajo, control de clientes fiados, reportes semanales con gráficos, dashboard con métricas, exportación Excel, empaquetado Tauri.

## Stack Corrections (proyectos.js)

| ID | Cambio |
|----|--------|
| 1 | Agregar Vite, Axios; REST API → Django REST Framework |
| 3 | Agregar TypeScript, Tailwind; REST API → Django REST Framework |
| 5 | MySQL → MongoDB |
| 6 | Agregar Vite, Tailwind, Zustand, Django REST Framework, MySQL, Tauri |

## Archivos Afectados

| Archivo | Impacto |
|---------|---------|
| `src/locales/es/translation.json` | projectDetails 1,4,5,6 |
| `src/locales/en/translation.json` | projectDetails 1,4,5,6 |
| `src/data/proyectos.js` | stacks 1,3,5,6 |
| `public/demo/tiendaVirtual/` | Eliminar |
| `public/videos/*.mp4` | Eliminar no referenciados |

## Riesgos

Bajo. Cambios de metadata y texto, no de lógica.

## Criterios de Éxito

- [ ] Cada descripción describe realmente lo que el proyecto hace
- [ ] Features listan capacidades reales del proyecto
- [ ] Performance es creíble y referenciable
- [ ] Stacks coinciden con los READMEs
- [ ] No hay archivos huérfanos
- [ ] `npm run dev` funciona sin errores
