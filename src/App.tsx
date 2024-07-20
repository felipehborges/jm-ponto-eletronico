import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import Demo from "./pages/demo";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="p-4 w-full flex gap-2 items-center flex-col">
        <ModeToggle />
        <div className="w-2/3">
          <Demo />
        </div>
      </div>
    </ThemeProvider>
  );
}
