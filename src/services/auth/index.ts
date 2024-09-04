import { useStore } from "@/store";
import { API } from "../base";
import type {
  AuthProps,
  AuthResponse,
  RegisterProps,
  RegisterResponse,
} from "./types";

// AUTH SERVICES
const auth = async (credentials: AuthProps) => {
  const response = await API.post<AuthResponse>(
    "/auth/authenticate",
    credentials,
  );
  // return response.data;
  const { role, token } = response.data;

  useStore.getState().setAccessToken(token);
  useStore.getState().setUser(role);

  localStorage.setItem("accessToken", token);
  return response.data;
};

const register = async (credentials: RegisterProps) => {
  const response = await API.post<RegisterResponse>(
    "/auth/register",
    credentials,
  );
  return response.data;
};

const apiAuth = {
  auth,
  register,
};

export default apiAuth;
