import { cn } from "@/lib/utils";
import { CgSpinnerAlt } from "react-icons/cg";

export default function Spinner({ className }: { className?: string }) {
  return <CgSpinnerAlt className={cn("animate-spin", className)} />;
}
