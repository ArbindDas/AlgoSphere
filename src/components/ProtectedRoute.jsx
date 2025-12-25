import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Install: npm install jwt-decode

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  // Get token from localStorage
  const token = localStorage.getItem('access_token') || 
                JSON.parse(localStorage.getItem('keycloak_auth'))?.accessToken;
  
  // If no token, redirect to login
  if (!token) {
    console.log("No token found, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // Check token expiry
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if (decodedToken.exp < currentTime) {
      console.log("Token expired, redirecting to login");
      localStorage.removeItem('keycloak_auth');
      localStorage.removeItem('access_token');
      return <Navigate to="/login" replace />;
    }
    
    // Check roles if required
    if (requiredRoles.length > 0) {
      const userRoles = decodedToken.realm_access?.roles || [];
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      
      if (!hasRequiredRole) {
        console.log(`User lacks required roles: ${requiredRoles.join(', ')}`);
        return <Navigate to="/unauthorized" replace />;
      }
    }
    
    return children;
  } catch (error) {
    console.error("Token decode error:", error);
    localStorage.removeItem('keycloak_auth');
    localStorage.removeItem('access_token');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;