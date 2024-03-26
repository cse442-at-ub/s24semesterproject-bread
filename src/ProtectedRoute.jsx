// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const ProtectedRoute = ({ children }) => {
  
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to the login page
    return <Navigate to="/signinpage" />;
  }

  return children;
};

export default ProtectedRoute;
