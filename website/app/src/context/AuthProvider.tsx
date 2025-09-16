import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginForm, TokenResponse } from "../types/authType";
import { loginApi } from "../services/authApi";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TokenResponse | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      setUser({ token, username, role }); 
    }
  }, []);


  const login = async (data: LoginForm): Promise<boolean> => {
    const res = await loginApi(data);
    if (!res) return false;

    // Lưu localStorage
    localStorage.setItem("token", res.token);
    localStorage.setItem("username", res.username);
    localStorage.setItem("role", res.role);

    setUser(res);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
