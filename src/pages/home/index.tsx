import { cn } from "@/lib/utils";
import AttendancesTable from "./components/attendance-table";
import ClockForm from "./components/clock-form";
import HomeNavbar from "./components/navbar";

export default function HomePage({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col min-h-screen", className)}>
      <HomeNavbar />
      <main className="flex">
        <div className="w-2/3 md:w-1/4 h-screen bg-secondary p-4">
          <h2 className="text-center font-bold mb-4">Registro de ponto</h2>
          <ClockForm />
        </div>
        <AttendancesTable />
      </main>
    </div>
  );
}
