import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const authData = localStorage.getItem('keycloak_auth');
      if (!authData) {
        setUser(null);
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(authData);
      const token = parsedData.accessToken;

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Decode token
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Check if token is expired
      if (decoded.exp < currentTime) {
        logout();
        return;
      }

      // Set user data
      setUser({
        ...parsedData.user,
        token: token,
        roles: decoded.realm_access?.roles || [],
        isAdmin: decoded.realm_access?.roles?.includes('ADMIN') || false,
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (authData) => {
    localStorage.setItem('keycloak_auth', JSON.stringify(authData));
    checkAuth();
  };

  const logout = () => {
    localStorage.removeItem('keycloak_auth');
    setUser(null);
    // Optional: Call backend logout endpoint
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};