import JmTitle from "@/components/jm-title";
import { ModeToggle } from "@/components/mode-toggle";
import { today } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function HomeNavbar() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY <= 0);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`w-full h-28 flex items-center justify-between px-8 bg-primary-foreground transition-transform duration-500 ${
        visible ? "" : "-translate-y-full"
      }`}
    >
      <div className="py-6">
        <JmTitle />
        {today}
      </div>
      <ModeToggle />
    </div>
  );
}
