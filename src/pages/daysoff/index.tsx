import PageTemplate from "@/components/page/page-template";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatDate } from "@/lib/utils";
import apiPonto from "@/services/api.routes";
import type { CreateDayOffProps, DayOff } from "@/services/api.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCalendar, LuTrash } from "react-icons/lu";
import { z } from "zod";

const formSchema = z.object({
  dayOffName: z.string().min(2).max(30),
  dayOffDate: z.date(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function DaysOffPage() {
  const [date, setDate] = useState<Date>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dayOffName: "",
      dayOffDate: new Date(),
    },
  });

  const {
    mutateAsync: createDayOff,
    isSuccess: createDayOffSuccess,
    error: createDayOffError,
  } = useMutation({
    mutationKey: ["apiPonto.createDayOff"],
    mutationFn: async (dayOffProps: CreateDayOffProps) => {
      const response = await apiPonto.createDayOff({ ...dayOffProps });
      return response;
    },
    onSuccess: () => {
      console.log("foi");
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const { data: getDaysOffData } = useQuery({
    queryKey: ["apiPonto.getDaysOff"],
    queryFn: async () => {
      const response = await apiPonto.getDaysOff();
      return response.result;
    },
  });

  const onSubmitHandler = async (data: FormSchema) => {
    const dayOffData: CreateDayOffProps = {
      reason: data.dayOffName,
      date: data.dayOffDate.toDateString(),
    };

    try {
      await createDayOff(dayOffData);
      form.reset(); // Reset the form after successful submission
      console.log("Day off created successfully");
      console.log(dayOffData);
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  return (
    <PageTemplate>
      <header className="w-full flex justify-center items-center pt-4 pb-8">
        <Dialog>
          <DialogTrigger>
            <Button>Adicionar novo feriado</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar novo day off</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmitHandler)}
                    className="px-6 mt-10"
                  >
                    <FormField
                      control={form.control}
                      name="dayOffName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Day off</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do day off" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dayOffDate"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-2 mt-4 w-full">
                            <FormLabel>Data</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "justify-start text-left font-normal",
                                      !date && "text-muted-foreground",
                                    )}
                                  >
                                    <LuCalendar className="mr-2 h-4 w-4" />
                                    {date ? (
                                      format(date, "PPP")
                                    ) : (
                                      <span>Escolha uma data</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    {...field}
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-full flex justify-end mt-10">
                      <Button type="submit">Enviar</Button>
                    </div>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>

      <div className="mx-auto max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl px-4 transition-all duration-500 ease-in-out">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-20 text-center">Excluir</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {getDaysOffData?.map((dayoff: DayOff) => (
              <TableRow key={dayoff?.id}>
                <TableCell>{dayoff?.reason}</TableCell>
                <TableCell>{formatDate(dayoff?.date)}</TableCell>
                <TableCell className="text-center">
                  <Button size="icon" variant="destructive">
                    <LuTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageTemplate>
  );
}
