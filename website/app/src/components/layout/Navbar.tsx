import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import {
  faUser,
  faPills,
  faChartBar,
  faBoxes,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ThemeToggle from "../ui/ThemeToggle";

interface NavLink {
  path: string;
  label: string;
  icon: IconDefinition;
  children?: { path: string; label: string }[];
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks: NavLink[] = [
    { path: "/trang-chu", label: "Trang chủ", icon: faChartBar },
    { path: "/gioi-thieu", label: "Giới thiệu", icon: faUser },
    { path: "/tin-tuc", label: "Tin tức", icon: faPills },
    {
      path: "#", // tạm thời không link trực tiếp
      label: "Dịch vụ",
      icon: faBoxes,
      children: [
        { path: "/chuyen-khoa", label: "Chuyên khoa" },
        { path: "/lien-he", label: "Liên hệ" },
      ],
    },
  ];

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1 p-4 ${
      isActive
        ? "active bg-[#0E8DA1] text-white "
        : "hover:bg-[#12B0C2] hover:text-white"
    }`;

  return (
    <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 mx-auto fixed top-5 right-0 left-0">
      <div className="flex justify-between">
        <div className="w-20">Bệnh viện</div>

        <div className="bg-gray-100 px-4 text-black flex items-center shadow-xl z-50 justify-between rounded-xl">
          <button
            className="md:hidden block text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <div className={`md:flex ${open ? "block" : "hidden"}`}>
            {navLinks.map(({ path, label, icon, children }) =>
              children ? (
                <div className="relative group" key={path}>
                  {/* Nút cha */}
                  <div className={getLinkClass({ isActive: false })}>
                    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                    {label}
                  </div>

                  {/* Dropdown */}
                  <div className="absolute left-0 top-10 hidden group-hover:block bg-white shadow-lg rounded mt-2 min-w-[180px] z-50">
                    {children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2 hover:bg-[#12B0C2] hover:text-white"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink to={path} key={path} className={getLinkClass}>
                  <FontAwesomeIcon icon={icon} className="mr-2 w-5 h-5" />
                  {label}
                </NavLink>
              )
            )}
          </div>
        </div>
        <div className="w-20">
          {user ? (
            <div className="flex gap-2">
              <ThemeToggle />
              <NavLink
                to={"/trang-ca-nhan"}
                className="bg-green-500 px-3 py-1 rounded text-white"
              >
                Trang cá nhân
              </NavLink>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-blue-600">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
