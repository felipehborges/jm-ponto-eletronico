import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface HomeCardProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any;
  icon: JSX.Element;
  description: string;
}

export default function HomeCard({ data, icon, description }: HomeCardProps) {
  return (
    <Card className="w-60 h-60 flex flex-col justify-between m-2">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            {data}
            {icon}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-end">
        <h2>{description}</h2>
      </CardContent>
    </Card>
  );
}
