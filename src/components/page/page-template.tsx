import { cn } from "@/lib/utils";
import Footer from "./footer";
import Navbar from "./navbar";

interface PageTemplateProps {
  children: React.ReactNode;
  className?: string;
  navbar?: boolean;
  footer?: boolean;
}

export default function PageTemplate({ ...props }: PageTemplateProps) {
  return (
    <div
      data-footer={props.footer}
      className={cn(
        "flex flex-col min-h-screen data-[footer=false]:mb-10",
        props.className,
      )}
    >
      {props.navbar && <Navbar />}
      <main className="lg:px-40 flex-grow">{props.children}</main>
      {props.footer && <Footer />}
    </div>
  );
}
