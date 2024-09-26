import { cn } from "@/lib/utils";

interface TitleProps {
  title: string;
  description?: string;
  className?: string;
}

export default function Title({ ...props }: TitleProps) {
  return (
    <div className="flex items-center lg:items-start flex-col space-y-1.5 p-10">
      <h1
        className={cn(
          "text-2xl font-semibold leading-none tracking-tight",
          props.className,
        )}
      >
        {props.title}
      </h1>
      <p className="text-sm text-muted-foreground">{props.description}</p>
    </div>
  );
}
