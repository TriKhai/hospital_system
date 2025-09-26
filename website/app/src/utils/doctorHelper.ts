import type { DoctorSchedule, DoctorType } from "../types/doctorType";

export const mapToDoctorLite = (doctor: DoctorType): DoctorSchedule => {
  return {
    id: doctor.id,
    name: doctor.name,
    specialtyId: doctor.specialty.id,
    specialtyName: doctor.specialty.name,
  };
};

export const mapDoctorsLite = (doctors: DoctorType[]): DoctorSchedule[] => {
  return doctors.map(d => mapToDoctorLite(d));
};