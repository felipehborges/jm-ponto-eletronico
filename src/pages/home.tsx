import { getEmployees } from "@/api/api.routes";
import EmployeesCard from "@/components/employees-card";
import Menu from "@/components/menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  LuBaggageClaim,
  LuCloudSun,
  LuHammer,
  LuSandwich,
  LuUserX,
  LuUsers,
} from "react-icons/lu";

export default function HomePage() {
  const currentDate = new Date();
  const day = currentDate.toLocaleString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = currentDate.toLocaleString("pt-BR", {
    hour: "numeric",
    minute: "numeric",
  });

  const getEmployeesQuery = useQuery({
    queryKey: ["getEmployeesQuery"],
    queryFn: async () => {
      const data = await getEmployees();
      return data;
    },
  });

  return (
    <div className="h-full px-10 pt-10 pb-4">
      <Menu />

      <header className="flex justify-center items-center">
        <h1 className="text-primary text-2xl lg:text-4xl">JM ELETRO MOTORES</h1>
      </header>

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

        <Card className="">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <p>{time}</p>
                <LuCloudSun />
                {/* <LuCloudMoon /> */}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2>{day}</h2>
          </CardContent>
        </Card>
      </section>

      <footer className="p-2 flex justify-center items-end lg:p-4">
        <p className="text-center text-primary text-xs">
          Desenvolvido por Gustavo Gomes | gugomes688@hotmail.com
          <br />
          Todos os direitos reservados à empresa JMELETROMOTORES - Av. América,
          267 - Jardim Aeroporto II, Mogi das Cruzes - SP, 08762-490
        </p>
      </footer>
    </div>
  );
}
