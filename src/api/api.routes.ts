import { api } from "./api";

export const getEmployees = async () => {
  const response = await api.get("/employee");
  const data = response.data.result;

  return data;
};

// export const getEmployeeById = async (id: string) => {
//   const { data } = await axios.get<GetEmployeedByIdProps>(
//     `https://v3.controledepontojm.com/employee/${id}`,
//   );
//   return data;
// };

// export const getSchedulesByEmployeeId = async (id: string) => {
//   const { data } = await axios.get<GetSchedulesByEmployeeIdProps>(
//     `https://v3.controledepontojm.com/attendances/employee/${id}`,
//   );
//   return data;
// };

// export const getEmployees = async () => {
//   const { data } = await axios.get<Array<GetEmployeedByIdProps>>(
//     "https://v3.controledepontojm.com/employees",
//   );
//   return data;
// };

// export const getReports = async (
//   startDate: string,
//   endDate: string,
//   rfid: string,
// ) => {
//   const { data } = await axios.get<Array<GetSchedulesByEmployeeIdProps>>(
//     `https://v3.controledepontojm.com/report/${startDate}/${endDate}/${rfid}`,
//   );
//   return data;
// };
