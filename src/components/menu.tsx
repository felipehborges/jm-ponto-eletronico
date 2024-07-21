import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaUmbrellaBeach } from "react-icons/fa";
import { LuLayoutGrid, LuLogOut, LuMenu, LuUser } from "react-icons/lu";

export default function Menu() {
  return (
    <div className="absolute top-4 left-4">
      <Sheet>
        <SheetTrigger>
          <Button size="icon">
            <LuMenu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-24">
          {/* <SheetHeader className="bg-red-500">
            <SheetTitle>Navegação</SheetTitle>
          </SheetHeader> */}

          <div className="flex h-full py-20 items-center flex-col justify-around">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon">
                    <LuLayoutGrid className="text-lg" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Visão geral</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon">
                    <FaUmbrellaBeach className="text-lg" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Folgas e feriados</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon">
                    <LuUser className="text-lg" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Funcionários</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <LuLogOut className="rotate-180 text-lg" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Sair</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
