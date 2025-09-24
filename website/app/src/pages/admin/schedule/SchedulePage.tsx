import React, { useState, useEffect } from "react";
import AddScheduleWithCalendar from "../../../components/layout/schedule/AddSchedule";

type SpecialtyType = { id: number; name: string };
type DoctorType = { id: number; name: string; specialtyId: number; specialtyName: string };
type ScheduleEvent = { id: string; doctorId: number; title: string; start: string; end: string };

export default function SchedulePage() {
  const [specialties, setSpecialties] = useState<SpecialtyType[]>([]);
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [activeSpecialtyId, setActiveSpecialtyId] = useState<number | null>(null);
  // const [loading, setLoading] = useState<boolean>(false)

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await drugTypeService.getAll();
  //     setData(res);
  //   } catch (error) {
  //     console.error("Error fetch data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  useEffect(() => {
    // mock specialties
    const mockSpecialties = [
      { id: 1, name: "Tim mạch" },
      { id: 2, name: "Nhi khoa" },
      { id: 3, name: "Da liễu" }
    ];
    setSpecialties(mockSpecialties);
    setActiveSpecialtyId(mockSpecialties[0].id);

    // mock doctors
    setDoctors([
      { id: 1, name: "Nguyen Van A", specialtyId: 1, specialtyName: "Tim mạch" },
      { id: 2, name: "Tran Thi B", specialtyId: 2, specialtyName: "Nhi khoa" },
      { id: 3, name: "Le Van C", specialtyId: 1, specialtyName: "Tim mạch" },
      { id: 4, name: "Pham Thi D", specialtyId: 3, specialtyName: "Da liễu" }
    ]);

    // mock events
    setEvents([
      { id: "1", doctorId: 1, title: "BS Nguyen Van A (Tim mạch)", start: "2025-10-01T08:00", end: "2025-10-01T12:00" },
      { id: "2", doctorId: 3, title: "BS Le Van C (Tim mạch)", start: "2025-10-02T09:00", end: "2025-10-02T13:00" },
      { id: "3", doctorId: 2, title: "BS Tran Thi B (Nhi khoa)", start: "2025-10-03T09:00", end: "2025-10-03T13:00" }
    ]);
  }, []);

  const handleAddSchedules = (newEvents: ScheduleEvent[]) => {
    setEvents([...events, ...newEvents]);
  };

  const filteredDoctors = doctors.filter(d => d.specialtyId === activeSpecialtyId);
  const filteredEvents = events.filter(e => filteredDoctors.some(d => d.id === e.doctorId));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý lịch làm việc bác sĩ (Mock)</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {specialties.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSpecialtyId(s.id)}
            className={`px-4 py-2 rounded ${activeSpecialtyId === s.id ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Calendar + form của specialty đang chọn */}
      {activeSpecialtyId && (
        <AddScheduleWithCalendar
          doctors={filteredDoctors}
          events={filteredEvents}
          onAddSchedules={handleAddSchedules}
        />
      )}
    </div>
  );
}
