import React, { useState, useEffect, useMemo } from "react";
import specialtyService from "../../../services/specialtyApi";
import doctorService from "../../../services/doctorApi";
import type { DoctorLite } from "../../../types/doctorType";
import scheduleService from "../../../services/scheduleApi";
import type { ScheduleReq, ScheduleRes } from "../../../types/scheduleType";
import { toast } from "react-toastify";
import { mapSchedulesToEvents } from "../../../utils/workHelper";
import WorkCalendar from "../../../components/layout/work/WorkCalendar";
import AddScheduleDialog from "../../../components/layout/work/AddWorkDialog";
// import type { EventInput } from "@fullcalendar/core/index.js";

type SpecialtyType = { id: number; name: string };

export default function SchedulePage() {
  const [specialties, setSpecialties] = useState<SpecialtyType[]>([]);
  const [doctors, setDoctors] = useState<DoctorLite[]>([]);
  const [events, setEvents] = useState<ScheduleRes[]>([]);
  const [activeSpecialtyId, setActiveSpecialtyId] = useState<number | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleRes | null>(
    null
  );
  // const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);

  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const mappedEvents = useMemo(() => mapSchedulesToEvents(events), [events]);

  const handleOpen = () => {
    setSelectedSchedule(null); // tạo mới => clear selection
    setDialogMode("create");
    setIsOpen(true);
  };

  const handleEditClick = () => {
    if (!selectedSchedule) {
      toast.info("Vui lòng chọn 1 lịch để sửa");
      return;
    }
    setDialogMode("edit");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedSchedule(null);
    setDialogMode("create");
  };

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
      console.log(events);

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

  const handleAddSchedules = async (data: ScheduleReq) => {
    try {
      // console.log("data: ", data)
      const payload = {
        ...data,
        workDate: data.workDate,
      };
      console.log("payload: ", payload);
      await scheduleService.create(payload);
      await fetchDoctorsAndSchedules(activeSpecialtyId);
      toast.success("Đã thêm lịch thành công.");
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi, không thể thêm lịch.");
    }
  };

  const handleDelete = async () => {
    if (!selectedSchedule) {
      toast.info("Vui lòng chọn 1 lịch để xoá");
      return;
    }

    try {
      await scheduleService.delete(
        selectedSchedule.doctorId,
        selectedSchedule.scheduleId
      );
      await fetchDoctorsAndSchedules(activeSpecialtyId);
      setSelectedSchedule(null); // clear selection
      toast.success("Đã xoá lịch thành công.");
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi, không thể xoá lịch.");
    }
  };

  const handleUpdateSchedule = async (data: ScheduleReq) => {
    try {
      const payload = {
        ...data,
        workDate: data.workDate,
      };
      console.log(payload);
      await scheduleService.update(payload);
      await fetchDoctorsAndSchedules(activeSpecialtyId);
      toast.success("Đã chỉnh sửa lịch thành công.");
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật lịch.");
    }
  };

  function mapScheduleResToReq(schedule: ScheduleRes): ScheduleReq {
    return {
      doctorId: schedule.doctorId,
      workDate: schedule.start.split("T")[0], // just the date part
      shift: "MORNING", //  You'll need real logic here
      slotMinutes: 30, // or extract this if available
      repeat: "NONE",
      repeatCount: 0,
      status: schedule.status || "AVAILABLE",
      scheduleId: schedule.scheduleId,
      note: schedule.note,
    };
  }

  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold mb-6">Quản lý lịch làm việc bác sĩ</h1>
      <div className="flex">
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
        <div>
          <button
            className="p-2 ml-2 bg-[#0E8DA1] text-white border"
            onClick={handleOpen}
          >
            Thêm lịch
          </button>
        </div>
        <div>
          <button
            className="p-2 ml-2 bg-[#0E8DA1] text-white border"
            onClick={handleEditClick}
          >
            Chỉnh sửa
          </button>
        </div>
        <div>
          <button
            className="p-2 ml-2 bg-[#0E8DA1] text-white border"
            onClick={handleDelete}
          >
            Xoá lịch
          </button>
        </div>
      </div>
      <div className="">
        <WorkCalendar
          events={mappedEvents}
          onDateClick={setSelectedDate}
          onEventClick={(info) => {
            const id = info.event.id;
            const schedule = events.find((e) => e.id === id);
            if (schedule) {
              setSelectedSchedule(schedule);
            } else {
              setSelectedSchedule(null);
            }
          }}
          selectedEvent={selectedSchedule}
        />

        {/* <WorkCalendar
          events={mapSchedulesToEvents(events)}
          onDateClick={setSelectedDate}
          onEventClick={(info) => {
            const id = info.event.id;
            const schedule = events.find((e) => e.id === id);
            if (schedule) {
              setSelectedSchedule(schedule);
            } else {
              setSelectedSchedule(null); // nếu không tìm thấy thì clear
            }
            // setSelectedEvent(schedule ?? null);
          }}
        
          selectedEvent={selectedSchedule}
        /> */}
      </div>
      {/* <AddScheduleDialog
        onSubmit={handleAddSchedules}
        onClose={handleClose}
        open={isOpen}
        doctors={doctors}
        // defaultDate={selectedDate.toISOString().split("T")[0]}
        defaultDate={selectedDate.toLocaleDateString("en-CA")}
      /> */}

      {isOpen && (
        <AddScheduleDialog
          open={isOpen}
          onClose={handleClose}
          onSubmit={
            dialogMode === "edit" ? handleUpdateSchedule : handleAddSchedules
          }
          doctors={doctors}
          defaultDate={selectedDate.toLocaleDateString("en-CA")}
          mode={dialogMode}
          initalData={
            dialogMode === "edit" && selectedSchedule
              ? mapScheduleResToReq(selectedSchedule)
              : undefined
          }
        />
      )}
    </div>
  );
}
