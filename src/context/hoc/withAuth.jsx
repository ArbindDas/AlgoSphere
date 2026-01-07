

import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const withAuth = (WrappedComponent, requiredRoles = [], autoRedirect = true) => {
  return (props) => {
    const location = useLocation();
    const pathname = location.pathname;
    
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
    
    if (!token) {
      console.log("No token found, redirecting to login");
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    try {
      const decoded = jwtDecode(token);
      
      // Check token expiration
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('keycloak_auth');
        return <Navigate to="/login" replace />;
      }
      
      // Get roles from multiple sources
      const jwtRoles = decoded.realm_access?.roles || [];
      const localStorageRoles = authData?.user?.roles || [];
      const allRoles = [...new Set([...jwtRoles, ...localStorageRoles])];
      
      // Check for admin role
      const isAdmin = allRoles.some(role => 
        role.toUpperCase() === 'ADMIN'
      );
      
      console.log("=== AUTH DEBUG ===");
      console.log("Current path:", pathname); 
      console.log("All Roles:", allRoles);
      console.log("Is Admin?", isAdmin);
      
      // Auto-redirect logic - ADMIN should go to /admin
      if (autoRedirect && pathname === '/dashboard') {
        if (isAdmin) {
          console.log("🚀 Admin detected at /dashboard, redirecting to /admin");
          return <Navigate to="/admin" replace />;
        }
      }
      
      // Non-admin should not access admin routes
      if (autoRedirect && pathname.startsWith('/admin')) {
        if (!isAdmin) {
          console.log("🔒 Non-admin detected at /admin, redirecting to /dashboard");
          return <Navigate to="/dashboard" replace />;
        }
      }
      
      // Check specific role requirements
      if (requiredRoles.length > 0) {
        const hasRole = requiredRoles.some(requiredRole => 
          allRoles.some(userRole => 
            userRole.toUpperCase() === requiredRole.toUpperCase()
          )
        );
        
        if (!hasRole) {
          console.log("User doesn't have required role, redirecting");
          if (isAdmin) {
            return <Navigate to="/admin" replace />;
          } else {
            return <Navigate to="/dashboard" replace />;
          }
        }
      }
      
      // Create user object - SIMPLIFIED VERSION
      const userFromStorage = authData?.user || {};
      const user = {
        // Core user info
        id: userFromStorage.userId || decoded.sub,
        userId: userFromStorage.userId || decoded.sub,
        email: userFromStorage.email || decoded.email,
        username: userFromStorage.username || decoded.preferred_username,
        fullName: userFromStorage.fullName || decoded.name,
        firstName: decoded.given_name || userFromStorage.fullName?.split(' ')[0],
        lastName: decoded.family_name || userFromStorage.fullName?.split(' ').slice(1).join(' '),
        
        // Auth info
        roles: allRoles,
        isAdmin: isAdmin,
        emailVerified: userFromStorage.emailVerified || decoded.email_verified || false,
        
        // JWT info
        token: token,
        decoded: decoded
      };
      
      console.log("✅ withAuth: Passing user object:", user);
      console.log("User ID:", user.id);
      console.log("Is Admin:", user.isAdmin);
      console.log("=== END DEBUG ===");
      
      // Pass props correctly - ensure user is passed
      return <WrappedComponent {...props} user={user} />;
    } catch (error) {
      console.error("❌ withAuth Error:", error);
      localStorage.removeItem('keycloak_auth');
      return <Navigate to="/login" replace />;
    }
  };
};

// Set display name for debugging
withAuth.displayName = 'withAuth';

export default withAuth;