import SideBarDoctor from "../../components/layout/SideBarDoctor";
import NavDoctor from "../../components/layout/NavDoctor";
import { useEffect, useState } from "react";
import type { DoctorType } from "../../types/doctorType";
import doctorService from "../../services/doctorApi";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const DoctorPage: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorType>();
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("/default-patient.jpg");

  const { user } = useAuth();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await doctorService.getProfile();
      setDoctor(res);
      setLoading(false);
    } catch (e) {
      console.error("Lỗi fetch data (doctor): ", e);
    }
  };

  useEffect(() => {
    fetchProfile();
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

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <SideBarDoctor />

      {/* Main content */}
      <main className="flex-1">
        <NavDoctor />

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
                }}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorPage;
