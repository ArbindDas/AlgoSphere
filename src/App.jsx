import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";
import ModernNavbar from "./components/ModernNavbar";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <ModernNavbar />

      
      
      <AppRoutes/>
    </Router>
  );
}

export default App;