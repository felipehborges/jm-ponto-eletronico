import JmTitle from "@/components/jm-title";
import PageTemplate from "@/components/page/page-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiPonto from "@/services/api.routes";
import type { AuthProps } from "@/services/api.types";
import { useStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAccessToken } = useStore((s) => ({
    setAccessToken: s.setAccessToken,
  }));

  const { mutateAsync: login, isPending: loginPending } = useMutation({
    mutationKey: ["apiPonto.auth"],
    mutationFn: async (props: AuthProps) => {
      const response = await apiPonto.auth({
        email: props?.email,
        password: props?.password,
      });
      return response;
    },
    onSuccess: (data) => {
      setAccessToken(data?.token);
      navigate("/home");
    },
    onError: (error) => {
      console.error(error);
    },
  });

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

          <section className="lg:pt-10 mt-10 gap-4 flex-1 lg:w-1/2 flex justify-center flex-col p-4 items-center w-full">
            <div className="flex w-full items-center px-4 justify-center flex-col gap-2">
              <Input
                placeholder="Usuário"
                type="email"
                className="max-w-96 lg:h-14 lg:px-4 lg:text-lg"
              />
              <Input
                placeholder="Senha"
                type="password"
                className="max-w-96 lg:h-14 lg:px-4 lg:text-lg"
              />
            </div>

            <Button
              size="lg"
              className="lg:text-lg lg:py-6 lg:px-10"
              onClick={() => login}
              disabled={loginPending}
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
          </section>
        </div>
      </div>
    </PageTemplate>
  );
}
