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

interface DoctorCardProps {
  doctor: DoctorWorkResponse;
  onConfirmBooking: (
    patientUpdate: PatientUpdateRequest | null,
    appointment: AppointmentRequest
  ) => void;
}



const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onConfirmBooking }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("/default-doctor.jpg");
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  // const handleBookClick = (slot: SlotType) => {
  //   if (!onBookSlot) return;
  //   // setSlotId(slot.id)
  //   const request: AppointmentRequest = {
  //       slotId: slot.id,
  //       note: `Đặt lịch với bác sĩ ${doctor.name}`,
  //       usernamePatient: "",
  //   }
  //   onBookSlot(request)

  // }
  const handleBookClick = (slot: SlotType) => {
    setSelectedSlot(slot);
    setOpenDialog(true); // mở dialog
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition">
      <div className="flex items-center gap-5">
        <img
          //   src={doctor.imageUrl ? doctor.imageUrl : "/default-doctor.jpg"}
          src={imageSrc}
          alt={doctor.name}
          className="w-50 object-cover rounded-full border-2 border-green-500"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faUserDoctor} className="" />
            {doctor.name}
          </h2>
          <p className="text-sm text-gray-500">{doctor.specialty?.name}</p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faGraduationCap} />
            {doctor.degree || "Chưa cập nhật"}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faBriefcase} />
            {doctor.yearsOfExperience
              ? `${doctor.yearsOfExperience} năm kinh nghiệm`
              : "Chưa cập nhật"}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faVenusMars} className="" />
              {doctor.gender ? "Nam" : "Nữ"}
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMoneyBill} className="" />
              {doctor.consultationFee
                ? `${doctor.consultationFee.toLocaleString()}₫`
                : "Miễn phí"}
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="" />
              {doctor.phone}
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="" />
              {doctor.email}
            </p>
          </div>
        </div>
      </div>

      {/* Thông tin thêm */}

      {/* Lịch khám */}
      <div className="mt-5">
        <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarDays} className="" />
          Lịch khám khả dụng
        </h3>

        {/* Input chọn ngày */}
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-2 text-sm mb-3"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={dayjs().format("YYYY-MM-DD")} // không cho chọn ngày trước hôm nay
        />

        {/* Hiển thị giờ */}
        {filteredSlots.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {filteredSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleBookClick(slot)}
                className={`px-3 py-1 text-sm rounded-xl border transition 
                  ${
                    slot.status === "AVAILABLE"
                      ? "hong hover:bg-green-50"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
                disabled={slot.status !== "AVAILABLE"}
              >
                {slot.startTime} - {slot.endTime}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic mt-2">
            Ngày {dayjs(selectedDate).locale("vi").format("DD/MM/YYYY")} không
            có lịch làm việc.
          </p>
        )}
      </div>

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
