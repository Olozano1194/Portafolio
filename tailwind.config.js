/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {    
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', //azul
          hover: '#1D4EDD8',
        },
        secondary: {
          DEFAULT: '#38BDF8',
        },
        accent: {
          DEFAULT: '#F59E0B',
        },
        /* Light mode */
        bg: {
          DEFAULT: '#F8FAFC',
          section: '#E5E7EB',
          card: '#FFFFFF',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
        },

        /* Dark mode */
        dark: {
          bg: '#020617',
          section: '#020617',
          card: '#020617',
          text: {
            primary: '#F8FAFC',
            secondary: '#CBD5F5',
            muted: '#94A3B8',
          },
        },
      },      
      fontFamily: {
        "ubuntu": ['"Ubuntu Sans Mono"', 'monospace'], 
      },
    },
  },
  plugins: [],
}

