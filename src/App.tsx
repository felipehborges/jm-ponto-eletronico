import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModeToggle } from "./components/mode-toggle";
import AppRoutes from "./routes";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <>
          {/* TODO: Create a navbar */}
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>

          <AppRoutes />
        </>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
