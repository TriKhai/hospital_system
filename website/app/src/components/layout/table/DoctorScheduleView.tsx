import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import BookingDialog from "../dialog/BookingDialog";
import type { DoctorWorkResponse, SlotType } from "../../../types/doctorType";
import type { PatientUpdateRequest } from "../../../types/patientType";
import type { AppointmentRequest } from "../../../types/appointmentType";

interface DoctorScheduleViewProps {
  doctor: DoctorWorkResponse;
  onClose: () => void;
  onConfirm: (
    patientUpdate: PatientUpdateRequest | null,
    appointment: AppointmentRequest
  ) => void;
}

export default function DoctorScheduleView({
  doctor,
  onClose,
  onConfirm,
}: DoctorScheduleViewProps) {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
  const [openBooking, setOpenBooking] = useState(false);
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  const today = dayjs();
  const nextDays = Array.from(
    { length: viewMode === "week" ? 7 : 30 },
    (_, i) => today.add(i, "day")
  );

  const filteredSlots = doctor.slots.filter(
    (slot) => dayjs(slot.workDate).format("YYYY-MM-DD") === selectedDate
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-[850px] max-h-[90vh] overflow-y-auto p-6 animate-fadeIn">
        {/* --- Nút đóng --- */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition"
        >
          ×
        </button>

        {/* --- Tiêu đề --- */}
        <h2 className="text-2xl font-semibold mb-4 text-emerald-700">
          Lịch làm việc của {doctor.name}
        </h2>

        {/* --- Chuyển chế độ xem --- */}
        <div className="flex justify-end mb-4 gap-2">
          {(["week", "month"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                viewMode === mode
                  ? "bg-emerald-100 text-emerald-700 border-emerald-400"
                  : "hover:bg-gray-100 border-gray-300 text-gray-600"
              }`}
            >
              {mode === "week" ? "Theo tuần" : "Theo tháng"}
            </button>
          ))}
        </div>

        {/* --- Dải ngày --- */}
        <div
          className={`grid ${
            viewMode === "week" ? "grid-cols-7" : "grid-cols-10"
          } gap-2 mb-6`}
        >
          {nextDays.map((date) => {
            const dateStr = date.format("YYYY-MM-DD");
            const isSelected = selectedDate === dateStr;
            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`p-3 rounded-lg text-center cursor-pointer border transition select-none ${
                  isSelected
                    ? "bg-emerald-100 border-emerald-500 font-semibold text-emerald-700"
                    : "hover:bg-gray-100 border-gray-300 text-gray-600"
                }`}
              >
                <p className="text-sm capitalize">{date.format("ddd")}</p>
                <p className="text-lg">{date.format("DD")}</p>
              </div>
            );
          })}
        </div>

        {/* --- Slot theo ngày --- */}
        <div>
          {filteredSlots.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              Không có lịch làm việc cho ngày này.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {filteredSlots.map((slot) => {
                const isAvailable = slot.status === "AVAILABLE";
                return (
                  <button
                    key={slot.id}
                    disabled={!isAvailable}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setOpenBooking(true);
                    }}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      isAvailable
                        ? "border-emerald-300 hover:bg-emerald-50 text-emerald-700"
                        : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* --- Booking Dialog --- */}
      {openBooking && selectedSlot && (
        <BookingDialog
          open={openBooking}
          onClose={() => setOpenBooking(false)}
          slotId={selectedSlot.id}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
}
