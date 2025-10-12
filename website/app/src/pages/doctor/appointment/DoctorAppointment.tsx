// DoctorAppointment.tsx
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { AppointmentResponse } from "../../../types/appointmentType";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "react-toastify";
import appointmentService from "../../../services/appointmentApi";

interface ProfileContextType {
  appointments: AppointmentResponse[];
  refreshAppointments?: () => Promise<void>;
}

const DoctorAppointment: React.FC = () => {
  const { appointments = [], refreshAppointments } =
    useOutletContext<ProfileContextType>();
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleCancel = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này không?"))
      return;

    setLoadingId(id);
    try {
      await appointmentService.cancelByDoctor(id);
      toast.success("Đã hủy lịch hẹn thành công!");
      await refreshAppointments?.();
    } catch (err) {
      console.error(err);
      toast.error("Hủy lịch hẹn thất bại!");
    } finally {
      setLoadingId(null);
    }
  };

  const handleConfirm = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xác nhận lịch hẹn này không?"))
      return;

    try {
      await appointmentService.confirmByDoctor(id);
      toast.success("Duyệt lịch thành công!");
      await refreshAppointments?.();
    } catch (err) {
      console.error(err);
      toast.error("Không thể duyệt lịch!");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRowClick = (id: number) => {
    setSelectedRow(id === selectedRow ? null : id);
    toggleRow(id);
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
      case "PENDING_VERIFICATION":
        return "bg-amber-100 text-amber-700";
      case "CONFIRMED":
        return "bg-emerald-100 text-emerald-700";
      case "CANCELLED_BY_PATIENT":
      case "CANCELLED_BY_DOCTOR":
      case "CANCELLED_BY_ADMIN":
      case "REJECTED":
        return "bg-rose-100 text-rose-700";
      case "DONE":
        return "bg-emerald-100 text-emerald-700";

      default:
        return "bg-gray-100 text-gray-700";
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
        return "Bệnh nhân đã huỷ";
      case "CANCELLED_BY_ADMIN":
        return "Đã hủy";
      case "CANCELLED_BY_DOCTOR":
        return "Bác sĩ đã huỷ";
      default:
        return status;
    }
  };

  return (
    <div className="overflow-x-auto">
      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 italic mt-8">
          Bạn chưa có lịch hẹn nào
        </div>
      ) : (
        <div className="max-h-[85vh] overflow-y-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Ngày hẹn</th>
                <th className="px-4 py-2 text-left">Thời gian</th>
                <th className="px-4 py-2 text-left">Bệnh nhân</th>
                <th className="px-4 py-2 text-left">Điện thoại</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Ngày đặt</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appt) => (
                <React.Fragment key={appt.id}>
                  <tr
                    className={`cursor-pointer hover:bg-gray-100 transition-all duration-200
                        ${selectedRow === appt.id ? "bg-gray-200" : ""}
                    `}
                    onClick={() => handleRowClick(appt.id)}
                  >
                    <td className="px-4 py-2">
                      {appt.slot?.workDate
                        ? format(new Date(appt.slot.workDate), "dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "Chua ro"}
                    </td>
                    <td className="px-4 py-2">
                      {appt.slot?.startTime} - {appt.slot?.endTime}
                    </td>
                    <td className="px-4 py-2">{appt.patient.name}</td>
                    <td className="px-4 py-2">{appt.patient.phone}</td>
                    <td className="px-4 py-2">{appt.patient.email}</td>
                    <td className="px-4 py-2">
                      {appt.createdAt
                        ? format(new Date(appt.createdAt), "HH:mm dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "Chua ro"}
                    </td>
                    <td
                      className={`px-4 py-2 font-semibold rounded ${getStatusStyle(
                        appt.status
                      )}`}
                    >
                      {getStatusLabel(appt.status)}
                    </td>
                    <td className="px-4 py-2">
                      {appt.status === "PENDING" && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleConfirm(appt.id)}
                            disabled={loadingId === appt.id}
                            className={`w-full rounded-md py-2 text-sm font-medium text-white transition-colors duration-200 ${
                              loadingId === appt.id
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {loadingId === appt.id
                              ? "Đang duyệt..."
                              : "Xác nhận"}
                          </button>

                          <button
                            onClick={() => handleCancel(appt.id)}
                            disabled={loadingId === appt.id}
                            className={`w-full rounded-md py-2 text-sm font-medium text-white transition-colors duration-200 ${
                              loadingId === appt.id
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                          >
                            {loadingId === appt.id
                              ? "Đang hủy..."
                              : "Hủy lịch hẹn"}
                          </button>
                        </div>
                      )}
                      {appt.status === "PENDING_VERIFICATION" && (
                        <button
                          onClick={() => handleCancel(appt.id)}
                          disabled={loadingId === appt.id}
                          className={`w-full rounded-md py-2 text-sm font-medium text-white transition-colors duration-200 ${
                            loadingId === appt.id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {loadingId === appt.id
                            ? "Đang hủy..."
                            : "Hủy lịch hẹn"}
                        </button>
                      )}
                    </td>
                  </tr>
                  {expandedRows.includes(appt.id) && (
                    <tr className="bg-gray-50 border-t border-gray-200">
                      <td
                        colSpan={5}
                        className="px-4 py-3 text-sm text-gray-700"
                      >
                        <div className="gap-x-6 gap-y-2">
                          <div className="flex items-center space-x-2">
                            <span>
                              <strong>Tên bệnh nhân:</strong>{" "}
                              {appt.patient.name}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span>
                              <strong>Email:</strong> {appt.patient.email}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span>
                              <strong>Điện thoại:</strong> {appt.patient.phone}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span>
                              <strong>Địa chỉ:</strong> {appt.patient.address}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span>
                              <strong>Ngày đặt:</strong>{" "}
                              {new Date(appt.createdAt).toLocaleString("vi-VN")}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 col-span-2">
                            <span>
                              <strong>Ghi chú:</strong>{" "}
                              {appt.note || "Không có ghi chú"}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
