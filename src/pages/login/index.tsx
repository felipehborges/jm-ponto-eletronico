import JmTitle from "@/components/jm-title";
import PageTemplate from "@/components/page/page-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiAuth from "@/services/auth";
import { AuthProps } from "@/services/auth/types";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAccessToken } = useStore((s) => ({
    setAccessToken: s.setAccessToken,
  }));

  const {handleSubmit,register} = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { mutateAsync: mutateLogin, isPending: loginPending } = useMutation({
    mutationKey: ["apiPonto.auth"],
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
    onError: (error) => console.error(error)
  });

  const onSubmitHandler = (data: FormData) => mutateLogin(data);

  return (
    <PageTemplate navbar={false}>
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

          <form onSubmit={handleSubmit(onSubmitHandler)} className="lg:pt-10 mt-10 gap-4 flex-1 lg:w-1/2 flex justify-center flex-col p-4 items-center w-full">
            <div className="flex w-full items-center px-4 justify-center flex-col gap-2">
              <Input
              {...register("email")}
                placeholder="Usuário"
                type="email"
                className="max-w-96 lg:h-14 lg:px-4 lg:text-lg"
              />
              <Input
              {...register("password")}
                placeholder="Senha"
                type="password"
                className="max-w-96 lg:h-14 lg:px-4 lg:text-lg"
              />
            </div>

            <Button
              size="lg"
              className="lg:text-lg lg:py-6 lg:px-10"
              disabled={loginPending}
              type="submit"
            >
              Login
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
        </div>
      </div>
    </PageTemplate>
  );
}
