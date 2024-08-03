import type { GetAttendanceResponse, GetEmployeesResponse } from "./api.types";
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
