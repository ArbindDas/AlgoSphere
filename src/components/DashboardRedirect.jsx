import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DashboardRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const determineDashboard = () => {
      try {
        const authData = localStorage.getItem('keycloak_auth');
        if (!authData) {
          navigate('/login');
          return;
        }

        const parsed = JSON.parse(authData);
        const token = parsed.accessToken;
        
        if (!token) {
          navigate('/login');
          return;
        }

        const decoded = jwtDecode(token);
        const userRoles = decoded.realm_access?.roles || [];
        
        // Redirect based on role
        if (userRoles.includes('ADMIN')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Redirect error:", error);
        navigate('/login');
      }
    };

    determineDashboard();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardRedirect;