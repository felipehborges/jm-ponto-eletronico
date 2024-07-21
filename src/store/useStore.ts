import type { GetEmployeedByIdProps } from "@/types/api.types";
import { create } from "zustand";

interface AppState {
  user: string | null;
  setUser: (user: string | null) => void;

  employees: Array<GetEmployeedByIdProps>;
  setEmployees: (employees: Array<GetEmployeedByIdProps>) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  employees: [],
  setEmployees: (employees) => set({ employees }),
}));
