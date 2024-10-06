import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatTime, today } from "@/lib/utils";
import apiPonto from "@/services/ponto";
import type { Attendance } from "@/services/ponto/types";
import { useQuery } from "@tanstack/react-query";

export default function EmployeesCard({ className }: { className?: string }) {
  const employees = useQuery({
    queryKey: ["apiPonto.getEmployees"],
    queryFn: async () => {
      const response = await apiPonto.getEmployees();
      return response.result;
    },
  });

  const attendances = useQuery({
    queryKey: ["apiPonto.getAttendancesByEmployeeId"],
    queryFn: async () => {
      // const response = await apiPonto.getAttendancesByEmployeeId(employeeId);
      const response = await apiPonto.getAttendances();
      return response;
    },
  });

  if (employees.error) return <div>Erro ao carregar</div>;

  const status = (item: Attendance) => {
    const clockedIn = item.clockedIn;
    const lunchStart = item.lunchStart;
    const lunchEnd = item.lunchEnd;
    const clockedOut = item.clockedOut;

    if (clockedIn && !lunchStart && !lunchEnd && !clockedOut) {
      return "Trabalhando";
    }
    if (clockedIn && lunchStart && lunchEnd && !clockedOut) {
      return "Trabalhando";
    }
    if (clockedIn && lunchStart && !lunchEnd && !clockedOut) {
      return "Em horário de almoço";
    }
    if (clockedIn && lunchStart && lunchEnd && clockedOut) {
      return "Expediente finalizado";
    }
  };

  return (
    <Card className={cn("mx-4 mt-4", className)}>
      {employees.isLoading ? (
        <div className="flex m-4 flex-col space-y-3">
          <Skeleton className="h-[100px] w-full rounded-xl" />
          <div className="space-y-2 px-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <h2 className="mr-4">{`Hoje - ${today}`}</h2>
                {/* <Button>Ver todos</Button> */}
              </div>
            </CardTitle>
          </CardHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead className="w-20 text-center">Status</TableHead>
                {/* <TableHead className="w-20 text-center">Detalhes</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendances.data?.result?.map((attendance) => (
                <TableRow key={attendance?.attendanceId}>
                  <TableCell>{attendance?.employee?.name}</TableCell>
                  <TableCell>{formatTime(attendance?.clockedIn)}</TableCell>
                  <TableCell>
                    {formatTime(attendance?.lunchStart || "")}
                  </TableCell>
                  <TableCell>
                    {formatTime(attendance?.lunchEnd || "")}
                  </TableCell>
                  <TableCell>
                    {formatTime(attendance?.clockedOut || "")}
                  </TableCell>
                  <TableCell>{status(attendance)}</TableCell>
                </TableRow>
              ))}
              {/* {employees.data?.map((employee: Employee) => (
                <TableRow key={employee?.id}>
                  <TableCell>{employee?.name}</TableCell>
                  <TableCell>{employee?.rfid}</TableCell>
                  <TableCell>{employee?.rfid}</TableCell>
                  <TableCell>{employee?.rfid}</TableCell>
                  <TableCell>{employee?.rfid}</TableCell>
                  <TableCell>{status(employee)}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </>
      )}
    </Card>
  );
}
