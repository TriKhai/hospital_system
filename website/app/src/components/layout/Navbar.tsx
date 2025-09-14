import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Trang chủ</Link>
        <Link to="/about">Giới thiệu</Link>
        {/* {user?.role === "patient" && <Link to="/patient/dashboard">Bệnh nhân</Link>}
        {user?.role === "doctor" && <Link to="/doctor/dashboard">Bác sĩ</Link>}
        {user?.role === "admin" && <Link to="/admin/dashboard">Admin</Link>} */}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Đăng xuất
          </button>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
}
