// EMPLOYEE TYPES
export interface EmployeeMin {
  id: string;
  name: string;
  rfid: string;
}
export interface Employee {
  id: string;
  name: string;
  position: string;
  rfid: string;
  imgUrl: string;
  journeyId: string;
  createdAt: string;
  updatedAt?: string;
}
export interface GetEmployeesResponse {
  result: Employee[];
  totalRegisters: number;
  totalPages: number;
  currentPage: number;
}
export interface GetEmployeeByIdResponse {
  id: string;
  name: string;
  position: string;
  rfid: string;
  imgUrl: string;
  journeyId: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateEmployeeProps {
  name: string;
  position: string;
  imgUrl: string;
  rfid: string;
  journeyId: string;
}

// ATTENDANCE TYPES
export interface Attendance {
  attendanceId: string;
  employee: EmployeeMin;
  clockedIn: string;
  lunchStart?: string;
  lunchEnd?: string;
  clockedOut?: string;
  delay: number;
  hoursWorked: number;
  extraTime: number;
  createdAt: string;
  updatedAt: string;
}
export interface GetAttendancesResponse {
  result: Attendance[];
  totalRegisters: number;
  totalPages: number;
  currentPage: number;
}
export type GetAttendancesByEmployeeIdResponse = Attendance[];

// DAY OFF TYPES
export interface DayOff {
  id: string;
  reason: string;
  date: string;
}
export interface GetDaysOffResponse {
  result: DayOff[];
  totalRegisters: number;
  totalPages: number;
  currentPage: number;
}
export interface CreateDayOffProps {
  reason: string;
  date: string;
}
export interface CreateOrDeleteDayOffResponse {
  id: string;
  reason: string;
  date: string;
}

// JOURNEY TYPES

// SCHEDULE TYPES
export interface ISchedule {
  clockedIn?: string;
  lunchStart?: string;
  lunchEnd?: string;
  clockedOut?: string;
}
export interface RegisterStartTimeProps {
  rfid: string;
  clockedIn: Date;
}
export interface RegisterLunchStartProps {
  rfid: string;
  lunchStart: Date;
}
export interface RegisterLunchEndProps {
  rfid: string;
  lunchEnd: Date;
}
export interface RegisterClockedOutProps {
  rfid: string;
  clockedOut: Date;
}
export interface ScheduleResponse {
  id: string;
  employeeId: string;
  date: string;
  clockedIn: string;
  delay: number;
  hoursWorked: number;
  extraTime: number;
}

// JUSTIFICATION TYPES

// REPORT TYPES
export interface GetReportProps {
  initialDate: string;
  finalDate: string;
  rfid: string;
}
