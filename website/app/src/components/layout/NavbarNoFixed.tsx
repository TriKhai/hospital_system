import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import {
  faBoxes,
  faChartBar,
  faPills,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeToggle from "../ui/ThemeToggle";

interface NavLinkItem {
  path: string;
  label: string;
  icon: IconDefinition;
  children?: { path: string; label: string }[];
}

export default function NavbarNoFixed() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks: NavLinkItem[] = [
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
    `px-4 py-2 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`;

  return (
    <nav className="fixed top-5 left-0 right-0 mx-auto px-4 sm:px-6 lg:px-8 z-50">
      <div className="grid grid-cols-6 items-center justify-between ">
        {/* Logo */}
        <div className="col-span-1 font-bold text-lg">HỆ THỐNG BỆNH VIỆN</div>

        {/* Menu */}
        <div className="col-span-4 hidden md:flex items-center justify-center space-x-2">
          <div className="relative bg-white shadow-md rounded-xl px-2 py-2 flex">
            {navLinks.map(({ path, label, children }) =>
            children ? (
              <div key={label} className="relative group">
                <div className="px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100">
                  {label} ▾
                </div>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded mt-2 min-w-[150px]">
                  {children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={path} to={path} className={getLinkClass}>
                {label}
              </NavLink>
            )
          )}
          </div>
        </div>

        {/* Right side */}
        <div className="col-span-1 flex items-center space-x-2 justify-end">
          <ThemeToggle />
          {user ? (
            <div className="flex gap-2">
              <NavLink
                to={"/trang-ca-nhan"}
                className="bg-gray-700 px-3 py-3 rounded-xl text-white ml-2"
              >
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                
              </NavLink>
              <button
                onClick={logout}
                className="bg-gray-700 px-3 py-3 rounded-xl text-white"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-gray-700 px-3 py-3 rounded-xl text-white" title="Đăng nhập">
              <FontAwesomeIcon icon={faRightToBracket} className="w-5 h-5" />
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-2 text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 bg-white shadow-md rounded-lg px-4 py-2 space-y-2">
          {navLinks.map(({ path, label, children }) =>
            children ? (
              <div key={label}>
                <div className="font-semibold">{label}</div>
                <div className="pl-4 space-y-1">
                  {children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className="block px-4 py-2 rounded hover:bg-gray-100"
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={path}
                to={path}
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                {label}
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
}
