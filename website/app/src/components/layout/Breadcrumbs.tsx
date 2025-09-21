import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center text-sm text-slate-600 space-x-2">
      {/* Home */}
      <Link
        to="/admin"
        className="flex items-center text-slate-500 hover:text-slate-700"
      >
       <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 h-5" />
      </Link>

      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center space-x-2">
            <span className="text-slate-400">›</span>
            {isLast ? (
              <span className="font-medium text-slate-900 capitalize">
                {value.replace("-", " ")}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-slate-800 capitalize"
              >
                {value.replace("-", " ")}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
