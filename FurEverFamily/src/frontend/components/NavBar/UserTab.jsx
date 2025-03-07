import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/AuthContext';
import { useTheme } from '../../features/ThemeContext';
import ThemeToggle from '../../features/ThemeToggle';

const UserTab = () => {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center gap-4">
        <Link
          to="/signinpage"
          className={`text-sm font-medium hover:text-primary transition-colors ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Sign In
        </Link>
        <Link
          to="/signuppage"
          className="btn-primary"
        >
          Sign Up
        </Link>
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-3">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName || 'User'}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-primary'
            }`}>
              {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
            </div>
          )}
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-white' : 'text-text'
          }`}>
            {currentUser.displayName || currentUser.email.split('@')[0]}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          } ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-72 rounded-xl shadow-lg py-1 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } ring-1 ring-black ring-opacity-5 z-50`}>
          {/* User Profile Preview */}
          <div className="px-4 py-3 border-b dark:border-gray-700">
            <div className="flex items-start gap-3">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg text-white ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-primary'
                }`}>
                  {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <div>
                <div className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-text'
                }`}>
                  {currentUser.displayName || 'Set display name'}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {currentUser.email}
                </div>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="py-1">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-2 text-sm ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center gap-3 px-4 py-2 text-sm ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorite Pets
            </Link>

            <Link
              to="/adoption-applications"
              className={`flex items-center gap-3 px-4 py-2 text-sm ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Adoption Applications
            </Link>

            <Link
              to="/settings"
              className={`flex items-center gap-3 px-4 py-2 text-sm ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t dark:border-gray-700 my-1" />

          {/* Logout Button */}
          <div className="py-1">
            <button
              onClick={handleLogout}
              className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-gray-700'
                  : 'text-red-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTab;
