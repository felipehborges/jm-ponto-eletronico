// AUTH TYPES
export interface AuthProps {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  role: string;
}
export interface RegisterProps {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
