import React, { useEffect, useState } from "react";
import patientService from "../../../services/patientApi";
import type {
  PatientResponse,
  PatientUpdateRequest,
} from "../../../types/patientType";
import type { AppointmentRequest } from "../../../types/appointmentType";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  slotId: number;
  onConfirm: (
    patientUpdate: PatientUpdateRequest | null,
    appointment: AppointmentRequest
  ) => void;
}

export default function BookingDialog({
  open,
  onClose,
  slotId,
  onConfirm
}: BookingDialogProps) {
  const [patient, setPatient] = useState<PatientResponse>();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); 
  useEffect(() => {
    if (open) {
      patientService.getProfile().then((res) => {
        setPatient(res);
        localStorage.setItem("patient_original", JSON.stringify(res));
      });
    }
  }, [open]);

  const handleSave = async (data: PatientUpdateRequest) => {
    const oldData = JSON.parse(
      localStorage.getItem("patient_original") || "{}"
    );
    if (JSON.stringify(data) === JSON.stringify(oldData)) {
      return;
    }
    await patientService.updateProfile(data);
  };

  const handleSubmit = async () => {
    if (
      !patient?.name ||
      !patient.email ||
      !patient.phone ||
      !patient.address
    ) {
      setMessage(
        "Vui lòng nhập đầy đủ họ tên, địa chỉ, email và số điện thoại!"
      );
      return;
    }
    setLoading(true);
    try {
      const updateData: PatientUpdateRequest = {
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
      };

      await handleSave(updateData);

      const request: AppointmentRequest = {
        slotId: slotId,
        note: note,
        usernamePatient: "",
      };
      onConfirm(updateData, request)

      setMessage("Đặt lịch thành công! Vui lòng kiểm tra email xác nhận.");
      setTimeout(onClose, 1500);
    } catch {
      setMessage("Đặt lịch thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[600px] p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          Xác nhận thông tin đặt lịch
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Họ tên</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={patient?.name || ""}
            onChange={(e) => setPatient({ ...patient!, name: e.target.value })}
          />

          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            value={patient?.email || ""}
            onChange={(e) => setPatient({ ...patient!, email: e.target.value })}
          />

          <label className="block text-sm font-medium">Số điện thoại</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={patient?.phone || ""}
            onChange={(e) => setPatient({ ...patient!, phone: e.target.value })}
          />

          <label className="block text-sm font-medium">
            Ghi chú tình trạng bệnh
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 resize-y"
            rows={5}
            placeholder="Mô tả ngắn về tình trạng hoặc triệu chứng..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button
          className={`w-full mt-4 py-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Đang xử lý..." : "Xác nhận & Đặt lịch"}
        </button>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
