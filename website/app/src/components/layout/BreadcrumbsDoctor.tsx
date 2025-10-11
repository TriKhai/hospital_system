import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbsDoctor() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map tên route thành tiêu đề đẹp
  const nameMap: Record<string, string> = {
    "doctor": "Main",
    "trang-chu": "Trang chủ",
    "trang-ca-nhan": "Trang cá nhân",
    "lich-hen": "Lịch hẹn",
    "lich-lam-viec": "Lịch làm việc",
    "doi-mat-khau": "Đổi mật khẩu",
    "thong-tin": "Thông tin cá nhân",
    "benh-nhan": "Bệnh nhân",
    "bac-si": "Bác sĩ",
    "chuyen-khoa": "Chuyên khoa",
    "nha-san-xuat": "Nhà sản xuất",
    "thuoc": "Thuốc",
    "don-thuoc": "Đơn thuốc",
    "blog": "Bài viết",
    "tin-tuc": "Tin tức",
    "lien-he": "Liên hệ",
  };

  // Hàm chuẩn hoá chuỗi path sang dạng “Chữ cái đầu viết hoa”
  const formatName = (slug: string) => {
    if (nameMap[slug]) return nameMap[slug];
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="flex items-center text-sm text-slate-600 space-x-2">
      {/* Home */}
      <Link
        to="/doctor"
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
              <span className="font-medium text-slate-900">
                {formatName(value)}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-slate-800"
              >
                {formatName(value)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
