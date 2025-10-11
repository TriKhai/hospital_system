import { format } from "date-fns";
import type { PatientResponse } from "../../../types/patientType";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";

interface ProfileContextType {
  patient: PatientResponse;
  imageSrc: string;
  onUploadImage?: (file: File) => Promise<void>;
  onEditClick?: () => void;
  user?: { username?: string };
}

const InforPatient: React.FC = () => {
  const { patient, imageSrc, onUploadImage, onEditClick, user } =
    useOutletContext<ProfileContextType>();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadImage) return;

    setLoading(true);
    try {
      await onUploadImage(file);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-red-500 inline-block">
          Trang cá nhân
        </h2>
        <div className="mt-6 flex flex-col md:flex-row gap-2 items-start">
          {/* Avatar bên trái */}
          <div className="flex flex-col items-center w-full md:w-1/4">
            <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 shadow-inner overflow-hidden">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={patient.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <i className="fa-solid fa-user fa-5x text-gray-400"></i>
              )}
            </div>

            <p className="mt-3 font-medium text-gray-700">{patient.name}</p>
            <div>
              <button
                onClick={handleButtonClick}
                disabled={loading}
                className="mt-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow flex items-center gap-2"
              >
                <i className="fa-solid fa-camera"></i>
                {loading ? "Đang tải..." : "Cập nhật ảnh"}
              </button>

              {/* input file ẩn */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Thông tin bên phải */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                <p className="text-gray-500 text-sm">Họ và tên</p>
                <p className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <i className="fa-regular fa-id-badge text-gray-500"></i>
                  {patient.name}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-gray-500"></i>
                  {patient.email}
                </p>
              </div>

              {/* TODO: thêm hàm gọi lấy số lịch khám hiện tại */}
              <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                <p className="text-gray-500 text-sm">Số lịch khám</p>
                <p className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <i className="fa-solid fa-calendar-check text-gray-500"></i>
                  11
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                <p className="text-gray-500 text-sm">Số điện thoại</p>
                <p className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <i className="fa-solid fa-phone text-gray-500"></i>
                  {patient.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hồ sơ của bạn */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-red-500 inline-block">
            Hồ sơ của bạn
          </h2>
          <button
            onClick={onEditClick}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
          >
            <FontAwesomeIcon icon={faEdit} />
            Chỉnh sửa thông tin
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Tên đăng nhập</p>
            <input
              value={user?.username || ""}
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <p className="text-gray-500">Họ và tên</p>
            <input
              value={patient.name || ""}
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <p className="text-gray-500">Ngày sinh</p>
            <input
              value={
                patient.birthDate
                  ? format(new Date(patient.birthDate), "dd/MM/yyyy")
                  : ""
              }
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <p className="text-gray-500">Giới tính</p>
            <input
              value={
                patient.gender
                  ? patient.gender === true
                    ? "Nam"
                    : patient.gender === false
                    ? "Nữ"
                    : "Khác"
                  : ""
              }
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <p className="text-gray-500">Địa chỉ Email</p>
            <input
              value={patient.email || ""}
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <p className="text-gray-500">Số điện thoại</p>
            <input
              value={patient.phone || ""}
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <p className="text-gray-500">Địa chỉ</p>
            <input
              value={patient.address || ""}
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <p className="text-gray-500">Ngày đăng ký</p>
            <input
              value={
                patient.createdAt
                  ? format(new Date(patient.createdAt), "dd/MM/yyyy HH:mm")
                  : ""
              }
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <p className="text-gray-500">Ngày cập nhật</p>
            <input
              value={
                patient.updatedAt
                  ? format(new Date(patient.updatedAt), "dd/MM/yyyy HH:mm")
                  : ""
              }
              disabled
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>
          {/* <div>
              <p className="text-gray-500">Đăng nhập gần nhất</p>
              <input
                value={patient.lastLogin || ""}
                disabled
                className="w-full bg-gray-100 rounded-md p-2 mt-1"
              />
            </div> */}
        </div>
      </div>
    </>
  );
};

export default InforPatient;
