export const proyectos = [
    {
        id: 1,
        "img": "GymReactDjango",
        "tipo": "Ver proyecto",
        "col": "md:col-span-7",
        "repo": "https://github.com/Olozano1194/GimnasioReactDjango",
        "ver_proyecto": "https://gimnasio-react-django.vercel.app",
        "credenciales": { 
            "user": "reclutador@gimnasio.com", 
            "pass": "Gimnasio2026!"
        },
        "imgDemo": {
            "img": [
                "/demo/gimnasioReactDjango/demo-Dashboard.jpg",                
                "/demo/gimnasioReactDjango/demo-Listar.jpg",
                "/demo/gimnasioReactDjango/demo-Usuario.jpg",
            ]
        },
        "stack": ["React", "TypeScript", "Vite", "Django REST Framework", "Tailwind", "Axios"],
        "category": "Gestión de Gimnasios",
        "year": "2026",
        "architecturalStack": {
            "frontend": "Vite, React, TypeScript, Tailwind CSS, JavaScript",
            "backend": "Django REST Framework, Python, Cors",
            "database": "MySQL",
            "infrastructure": "Vercel, GitHub, Render",
        }
    },
    {
        id: 6,
        "img": "FiadoApp",
        "tipo": "Ver proyecto",
        "col": "md:col-span-5",
        "repo": "https://github.com/Olozano1194/FiadoApp",
        "ver_proyecto": "#",
        // "credenciales": { 
        //     "user": "#", 
        //     "pass": "#" 
        // },
        "imgDemo": {
            "img": [
                "/demo/fiadoApp/demo-clientes.webp",
                "/demo/fiadoApp/demo-inventory.webp",                
                "/demo/fiadoApp/demo-venta.webp",
            ]                     
        },
        "stack": ["React", "TypeScript", "Vite", "Tailwind", "Zustand", "Django REST Framework", "MySQL", "Tauri", "Axios"],
        "category": "Business",
        "year": "2026",
        "architecturalStack": {
            frontend: "Vite, React, TypeScript, Tailwind CSS",
            backend: "Django, Django REST Framework, Python",
            database: "MySQL, SQLite",
            infrastructure: "GitHub",
            desktop: "Tauri",
            packaging: "PyInstaller"
        }
    },
    {
        id: 3,                        
        "img": "TaskReact",
        "col": "md:col-span-5",
        "tipo": "Video",
        "repo": "https://github.com/Olozano1194/todoListReactDjango",
        "stack": ["React", "TypeScript", "Django", "Django REST Framework", "MySQL", "Tailwind"],
        "category": "Productividad",
        "year": "2024",
        "challenge": "Crear una aplicación de productividad que permita gestionar tareas en tiempo real, enfocándose en la persistencia de datos, una API REST eficiente y una interfaz de usuario minimalista que maximice el enfoque del usuario.",
        "metrics": [
            { "value": "Django REST", "labelES": "API Backend", "labelEN": "Backend API" },
            { "value": "React", "labelES": "Frontend Dinámico", "labelEN": "Dynamic Frontend" }
        ]
    },
    {
        id: 4,
        "img": "InstitucionesV2",
        "tipo": "Ver proyecto",
        "col": "md:col-span-7",
        "repo": "https://github.com/Olozano1194/entidadesReact",
        "ver_proyecto": "#",
        // "credenciales": { 
        //     "user": "PedroNel@gmail.com", 
        //     "pass": "123456" 
        // },
        "imgDemo": {
            "img": [
                "/demo/institucionesV2/demo-HomeInstitucion.jpg",
                "/demo/institucionesV2/demo-Profile.jpg",                
                "/demo/institucionesV2/demo-ListarInstitucion.jpg",
            ]                     
        },
        "stack": ["React", "TypeScript", "Express", "Axios"],
        "category": "Gestión Educativa",
        "year": "2024",
        "architecturalStack": {
            "frontend": "Vite, React, TypeScript, Tailwind CSS",
            "backend": "Express, Node.js, Cors",
            "database": "MongoDB",
            "infrastructure": "GitHub",
        }
    },
    {
        id: 5,
        "img": "Instituciones",
        "tipo": "Ver proyecto",
        "col": "md:col-span-7",
        "repo": "https://github.com/Olozano1194/InstitucionesV1",
        "ver_proyecto": "https://instituciones-v1.vercel.app",
        "credenciales": { 
            "user": "example@example.com", 
            "pass": "123456"
        },
        "imgDemo": {
            "img": [
                "/demo/instituciones/demo-HomeInstitucion.jpg",
                "/demo/instituciones/demo-RegistrarInstitucion.jpg",
                "/demo/instituciones/demo-ListarInstitucion.jpg",                
            ]
        },
        "stack": ["HTML5", "Tailwind", "Express", "MongoDB"],
        "category": "Gestión Educativa",
        "year": "2023",
        "architecturalStack": {
            "frontend": "HTML5, Tailwind CSS, JavaScript",
            "backend": "Express, Node.js, Cors",
            "database": "MongoDB",
            "infrastructure": "Vercel, GitHub",
        }
    }, 
    {
        id: 2,                        
        "img": "HotelAlura",
        "col": "md:col-span-5",
        "tipo": "Video",
        "repo": "https://github.com/Olozano1194/alura-Hotel",
        "stack": ["Java", "JDBC", "MySQL", "Swing"],
        "category": "Gestión Hotelera",
        "year": "2023",
        "challenge": "Desarrollar un software de escritorio robusto para la gestión integral de reservas y huéspedes, optimizando el manejo de datos mediante JDBC y garantizando una experiencia de usuario fluida en un entorno de escritorio.",
        "metrics": [
            { "value": "JDBC", "labelES": "Persistencia de Datos", "labelEN": "Data Persistence" },
            { "value": "Java Swing", "labelES": "Interfaz de Escritorio", "labelEN": "Desktop Interface" }
        ]
    },        
]