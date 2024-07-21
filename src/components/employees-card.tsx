import { getEmployees } from "@/api/api.routes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function EmployeesCard() {
//   const { data } = useQuery({
//     queryKey: ["employees"],
//     queryFn: async () => {
//       const data = await getEmployees();
//       return data;
//     },
//   });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <h2>Visão geral</h2>
            <Button>Ver todos</Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>RfId</TableHead>
              <TableHead>Detalhes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>$250.00</TableCell>
              <TableCell>
                <Button>Ver mais</Button>
                {/* go to: /admin/employees/profile/${item.id} */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
