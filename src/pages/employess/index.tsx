import PageTemplate from "@/components/page/page-template";
import { getAttendances } from "@/services/api.routes";
import { useQuery } from "@tanstack/react-query";

export default function EmployeesPage() {
  const { data } = useQuery({
    queryKey: ["getAttendanceQuery"],
    queryFn: getAttendances,
  });

  return (
    <PageTemplate>
        a
    </PageTemplate>
  );
}
