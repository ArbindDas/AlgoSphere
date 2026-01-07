

import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React from "react";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const location = useLocation();
  
  // Get token from localStorage
  const getAuthData = () => {
    try {
      const authData = localStorage.getItem('keycloak_auth');
      return authData ? JSON.parse(authData) : null;
    } catch {
      return null;
    }
  };
  
  const authData = getAuthData();
  const token = authData?.accessToken;
  
  // If no token, redirect to login
  if (!token) {
    console.log("🔐 No token found, redirecting to login");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check token expiry
    if (decodedToken.exp < currentTime) {
      console.log("🕒 Token expired, redirecting to login");
      localStorage.removeItem('keycloak_auth');
      localStorage.removeItem('access_token');
      return <Navigate to="/login" replace />;
    }
    
    // Get user roles from multiple sources
    const jwtRoles = decodedToken.realm_access?.roles || [];
    const localStorageRoles = authData?.user?.roles || [];
    const allRoles = [...new Set([...jwtRoles, ...localStorageRoles])];
    
    // Check for ADMIN role
    const isAdmin = allRoles.some(role => role.toUpperCase() === 'ADMIN');
    
    console.log("=== 🔐 PROTECTED ROUTE DEBUG ===");
    console.log("📍 Current path:", location.pathname);
    console.log("👤 All roles:", allRoles);
    console.log("👑 Is Admin?", isAdmin);
    
    // CRITICAL: Handle admin redirects
    if (location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/')) {
      if (isAdmin) {
        console.log("🚀 ADMIN detected at /dashboard - REDIRECTING to /admin");
        return <Navigate to="/admin" replace />;
      }
    }
    
    // CRITICAL: Prevent non-admins from accessing admin routes
    if (location.pathname.startsWith('/admin')) {
      if (!isAdmin) {
        console.log("🔒 NON-ADMIN detected at /admin - REDIRECTING to /dashboard");
        return <Navigate to="/dashboard" replace />;
      }
    }
    
    // Check roles if required
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(requiredRole =>
        allRoles.some(userRole => userRole.toUpperCase() === requiredRole.toUpperCase())
      );
      
      if (!hasRequiredRole) {
        console.log(`⚠️ User lacks required roles: ${requiredRoles.join(', ')}`);
        return <Navigate to="/unauthorized" replace />;
      }
    }
    
    console.log("✅ Access granted to:", location.pathname);
    console.log("=== END DEBUG ===");
    
    // Pass user data to children
    const userData = {
      id: authData?.user?.userId || decodedToken.sub,
      userId: authData?.user?.userId || decodedToken.sub,
      email: authData?.user?.email || decodedToken.email,
      username: authData?.user?.username || decodedToken.preferred_username,
      fullName: authData?.user?.fullName || decodedToken.name,
      roles: allRoles,
      isAdmin: isAdmin,
      emailVerified: authData?.user?.emailVerified || decodedToken.email_verified || false,
    };
    
    // Clone children and pass user prop
    return (
      <>
        {children && React.Children.map(children, child => {
          return React.cloneElement(child, { user: userData });
        })}
      </>
    );
    
  } catch (error) {
    console.error("❌ Token decode error:", error);
    localStorage.removeItem('keycloak_auth');
    localStorage.removeItem('access_token');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;