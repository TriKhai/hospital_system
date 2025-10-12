import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadcrumbsDoctor from "./BreadcrumbsDoctor";
import { faBell } from "@fortawesome/free-solid-svg-icons";

interface Props {
  imageSrc: string, 
  doctorName?: string, 
  doctorSpec?: string,
}

const NavDoctor:React.FC<Props> = ({imageSrc, doctorName, doctorSpec}) => {

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
                {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={doctorName}
                  className="w-10 h-10 object-cover rounded-full border"
                />
              ) : (
                <i className="fa-solid fa-user fa-5x text-gray-400"></i>
              )}
              <div className="text-sm">
                <p className="font-semibold text-gray-700">BS. {doctorName}</p>
                <p className="text-gray-500 text-xs">Khoa {doctorSpec}</p>
              </div>
            </div>
          </div>
        </header>
    );

}

export default NavDoctor;