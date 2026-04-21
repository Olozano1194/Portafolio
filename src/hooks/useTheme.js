import { useState, useEffect } from 'react';

const THEME_KEY = 'portfolio-theme';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        return savedTheme || 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        // console.log('🎨 Applying theme:', theme);
        
        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
        }

        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        // console.log('🔄 Toggling theme. Current:', theme);
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme, isDark: theme === 'dark' };
};
