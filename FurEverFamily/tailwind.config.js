/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        'primary-dark': '#FF5252',
        secondary: '#4ECDC4',
        'secondary-dark': '#45B7AE',
        accent: '#FFD93D',
        text: '#2C3E50',
        background: '#F8F9FA',
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      spacing: {
        'nav': '4rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}