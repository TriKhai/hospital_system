import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { JwtType, LoginForm, TokenResponse } from "../types/authType";
import { loginApi } from "../services/authApi";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode";


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TokenResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode<JwtType>(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      setUser(null);
    } else {
      setUser({ username: decoded.sub, role: decoded.scope, token });
    }
  }
  setLoading(false);
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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
