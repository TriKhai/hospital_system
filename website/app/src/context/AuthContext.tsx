import { createContext } from "react";

export type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

// Context chỉ nên định nghĩa, chưa có logic
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
