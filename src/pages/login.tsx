import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

interface UserData {
  username: string;
  password: string;
}

interface LoginResponse {
  user: string;
  token: string;
}

// const loginUser = async (userData: {
//   username: string;
//   password: string;
// }) => {
//   const { data } = await axios.post("/api/login", userData);
//   return data;
// };

// TODO: Implement login
const loginUser = async (userData: UserData): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>("/api/login", userData);
  return data;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const setUser = useStore((state) => state.setUser);

  const mutation = useMutation<LoginResponse, Error, UserData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/home");
    },
  });

  const handleLogin = () => {
    mutation.mutate({ username: "test", password: "password" });
  };

  return (
    <div className="flex overflow-auto h-screen justify-center flex-col lg:pt-20 lg:px-20 p-4">
      <div className="flex flex-col lg:h-screen lg:flex-row">
        <section className="w-full lg:w-1/2 flex-1 flex justify-center flex-col items-center">
          <h1 className="text-xl lg:text-4xl font-bold text-primary">
            JM ELETRO MOTORES
          </h1>
          <p className="text-secondary-foreground">
            Sistema de ponto eletrônico
          </p>
          <img
            src="/src/assets/gifs/login.gif"
            alt="jm-gif"
            className="h-auto"
          />
        </section>

        <section className="lg:pt-10 flex-1 lg:w-1/2 flex justify-center items-center w-full">
          <div className="flex w-full flex-col px-4 items-center">
            <div className="flex w-full items-center justify-center flex-col gap-2 mb-4">
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
              onClick={handleLogin}
              disabled={mutation.isPending}
            >
              Login
            </Button>

            <a
              href="https://wa.me/5511943735978"
              target="_blank"
              rel="noreferrer"
              className="mt-4 lg:mt-10 duration-200 transition-colors hover:text-green-500"
            >
              <FaWhatsapp className="text-3xl" />
            </a>
          </div>
        </section>
      </div>

      <footer className="p-2 flex justify-center items-end lg:p-4">
        <p className="text-center text-primary text-xs lg:text-sm">
          Desenvolvido por Gustavo Gomes | gugomes688@hotmail.com
          <br />
          Todos os direitos reservados à empresa JMELETROMOTORES - Av. América,
          267 - Jardim Aeroporto II, Mogi das Cruzes - SP, 08762-490
        </p>
      </footer>
    </div>
  );
}
