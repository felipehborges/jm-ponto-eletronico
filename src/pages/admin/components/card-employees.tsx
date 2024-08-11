import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { today } from "@/lib/utils";
import { getEmployees } from "@/services/api.routes";
import type { IEmployee } from "@/services/api.types";
import { useQuery } from "@tanstack/react-query";

export default function EmployeesCard() {
  const {
    data: employees,
    isLoading: getEmployeesLoading,
    error: getEmployeesError,
  } = useQuery({
    queryKey: ["getEmployeesQuery"],
    queryFn: getEmployees,
  });

  if (getEmployeesLoading) return <Spinner />;
  if (getEmployeesError) return <div>Erro ao carregar</div>;

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
        {employees?.map((employee: IEmployee) => (
          <TableRow key={employee?.id}>
            <TableCell>{employee?.name}</TableCell>
            <TableCell>{employee?.rfid}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Card>
  );
}
