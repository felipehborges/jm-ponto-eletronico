// AUTH TYPES
export interface AuthProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
  role: string;
}

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
  employee: {
    id: string;
    name: string;
    rfid: string;
  };
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

// JOURNEY TYPES

// SCHEDULE TYPES

// JUSTIFICATION TYPES

// REPORT TYPES
