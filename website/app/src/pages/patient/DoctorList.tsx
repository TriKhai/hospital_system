import React, { useState } from "react";
import type { DoctorWorkResponse } from "../../types/doctorType";
import DoctorCard from "../../components/layout/card/DoctorCard";
import type { SpecialtyResponse } from "../../types/specialtyType";
import type { AppointmentRequest } from "../../types/appointmentType";
import { getUsernameFormToken } from "../../utils/authHelper";
import { toast } from "react-toastify";
import appointmentService from "../../services/appointmentApi";
import type { PatientUpdateRequest } from "../../types/patientType";
import patientService from "../../services/patientApi";

interface DoctorListProps {
  doctors: DoctorWorkResponse[];
  specialties: SpecialtyResponse[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, specialties }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleConfirmBooking = async (
    patientUpdate: PatientUpdateRequest | null,
    appointment: AppointmentRequest
  ) => {
    try {
      if (patientUpdate) {
        await patientService.updateProfile(patientUpdate);
      }

      const username = getUsernameFormToken();
      if (!username) {
        toast.error("Vui lòng đăng nhập trước khi đặt lịch");
        return;
      }
      const payload: AppointmentRequest = {
        ...appointment,
        usernamePatient: username,
      };

      await appointmentService.create(payload);

      toast.success("Đặt lịch thành công!");
    } catch (err) {
      console.error("Lỗi đặt lịch: ", err);
      toast.error("Đặt lịch thất bại, vui lòng thử lại!");
    }
  };

  // const filteredDoctors =
  //   selectedSpecialty === "ALL"
  //     ? doctors
  //     : doctors.filter((doc) => doc.specialty.name === selectedSpecialty);

  const filteredDoctors = doctors.filter((doc) => {
    const matchSpecialty =
      selectedSpecialty === "ALL" || doc.specialty.name === selectedSpecialty;
    const matchName = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    return matchSpecialty && matchName;
  });

  return (
    <div className="grid gap-5 mt-4">
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white px-6 py-4 rounded-xl shadow">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Chuyên khoa:</label>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="ALL">Tất cả</option>
            {specialties.map((dept: SpecialtyResponse) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm bác sĩ theo tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {filteredDoctors.map((doc) => (
        <DoctorCard
          key={doc.id}
          doctor={doc}
          onConfirmBooking={handleConfirmBooking}
        />
      ))}
    </div>
  );
};

export default DoctorList;
