import type {
  AuthProps,
  AuthResponse,
  CreateDayOffProps,
  CreateEmployeeProps,
  CreateOrDeleteDayOffResponse,
  GetAttendancesByEmployeeIdResponse,
  GetAttendancesResponse,
  GetDaysOffResponse,
  GetEmployeeByIdResponse,
  GetEmployeesResponse,
  GetReportProps,
  RegisterClockedOutProps,
  RegisterLunchEndProps,
  RegisterLunchStartProps,
  RegisterProps,
  RegisterResponse,
  RegisterStartTimeProps,
  ScheduleResponse,
} from "./api.types";
import { API } from "./base";

// AUTH SERVICES
const auth = async (credentials: AuthProps) => {
  const response = await API.post<AuthResponse>(
    "/auth/authenticate",
    credentials,
  );
  return response.data;
};

const register = async (credentials: RegisterProps) => {
  const response = await API.post<RegisterResponse>(
    "/auth/register",
    credentials,
  );
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
  await API.post<CreateOrDeleteDayOffResponse>("/daysoff/create", dayOffProps);

const deleteDayOff = async (dayOffId: string) =>
  await API.delete<CreateOrDeleteDayOffResponse>(`/daysoff/delete/${dayOffId}`);

// JOURNEY SERVICES

// SCHEDULE SERVICES
const registerStartTime = async (props: RegisterStartTimeProps) =>
  await API.post<ScheduleResponse>("/schedule/start/", props);

const registerLunchStart = async (props: RegisterLunchStartProps) =>
  await API.post<ScheduleResponse>("/schedule/lunch/start/", props);

const registerLunchEnd = async (props: RegisterLunchEndProps) =>
  await API.post<ScheduleResponse>("/schedule/lunch/end/", props);

const registerClockedOut = async (props: RegisterClockedOutProps) =>
  await API.post<ScheduleResponse>("/schedule/end/", props);

// JUSTIFICATION SERVICES

// REPORT SERVICES
const getReportPdf = async (props: GetReportProps) => {
  const response = await API.get(
    `/report/pdf/${props.initialDate}/${props.finalDate}/${props.rfid}`,
  );
  return response.data;
};

const getReportHttp = async (props: GetReportProps) => {
  const response = await API.get(
    `/report/${props.initialDate}/${props.finalDate}/${props.rfid}`,
  );
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
  registerStartTime,
  registerLunchStart,
  registerLunchEnd,
  registerClockedOut,
  getReportPdf,
  getReportHttp,
};

export default apiPonto;
