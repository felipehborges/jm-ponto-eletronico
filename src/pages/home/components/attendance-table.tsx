import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { formatTime } from "@/lib/utils";
import apiPonto from "@/services/ponto";
import type { Attendance } from "@/services/ponto/types";
import { useQuery } from "@tanstack/react-query";

export default function AttendancesTable() {
  const { data: attendancesData, isLoading: attendancesIsLoading } = useQuery({
    queryKey: ["apiPonto.getAttendances"],
    queryFn: async () => {
      const response = await apiPonto.getAttendances();
      return response.result;
    },
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

        {attendancesData?.map((attendance: Attendance) => (
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
