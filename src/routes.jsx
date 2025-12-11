import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import { LoginPage } from "./pages/auth/LoginPage";
import {SignupPage} from "./pages/auth/SignupPage"
import Dashboard from "./pages/Dashboard";

export default function AppRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/new" element={<NewArrivals />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      
    </Routes>
  );
}
