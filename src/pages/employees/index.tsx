import PageTemplate from "@/components/page/page-template";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEmployees } from "@/services/api.routes";
import type { IEmployee } from "@/services/api.types";
import { useQuery } from "@tanstack/react-query";
import { LuPlus } from "react-icons/lu";
import { Button } from "../../components/ui/button";

export default function EmployeesPage() {
  const { data: employeesData } = useQuery({
    queryKey: ["getEmployeeQuery"],
    queryFn: async () => await getEmployees(),
  });

  return (
    <PageTemplate>
      <div className=" mx-auto max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl px-4 transition-all duration-500 ease-in-out">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Foto</TableHead>
              {/* <TableHead className="text-center">ID</TableHead> */}
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Posição</TableHead>
              <TableHead className="text-center">RFID</TableHead>
              <TableHead className="w-20 text-center">Detalhes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employeesData?.map((item: IEmployee) => (
              <TableRow className="text-center" key={item?.id}>
                <TableCell className="px-0 flex justify-center">
                  <img
                    src={item?.imgUrl}
                    alt="picture-employee"
                    className="lg:w-20 w-14 rounded-md shadow-sm"
                  />
                </TableCell>
                {/* <TableCell>{item?.id}</TableCell> */}
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.position}</TableCell>
                <TableCell>{item?.rfid}</TableCell>
                <TableCell className="text-center">
                  <Button size="icon">
                    <LuPlus />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageTemplate>
  );
}
