import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import type { PatientResponse, PatientUpdateRequest } from "../../../types/patientType";

interface EditPatientModalProps {
  open: boolean;
  onClose: () => void;
  patient: PatientResponse;
  onSave: (data: PatientUpdateRequest) => void;
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({
  open,
  onClose,
  patient,
  onSave,
}) => {
  const [formData, setFormData] = React.useState<PatientUpdateRequest>(patient);

  React.useEffect(() => {
    setFormData(patient);
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Chỉnh sửa thông tin bệnh nhân</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập họ tên..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
            <select
              name="gender"
              value={formData.gender ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gender: e.target.value === "true",
                }))
              }
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập địa chỉ..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập email..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập số điện thoại..."
            />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
