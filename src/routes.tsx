import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/index.tsx";
import HomePage from "./pages/home/index.tsx";
import EmployeesPage from "./pages/employess/index.tsx";
import HolidaysPage from "./pages/holidays/index.tsx";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/holidays" element={<HolidaysPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
