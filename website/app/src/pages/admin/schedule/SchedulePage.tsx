import React, { useState, useEffect } from "react";
import specialtyService from "../../../services/specialtyApi";
import doctorService from "../../../services/doctorApi";
import type { DoctorLite } from "../../../types/doctorType";
import ScheduleCalendar from "../../../components/layout/schedule/ScheduleCalendar";
import scheduleService from "../../../services/scheduleApi";
import type { ScheduleReq, ScheduleRes } from "../../../types/scheduleType";
import { toast } from "react-toastify";

type SpecialtyType = { id: number; name: string };

export default function SchedulePage() {
  const [specialties, setSpecialties] = useState<SpecialtyType[]>([]);
  const [doctors, setDoctors] = useState<DoctorLite[]>([]);
  const [events, setEvents] = useState<ScheduleRes[]>([]);
  const [activeSpecialtyId, setActiveSpecialtyId] = useState<number | null>(
    null
  );

  const fetchDoctorsAndSchedules = async (specialtyId: number | null) => {
    try {
      let doctorRes: DoctorLite[] = [];
      let scheduleRes: ScheduleRes[] = [];

      if (specialtyId !== null) {
        doctorRes = await doctorService.getBySpecialty(specialtyId);
        scheduleRes = await scheduleService.getAll(specialtyId);
      } else {
        doctorRes = await doctorService.getBySpecialty();
        scheduleRes = await scheduleService.getAll();
      }

      setDoctors(doctorRes);
      setEvents(scheduleRes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await specialtyService.getAll();
        setSpecialties(res);
        if (res.length > 0 && activeSpecialtyId === null) {
          setActiveSpecialtyId(res[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpecialties();
  }, []);

  useEffect(() => {
    fetchDoctorsAndSchedules(activeSpecialtyId);
  }, [activeSpecialtyId]);

  const handleAddSchedules = async (newSchedules: ScheduleReq[]) => {
    try {
      for (const schedule of newSchedules) {
        await scheduleService.create(schedule);
        fetchDoctorsAndSchedules(activeSpecialtyId);
        toast.success("Đã thêm lịch thành công.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi, không thể thêm lịch.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await scheduleService.delete(id);
      fetchDoctorsAndSchedules(activeSpecialtyId);
      toast.success("Đã xoá lịch thành công.");
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi, không thể thêm lịch.");
    }
  };

  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold mb-6">Quản lý lịch làm việc bác sĩ</h1>

      <div className="mb-4">
        <label className="mr-2 font-bold">Chọn khoa:</label>
        <select
          value={activeSpecialtyId ?? "all"}
          onChange={(e) =>
            setActiveSpecialtyId(
              e.target.value === "all" ? null : Number(e.target.value)
            )
          }
          className="border p-2 rounded bg-white"
        >
          <option value="all">-- Tất cả --</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <ScheduleCalendar
        doctors={doctors}
        events={events}
        onAddSchedules={handleAddSchedules}
        onDeleteSchedules={handleDelete}
      />
    </div>
  );
}
