import { useState, useEffect } from 'react';

const THEME_KEY = 'portfolio-theme';

/**
 * Custom hook for theme management
 * @returns Object containing theme state, toggle function, and dark mode flag
 */
export const useTheme = (): {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isDark: boolean;
} => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return (savedTheme as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;

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
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};