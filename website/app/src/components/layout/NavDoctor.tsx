import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadcrumbsDoctor from "./BreadcrumbsDoctor";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NavDoctor:React.FC = () => {

    return (
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 sticky top-0 z-50">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BreadcrumbsDoctor />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-5">
            {/* Notifications */}
            <button className="relative text-gray-600 hover:text-red-500">
              <FontAwesomeIcon icon={faBell} size="lg" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Doctor info */}
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="doctor avatar"
                className="w-10 h-10 rounded-full border"
              />
              <div className="text-sm">
                <p className="font-semibold text-gray-700">BS. Nguyễn Văn A</p>
                <p className="text-gray-500 text-xs">Khoa Tim mạch</p>
              </div>
            </div>
          </div>
        </header>
    );

}

export default NavDoctor;