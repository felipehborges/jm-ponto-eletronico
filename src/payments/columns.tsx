import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EmployeeScheduleProps } from "@/types/api.types";
import type { ColumnDef } from "@tanstack/react-table";
import { LuMoreHorizontal } from "react-icons/lu";

export const columns: ColumnDef<EmployeeScheduleProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "attendanceId",
    header: "ID",
  },
  {
    accessorKey: "employee.name",
    header: "Nome",
  },
  {
    accessorKey: "clockedIn",
    header: "Entrada",
  },
  {
    accessorKey: "lunchStart",
    header: "Almoço",
  },
  {
    accessorKey: "lunchEnd",
    header: "Retorno",
  },
  {
    accessorKey: "clockedOut",
    header: "Saída",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <div className="w-10 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <LuMoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {/* TODO: Abrir dialog com detalhes do funcionário */}
              <DropdownMenuItem onClick={() => console.log(employee?.employee)}>
                Ver funcionário
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
