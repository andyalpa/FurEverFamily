import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserTab from './UserTab';
import { useTheme } from '../../features/ThemeContext';
import './NavBar.css';

const NavBar = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/adopt', label: 'Adopt' },
    { path: '/recipes', label: 'Pet Recipes' },
    { path: '/blog', label: 'Blog' },
  ];

  const isCurrentPath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark'
            ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-black/10'
            : 'bg-white/95 backdrop-blur-sm shadow-lg'
          : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            data-aos="fade-right"
          >
            <img
              src="/src/assets/logo.png"
              alt="FurEver Family"
              className="h-8 w-auto"
            />
            <span className={`text-xl font-heading font-bold ${
              theme === 'dark' ? 'text-white' : 'text-text'
            }`}>
              FurEver Family
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex items-center gap-8"
            data-aos="fade-down"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link relative py-2 text-sm font-medium transition-colors ${
                  isCurrentPath(link.path)
                    ? theme === 'dark'
                      ? 'text-primary'
                      : 'text-primary'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-text'
                }`}
              >
                {link.label}
                {isCurrentPath(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div 
            className="flex items-center gap-4"
            data-aos="fade-left"
          >
            <UserTab />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-text'
                } ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`py-4 space-y-2 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 text-sm transition-colors ${
                  isCurrentPath(link.path)
                    ? 'text-primary font-medium'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;