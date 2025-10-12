import SideBarDoctor from "../../components/layout/SideBarDoctor";
import NavDoctor from "../../components/layout/NavDoctor";
import { useEffect, useState } from "react";
import type { DoctorType, DoctorUpdateRequest } from "../../types/doctorType";
import doctorService from "../../services/doctorApi";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import EditDoctorModel from "../../components/layout/modal/EditDoctorModel";
import specialtyService from "../../services/specialtyApi";
import type { SpecialtyResponse } from "../../types/specialtyType";
import { toast } from "react-toastify";
import type { AppointmentResponse } from "../../types/appointmentType";
import appointmentService from "../../services/appointmentApi";

const DoctorPage: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorType>();
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("/default-patient.jpg");
  const [openModal, setOpenModal] = useState(false);
  const [specialties, setSpecialties] = useState<SpecialtyResponse[]>([]);
  const [appointments, setAppointments] = useState<AppointmentResponse[]>();

  const { user } = useAuth();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // const res = await doctorService.getProfile();
      // setDoctor(res);

      const [res, resAppointment] = await Promise.all([
        doctorService.getProfile(),
        appointmentService.getForDoctor(),
      ]);
      setDoctor(res);
      setAppointments(resAppointment);
    } finally {
      setLoading(false);
    }
  };

  const refreshAppointments = async () => {
    try {
      const resAppointment = await appointmentService.getForDoctor();
      setAppointments(resAppointment);
    } catch (err) {
      console.error("Lỗi khi load lịch hẹn:", err);
    }
  };

  const fetchSpecialty = async () => {
    setLoading(true);
    try {
      const res = await specialtyService.getAll();
      setSpecialties(res);
      setLoading(false);
    } catch (e) {
      console.error("Lỗi fetch specialties (data): ", e);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchSpecialty();
  }, []);

  useEffect(() => {
    if (!doctor?.imageUrl) return;

    let objectUrl: string | null = null;

    const fetchImage = async () => {
      const imgUrl = await doctorService.loadImage(doctor.imageUrl);
      setImageSrc(imgUrl);
      objectUrl = imgUrl; // lưu để cleanup
    };

    fetchImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [doctor?.imageUrl]);

  const handleUploadImage = async (file: File) => {
    console.log(file);

    setLoading(true);
    try {
      await doctorService.updateAvatar(file);
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

  const handleSave = async (data: DoctorUpdateRequest) => {
    try {
      await doctorService.updateProfile(data);
      toast.success("Cập nhật thông tin cá nhân thành công");
      await fetchProfile();
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại, đã xảy ra lỗi");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <SideBarDoctor />

      {/* Main content */}
      <main className="flex-1">
        <NavDoctor imageSrc={imageSrc} doctorName={doctor?.name} doctorSpec={doctor?.specialty.name}/>

        <div className="text-gray-60 m-8">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <>
              <Outlet
                context={{
                  doctor,
                  user,
                  imageSrc,
                  onUploadImage: handleUploadImage,
                  onEditClick: () => setOpenModal(true),
                  appointments: appointments,
                  refreshAppointments: refreshAppointments,
                  numAppointment: appointments?.length,
                }}
              />
            </>
          )}
        </div>
      </main>

      {doctor && (
        <EditDoctorModel
          open={openModal}
          onClose={() => setOpenModal(false)}
          doctor={doctor}
          specialties={specialties}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DoctorPage;
