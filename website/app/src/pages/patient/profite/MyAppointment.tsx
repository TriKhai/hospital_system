import { useOutletContext } from "react-router-dom";
import type { AppointmentResponse } from "../../../types/appointmentType";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";
import appointmentService from "../../../services/appointmentApi";
import { toast } from "react-toastify";

interface ProfileContextType {
  appointments: AppointmentResponse[];
  refreshAppointments?: () => Promise<void>;
}

const MyAppointment: React.FC = () => {
  const { appointments, refreshAppointments } =
    useOutletContext<ProfileContextType>();

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleCancel = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này không?"))
      return;

    setLoadingId(id);
    try {
      await appointmentService.cancelByPatient(id);
      toast.success("Đã hủy lịch hẹn thành công!");
      await refreshAppointments?.();
    } catch (err) {
      console.error(err);
      toast.error("Hủy lịch hẹn thất bại!");
    } finally {
      setLoadingId(null);
    }
  };

  if (!appointments?.length)
    return (
      <div className="text-center text-gray-500 italic mt-8">
        Bạn chưa có lịch hẹn nào.
      </div>
    );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING_VERIFICATION":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "DONE":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ duyệt";
      case "PENDING_VERIFICATION":
        return "Chờ xác minh";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "REJECTED":
        return "Bị từ chối";
      case "DONE":
        return "Hoàn tất";
      case "CANCELLED_BY_PATIENT":
        return "Đã hủy";
      case "CANCELLED_BY_ADMIN":
        return "Đã hủy";
      case "CANCELLED_BY_DOCTOR":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div className="relative">
      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 italic mt-8">
          Bạn chưa có lịch hẹn nào.
        </div>
      ) : (
        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 
                   max-h-[85vh] overflow-y-auto p-2 
                   scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          {appointments.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all"
            >
              {loadingId === item.id && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center text-gray-600 text-sm">
                  Đang hủy...
                </div>
              )}

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold text-gray-800 text-base">
                    {item.doctor?.name || "Bác sĩ ẩn danh"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.doctor?.specialty?.name || "Không rõ chuyên khoa"}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {getStatusLabel(item.status)}
                </span>
              </div>

              {/* Body */}
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Ngày khám:</span>
                  <span>
                    {item.slot?.workDate
                      ? format(new Date(item.slot.workDate), "dd/MM/yyyy", {
                          locale: vi,
                        })
                      : "Chưa rõ"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Giờ:</span>
                  <span>
                    {item.slot?.startTime} - {item.slot?.endTime}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Bác sĩ:</span>
                  <span>{item.doctor?.name || "Ẩn danh"}</span>
                </div>

                {/* Ghi chú */}
                <div>
                  <span className="font-medium text-gray-600 block mb-1">
                    Ghi chú:
                  </span>
                  <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700 text-[15px] leading-relaxed max-h-[100px] overflow-y-auto">
                    {item.note || "Không có ghi chú nào."}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 border-t pt-3 text-xs text-gray-500">
                Đặt lúc:{" "}
                {format(new Date(item.createdAt), "HH:mm dd/MM/yyyy", {
                  locale: vi,
                })}
                {(item.status === "PENDING" ||
                  item.status === "PENDING_VERIFICATION") && (
                  <button
                    onClick={() => handleCancel(item.id)}
                    disabled={loadingId === item.id}
                    className={`mt-2 w-full rounded-md py-2 text-sm font-medium text-white transition-colors ${
                      loadingId === item.id
                        ? "bg-gray-400"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {loadingId === item.id ? "Đang hủy..." : "Hủy lịch hẹn"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
