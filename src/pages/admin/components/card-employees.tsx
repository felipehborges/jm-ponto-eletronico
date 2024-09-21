import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn, today } from "@/lib/utils";
import apiPonto from "@/services/ponto";
import type { Employee } from "@/services/ponto/types";
import { useQuery } from "@tanstack/react-query";

export default function EmployeesCard({ className }: { className?: string }) {
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

  if (employeesDataError) return <div>Erro ao carregar</div>;

  return (
    <Card className={cn("mx-4 mt-4", className)}>
      {employeesDataLoading ? (
        <div className="flex m-4 flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
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

          <TableBody>
            {employeesData?.map((employee: Employee) => (
              <TableRow key={employee?.id}>
                <TableCell>{employee?.name}</TableCell>
                <TableCell>{employee?.rfid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Card>
  );
}
