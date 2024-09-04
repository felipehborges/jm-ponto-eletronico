import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { today } from "@/lib/utils";
import apiPonto from "@/services/ponto";
import type { Employee } from "@/services/ponto/types";
import { useQuery } from "@tanstack/react-query";

export default function EmployeesCard() {
  const {
    data: employeesData,
    isLoading: employeesDataLoading,
    error: employeesDataError,
  } = useQuery({
    queryKey: ["apiPonto.getEmployees"],
    queryFn: async () => {
      const response = await apiPonto.getEmployees();
      return response.result;
    },
  });

  if (employeesDataLoading) return <Spinner />;
  if (employeesDataError) return <div>Erro ao carregar</div>;

  return (
    <Card className="mx-4 mt-4">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <h2>{`Hoje - ${today}`}</h2>
            <Button>Ver todos</Button>
          </div>
        </CardTitle>
      </CardHeader>

      <TableBody>
        {employeesData?.map((employee: Employee) => (
          <TableRow key={employee?.id}>
            <TableCell>{employee?.name}</TableCell>
            <TableCell>{employee?.rfid}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Card>
  );
}
