import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import { ThemeProvider } from './frontend/features/ThemeContext';
import { AuthProvider } from './frontend/features/AuthContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);


