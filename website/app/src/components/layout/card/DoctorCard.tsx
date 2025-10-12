import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faVenusMars,
  faMoneyBill,
  faGraduationCap,
  faBriefcase,
  faCalendarDays,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import type { DoctorWorkResponse, SlotType } from "../../../types/doctorType";
import doctorService from "../../../services/doctorApi";
import type { AppointmentRequest } from "../../../types/appointmentType";
import BookingDialog from "../dialog/BookingDialog";
import type { PatientUpdateRequest } from "../../../types/patientType";
import DoctorScheduleView from "../table/DoctorScheduleView";

interface DoctorCardProps {
  doctor: DoctorWorkResponse;
  onConfirmBooking: (
    patientUpdate: PatientUpdateRequest | null,
    appointment: AppointmentRequest
  ) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onConfirmBooking,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("/default-doctor.jpg");
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    setSelectedDate(dayjs().format("YYYY-MM-DD"));
  }, [doctor.slots]);

  useEffect(() => {
    const fetchImage = async () => {
      const imgUrl = await doctorService.loadImage(doctor.imageUrl);
      setImageSrc(imgUrl);
    };
    fetchImage();

    // cleanup tránh memory leak
    return () => URL.revokeObjectURL(imageSrc);
  }, [doctor.imageUrl]);

  const filteredSlots = doctor.slots.filter(
    (slot) => dayjs(slot.workDate).format("YYYY-MM-DD") === selectedDate
  );

  const handleBookClick = (slot: SlotType) => {
    setSelectedSlot(slot);
    setOpenDialog(true); // mở dialog
  };

  const morningSlots = filteredSlots.filter(
    (s) => parseInt(s.startTime.split(":")[0]) < 12
  );
  const afternoonSlots = filteredSlots.filter((s) => {
    const hour = parseInt(s.startTime.split(":")[0]);
    return hour >= 12 && hour < 18;
  });
  const eveningSlots = filteredSlots.filter(
    (s) => parseInt(s.startTime.split(":")[0]) >= 18
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
      {/* Header bác sĩ */}
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <img
          src={imageSrc}
          alt={doctor.name}
          className="w-28 h-28 object-cover rounded-full border-4 border-emerald-400 shadow-sm"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
            <FontAwesomeIcon icon={faUserDoctor} className="text-emerald-500" />
            {doctor.name}
          </h2>
          <p className="text-sm text-gray-500">{doctor.specialty?.name}</p>
          <div className="mt-2 space-y-1 text-gray-600 text-sm">
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGraduationCap} />
              {doctor.degree || "Chưa cập nhật"}
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBriefcase} />
              {doctor.yearsOfExperience
                ? `${doctor.yearsOfExperience} năm kinh nghiệm`
                : "Chưa cập nhật"}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faVenusMars} />
              {doctor.gender ? "Nam" : "Nữ"}
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMoneyBill} className="text-green-500" />
              {doctor.consultationFee
                ? `${doctor.consultationFee.toLocaleString()}₫`
                : "Miễn phí"}
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-blue-500" />
              {doctor.phone}
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-orange-500" />
              {doctor.email}
            </p>
          </div>
        </div>
      </div>

      {/* Lịch khám */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarDays} className="text-emerald-500" />
          Lịch khám khả dụng
        </h3>

        <div className="flex items-center mb-3 gap-2">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600 font-medium">
              Chọn ngày:
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-400 focus:border-emerald-400 outline-none"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={dayjs().format("YYYY-MM-DD")}
            />
          </div>

          <div className=" flex justify-end">
            <button
              onClick={() => setShowSchedule(true)}
              className="px-4 py-2 text-sm rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
            >
              Xem lịch làm việc
            </button>
          </div>
        </div>

        {filteredSlots.length > 0 ? (
          <div className="space-y-4">
            {/* Buổi sáng */}
            {morningSlots.length > 0 && (
              <div>
                <p className="font-medium text-gray-700 mb-2">Buổi sáng</p>
                <div className="flex flex-wrap gap-2">
                  {morningSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleBookClick(slot)}
                      disabled={slot.status !== "AVAILABLE"}
                      className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-all duration-200 
                        ${
                          slot.status === "AVAILABLE"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                        }`}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buổi chiều */}
            {afternoonSlots.length > 0 && (
              <div>
                <p className="font-medium text-gray-700 mb-2">Buổi chiều</p>
                <div className="flex flex-wrap gap-2">
                  {afternoonSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleBookClick(slot)}
                      disabled={slot.status !== "AVAILABLE"}
                      className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-all duration-200 
                        ${
                          slot.status === "AVAILABLE"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                        }`}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {eveningSlots.length > 0 && (
              <div>
                <p className="font-medium text-gray-700 mb-2">Buổi tối</p>
                <div className="flex flex-wrap gap-2">
                  {eveningSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleBookClick(slot)}
                      disabled={slot.status !== "AVAILABLE"}
                      className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-all duration-200 
                        ${
                          slot.status === "AVAILABLE"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                        }`}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic mt-2">
            Ngày {dayjs(selectedDate).locale("vi").format("DD/MM/YYYY")} không
            có lịch làm việc.
          </p>
        )}
      </div>

      {showSchedule && (
        <DoctorScheduleView
          doctor={doctor}
          onClose={() => setShowSchedule(false)}
          onConfirm={onConfirmBooking}
        />
      )}

      {/* Dialog đặt lịch */}
      {selectedSlot && (
        <BookingDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          slotId={selectedSlot.id}
          onConfirm={onConfirmBooking}
        />
      )}
    </div>
  );
};

export default DoctorCard;
