import axios from "axios";

export const API = axios.create({
  // baseURL: "https://v3.controledepontojm.com",
  baseURL: "https://v3-dev.controledepontojm.com",
});
