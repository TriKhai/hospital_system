import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  // faShieldAlt,
  faHistory,
  // faWallet,
  faKey,
  faSignOutAlt,
  // faEdit,
} from "@fortawesome/free-solid-svg-icons";
import type {
  PatientResponse,
  PatientUpdateRequest,
} from "../../types/patientType";
import patientService from "../../services/patientApi";

import { useAuth } from "../../context/useAuth";
import EditPatientModal from "../../components/layout/modal/EditPatientModal";
import { toast } from "react-toastify";
import { NavLink, Outlet } from "react-router-dom";
import type { AppointmentResponse } from "../../types/appointmentType";
import appointmentService from "../../services/appointmentApi";

const ProfilePatientPage: React.FC = () => {
  const [patient, setPatient] = useState<PatientResponse>();
  const [appointments, setAppointments] = useState<AppointmentResponse[]>();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [imageSrc, setImageSrc] = useState<string>("/default-patient.jpg");
  const [open, setOpen] = useState(false);

  const menuItems = [
    { path: "thong-tin", icon: faUser, label: "Thông tin cá nhân" },
    {
      path: "lich-hen",
      icon: faHistory,
      label: "Lịch hẹn của tôi",
    },
    {
      path: "/profile/change-password",
      icon: faKey,
      label: "Thay đổi mật khẩu",
    },
  ];

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const [res, resAppointment] = await Promise.all([
        patientService.getProfile(),
        appointmentService.getForPatient(),
      ]);
      setPatient(res);
      setAppointments(resAppointment);
    } finally {
      setLoading(false);
    }
  };

  const refreshAppointments = async () => {
    try {
      const resAppointment = await appointmentService.getForPatient();
      setAppointments(resAppointment);
    } catch (err) {
      console.error("Lỗi khi load lịch hẹn:", err);
    }
  };

  // const refreshPatient = async () => {
  //   try {
  //     const resPatient = await patientService.getProfile();
  //     setPatient(resPatient);
  //   } catch (err) {
  //     console.error("Lỗi khi load lịch hẹn:", err);
  //   }
  // };

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

  const handleUploadImage = async (file: File) => {
    console.log(file);

    setLoading(true);
    try {
      await patientService.updateAvatar(file);
      const newUrl = URL.createObjectURL(file);
      setImageSrc(newUrl);
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
      await fetchProfile();
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

  const handleLogout = () => {
    toast.success("hello");
  };

  return (
    <div className="flex min-h-screen mt-6">
      {/* Sidebar */}
      <div className="w-1/4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md shadow-md cursor-pointer border transition-colors ${
                isActive
                  ? "border-red-500 text-red-600 bg-red-50"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-md shadow-md cursor-pointer border border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="font-medium">Đăng xuất</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-6 space-y-6">
        <Outlet
          context={{
            user,
            patient,
            imageSrc,
            onUploadImage: handleUploadImage,
            onEditClick: () => setOpen(true),
            appointments: appointments,
            refreshAppointments: refreshAppointments
          }}
        />
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
