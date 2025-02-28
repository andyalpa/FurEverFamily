import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="container mx-auto py-10">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;