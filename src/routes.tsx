import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login.tsx";
import HomePage from "./pages/home.tsx";
import Navbar from "./components/navbar.tsx";
// Import other pages as needed

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <>
            <Navbar />
            <HomePage />
          </>
        }
      />
      {/* Define other routes here */}
    </Routes>
  </Router>
);

export default AppRoutes;
