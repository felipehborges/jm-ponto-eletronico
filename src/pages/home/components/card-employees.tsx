import { getEmployees } from "@/services/api.routes";
import type { EmployeeResult } from "@/services/api.types";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/spinner";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle } from "../../../components/ui/card";
import { TableBody, TableCell, TableRow } from "../../../components/ui/table";

export default function EmployeesCard() {
  const {
    data: getEmployeesData,
    isLoading: getEmployeesLoading,
    error: getEmployeesError,
  } = useQuery({
    queryKey: ["getEmployeesQuery"],
    queryFn: getEmployees,
  });

  if (getEmployeesLoading) return <Spinner />;
  if (getEmployeesError) return <div>Erro ao carregar</div>;

  const currentDate = new Date();
  const day = currentDate.toLocaleString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="mx-4 mt-4">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <h2>{`Hoje - ${day}`}</h2>
            <Button>Ver todos</Button>
          </div>
        </CardTitle>
      </CardHeader>

      <TableBody>
        {getEmployeesData?.map((item: EmployeeResult) => (
          <TableRow key={item?.id}>
            <TableCell>{item?.name}</TableCell>
            <TableCell>{item?.rfid}</TableCell>
            <TableCell>{item?.updatedAt}</TableCell>
            {/* <TableCell>{item?.attendanceId}</TableCell>
            <TableCell>{item?.employee.name}</TableCell>
            <TableCell>{item?.clockedIn}</TableCell>
            <TableCell>{item?.lunchStart}</TableCell>
            <TableCell>{item?.lunchEnd}</TableCell>
            <TableCell>{item?.clockedOut}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Card>
  );
}
