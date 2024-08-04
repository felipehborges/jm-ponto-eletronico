import type {
  CreateDayOffProps,
  GetAttendanceResponse,
  GetDaysOffResponse,
  GetEmployeesResponse,
} from "./api.types";
import { API } from "./base";

export const getEmployees = async () => {
  const response = await API.get<GetEmployeesResponse>("/employee");
  return response.data.result;
};

export const getAttendances = async () => {
  const response = await API.get<GetAttendanceResponse>("/attendances");
  return response.data.result;
};

export const getTodayAttendances = async () => {
  const response = await API.get<GetAttendanceResponse>("/attendances");
  const data = response.data.result;

  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
  const todaysSchedules = Array.isArray(data)
    ? data.filter((item) => item.clockedIn.startsWith(today))
    : [data];

  return todaysSchedules;
};

// TODO: Update route to "dayoff"
export const getDaysOff = async () => {
  const response = await API.get<GetDaysOffResponse>("/holiday");
  return response.data.result;
};

export const createDayOff = async (newDayOff: CreateDayOffProps) => {
  await API.post("/holiday", newDayOff);
};

export const deleteDayOff = async (id: string) => {
  await API.delete(`/holiday/${id}`);
};
