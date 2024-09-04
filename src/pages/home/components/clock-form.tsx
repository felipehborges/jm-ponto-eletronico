import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import apiPonto from "@/services/ponto";
import type { RegisterStartTimeProps } from "@/services/ponto/types";

const FormSchema = z.object({
  rfid: z.string().min(1, "O campo de RFID é obrigatório"),
  scheduleType: z.enum(["clockedIn", "lunchStart", "lunchEnd", "clockedOut"]),
});

export default function ClockForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["apiPonto.attendance"],
    mutationFn: async (props: RegisterStartTimeProps) => {
      const response = await apiPonto.registerStartTime({
        rfid: props?.rfid,
        clockedIn: props?.clockedIn,
      });
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await mutateAsync({
      rfid: form.getValues("rfid"),
      clockedIn: data.scheduleType,
    });

    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
    );
  };

  // TODO: Implement the current date
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rfid"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="RFID" className="w-full" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduleType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Selecione o tipo...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="clockedIn" />
                    </FormControl>
                    <FormLabel className="font-normal">Entrada</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="lunchStart" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Início do almoço
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="lunchEnd" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Retorno do almoço
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="clockedOut" />
                    </FormControl>
                    <FormLabel className="font-normal">Saída</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-center">
          <Button type="submit">Registrar</Button>
        </div>
      </form>
    </Form>
  );
}
