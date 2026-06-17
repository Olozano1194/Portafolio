# Spec: improve-project-data

## 1. demoProject.projectDetails — Contenido Exacto

### ID 1 — ControlFit

**Descripción ES:**
Sistema full-stack para gestión de gimnasios con roles Admin/Usuario. Frontend en React con Vite, TypeScript y Tailwind. Backend en Django REST Framework con PostgreSQL. Autenticación JWT con refresh tokens y multi-tenant.

**Descripción EN:**
Full-stack gym management system with Admin/User roles. React frontend with Vite, TypeScript and Tailwind. Django REST Framework backend with PostgreSQL. JWT authentication with refresh tokens and multi-tenant support.

**Features ES:**
- Autenticación JWT con refresh automático y multi-tenant (cada usuario administra su propio gimnasio)
- CRUD completo de miembros con asignación de membresías
- Panel de control con estadísticas en tiempo real
- Soporte para múltiples usuarios por gimnasio con roles diferenciados
- Exportación de datos a Excel
- Diseño responsivo adaptable a todos los dispositivos

**Features EN:**
- JWT authentication with auto-refresh and multi-tenant support (each user manages their own gym)
- Full CRUD for members with membership assignment
- Real-time dashboard with statistics
- Multi-user support per gym with differentiated roles
- Excel data export
- Responsive design adapted to all devices

**Performance ES:**
La combinación de Vite para el frontend y consultas optimizadas con Django REST Framework reduce los tiempos de carga inicial en un 40% comparado con Create React App tradicional.

**Performance EN:**
The combination of Vite for the frontend and optimized Django REST Framework queries reduces initial load times by 40% compared to traditional Create React App.

---

### ID 4 — Gestión Institucional (Actualización)

**Descripción ES:**
Plataforma educativa full-stack con frontend en React y TypeScript, y backend en Express con MongoDB. Permite gestionar instituciones educativas y usuarios con diferentes roles (administrador, docente, estudiante).

**Descripción EN:**
Full-stack educational platform with React and TypeScript frontend, and Express with MongoDB backend. Manages educational institutions and users with different roles (admin, teacher, student).

**Features ES:**
- CRUD completo de instituciones educativas
- Gestión de usuarios con roles (administrador, docente, estudiante)
- Dashboard dinámico con métricas institucionales
- Backend API RESTful con Express y MongoDB

**Features EN:**
- Full CRUD for educational institutions
- User management with roles (admin, teacher, student)
- Dynamic dashboard with institutional metrics
- RESTful API backend with Express and MongoDB

**Performance ES:**
La refactorización a React con TypeScript y la implementación de componentes modulares permitió reducir la complejidad del código en un 35% y mejorar la mantenibilidad del proyecto.

**Performance EN:**
The refactoring to React with TypeScript and modular component architecture reduced code complexity by 35% and improved project maintainability.

---

### ID 5 — EduBase

**Descripción ES:**
Plataforma académica full-stack desarrollada en el programa MinTic. Frontend con HTML5, Tailwind CSS y JavaScript vanilla. Backend con Express y MongoDB. Permite registrar instituciones educativas y gestionar usuarios por roles.

**Descripción EN:**
Full-stack academic platform developed in the MinTic program. Frontend with HTML5, Tailwind CSS and vanilla JavaScript. Backend with Express and MongoDB. Enables educational institution registration and role-based user management.

**Features ES:**
- Registro y gestión de instituciones educativas
- Sistema de autenticación con roles (administrador, docente, estudiante)
- CRUD completo de usuarios con validaciones
- API RESTful con Express y MongoDB
- Interfaz responsive con Tailwind CSS

**Features EN:**
- Educational institution registration and management
- Authentication system with roles (admin, teacher, student)
- Full user CRUD with validations
- RESTful API with Express and MongoDB
- Responsive interface with Tailwind CSS

**Performance ES:**
La arquitectura liviana con HTML y Tailwind garantiza tiempos de carga mínimos, y la separación frontend-backend permite escalar cada capa de forma independiente.

