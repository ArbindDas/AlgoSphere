import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import ModernNavbar from "./components/ModernNavbar/ModernNavbar";
import AppRoutes from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext.jsx/AuthContext";
import { useLocation } from "react-router-dom";


// Create a component that conditionally renders navbar
function AppLayout() {
  const location = useLocation();
  
  // Check if current path starts with /admin
  // const isAdminRoute = location.pathname.startsWith('/admin');
   // Check if current path starts with /admin or /dashboard
  const hideNavbarRoutes = ['/admin', '/dashboard'];
  const shouldHideNavbar = hideNavbarRoutes.some(route => 
    location.pathname.startsWith(route)
  );
  
  return (
    // <>
    //   {!isAdminRoute && <ModernNavbar />}
    //   <AppRoutes />
    // </>

     <>
      {!shouldHideNavbar && <ModernNavbar />}
      <AppRoutes />
    </>
  );
}

function App() {
  return (


    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppLayout />
        </Router>
      </ThemeProvider>
    </AuthProvider>

  );
}

export default App;
