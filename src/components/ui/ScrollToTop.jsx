import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 64;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
};

const ScrollToTop = () => {
    const { pathname, state } = useLocation();

    useEffect(() => {
        const scrollTo = state?.scrollTo;
        if (scrollTo) {
            // Esperar a que el DOM renderice las secciones
            requestAnimationFrame(() => {
                scrollToSection(scrollTo);
            });
            // Limpiar el state para evitar re-scroll en re-renders
            window.history.replaceState({}, document.title);
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [pathname, state]);

    return null;
};
export default ScrollToTop;