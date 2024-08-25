import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import "./global.css";
import AdminPage from "./pages/admin/index.tsx";
import DaysOffPage from "./pages/daysoff/index.tsx";
import EmployeesPage from "./pages/employees/index.tsx";
import HomePage from "./pages/home/index.tsx";
import LoginPage from "./pages/login/index.tsx";

const rootElement = document.getElementById("root");
const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/daysoff",
    element: <DaysOffPage />,
  },
  {
    path: "/employees",
    element: <EmployeesPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);
const queryClient = new QueryClient();

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={routes} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
