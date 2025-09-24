import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction";

type DoctorType = { id: number; name: string };
type ScheduleEvent = { id: number; title: string; start: string; end: string };

export default function AddScheduleWithCalendarMock() {
  // Mock doctors
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  // Mock events
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [form, setForm] = useState({
    doctorId: "",
    workDate: "",
    startTime: "",
    endTime: "",
    status: "ACTIVE",
    repeat: "none", // none | weekly | monthly
  });

  useEffect(() => {
    // Mock doctor list
    setDoctors([
      { id: 1, name: "Nguyen Van A" },
      { id: 2, name: "Tran Thi B" },
      { id: 3, name: "Le Van C" },
    ]);

    // Mock existing schedules
    setEvents([
      {
        id: 1,
        title: "BS Nguyen Van A",
        start: "2025-10-01T08:00",
        end: "2025-10-01T12:00",
      },
      {
        id: 2,
        title: "BS Tran Thi B",
        start: "2025-10-03T09:00",
        end: "2025-10-03T13:00",
      },
    ]);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateClick = (info: DateClickArg) => {
    setForm({ ...form, workDate: info.dateStr });
  };

  const validateTime = () => {
    if (!form.startTime || !form.endTime) return true;
    return form.startTime < form.endTime;
  };

  const createSchedules = () => {
    const newEvents: ScheduleEvent[] = [];
    const baseDate = new Date(form.workDate);
    if (form.repeat === "weekly") {
      for (let i = 0; i < 4; i++) {
        const d = new Date(baseDate);
        d.setDate(d.getDate() + 7 * i);
        newEvents.push({
          id: events.length + newEvents.length + 1,
          title: `BS ${
            doctors.find((d) => d.id === Number(form.doctorId))?.name ||
            "Unknown"
          }`,
          start: `${d.toISOString().split("T")[0]}T${form.startTime}`,
          end: `${d.toISOString().split("T")[0]}T${form.endTime}`,
        });
      }
    } else if (form.repeat === "monthly") {
      for (let i = 0; i < 3; i++) {
        const d = new Date(baseDate);
        d.setMonth(d.getMonth() + i);
        newEvents.push({
          id: events.length + newEvents.length + 1,
          title: `BS ${
            doctors.find((d) => d.id === Number(form.doctorId))?.name ||
            "Unknown"
          }`,
          start: `${d.toISOString().split("T")[0]}T${form.startTime}`,
          end: `${d.toISOString().split("T")[0]}T${form.endTime}`,
        });
      }
    } else {
      newEvents.push({
        id: events.length + 1,
        title: `BS ${
          doctors.find((d) => d.id === Number(form.doctorId))?.name || "Unknown"
        }`,
        start: `${form.workDate}T${form.startTime}`,
        end: `${form.workDate}T${form.endTime}`,
      });
    }

    setEvents([...events, ...newEvents]);
    alert("Thêm lịch thành công (mock)!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTime()) {
      alert("Giờ kết thúc phải lớn hơn giờ bắt đầu!");
      return;
    }
    createSchedules();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Lịch hiển thị */}
      <div className="w-full lg:w-2/3 bg-white p-4 rounded-xl shadow">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map((e) => ({ ...e, id: e.id.toString() }))}
          dateClick={handleDateClick}
          height="auto"
        />
      </div>

      {/* Form thêm lịch */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Thêm lịch làm việc (Mock)</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Chọn bác sĩ */}
          <div>
            <label className="block mb-1">Bác sĩ</label>
            <select
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            >
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ngày làm việc */}
          <div>
            <label className="block mb-1">Ngày làm việc</label>
            <input
              type="date"
              name="workDate"
              value={form.workDate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          {/* Giờ */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Giờ bắt đầu</label>
              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Giờ kết thúc</label>
              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block mb-1">Trạng thái</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          {/* Lặp lịch */}
          <div>
            <label className="block mb-1">Lặp lịch</label>
            <select
              name="repeat"
              value={form.repeat}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="none">Không lặp</option>
              <option value="weekly">Hàng tuần (4 tuần)</option>
              <option value="monthly">Hàng tháng (3 tháng)</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Lưu lịch
          </button>
        </form>
      </div>
    </div>
  );
}
