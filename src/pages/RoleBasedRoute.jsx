import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  
  // Get auth data
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
  
  // No token = redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  try {
    // Decode token
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check expiry
    if (decoded.exp < currentTime) {
      localStorage.removeItem('keycloak_auth');
      return <Navigate to="/login" state={{ expired: true }} replace />;
    }
    
    // Get user roles
    const userRoles = decoded.realm_access?.roles || [];
    
    // If specific roles required, check them
    if (allowedRoles.length > 0) {
      const hasPermission = allowedRoles.some(role => userRoles.includes(role));
      
      if (!hasPermission) {
        // Redirect based on user type
        if (userRoles.includes('ADMIN')) {
          return <Navigate to="/admin" replace />;
        } else {
          return <Navigate to="/dashboard" replace />;
        }
      }
    }
    
    return children;
  } catch (error) {
    console.error("Auth check failed:", error);
    localStorage.removeItem('keycloak_auth');
    return <Navigate to="/login" replace />;
  }
};

export default RoleBasedRoute;