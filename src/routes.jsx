import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import UserDashboard from "./pages/user/UserDashboard";
import LoginPage from "./pages/auth/loginPage/LoginPage";
import SignupPage from "./pages/auth/signupPage/ SignupPage"
import AdminDashboard from "./pages/admin/AdminDashboard";
import UnauthorizedPage from "./pages/UnauthorizedPage"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardRedirect from "./components/DashboardRedirect";

export default function AppRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/new" element={<NewArrivals />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
       <Route path="/unauthorized" element={<UnauthorizedPage />} />
       {/* Dashboard Redirect - Single entry point */}
      <Route path="/my-dashboard" element={<DashboardRedirect />} />
      {/* protected routes user must be login */}


      <Route path="/dashboard" element={

        <ProtectedRoute>
          <UserDashboard/>
        </ProtectedRoute>
      } />
    


    {/*  Admin routes only */}

    <Route path="/admin" element={
      <ProtectedRoute>
        <AdminDashboard/>
      </ProtectedRoute>
    }/>
    

     {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
      
    </Routes>
  );
}
