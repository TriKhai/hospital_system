import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import type { ScheduleEvent } from "../../../types/staffScheduleType";
import type { DoctorSchedule } from "../../../types/doctorType";

// type DoctorType = { id: number; name: string; specialtyId: number; specialtyName: string };

type Props = {
  doctors: DoctorSchedule[];
  events: ScheduleEvent[];
  onAddSchedules: (newEvents: ScheduleEvent[]) => void;
};

export default function AddScheduleWithCalendar({ doctors, events, onAddSchedules }: Props) {
  const [eventsOfDay, setEventsOfDay] = useState<ScheduleEvent[]>([]);
  const [form, setForm] = useState({
    doctorId: "",
    workDate: "",
    startTime: "",
    endTime: "",
    status: "ACTIVE",
    repeat: "none"
  });

  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDateClick = (info: DateClickArg) => {
    setForm({ ...form, workDate: info.dateStr });
    const dayEvents = events.filter(e => e.start.startsWith(info.dateStr));
    setEventsOfDay(dayEvents);
  };

  const validateTime = () => form.startTime && form.endTime ? form.startTime < form.endTime : true;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTime()) return alert("Giờ kết thúc phải lớn hơn giờ bắt đầu!");

    const newEvents: ScheduleEvent[] = [];
    const baseDate = new Date(form.workDate);

    const repeatCount = form.repeat === "weekly" ? 4 : form.repeat === "monthly" ? 3 : 1;
    for (let i = 0; i < repeatCount; i++) {
      const d = new Date(baseDate);
      if (form.repeat === "weekly") d.setDate(d.getDate() + 7 * i);
      if (form.repeat === "monthly") d.setMonth(d.getMonth() + i);

      const doctor = doctors.find(d => d.id === Number(form.doctorId));
      if (!doctor) continue;

      newEvents.push({
        id: (events.length + newEvents.length + 1).toString(),
        doctorId: doctor.id,
        title: `BS ${doctor.name} (${doctor.specialtyName})`,
        start: `${d.toISOString().split("T")[0]}T${form.startTime}`,
        end: `${d.toISOString().split("T")[0]}T${form.endTime}`,
        status: form.status
      });
    }

    onAddSchedules(newEvents);
    alert("Thêm lịch thành công!");
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const evt = events.find(e => e.id === clickInfo.event.id);
    if (evt) setSelectedEvent(evt);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Calendar */}
      <div className="w-full lg:w-2/3 bg-white p-4 rounded-xl shadow">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          dayMaxEvents={true} // <= chỉ hiển thị 2-3 events + "X more"
          height="auto"
        />
      </div>

      {/* Form + Event Info */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-bold mb-4">Thêm lịch làm việc</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Bác sĩ</label>
            <select name="doctorId" value={form.doctorId} onChange={handleChange} className="border p-2 w-full rounded" required>
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1">Ngày làm việc</label>
            <input type="date" name="workDate" value={form.workDate} onChange={handleChange} className="border p-2 w-full rounded" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Giờ bắt đầu</label>
              <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="border p-2 w-full rounded" required />
            </div>
            <div>
              <label className="block mb-1">Giờ kết thúc</label>
              <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="border p-2 w-full rounded" required />
            </div>
          </div>

          <div>
            <label className="block mb-1">Trạng thái</label>
            <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full rounded">
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Lặp lịch</label>
            <select name="repeat" value={form.repeat} onChange={handleChange} className="border p-2 w-full rounded">
              <option value="none">Không lặp</option>
              <option value="weekly">Hàng tuần (4 tuần)</option>
              {/* <option value="monthly">Hàng tháng (3 tháng)</option> */}
            </select>
          </div>

          <button type="submit" className="bg-[#12B0C2] hover:bg-[#0E8DA1] text-white px-4 py-2 rounded w-full">Lưu lịch</button>
        </form>

        {/* Event info hiển thị khi click */}
        {selectedEvent && (
          <div className="bg-gray-100 p-4 rounded border mt-4">
            <h3 className="font-bold mb-2">{selectedEvent.title}</h3>
            <p><strong>Bắt đầu:</strong> {selectedEvent.start}</p>
            <p><strong>Kết thúc:</strong> {selectedEvent.end}</p>
            <p><strong>Trạng thái:</strong> {selectedEvent.status || "ACTIVE"}</p>
          </div>
        )}

        {eventsOfDay.length > 0 && (
          <div className="bg-gray-50 p-4 rounded border mt-4">
            <h3 className="font-bold mb-2">Ca trong ngày {form.workDate}</h3>
            <ul className="space-y-1">
              {eventsOfDay.map(e => (
                <li key={e.id}>
                  <strong>{e.title}</strong>: {e.start.split("T")[1]} - {e.end.split("T")[1]}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
