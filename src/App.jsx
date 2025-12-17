import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import ModernNavbar from "./components/ModernNavbar/ModernNavbar";
import AppRoutes from "./routes";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ModernNavbar />

        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
