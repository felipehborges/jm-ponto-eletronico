import type { EmployeeResult } from "@/services/api.types";
import { create } from "zustand";

type AppState = {
  user: string | null;
  setUser: (user: string | null) => void;

  employees: Array<EmployeeResult>;
  setEmployees: (employees: Array<EmployeeResult>) => void;
};

export const useStore = create<AppState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  employees: [],
  setEmployees: (employees) => set({ employees }),
}));
