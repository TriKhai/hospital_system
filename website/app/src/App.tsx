import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
// import { useAuth } from "./context/useAuth";
import Home from "./pages/Home";
import About from "./pages/About";
import { Login, Register } from "./pages/auth";
// import type { JSX } from "react";
import NotFound from "./pages/not_found/NotFound";
import { RoleProtectedRoute } from "./components/route/RoleProtectedRoute";
import HomeDoctor from "./pages/doctor/HomeDoctor";
import HomeAdmin from "./pages/admin/HomeAdmin";

// function PrivateRoute({ children }: { children: JSX.Element }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// }

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <About /> */}
        
          {/* Dashboard chỉ PATIENT được xem */}
          <Route
            path="/about"
            element={
              <RoleProtectedRoute allowedRoles={["PATIENT"]}>
                <About />
              </RoleProtectedRoute>
            }
          />

          {/* Doctor page chỉ DOCTOR được xem */}
          <Route
            path="/doctor"
            element={
              <RoleProtectedRoute allowedRoles={["DOCTOR"]}>
                <HomeDoctor />
              </RoleProtectedRoute>
            }
          />

          {/* Admin page chỉ ADMIN được xem */}
          <Route
            path="/admin"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <HomeAdmin />
              </RoleProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
