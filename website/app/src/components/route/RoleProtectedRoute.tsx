import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/useAuth";

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[]; // ["PATIENT", "DOCTOR", "ADMIN"]
}

export function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { user } = useAuth();

  // Chua login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Khong can quyen
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/not-found" replace />;
  }

  return <>{children}</>;
}
