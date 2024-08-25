import PageTemplate from "@/components/page/page-template";
import apiPonto from "@/services/api.routes";
import type { Attendance, EmployeeMin } from "@/services/api.types";
import { useQuery } from "@tanstack/react-query";
import {
  LuBaggageClaim,
  LuHammer,
  LuSandwich,
  LuUserX,
  LuUsers,
} from "react-icons/lu";
import AdminCard from "./components/card";
import EmployeesCard from "./components/card-employees";

export default function AdminPage() {
  const { data: employeesData } = useQuery({
    queryKey: ["apiPonto.getEmployees"],
    queryFn: async () => {
      const response = await apiPonto.getEmployees();
      return response.result;
    },
  });

  const { data: todayAttendancesData } = useQuery({
    queryKey: ["apiPonto.getAttendances"],
    queryFn: async () => {
      const response = await apiPonto.getAttendances();
      const data = response.result;
      const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
      const todaysSchedules = Array.isArray(data)
        ? data.filter((item) => item.clockedIn.startsWith(today))
        : [data];
      return todaysSchedules;
    },
  });

  const lunchTime = () => {
    const employeesLunching: EmployeeMin[] = [];
    if (todayAttendancesData) {
      todayAttendancesData.map((attendance: Attendance) => {
        if (attendance?.lunchStart && !attendance?.lunchEnd) {
          employeesLunching.push(attendance?.employee);
        }
      });
    }
    return employeesLunching;
  };

  return (
    <PageTemplate>
      <EmployeesCard />

      <section className="flex-wrap flex p-2">
        <AdminCard
          data={employeesData?.length}
          icon={<LuUsers />}
          description="Total de funcionários"
        />

        <AdminCard
          data={todayAttendancesData?.length}
          icon={<LuHammer />}
          description="Trabalhando"
        />

        <AdminCard
          data={
            (employeesData?.length ?? 0) - (todayAttendancesData?.length ?? 0)
          }
          icon={<LuUserX />}
          description="Inconsistências"
        />

        <AdminCard
          data={lunchTime().length}
          icon={<LuSandwich />}
          description="Em horário de almoço"
        />

        {/* TODO: Implementar lógica de férias */}
        <AdminCard
          data={"{{ferias}}"}
          icon={<LuBaggageClaim />}
          description="Em período de férias"
        />
      </section>
    </PageTemplate>
  );
}
