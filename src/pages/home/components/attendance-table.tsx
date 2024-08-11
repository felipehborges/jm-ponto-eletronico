import {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { formatTime } from "@/lib/utils";
import { getAttendances } from "@/services/api.routes";
import type { IAttendance } from "@/services/api.types";
import { useQuery } from "@tanstack/react-query";

export default function AttendancesTable() {
  const { data: attendances, isLoading: attendancesIsLoading } = useQuery({
    queryKey: ["getAttendancesQuery"],
    queryFn: () => getAttendances(),
  });

  if (attendancesIsLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <TableBody>
        <TableRow>
          <TableHead className="w-full">Funcionário</TableHead>
          <TableHead className="text-center">Entrada</TableHead>
          <TableHead className="text-center">Saída</TableHead>
          <TableHead className="text-center">Entrada</TableHead>
          <TableHead className="text-center">Saída</TableHead>
        </TableRow>

        {attendances?.map((attendance: IAttendance) => (
          <TableRow key={attendance?.attendanceId}>
            <TableCell>{attendance?.employee?.name}</TableCell>
            <TableCell className="text-center">
              {formatTime(attendance?.clockedIn)}
            </TableCell>
            <TableCell className="text-center">
              {formatTime(attendance?.lunchStart ?? "")}
            </TableCell>
            <TableCell className="text-center">
              {formatTime(attendance?.lunchEnd ?? "")}
            </TableCell>
            <TableCell className="text-center">
              {formatTime(attendance?.clockedOut ?? "")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </div>
  );
}
