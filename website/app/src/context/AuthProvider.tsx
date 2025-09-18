import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { JwtType, LoginForm, User } from "../types/authType";
import { loginApi } from "../services/authApi";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode";


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JwtType>(token);
      setUser({ username: decoded.sub, role: decoded.scope, token });
    }
  }, []);


  const login = async (data: LoginForm): Promise<boolean> => {
    const res = await loginApi(data);
    if (!res) return false;

    localStorage.setItem("token", res.token);
    const decoded = jwtDecode<JwtType>(res.token);
    console.log(decoded)
    
    await setUser({ username: decoded.sub, role: decoded.scope, token: res.token });
    console.log("user: ", user)

    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
