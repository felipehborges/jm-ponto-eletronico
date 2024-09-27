import PageTemplate from "@/components/page/page-template";
import Spinner from "@/components/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatDate } from "@/lib/utils";
import apiPonto from "@/services/ponto";
import type { CreateDayOffProps, DayOff } from "@/services/ponto/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCalendar, LuTrash } from "react-icons/lu";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  dayOffName: z
    .string()
    .min(2, {
      message: "O nome do day off deve conter no mínimo 2 caracteres.",
    })
    .max(30, {
      message: "O nome do day off deve conter no máximo 30 caracteres.",
    }),
  dayOffDate: z.date(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function DaysOffPage() {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dayOffName: "",
      dayOffDate: new Date(),
    },
  });

  const {
    data: getDaysOffData,
    refetch: refetchDaysOff,
    isFetching: daysOffDataFetching,
  } = useQuery({
    queryKey: ["apiPonto.getDaysOff"],
    queryFn: async () => {
      const response = await apiPonto.getDaysOff();
      return response.result;
    },
  });

  const { mutate: createDayOff, isPending: createDayOffPending } = useMutation({
    mutationKey: ["apiPonto.createDayOff"],
    mutationFn: async (dayOffProps: CreateDayOffProps) => {
      const response = await apiPonto.createDayOff({ ...dayOffProps });
      return response;
    },
    onSuccess: () => {
      refetchDaysOff();
      setIsOpen(false);
      toast.success("Day off cadastrado com sucesso!");
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: deleteDayOff } = useMutation({
    mutationKey: ["apiPonto.deleteDayOff"],
    mutationFn: async (dayOffId: string) => {
      const response = await apiPonto.deleteDayOff(dayOffId);
      return response;
    },
    onSuccess: () => {
      refetchDaysOff();
      toast.success("Day off excluído com sucesso!");
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmitHandler = async (data: FormSchema) => {
    const dayOffData: CreateDayOffProps = {
      reason: data.dayOffName,
      date: data.dayOffDate.toISOString(),
    };
    try {
      createDayOff(dayOffData);
      form.reset();
      refetchDaysOff();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  return (
    <PageTemplate navbar footer={false}>
      <header className="w-full flex justify-center items-center pt-4 pb-8">
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) {
              form.reset();
            }
            setIsOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>
              Adicionar novo feriado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar novo day off</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <div className="m-4">
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
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={createDayOffPending}>
                        {createDayOffPending ? <Spinner /> : "Enviar"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>

      {daysOffDataFetching ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-3/4 mx-auto h-14" />
          <Skeleton className="w-3/4 mx-auto h-14" />
          <Skeleton className="w-3/4 mx-auto h-14" />
          <Skeleton className="w-3/4 mx-auto h-14" />
          <Skeleton className="w-3/4 mx-auto h-14" />
        </div>
      ) : (
        <div className="mx-auto max-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl px-4 transition-all duration-500 ease-in-out">
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
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button type="button" size="icon" variant="destructive">
                          <LuTrash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir day off</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o day off{" "}
                            <strong>{dayoff?.reason}</strong>?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteDayOff(dayoff?.id)}
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </PageTemplate>
  );
}
