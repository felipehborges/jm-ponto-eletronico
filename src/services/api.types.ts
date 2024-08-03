// Listar todos os funcionários
// GET /employee

export interface GetEmployeesResponse {
  result: EmployeeResult[];
  totalRegisters: number;
  totalPages: number;
  currentPage: number;
}

export interface EmployeeResult {
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
  result: AttendanceResult[];
  totalRegisters: number;
  totalPages: number;
  currentPage: number;
}

export interface AttendanceResult {
  attendanceId: string;
  employee: IEmployee;
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

export interface IEmployee {
  id: string;
  name: string;
  rfid: string;
}

// ================================================
