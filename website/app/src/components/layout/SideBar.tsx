import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChartBar,
  type IconDefinition,
  faBoxes,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

interface NavLink {
  path: string;
  label: string;
  icon: IconDefinition;
}

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navLinks: NavLink[] = [
    { path: "/admin/thong-ke", label: "Thống Kê", icon: faChartBar },
    { path: "/admin/tai-khoan", label: "Tài Khoản", icon: faBoxes },
    { path: "/admin/chuyen-khoa", label: "Chuyên Khoa", icon: faTruck },
    // { path: "/admin/bac-si", label: "Bác Sĩ", icon: faUserTie },
    // { path: "/admin/khoa", label: "Department", icon: faPills },
    // { path: "/admin/hangsx", label: "Hãng Sản Xuất", icon: faFlask },
    // { path: "/admin/hoa-don", label: "Hóa Đơn", icon: faFileInvoice },
    // { path: "/admin/theo-doi", label: "Theo dõi", icon: faEye },
  ];

  // CSS variable
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex gap-2 ${
      isActive
        ? "active bg-[#0E8DA1] p-5 text-white "
        : "p-5 hover:bg-[#12B0C2] hover:text-white"
    }`;

  return (
    <aside
      className={`flex flex-col justify-between transition-all duration-300 
      ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
    >
      <div className="h-screen w-[15vw] bg-gray-100 text-black flex flex-col justify-between ">
        <div>
          <div className="py-2 px-2">
            <p className="text-xl font-bold text-center">Hospital System</p>
            <p className="text-xl font-bold text-center">Bệnh viện Cần Thơ</p>
          </div>
          <hr />
          <div className="">
            {navLinks.map(({ path, label, icon }) => (
              <div className="text-xl " key={path}>
                <NavLink to={path} className={getLinkClass}>
                  <FontAwesomeIcon icon={icon} className="mr-2 w-5 h-5" />
                  {label}
                </NavLink>
              </div>
            ))}
            <hr />
            <div className="text-xl">
              {/* <button className="p-4 cursor-pointer" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất</button>  */}
            </div>
          </div>
        </div>

        <div className="border-t py-2 text-center">© 2025 Hospital System</div>
      </div>
    </aside>
  );
};

export default Sidebar;
