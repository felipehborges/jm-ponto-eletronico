import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaUmbrellaBeach } from "react-icons/fa";
import { LuLayoutGrid, LuLogOut, LuMenu, LuUser } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

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
            <Button
              size="icon"
              onClick={() => navigate("/admin")}
              disabled={pathname === "/admin"}
            >
              <LuLayoutGrid className="text-lg" />
            </Button>

            <Button
              size="icon"
              disabled={pathname === "/daysoff"}
              onClick={() => navigate("/daysoff")}
            >
              <FaUmbrellaBeach className="text-lg" />
            </Button>

            <Button
              size="icon"
              disabled={pathname === "/employees"}
              onClick={() => navigate("/employees")}
            >
              <LuUser className="text-lg" />
            </Button>

            <Button variant="destructive" size="icon" onClick={logout}>
              <LuLogOut className="rotate-180 text-lg" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
