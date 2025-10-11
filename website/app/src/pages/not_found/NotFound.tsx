import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import type { Role } from "../../types/authType";

const NotFound: React.FC = () => {
  const { user } = useAuth();

  function getHomePath(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "/admin/thong-ke";
    case "DOCTOR":
      return "/doctor";
    case "PATIENT":
      return "/";
    default:
      return "/";
  }
}

const homePath = getHomePath(user?.role ?? "PATIENT");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black text-center">
      <h1 className="text-6xl font-bold text-[#12B0C2] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-black mb-4">
        Trang Không Tìm Thấy
      </h2>
      <p className="text-gray-600 mb-6">
        Đường dẫn bạn truy cập không tồn tại trong hệ thống bệnh viện.
      </p>
      <Link
        to={homePath}
        className="bg-[#12B0C2] text-white px-6 py-2 rounded hover:bg-[#0e8a9b] transition"
      >
        Quay lại Trang Chủ
      </Link>
    </div>
  );
};

export default NotFound;
