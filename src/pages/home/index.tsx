import PageTemplate from "@/components/page/page-template";
import { useQuery } from "@tanstack/react-query";
import {
  LuBaggageClaim,
  LuHammer,
  LuSandwich,
  LuUserX,
  LuUsers,
} from "react-icons/lu";
import EmployeesCard from "./components/card-employees";
import HomeCard from "./components/card";
import {
  getAttendances,
  getEmployees,
  getTodayAttendances,
} from "@/services/api.routes";
import type { AttendanceResult, IEmployee } from "@/services/api.types";

export default function HomePage() {
  const { data: employeesData } = useQuery({
    queryKey: ["getEmployeesQuery"],
    queryFn: getEmployees,
  });

  // const {
  //   data: attendancesData,
  // } = useQuery({
  //   queryKey: ["getAttendancesQuery"],
  //   queryFn: getAttendances,
  // });

  const { data: todayAttendancesData } = useQuery({
    queryKey: ["getTodayAttendancesQuery"],
    queryFn: getTodayAttendances,
  });

  const lunchTime = () => {
    const employeesLunching: IEmployee[] = [];

    if (todayAttendancesData) {
      todayAttendancesData.map((item: AttendanceResult) => {
        const lunchStart = item?.lunchStart;
        const lunchEnd = item?.lunchEnd;

        if (lunchStart && !lunchEnd) {
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
        <HomeCard
          data={employeesData?.length}
          icon={<LuUsers />}
          description="Total de funcionários"
        />

        <HomeCard
          data={todayAttendancesData?.length}
          icon={<LuHammer />}
          description="Trabalhando"
        />

        <HomeCard
          data={
            (employeesData?.length ?? 0) - (todayAttendancesData?.length ?? 0)
          }
          icon={<LuUserX />}
          description="Inconsistências"
        />

        <HomeCard
          data={lunchTime?.length}
          icon={<LuSandwich />}
          description="Em horário de almoço"
        />

        <HomeCard
          data={"{{ferias}}"}
          icon={<LuBaggageClaim />}
          description="Em período de férias"
        />
      </section>
    </PageTemplate>
  );
}
