import PageTemplate from "@/components/page/page-template";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import apiPonto from "@/services/ponto";
import type { Employee } from "@/services/ponto/types";
import { useQuery } from "@tanstack/react-query";

export default function EmployeesPage() {
  const { data: employeesData, isFetching: employeesDataFetching } = useQuery({
    queryKey: ["apiPonto.getEmployees"],
    queryFn: async () => {
      const response = await apiPonto.getEmployees();
      return response.result;
    },
  });

  return (
    <PageTemplate navbar footer={false}>
      {/* <Title title="Colaboradores" description="Visualize os colaboradores" /> */}
      {employeesDataFetching ? (
        <div className="flex flex-col pt-10 gap-2">
          <Skeleton className="w-3/4 mx-auto h-14" />
          <Skeleton className="w-3/4 mx-auto h-14" />
          <Skeleton className="w-3/4 mx-auto h-14" />
          <Skeleton className="w-3/4 mx-auto h-14" />
          <Skeleton className="w-3/4 mx-auto h-14" />
        </div>
      ) : (
        <div className="mx-auto max-w-screen-sm pt-10 lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl transition-all duration-500 ease-in-out">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Foto</TableHead>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">Posição</TableHead>
                <TableHead className="text-center">RFID</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employeesData?.map((employee: Employee) => (
                <TableRow className="text-center" key={employee?.id}>
                  <TableCell className="px-0 flex justify-center">
                    <img
                      src={employee?.imgUrl}
                      alt="picture-employee"
                      className="lg:w-20 w-14 rounded-md shadow-sm"
                    />
                  </TableCell>
                  <TableCell>{employee?.name}</TableCell>
                  <TableCell>{employee?.position}</TableCell>
                  <TableCell>{employee?.rfid}</TableCell>
                  {/* <TableCell className="text-center">
                  <Button size="icon">
                    <LuPlus />
                  </Button>
                </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </PageTemplate>
  );
}