**Performance EN:**
The lightweight architecture with HTML and Tailwind ensures minimal load times, and the frontend-backend separation allows each layer to scale independently.

---

### ID 6 — FiadoApp

**Descripción ES:**
Sistema POS (Punto de Venta) para tiendas de barrio con gestión de crédito (fiado). Frontend en React 19 con Vite, TypeScript, Zustand y Tailwind. Backend en Django 6 con REST Framework. Empaquetado como aplicación de escritorio con Tauri v2.

**Descripción EN:**
POS (Point of Sale) system for small neighborhood stores with credit management (fiado). Frontend with React 19, Vite, TypeScript, Zustand and Tailwind. Backend with Django 6 and REST Framework. Packaged as a desktop application with Tauri v2.

**Features ES:**
- POS con carrito de compras, métodos de pago (efectivo/crédito) y validación de stock en tiempo real
- Inventario inteligente con alertas de stock bajo, categorización y soporte de imágenes
- Control de clientes fiados con límite de crédito, historial de pagos y badge de deudor
- Reportes semanales con gráficos interactivos de barras y tendencias
- Dashboard con tarjetas de resumen, tabla de ventas recientes y notificaciones combinadas
- Exportación de datos a Excel (clientes, productos, ventas)
- Empaquetado como app desktop con Tauri v2 y backend con PyInstaller

**Features EN:**
- POS with shopping cart, payment methods (cash/credit) and real-time stock validation
- Smart inventory with low stock alerts, categorization and image support
- Credit customer control with credit limit, payment history and debtor badge
- Weekly reports with interactive bar charts and trends
- Dashboard with summary cards, recent sales table and combined notifications
- Excel data export (clients, products, sales)
- Packaged as desktop app with Tauri v2 and PyInstaller backend

**Performance ES:**
La arquitectura con Zustand para estado global y consultas optimizadas al backend Django permite una experiencia de usuario fluida incluso en equipos de bajos recursos, con tiempos de respuesta bajo 200ms en operaciones críticas como búsqueda de productos y registro de ventas.

**Performance EN:**
The Zustand state management architecture combined with optimized Django backend queries delivers a smooth user experience even on low-resource machines, with response times under 200ms for critical operations like product search and sales registration.

---

## 2. Stack Corrections (proyectos.js)

| ID | Stack actual | Stack nuevo |
|----|-------------|-------------|
| 1 | `["React", "TypeScript", "Django", "REST API", "Tailwind"]` | `["React", "TypeScript", "Vite", "Django REST Framework", "Tailwind", "Axios"]` |
| 3 | `["Django", "React", "MySQL", "REST API"]` | `["React", "TypeScript", "Django", "Django REST Framework", "MySQL", "Tailwind"]` |
| 5 | `["HTML5", "Tailwind", "Express", "MySQL"]` | `["HTML5", "Tailwind", "Express", "MongoDB"]` |
| 6 | `["React", "TypeScript", "Django", "Axios"]` | `["React", "TypeScript", "Vite", "Tailwind", "Zustand", "Django REST Framework", "MySQL", "Tauri", "Axios"]` |

## 3. Archivos Huérfanos

### A eliminar
- `public/demo/tiendaVirtual/` — directorio vacío, no referenciado por ningún proyecto
- `public/videos/` — identificar MP4 que no corresponden a ningún ID de proyecto activo

### Verificación
- IDs activos con tipo "Video": 2 (HotelAlura), 3 (TaskReact)
- Solo `videos-HotelAlura.mp4` y `videos-TaskReact.mp4` deben permanecer
- Eliminar cualquier otro MP4 no referenciado

## 4. Reglas de Validación

- [ ] ES y EN deben estar sincronizados (mismos campos, mismo contenido semántico)
- [ ] Los stacks nuevos deben coincidir con los READMEs de los repos
- [ ] Ningún proyecto 2 o 4 debe modificarse en stacks
- [ ] No deben eliminarse videos referenciados por proyectos activos
- [ ] `npm run dev` debe funcionar sin errores
