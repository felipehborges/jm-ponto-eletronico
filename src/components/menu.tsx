import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import { FaUmbrellaBeach } from "react-icons/fa";
import { LuLayoutGrid, LuLogOut, LuMenu, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button size="icon">
            <LuMenu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-24">
          <div className="flex h-full py-20 items-center flex-col justify-around">
            {/* FIXME: Primeiro tooltip abrindo mesmo sem passar o mouse */}
            <Button size="icon" onClick={() => navigate("/home")}>
              <LuLayoutGrid className="text-lg" />
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon">
                    <FaUmbrellaBeach
                      className="text-lg"
                      onClick={() => navigate("/daysoff")}
                    />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Folgas e feriados</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon">
                    <LuUser
                      className="text-lg"
                      onClick={() => navigate("/employees")}
                    />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Funcionários</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <LuLogOut
                      className="rotate-180 text-lg"
                      onClick={() => navigate("/login")}
                    />
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
