import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Then check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Update local storage
    localStorage.setItem('theme', theme);

    // Update document class and trigger transition
    setIsTransitioning(true);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Add transition class temporarily
    document.documentElement.classList.add('theme-transition');

    // Disable AOS animations during transition
    if (window.AOS) {
      document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-animate');
      });
    }

    // Remove transition class after animation completes
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
      setIsTransitioning(false);
      
      // Re-enable and refresh AOS animations
      if (window.AOS) {
        window.AOS.refreshHard();
        requestAnimationFrame(() => {
          document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.remove('aos-animate');
            setTimeout(() => {
              el.classList.add('aos-animate');
            }, 10);
          });
        });
      }
    }, 500);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#111827' : '#ffffff'
      );
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addListener(handleChange);

    return () => {
      clearTimeout(timeout);
      mediaQuery.removeListener(handleChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    if (!isTransitioning) {
      // Force all AOS elements to stay visible during transition
      document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-animate');
      });
      
      setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    }
  };

  // CSS Variables for theme colors
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--primary', '#f8733e');
      root.style.setProperty('--primary-dark', '#e65d2e');
      root.style.setProperty('--text', '#ffffff');
      root.style.setProperty('--background', '#111827');
      root.style.setProperty('--primary-rgb', '248, 115, 62');
    } else {
      root.style.setProperty('--primary', '#f8733e');
      root.style.setProperty('--primary-dark', '#e65d2e');
      root.style.setProperty('--text', '#1f2937');
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--primary-rgb', '248, 115, 62');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;