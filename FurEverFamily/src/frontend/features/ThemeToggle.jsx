import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Container for both icons */}
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <div
          className={`absolute inset-0 transform transition-all duration-500 ${
            theme === 'dark'
              ? 'rotate-90 opacity-0 scale-50'
              : 'rotate-0 opacity-100 scale-100'
          }`}
        >
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        {/* Moon Icon */}
        <div
          className={`absolute inset-0 transform transition-all duration-500 ${
            theme === 'dark'
              ? 'rotate-0 opacity-100 scale-100'
              : '-rotate-90 opacity-0 scale-50'
          }`}
        >
          <svg
            className="w-6 h-6 text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </div>

      {/* Background Animation */}
      <div
        className={`absolute inset-0 rounded-lg transition-colors duration-500 ${
          theme === 'dark'
            ? 'bg-gray-800'
            : 'bg-yellow-100'
        }`}
        style={{
          zIndex: -1,
        }}
      />

      {/* Ripple Effect */}
      <span
        className={`absolute inset-0 rounded-lg transition-transform duration-500 transform ${
          theme === 'dark'
            ? 'scale-100 bg-blue-500/10'
            : 'scale-0 bg-yellow-500/10'
        }`}
        style={{
          zIndex: -1,
        }}
      />
    </button>
  );
};

export default ThemeToggle;