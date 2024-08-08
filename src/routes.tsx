import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/index.tsx";
import HomePage from "./pages/home/index.tsx";
import EmployeesPage from "./pages/employees/index.tsx";
import DaysOffPage from "./pages/daysoff/index.tsx";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/daysoff" element={<DaysOffPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
