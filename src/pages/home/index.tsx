import Footer from "@/components/page/footer";
import { cn } from "@/lib/utils";
import AttendancesTable from "./components/attendance-table";
import HomeNavbar from "./components/navbar";
import { ClockForm } from "./components/clock-form";

interface HomePageProps {
  className?: string;
}

export default function HomePage({ className }: HomePageProps) {
  return (
    <div className={cn("flex flex-col min-h-screen", className)}>
      <HomeNavbar />

      <main className="flex-grow">
        <div className="flex">
          <div className="w-1/3 bg-secondary p-4">
            <h2 className="text-center font-bold mb-4">Registro de ponto</h2>

            <ClockForm />
          </div>

          <div className="w-full">
            <AttendancesTable />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
