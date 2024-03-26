import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl = 'https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac/backend/authentication/auth.php';
  // Assuming CORS is properly handled by your backend, you might eventually remove the proxyUrl.
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  const signOut = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const checkAuth = () => {
    const email = localStorage.getItem('email');
    const sessionID = localStorage.getItem('sessionID');
    const userID = localStorage.getItem('userID');
  
    if (email && sessionID && userID) {
      fetch(proxyUrl + apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, sessionID, userID }),
      })
      .then(response => {
        if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data); // Temporary logging for debugging
        if (data.status === "success") {
          setIsAuthenticated(true);
        } else {
          throw new Error('Authentication failed');
        }
      })
      .catch(error => {
        console.error('Authentication check failed:', error);
        signOut();
      });
    } else {
      signOut();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
