import React, { useState } from "react";
import type { DoctorWorkResponse } from "../../types/doctorType";
import DoctorCard from "../../components/layout/card/DoctorCard";
import type { SpecialtyResponse } from "../../types/specialtyType";
import type { AppointmentRequest } from "../../types/appointmentType";
import { getUsernameFormToken } from "../../utils/authHelper";
import { toast } from "react-toastify";
import appointmentService from "../../services/appointmentApi";

interface DoctorListProps {
  doctors: DoctorWorkResponse[];
  specialties: SpecialtyResponse[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, specialties }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("ALL");

  const handleBookSlot = async (request: AppointmentRequest) => {
    const username = getUsernameFormToken();
    if (!username) {
      toast.error("Vui lòng đăng nhập trước khi đặt lịch");
      return;
    }
    const payload: AppointmentRequest = {
      ...request,
      usernamePatient: username,
    };

    try {
      await appointmentService.create(payload);
      toast.success("Đặt lịch thành công!");
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      toast.error("Đặt lịch thất bại. Vui lòng thử lại!");
    }
  };

  const filteredDoctors =
    selectedSpecialty === "ALL"
      ? doctors
      : doctors.filter((doc) => doc.specialty.name === selectedSpecialty);

  return (
    <div className="grid gap-5 mt-4">
      <div className="mb-4 flex gap-2 items-center bg-white px-4 py-6 rounded-lg shadow">
        <label className="font-semibold">Chọn khoa:</label>
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {specialties.map((dept: SpecialtyResponse) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {filteredDoctors.map((doc) => ( 
        <DoctorCard key={doc.id} doctor={doc} onBookSlot={handleBookSlot} />
      ))}
    </div>
  );
};

export default DoctorList;
