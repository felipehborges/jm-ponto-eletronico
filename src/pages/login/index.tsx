import JmTitle from "@/components/jm-title";
import PageTemplate from "@/components/page/page-template";
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
import apiAuth from "@/services/auth";
import type { AuthProps } from "@/services/auth/types";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(2, { message: "Senha inválida" }),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAccessToken } = useStore((s) => ({
    setAccessToken: s.setAccessToken,
  }));

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: mutateLogin, isPending: loginPending } = useMutation({
    mutationKey: ["apiAuth.auth"],
    mutationFn: async (props: AuthProps) => {
      const response = await apiAuth.auth({
        email: props?.email,
        password: props?.password,
      });
      return response;
    },
    onSuccess: (data) => {
      setAccessToken(data?.token);
      if (data?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    },
    onError: () => toast.error("Usuário ou senha inválidos"),
  });

  const onSubmitHandler = (data: FormData) => mutateLogin(data);

  return (
    <PageTemplate footer navbar={false}>
      <div className="flex justify-center flex-col lg:pt-20 lg:px-20 p-4">
        <div className="flex-grow lg:flex">
          <section className="w-full lg:w-1/2 flex-1 flex justify-center flex-col items-center mt-10">
            <JmTitle />

            <p className="text-secondary-foreground">
              Sistema de ponto eletrônico
            </p>

            <img
              src="/src/assets/gifs/login.gif"
              alt="jm-gif"
              className="w-96 lg:w-auto"
            />
          </section>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className="lg:pt-10 mt-10 gap-4 flex-1 lg:w-1/2 flex justify-center flex-col p-4 items-center w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Input
                        className="lg:w-96 w-60 lg:h-14 lg:px-4 lg:text-lg"
                        placeholder="Usuário"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Input
                        className="lg:w-96 w-60 lg:h-14 lg:px-4 lg:text-lg"
                        placeholder="Senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="mt-4 w-32"
                disabled={loginPending}
                type="submit"
              >
                {loginPending ? <Spinner /> : "Login"}
              </Button>

              <a
                href="https://wa.me/5511943735978"
                target="_blank"
                rel="noreferrer"
                className="mt-4 duration-200 transition-colors hover:text-green-500"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
            </form>
          </Form>
        </div>
      </div>
    </PageTemplate>
  );
}
