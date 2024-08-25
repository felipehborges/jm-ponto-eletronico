import type {
  CreateDayOffProps,
  CreateEmployeeProps,
  GetAttendancesByEmployeeIdResponse,
  GetAttendancesResponse,
  GetDaysOffResponse,
  GetEmployeeByIdResponse,
  GetEmployeesResponse,
  AuthProps,
  RegisterProps,
} from "./api.types";
import { API } from "./base";

// AUTH SERVICES
const auth = async (credentials: AuthProps) => {
  const response = await API.post("/auth/authenticate", credentials);
  return response.data;
};

const register = async (credentials: RegisterProps) => {
  const response = await API.post("/auth/register", credentials);
  return response.data;
};

// EMPLOYEE SERVICES
const getEmployees = async () => {
  const response = await API.get<GetEmployeesResponse>("/employee/list");
  return response.data;
};

const getEmployeeById = async (employeeId: string) => {
  const response = await API.get<GetEmployeeByIdResponse>(
    `/employee/${employeeId}`,
  );
  return response.data;
};

const createEmployee = async (newEmployee: CreateEmployeeProps) =>
  await API.post("/employee/create", newEmployee);

const deleteEmployee = async (employeeId: string) =>
  await API.delete(`/employee/delete/${employeeId}`);

// ATTENDANCE SERVICES
const getAttendances = async () => {
  const response = await API.get<GetAttendancesResponse>("/attendances/list");
  return response.data;
};

const getAttendancesByEmployeeId = async (employeeId: string) => {
  const response = await API.get<GetAttendancesByEmployeeIdResponse>(
    `/attendances/employee/${employeeId}`,
  );
  return response.data;
};

const deleteAttendance = async (attendanceId: string) =>
  await API.delete(`/attendances/${attendanceId}`);

// DAY OFF SERVICES
const getDaysOff = async () => {
  const response = await API.get<GetDaysOffResponse>("/daysoff/list");
  return response.data;
};

const createDayOff = async (dayOffProps: CreateDayOffProps) =>
  await API.post("/daysoff/create", dayOffProps);

const deleteDayOff = async (dayOffId: string) =>
  await API.delete(`/daysoff/delete/${dayOffId}`);

// JOURNEY SERVICES

// SCHEDULE SERVICES

// JUSTIFICATION SERVICES

// REPORT SERVICES

const getReportPdf = async () => {
  const response = await API.get("/report/pdf");
  return response.data;
};

const getReportHttp = async () => {
  const response = await API.get("/report");
  return response.data;
};

const apiPonto = {
  auth,
  register,
  getEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  getAttendances,
  getAttendancesByEmployeeId,
  deleteAttendance,
  getDaysOff,
  createDayOff,
  deleteDayOff,
  getReportPdf,
  getReportHttp,
};

export default apiPonto;
