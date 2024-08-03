import { cn } from "@/lib/utils";
import Footer from "./footer";
import Navbar from "./navbar";

interface PageTemplateProps {
  children: React.ReactNode;
  className?: string;
  navbar?: boolean;
  footer?: boolean;
}

export default function PageTemplate({
  children,
  className,
  navbar = true,
  footer = true,
}: PageTemplateProps) {
  return (
    <div className={cn("flex flex-col min-h-screen", className)}>
      {navbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      {footer && <Footer />}
    </div>
  );
}
