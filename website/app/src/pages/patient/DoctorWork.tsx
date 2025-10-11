import { useEffect, useState } from "react";
import type { DoctorWorkResponse } from "../../types/doctorType";
import doctorService from "../../services/doctorApi";
import DoctorList from "./DoctorList";
import type { SpecialtyResponse } from "../../types/specialtyType";
import specialtyService from "../../services/specialtyApi";

export default function DoctorWork() {
  const [doctors, setDoctors] = useState<DoctorWorkResponse[]>([]);
  // const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState<SpecialtyResponse[]>([]);

  useEffect(() => {
    doctorService.getDoctorWorks().then(setDoctors);
    specialtyService.getAll().then(setSpecialties);
  }, []);

  return (
    <div className="h-[1000px] overflow-auto">
      <DoctorList doctors={doctors} specialties={specialties} />
    </div>
  );
}
