import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from "./pages/About";
import "./index.css";
import ContactPage from "./pages/ContactPage";
import ModernNavbar from "./components/ModernNavbar";
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import { LoginPage } from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <ModernNavbar />
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/new" element={<NewArrivals />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;