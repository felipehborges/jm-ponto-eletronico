import { getEmployees } from "@/api/api.routes";
import EmployeesCard from "@/components/employees-card";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  LuBaggageClaim,
  LuHammer,
  LuSandwich,
  LuUserX,
  LuUsers,
} from "react-icons/lu";

export default function HomePage() {
  const getEmployeesQuery = useQuery({
    queryKey: ["getEmployeesQuery"],
    queryFn: async () => {
      const data = await getEmployees();
      return data;
    },
  });

  return (
    <div className="h-full px-10 pt-10 pb-4">
      <EmployeesCard />

      <section className="flex flex-col gap-2 h-lvh">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <p>{getEmployeesQuery?.data?.length}</p>
                <LuUsers />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Total de funcionários</h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <p>{"{{trabalhando}}"}</p>
                <LuHammer />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Trabalhando</h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <p>{"{{inconsistencias}}"}</p>
                <LuUserX />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Inconsistências</h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <p>{"{{horario-almoco}}"}</p>
                <LuSandwich />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Em horário de almoço</h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <p>{"{{ferias}}"}</p>
                <LuBaggageClaim />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Em período de férias</h2>
          </CardContent>
        </Card>

        {/* <Card className="">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <p>{time}</p>
                <LuCloudSun />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2>{day}</h2>
          </CardContent>
        </Card> */}
      </section>

      <Footer />
    </div>
  );
}
