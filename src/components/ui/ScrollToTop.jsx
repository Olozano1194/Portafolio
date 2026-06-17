import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../../utils/scrollToSection';

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