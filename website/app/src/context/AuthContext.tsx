import { createContext } from "react";
import type { TokenResponse } from "../types/authType";

export type AuthContextType = {
  user: TokenResponse | null;
  login: (data: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

// Context chỉ nên định nghĩa, chưa có logic
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
