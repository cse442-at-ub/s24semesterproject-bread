import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuth, isLoading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // Dependency array ensures `checkAuth` is called only when the function changes, which should be rarely if ever

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  if (!isAuthenticated) {
    // Redirect to the login page
    return <Navigate to="/signinpage" />;
  }

  return children;
};

export default ProtectedRoute;
