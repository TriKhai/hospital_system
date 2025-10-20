export type Role = "ADMIN" | "DOCTOR" | "PATIENT";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: Role;
  token: string;
}