import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShieldAlt,
  faHistory,
  faWallet,
  faKey,
  faSignOutAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import type {
  PatientResponse,
  PatientUpdateRequest,
} from "../../types/patientType";
import patientService from "../../services/patientApi";
import { format } from "date-fns";
import { useAuth } from "../../context/useAuth";
import EditPatientModal from "../../components/layout/modal/EditPatientModal";
import { toast } from "react-toastify";

const ProfilePatientPage: React.FC = () => {
  const [patient, setPatient] = useState<PatientResponse>();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [imageSrc, setImageSrc] = useState<string>("/default-patient.jpg");
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProfile = async () => {
    setLoading(true);
    const res = await patientService.getProfile();
    setPatient(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  //   useEffect(() => {
  //     patientService
  //       .getProfile()
  //       .then((res) => setPatient(res))
  //       .finally(() => setLoading(false));
  //   }, []);

  useEffect(() => {
    if (!patient?.imageUrl) return;

    let objectUrl: string | null = null;

    const fetchImage = async () => {
      const imgUrl = await patientService.loadImage(patient.imageUrl);
      setImageSrc(imgUrl);
      objectUrl = imgUrl; // lưu để cleanup
    };

    fetchImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [patient?.imageUrl]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);

    setLoading(true);
    try {
      await patientService.updateAvatar(file); // upload lên backend
      const newUrl = URL.createObjectURL(file);
      setImageSrc(newUrl); // hiển thị ảnh mới ngay lập tức
      alert("Cập nhật ảnh đại diện thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật ảnh:", err);
      alert("Cập nhật ảnh thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: PatientUpdateRequest) => {
    try {
      await patientService.updateProfile(data);
      toast.success("Cập nhật thông tin cá nhân thành công");
      await fetchProfile()
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại, đã xảy ra lỗi");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        Đang tải hồ sơ...
      </div>
    );

  if (!patient)
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500">
        Không thể tải thông tin bệnh nhân.
      </div>
    );

  return (
    <div className="flex min-h-screen mt-6">
      {/* Sidebar */}
      <div className="w-1/4 space-y-2">
        {[
          { icon: faUser, label: "Thông tin cá nhân", active: true },
          { icon: faShieldAlt, label: "Bảo mật" },
          { icon: faHistory, label: "Nhật ký hoạt động" },
          { icon: faWallet, label: "Biến động số dư" },
          { icon: faKey, label: "Thay đổi mật khẩu" },
          { icon: faSignOutAlt, label: "Đăng xuất" },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-2 rounded-md shadow-md cursor-pointer border ${
              item.active
                ? "border-red-500 text-red-600 bg-red-50"
                : "border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
            }`}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 ml-6 space-y-6">
        {/* Ví của tôi */}
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
              onClick={() => setOpen(true)}
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
      </div>

      <EditPatientModal
        open={open}
        onClose={() => setOpen(false)}
        patient={patient}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfilePatientPage;
