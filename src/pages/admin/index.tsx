import PageTemplate from "@/components/page/page-template";
import { getEmployees, getTodayAttendances } from "@/services/api.routes";
import type { Employee, IAttendance } from "@/services/api.types";
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
  const { data: employees } = useQuery({
    queryKey: ["getEmployeesQuery"],
    queryFn: getEmployees,
  });

  const { data: todayAttendances } = useQuery({
    queryKey: ["getTodayAttendancesQuery"],
    queryFn: getTodayAttendances,
  });

  const lunchTime = () => {
    const employeesLunching: Employee[] = [];
    if (todayAttendances) {
      todayAttendances.map((item: IAttendance) => {
        if (item?.lunchStart && !item?.lunchEnd) {
          employeesLunching.push(item?.employee);
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
          data={employees?.length}
          icon={<LuUsers />}
          description="Total de funcionários"
        />
        <AdminCard
          data={todayAttendances?.length}
          icon={<LuHammer />}
          description="Trabalhando"
        />
        <AdminCard
          data={(employees?.length ?? 0) - (todayAttendances?.length ?? 0)}
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
