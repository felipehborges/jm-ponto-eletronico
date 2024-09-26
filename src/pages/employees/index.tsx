import PageTemplate from "@/components/page/page-template";
import Title from "@/components/page/title";
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
import { LuPlus } from "react-icons/lu";
import { Button } from "../../components/ui/button";

export default function EmployeesPage() {
  const { data: employeesData } = useQuery({
    queryKey: ["apiPonto.getEmployees"],
    queryFn: async () => {
      const response = await apiPonto.getEmployees();
      return response.result;
    },
  });

  return (
    <PageTemplate navbar footer={false}>
      {/* <Title title="Colaboradores" description="Visualize os colaboradores" /> */}

      <div className="mx-auto max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl transition-all duration-500 ease-in-out">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Foto</TableHead>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Posição</TableHead>
              <TableHead className="text-center">RFID</TableHead>
              {/* <TableHead className="w-20 text-center">Detalhes</TableHead> */}
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
                {/* <TableCell>{employee?.id}</TableCell> */}
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
    </PageTemplate>
  );
}
