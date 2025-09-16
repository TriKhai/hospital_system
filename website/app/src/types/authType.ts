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