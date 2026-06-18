# Design: improve-project-data

## Estrategia

Cambios quirúrgicos de solo datos: reemplazar contenido específico en archivos JSON de traducción y JS de datos. Sin alterar lógica, componentes ni estructura de archivos.

## Orden de Ejecución

### Paso 1: Traducciones (ES + EN)
Editar las claves `demoProject.projectDetails.{1,4,5,6}` en ambos archivos de traducción.

**Archivos**: `src/locales/es/translation.json`, `src/locales/en/translation.json`

**Estrategia**: Reemplazar el objeto completo de cada `projectDetails.{id}` manteniendo idéntica estructura: `description` (string), `features` (array de strings), `performance` (string).

### Paso 2: Stack Corrections
Editar el array `stack` de los proyectos 1, 3, 5, 6 en `proyectos.js`.

**Archivo**: `src/data/proyectos.js`

**Cambios**:
- ID 1: línea 20 — reemplazar array
- ID 3: línea 66 — reemplazar array
- ID 5: línea 121 — reemplazar array  
- ID 6: línea 48 — reemplazar array

### Paso 3: Limpieza de archivos huérfanos
- Eliminar `public/demo/tiendaVirtual/` completo
- Listar `public/videos/` y eliminar MP4 que no sean `videos-HotelAlura.mp4` ni `videos-TaskReact.mp4`

## Riesgos Técnicos

| Riesgo | Mitigación |
|--------|-----------|
| Desincronizar ES/EN | Editar ambos archivos en el mismo paso, verificar que tengan misma estructura |
| Romper sintaxis JSON | Usar ediciones quirúrgicas (reemplazar objetos), no reescribir archivos completos |
| Borrar video usado | Verificar cada MP4 contra IDs activos antes de eliminar |

## Verificación

1. `npm run dev` sin errores
2. Navegar a cada demo y confirmar que las descripciones se ven correctas
3. `git diff` para revisar que solo cambiaron las líneas esperadas
