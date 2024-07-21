// getEmployeedById
// https://v3.controledepontojm.com/employee/:id
export interface GetEmployeedByIdProps {
  id: string;
  name: string;
  position: string;
  rfid: string;
  imgUrl: string;
  journeyId: string;
  createdAt: string;
  updatedAt: string;
}

// getReports
// https://v3.controledepontojm.com/report/:startDate/:endDate/:rfid

// getSchedulesByEmployeeId
// https://v3.controledepontojm.com/attendances/employee/:id
export type SchedulesListProps = Array<GetSchedulesByEmployeeIdProps>;

export interface GetSchedulesByEmployeeIdProps {
  attendanceId: string;
  employee: EmployeeProps;
  clockedIn: string;
  lunchStart: string;
  lunchEnd: string;
  clockedOut?: string;
  delay: number;
  hoursWorked: number;
  extraTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeProps {
  id: string;
  name: string;
  rfid: string;
}

export interface IEmployeeProps {
  id: number;
  name: string;
  position: string;
  rfid: string;
  imgUrl: string;
}
