import { columns } from "@/payments/columns";
import { DataTable } from "@/payments/data-table";
import type {
  EmployeeScheduleProps,
  SchedulesListProps,
} from "@/types/api.types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/api/api.routes";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

export default function EmployeesCard() {
  //   const { data } = useQuery({
  //     queryKey: ["employees"],
  //     queryFn: async () => {
  //       const data = await getEmployees();
  //       return data;
  //     },
  //   });

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

  // FETCH API

  const getEmployeesScheduleQuery = useQuery({
    queryKey: ["getEmployeesScheduleQuery"],
    queryFn: async () => {
      const data = await getEmployees();
      return data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <h2>{`Hoje - ${day}`}</h2>
            <Button>Ver todos</Button>
          </div>
        </CardTitle>
      </CardHeader>

      <TableBody>
        {getEmployeesScheduleQuery?.data?.map((item: EmployeeScheduleProps) => (
          <TableRow key={item?.attendanceId}>
            <TableCell>{item?.attendanceId}</TableCell>
            {/* <TableCell>{item?.employee.name}</TableCell>
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
