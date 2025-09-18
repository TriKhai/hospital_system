export interface LoginForm {
  username: string;
  password: string;
}

export interface TokenResponse {
  username: string;
  role: string;
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
  role: "PATIENT" | "DOCTOR" | "ADMIN";
  exp: number;
}

export interface JwtType {
  sub: string;                        // username
  iat: number;                        // issued at
  exp: number;                        // expiration timestamp
  scope: "PATIENT" | "DOCTOR" | "ADMIN"; // role / quyền
}

export interface User {
  username: string;
  role: "PATIENT" | "DOCTOR" | "ADMIN";
  token: string;
}

