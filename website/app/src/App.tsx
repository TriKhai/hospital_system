import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider";
import { Login, Register } from "./pages/auth";
import NotFound from "./pages/not_found/NotFound";
import { RoleProtectedRoute } from "./components/route/RoleProtectedRoute";
import HomeDoctor from "./pages/doctor/HomeDoctor";
import { HomePage, MainPage } from "./pages/patient";
import {
  AdminPage,
  CRMAccountPage,
  CRMDrugPage,
  CRMPage,
  DashboardPage,
} from "./pages/admin";
import OpportunitiesPage from "./components/layout/admin/OpportunitiesPage";
import SchedulePage from "./pages/admin/schedule/SchedulePage";

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/trang-chu" replace />} />
            <Route element={<MainPage />}>
              <Route path="/trang-chu" element={<HomePage />} />
              {/* <Route path="/gioi-thieu" element={<About />} /> */}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <About /> */}

            <Route
              path="/about"
              element={
                <RoleProtectedRoute allowedRoles={["PATIENT"]}>
                  {/* <About /> */}
                  <HomePage />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/doctor"
              element={
                <RoleProtectedRoute allowedRoles={["DOCTOR"]}>
                  <HomeDoctor />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminPage />
                </RoleProtectedRoute>
              }
            >
              <Route index element={<Navigate to="thong-ke" replace />} />
              <Route path="chuyen-khoa" element={<CRMPage />} />
              <Route path="thong-ke" element={<DashboardPage />} />
              <Route path="tai-khoan" element={<CRMAccountPage />} />
              <Route path="thuoc" element={<CRMDrugPage />} />
              <Route path="lich" element={<SchedulePage />} />
              <Route path="test" element={<OpportunitiesPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer
        position="top-right" // Vị trí hiển thị
        autoClose={3000} // Tự đóng sau 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
