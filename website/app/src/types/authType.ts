// export interface Role {
//   role: "ADMIN" | "DOCTOR" | "PATIENT";
// }

export type Role = "ADMIN" | "DOCTOR" | "PATIENT";

export interface LoginForm {
  username: string;
  password: string;
}

export interface TokenResponse {
  username: string;
  role: Role;
  token: string;
}

// Register
export interface RegisterForm {
    username: string;
    password: string;
}  

export interface RegisterResponse {
    id: number;
    username: string;
    role: string;
}

export interface TokenPayload {
  username: string;
  role: Role;
  exp: number;
}

export interface JwtType {
  sub: string;                        // username
  iat: number;                        // issued at
  exp: number;                        // expiration timestamp
  scope: Role; // role / quyền
}

