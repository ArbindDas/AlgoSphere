
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
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    try {
      const decoded = jwtDecode(token);
      
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('keycloak_auth');
        return <Navigate to="/login" replace />;
      }
      
      const userRoles = decoded.realm_access?.roles || [];
      
      // Auto-redirect admins away from user dashboard
      if (autoRedirect && userRoles.includes('ADMIN') && pathname === '/dashboard') {
        return <Navigate to="/admin" replace />;
      }
      
      // Auto-redirect regular users away from admin dashboard
      if (autoRedirect && !userRoles.includes('ADMIN') && pathname.startsWith('/admin')) {
        return <Navigate to="/dashboard" replace />;
      }
      
      // Check specific role requirements
      if (requiredRoles.length > 0) {
        const hasRole = requiredRoles.some(role => userRoles.includes(role));
        
        if (!hasRole) {
          // If admin trying to access something without permission
          if (userRoles.includes('ADMIN')) {
            return <Navigate to="/admin" replace />;
          } else {
            return <Navigate to="/dashboard" replace />;
          }
        }
      }
      
      return <WrappedComponent {...props} user={decoded} />;
    } catch {
      return <Navigate to="/login" replace />;
    }
  };
};

export default withAuth;