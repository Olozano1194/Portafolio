# Portafolio Personal — Oscar Lozano

Portafolio profesional desarrollado con **React 19, Vite 8, Tailwind CSS v4** y TypeScript. Sitio web moderno, responsivo y optimizado para SEO que muestra mis proyectos, habilidades y experiencia como Full-Stack Developer.

🔗 **Live:** https://olozano.vercel.app

---

## ✨ Características

- **Diseño responsivo** — mobile-first, adaptado a móvil, tablet y escritorio
- **Modo claro/oscuro** — toggle persistente con `localStorage` y sin flash (script inline en `index.html`)
- **Internacionalización (i18n)** — Español e Inglés completos con `react-i18next`
- **Navegación suave** — scroll animado entre secciones (SPA con React Router 7)
- **Proyectos interactivos** — demos de video, imágenes y componentes interactivos
- **Formulario de contacto** — validación client-side con React Hook Form + honeypot anti-spam
- **SEO técnico completo** — metadata estática en `index.html`, JSON-LD (Person, WebSite, WebPage), canonical dinámico, Open Graph / Twitter Cards, sitemap.xml y robots.txt generados en build
- **Accesibilidad** — semántica HTML, ARIA, focus visible, contraste, `lang` dinámico sincronizado con i18n

---

## 🛠️ Tech Stack

| Categoría | Tecnologías |
|-----------|-------------|
| **Frontend** | React 19, TypeScript, Vite 8 (Rolldown), React Router 7 |
| **Estilos** | Tailwind CSS v4, CSS Modules, variables CSS para theming |
| **i18n** | react-i18next, i18next-browser-languagedetector |
| **Formularios** | React Hook Form 7.52+ |
| **Iconos / UI** | Heroicons 2, React Icons, Headless UI (Disclosure, Dialog) |
| **Testing** | Vitest 2, React Testing Library, jsdom, cobertura completa (190 tests) |
| **Calidad** | ESLint 9 (flat config), TypeScript strict, prebuild hooks |
| **Deploy** | Vercel (git-push preview + production), variables de entorno por environment |

---

## 📦 Instalación y desarrollo

```bash
# Clonar
git clone https://github.com/Olozano1194/Portafolio.git
cd Portafolio

# Instalar dependencias
npm install

# Desarrollo (http://localhost:5173)
npm run dev

# Build producción (genera dist/ + sitemap.xml + robots.txt)
npm run build

# Preview local del build
npm run preview

# Tests
npm test           # run once
npm run test:watch # watch mode
npm run test:coverage

# Lint + typecheck
npm run lint
npm run typecheck
```

### Variables de entorno requeridas

Crea `.env.local` (no se versiona) con:

```env
VITE_SITE_URL=https://tu-dominio.com   # obligatorio para canonical, sitemap, JSON-LD
VITE_CONTACTFORM_URL=https://...       # endpoint Formspree (opcional)
```

> En Vercel: **Production** usa tu dominio real; **Preview** usa `https://$VERCEL_URL` (se configura en dashboard).

---

## 🌐 Estructura del proyecto

```
src/
├── assets/              # Imágenes optimizadas (WebP) + logo
├── components/
│   ├── layout/          # Header, Footer, SEO
│   ├── sections/        # Hero, About, Education, Projects, Skills, Hobbies, Contact
│   ├── ui/              # Botones, Card, SEO, LanguageSwitcher, etc.
│   └── language/        # LanguageSwitcher
├── data/                # Datos de proyectos, formación, skills (TS tipado)
├── hooks/               # useTheme, useScroll, useIntersectionObserver, etc.
├── locales/             # ES/EN translations (translation.json)
├── pages/               # Home (única página SPA)
├── utils/               # scrollToSection, SEO helpers, date formatting
└── main.tsx             # Entry point + i18n init + theme init
scripts/
├── generate-sitemap.mjs # prebuild: genera public/sitemap.xml + public/robots.txt
├── sitemap-manifest.mjs
├── sitemap-render.mjs
└── robots-render.mjs
public/
├── logo.webp            # Logo maestro (usado en Header + favicon generation)
├── favicon.ico          # Multi-resolución (16, 32, 48)
├── apple-touch-icon.png # 180x180 para iOS
├── robots.txt           # Generado en build
├── sitemap.xml          # Generado en build
└── assets/              # Copiados por Vite (fotoPerfil, proyectos, etc.)
```

---

## 🔍 SEO — Qué está implementado

| Capa | Qué incluye |
|------|-------------|
| **`index.html` (estática)** | `<title>`, `<meta description>`, `lang="es"`, canonical `%VITE_SITE_URL%`, Open Graph / Twitter Cards, JSON-LD `Person` + `WebSite`, `apple-touch-icon`, `favicon.ico` |
| **`SEO.tsx` (cliente)** | Canonical dinámico por ruta, `og:site_name`, `og:locale`, JSON-LD `WebPage`, cleanup de meta tags duplicados, SSR-safe `VITE_SITE_URL` |
| **i18n sync** | `documentElement.lang` actualizado en init y en cada cambio de idioma |
| **Sitemap / Robots** | Generados en `prebuild` desde rutas reales + datos de proyectos; `lastmod` por proyecto |
| **Headers / Vercel** | `Cache-Control`, security headers, SPA fallback en `vercel.json` |

> Ver `OPS.md` para detalles de configuración de `VITE_SITE_URL` en local / Preview / Production.

---

## 🚀 Deploy en Vercel

El repo está configurado para deploy automático en Vercel.

- **Push a `master`** → Production deployment automático
- **Push a cualquier branch / PR** → Preview deployment automático (URL efímera)
- **Variables de entorno en Vercel:**
  - `VITE_SITE_URL` — **Production**: tu dominio; **Preview**: `https://$VERCEL_URL`

```bash
# Link manual (solo primera vez)
vercel link --repo

# Deploy manual si hiciera falta
vercel deploy --prod
```

> Los flags `--scope <team>` son opcionales; Vercel los resuelve desde la config local (`.vercel/`) o el account por defecto.

---

## 📝 Licencia

Proyecto educativo y de demostración. Código abierto bajo MIT si querés reutilizar partes.

---

## 👨‍💻 Autor

**Oscar Eduardo Lozano Bocanegra**  
Ingeniero de Sistemas · Full-Stack Developer (React, TypeScript, Django)  

- GitHub: [@Olozano1194](https://github.com/Olozano1194)
- LinkedIn: [oscar-lozano](https://linkedin.com/in/olozanobocanegra)