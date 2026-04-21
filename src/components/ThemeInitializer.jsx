import { useEffect } from 'react';

const THEME_KEY = 'portfolio-theme';

const ThemeInitializer = ({ children }) => {
    useEffect(() => {
        // Ensure dark theme is applied on mount
        const savedTheme = localStorage.getItem(THEME_KEY);
        const theme = savedTheme || 'dark';
        
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return children;
};

export default ThemeInitializer;