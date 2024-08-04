import PageTemplate from "@/components/page/page-template";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { createDayOff, getDaysOff } from "@/services/api.routes";
import type { IDayOff } from "@/services/api.types";
import { useQuery } from "@tanstack/react-query";
import { LuTrash } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { LuCalendar } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

// TODO: Limite de caracteres no backend?
const formSchema = z.object({
  dayOffName: z.string().min(2).max(30),
  dayOffDate: z.date(),
});

// {"id": "", "date": "2024-08-05T23:59:59.000Z", "reason": "TESTE", "createdAt": "", "updatedAt": ""}

export default function DaysOffPage() {
  const [date, setDate] = useState<Date>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dayOffName: "",
      dayOffDate: new Date(),
    },
  });



  function onSubmitHandler(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const { data: getDaysOffData } = useQuery({
    queryKey: ["getDaysOffQuery"],
    queryFn: getDaysOff,
  });

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
            {getDaysOffData?.map((item: IDayOff) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.reason}</TableCell>
                <TableCell>{formatDate(item?.date)}</TableCell>
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
