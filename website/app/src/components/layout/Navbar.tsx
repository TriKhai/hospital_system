import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-100 text-black p-4 flex justify-between sticky top-0 shadow-lg z-50">

      <div className="flex gap-4">
        <Link to="/">Trang chủ</Link>
        <Link to="/about">Giới thiệu</Link>
        <Link to="/about">Tuyển dụng</Link>

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
