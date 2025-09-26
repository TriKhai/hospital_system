import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import type { DoctorLite } from "../../../types/doctorType";
import type {
  ScheduleReq,
  ScheduleRes,
  Status,
} from "../../../types/scheduleType";

type Props = {
  doctors: DoctorLite[];
  events: ScheduleRes[];
  onAddSchedules?: (newSchedules: ScheduleReq[]) => void; 
  onDeleteSchedules?: (id: number) => void; 
};

export default function ScheduleCalendar({
  doctors,
  events,
  onAddSchedules,
  onDeleteSchedules,
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleRes | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [eventsOfDay, setEventsOfDay] = useState<ScheduleRes[]>([]);

  const initialForm: ScheduleReq = {
    doctorId: doctors[0]?.id || 0,
    workDate: "",
    shift: "MORNING",
    slotMinutes: 30,
    repeat: "DAILY",
    repeatCount: 1,
    status: "ACTIVE",
  };

  const [form, setForm] = useState<ScheduleReq>(initialForm);

  //   const shiftTimes: Record<Shift, { start: string; end: string }> = {
  //     MORNING: { start: "08:00", end: "12:00" },
  //     AFTERNOON: { start: "13:00", end: "17:00" },
  //     EVENING: { start: "18:00", end: "22:00" },
  //   };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedEvent(null);
  };

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
    setForm((prev) => ({ ...prev, workDate: info.dateStr })); // chỉ dùng string
    setSelectedEvent(null);

    const dayEvents = events.filter((e) => e.start.startsWith(info.dateStr));
    setEventsOfDay(dayEvents);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const evt = events.find((e) => e.id === clickInfo.event.id);
    if (!evt) return;

    setSelectedEvent(evt);
    const dateStr = evt.start.split("T")[0];
    setSelectedDate(dateStr);

    setForm({
      doctorId: evt.doctorId,
      workDate: dateStr, // giữ string
      shift: "MORNING",
      slotMinutes: 30,
      repeat: "DAILY",
      repeatCount: 1,
      status: evt.status as Status,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "doctorId" || name === "slotMinutes" || name === "repeatCount"
          ? Number(value)
          : name === "workDate"
          ? new Date(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.doctorId || !form.workDate) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    // Check workDate >= today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // chỉ xét ngày, bỏ giờ phút giây
    const selected = new Date(form.workDate);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      alert("Ngày làm việc phải từ hôm nay trở đi!");
      return;
    }

    // Tạo lịch theo repeat
    const newSchedules: ScheduleReq[] = [];
    for (let i = 0; i < form.repeatCount; i++) {
      const date = new Date(form.workDate);
      if (form.repeat === "DAILY") date.setDate(date.getDate() + i);
      if (form.repeat === "WEEKLY") date.setDate(date.getDate() + i * 7);

      newSchedules.push({
        ...form,
        workDate: date.toISOString().slice(0, 10), // chỉ gửi "yyyy-MM-dd"
      });
    }

    if (onAddSchedules) onAddSchedules(newSchedules);

    alert(
      selectedEvent ? "Cập nhật lịch thành công!" : "Thêm lịch thành công!"
    );
    resetForm();
  };

  const handleDelete = async () => {
    if (!selectedEvent || !onDeleteSchedules) return;
    await onDeleteSchedules(+selectedEvent.id)
    resetForm();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[75vh]">
      {/* Calendar */}
      <div className="w-full lg:w-2/3 bg-white p-4 rounded shadow overflow-auto">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          dayCellClassNames={(arg) =>
            arg.dateStr === selectedDate
              ? ["bg-yellow-300", "ring-2", "ring-yellow-600", "font-bold"]
              : []
          }
          height="auto"
        />
      </div>

      {/* Form CRUD */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-bold">
          {selectedEvent ? "Cập nhật lịch" : "Thêm lịch mới"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label>Bác sĩ</label>
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

          <div>
            <label>Ngày làm việc</label>
            <input
              type="date"
              name="workDate"
              value={form.workDate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label>Ca làm việc</label>
            <select
              name="shift"
              value={form.shift}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="MORNING">Sáng (8:00 - 12:00)</option>
              <option value="AFTERNOON">Chiều (13:00 - 16:30)</option>
              <option value="EVENING">Tối (18:00 - 21:00)</option>
            </select>
          </div>

          <div>
            <label>Lặp lại</label>
            <select
              name="repeat"
              value={form.repeat}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="NONE">Chỉ 1 ngày</option>
              <option value="DAILY">Hàng ngày (mỗi 7 ngày liên tiếp)</option>
              <option value="WEEKLY">Hàng tuần (mỗi 4 tuần)</option>
              <option value="MONTHLY">Hàng tháng (mỗi 3 tháng)</option>
            </select>
          </div>

          {/* <div>
            <label>Số lần lặp lại</label>
            <input
              type="number"
              name="repeatCount"
              value={form.repeatCount}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              min={1}
            />
          </div> */}

          <div>
            <label>Trạng thái</label>
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

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-full"
          >
            {selectedEvent ? "Cập nhật" : "Thêm lịch"}
          </button>

          {selectedEvent && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
            >
              Xoá lịch
            </button>
          )}
        </form>

        {eventsOfDay.length > 0 && (
          <div className="h-[15vh] overflow-auto mt-4">
            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-bold mb-2">Ca trong ngày {form.workDate}</h3>
              <ul className="space-y-1">
                {eventsOfDay.map((e) => (
                  <li key={e.id}>
                    <strong>{e.title}</strong>:{" "}
                    {e.start.split("T")[1].slice(0, 5)} -{" "}
                    {e.end.split("T")[1].slice(0, 5)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
