import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  sub: string; // username
  scope: string; // role
  exp: number;
  iat: number;
}

export const getUsernameFormToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.sub;
  } catch (error) {
    console.error("Lỗi giải mã token:", error);
    return null;
  }
};
