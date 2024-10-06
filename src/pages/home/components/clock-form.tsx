import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import apiPonto from "@/services/ponto";
import type {
  RegisterClockedOutProps,
  RegisterLunchEndProps,
  RegisterLunchStartProps,
  RegisterStartTimeProps,
} from "@/services/ponto/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  rfid: z.string().min(1, "O campo de RFID é obrigatório"),
  scheduleType: z.enum(["clockedIn", "lunchStart", "lunchEnd", "clockedOut"]),
});

export default function ClockForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const registerClockedIn = useMutation({
    mutationKey: ["apiPonto.registerStartTime"],
    mutationFn: async (props: RegisterStartTimeProps) => {
      const response = await apiPonto.registerStartTime({
        rfid: props?.rfid,
        clockedIn: props?.clockedIn,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Entrada registrada com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao registrar ponto:\n${error}`);
    },
  });

  const registerLunchStart = useMutation({
    mutationKey: ["apiPonto.registerLunchStart"],
    mutationFn: async (props: RegisterLunchStartProps) => {
      const response = await apiPonto.registerLunchStart({
        rfid: props?.rfid,
        lunchStart: props?.lunchStart,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Início de intervalo registrado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao registrar ponto:\n${error}`);
    },
  });

  const registerLunchEnd = useMutation({
    mutationKey: ["apiPonto.registerLunchEnd"],
    mutationFn: async (props: RegisterLunchEndProps) => {
      const response = await apiPonto.registerLunchEnd({
        rfid: props?.rfid,
        lunchEnd: props?.lunchEnd,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Retorno de intervalo registrado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao registrar ponto:\n${error}`);
    },
  });

  const registerClockedOut = useMutation({
    mutationKey: ["apiPonto.registerClockedOut"],
    mutationFn: async (props: RegisterClockedOutProps) => {
      const response = await apiPonto.registerClockedOut({
        rfid: props?.rfid,
        clockedOut: props?.clockedOut,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Saída registrada com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao registrar ponto:\n${error}`);
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await registerClockedIn.mutateAsync({
      rfid: form.getValues("rfid"),
      clockedIn: data.scheduleType,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rfid"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="RFID"
                  autoFocus
                  className="w-full"
                />
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
                  className="flex flex-col space-y-4 py-6"
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
          <Button
            className="w-32"
            type="submit"
            disabled={registerClockedIn.isPending}
          >
            {registerClockedIn.isPending ? <Spinner /> : "Registrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
