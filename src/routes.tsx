import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login.tsx";
import HomePage from "./pages/home.tsx";
// Import other pages as needed

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      {/* Define other routes here */}
    </Routes>
  </Router>
);

export default AppRoutes;
