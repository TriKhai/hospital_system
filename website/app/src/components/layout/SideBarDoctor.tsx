import {
  faCalendarCheck,
  faKey,
  faSignOutAlt,
  faStethoscope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/useAuth";

const SideBarDoctor: React.FC = () => {
  const menuItems = [
    { path: "thong-tin", icon: faUser, label: "Thông tin cá nhân" },
    { path: "lich-hen", icon: faCalendarCheck, label: "Lịch hẹn của tôi" },
    { path: "doi-mat-khau", icon: faKey, label: "Đổi mật khẩu" },
  ];
  const { logout } = useAuth();

  const handleLogout = () => {
    logout()
    toast.success("Đăng xuất thành công!");
  };

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-100 text-red-500 rounded-xl flex items-center justify-center">
            <FontAwesomeIcon icon={faStethoscope} size="lg" />
          </div>
          <h1 className="text-lg font-bold text-gray-700">Doctor Panel</h1>
        </div>

        {/* Menu items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-red-100 text-red-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
        Đăng xuất
      </button>
    </aside>
  );
};

export default SideBarDoctor;
