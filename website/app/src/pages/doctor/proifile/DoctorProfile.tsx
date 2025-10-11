import { useOutletContext } from "react-router-dom";
import type { DoctorType } from "../../../types/doctorType";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCamera,
  faIdBadge,
  faEnvelope,
  faPhone,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

interface ProfileContextType {
  doctor: DoctorType;
  user?: { username?: string };
  imageSrc: string;
  onUploadImage?: (file: File) => Promise<void>;
  onEditClick?: () => void;
}

const DoctorProfile: React.FC = () => {
  const { doctor, user, imageSrc, onUploadImage, onEditClick } =
    useOutletContext<ProfileContextType>();

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!doctor)
    return <div className="text-center py-10 text-gray-500">Đang tải...</div>;

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

  const genderText =
    doctor.gender === true ? "Nam" : doctor.gender === false ? "Nữ" : "Khác";

  return (
    <div className="space-y-6">
      {/* Thông tin chính */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <h2 className=" text-xl font-semibold text-gray-800 border-b-2 border-red-500 inline-block pb-1">
          Trang cá nhân
        </h2>

        <div className="mt-6 flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="flex flex-col items-center w-full md:w-1/4">
            <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 shadow-inner overflow-hidden">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <i className="fa-solid fa-user fa-5x text-gray-400"></i>
              )}
            </div>
            <p className="mt-3 font-medium text-gray-700 text-lg">
              {doctor.name}
            </p>

            <button
              onClick={handleButtonClick}
              disabled={loading}
              className="mt-3 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow text-sm transition"
            >
              <FontAwesomeIcon icon={faCamera} />
              {loading ? "Đang tải..." : "Cập nhật ảnh"}
            </button>

            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Thông tin chi tiết */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Họ và tên */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col">
                <p className="text-gray-500 text-sm mb-1">Họ và tên</p>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FontAwesomeIcon icon={faIdBadge} className="text-gray-500" />
                  {doctor.name}
                </p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col">
                <p className="text-gray-500 text-sm mb-1">Email</p>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-500"
                  />
                  {doctor.email}
                </p>
              </div>

              {/* Số lịch khám */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col">
                <p className="text-gray-500 text-sm mb-1">Số lịch khám</p>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className="text-gray-500"
                  />
                  11
                </p>
              </div>

              {/* Số điện thoại */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col">
                <p className="text-gray-500 text-sm mb-1">Số điện thoại</p>
                <p className="flex items-center gap-2 font-semibold text-gray-800">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                  {doctor.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hồ sơ chi tiết */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-500 inline-block pb-1">
            Hồ sơ của bạn
          </h2>
          <button
            onClick={onEditClick}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            <FontAwesomeIcon icon={faEdit} />
            Chỉnh sửa
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {[
            { label: "Tên đăng nhập", value: user?.username || "" },
            { label: "Họ và tên", value: doctor.name || "" },
            {
              label: "Ngày sinh",
              value: doctor.birthDay
                ? format(new Date(doctor.birthDay), "dd/MM/yyyy")
                : "",
            },
            { label: "Giới tính", value: genderText },
            { label: "Email", value: doctor.email || "" },
            { label: "Số điện thoại", value: doctor.phone || "" },
            { label: "Địa chỉ", value: doctor.address || "" },

            { label: "Chuyên khoa", value: doctor.specialty.name },
            { label: "Bằng cấp", value: doctor.degree || "" },
            { label: "Chức vụ", value: doctor.position || "" },
            {
              label: "Số năm kinh nghiệm",
              value: doctor.yearsOfExperience?.toString() || "",
            },
            { label: "Giấy phép hành nghề", value: doctor.licenseNumber || "" },
            {
              label: "Phí khám",
              value: doctor.consultationFee?.toLocaleString() + " VND" || "",
            },
            {
              label: "Ngày đăng ký",
              value: doctor.createdAt
                ? format(new Date(doctor.createdAt), "dd/MM/yyyy HH:mm")
                : "",
            },
            {
              label: "Ngày cập nhật",
              value: doctor.updatedAt
                ? format(new Date(doctor.updatedAt), "dd/MM/yyyy HH:mm")
                : "",
            },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <p className="text-gray-500 mb-1">{field.label}</p>
              <input
                value={field.value}
                disabled
                className="w-full bg-gray-100 rounded-lg p-2 border border-gray-200 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
