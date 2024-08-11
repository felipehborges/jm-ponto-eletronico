// Listar todos os funcionários
// GET /employee

export interface GetEmployeesResponse {
  result: IEmployee[];
  totalRegisters: number;
  totalPages: number;
  currentPage: number;
}

export interface IEmployee {
  id: string;
  name: string;
  position: string;
  rfid: string;
  imgUrl: string;
  journeyId: string;
  createdAt: string;
  updatedAt: string;
}

// Listar todos os horários
// GET /attendance

export interface GetAttendanceResponse {
  result: IAttendance[];
  totalRegisters: number;
  totalPages: number;
  currentPage: number;
}

export interface IAttendance {
  attendanceId: string;
  employee: Employee;
  clockedIn: string;
  lunchStart: string;
  lunchEnd?: string;
  clockedOut?: string;
  delay: number;
  hoursWorked: number;
  extraTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  rfid: string;
}

// Listar todos os days off
// GET /holiday

export interface GetDaysOffResponse {
  result: IDayOff[];
  totalRegisters: number;
  totalPages: number;
  currentPage: number;
}

export interface IDayOff {
  id: string;
  reason: string;
  date: string;
}

export interface CreateDayOffProps {
  id: string;
  date: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
}
