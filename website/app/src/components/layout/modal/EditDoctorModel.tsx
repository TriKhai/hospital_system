import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import type { SpecialtyResponse } from "../../../types/specialtyType";
import type {
  DoctorType,
  DoctorUpdateRequest,
} from "../../../types/doctorType";
import { format } from "date-fns";

interface EditDoctorModelProps {
  open: boolean;
  onClose: () => void;
  doctor: DoctorType;
  onSave: (data: DoctorUpdateRequest) => void;
  specialties: SpecialtyResponse[];
}

const EditDoctorModel: React.FC<EditDoctorModelProps> = ({
  open,
  onClose,
  doctor,
  onSave,
  specialties,
}) => {
  const [formData, setFormData] = React.useState<DoctorUpdateRequest>({
    name: doctor.name,
    email: doctor.email,
    phone: doctor.phone,
    address: doctor.address,
    birthDay: doctor.birthDay
      ? format(new Date(doctor.birthDay), "yyyy-MM-dd")
      : undefined,
    gender: doctor.gender,
    consultationFee: doctor.consultationFee,
    licenseNumber: doctor.licenseNumber,
    yearsOfExperience: doctor.yearsOfExperience,
    degree: doctor.degree,
    position: doctor.position,
    specialtyId: doctor.specialty?.id,
  });

  React.useEffect(() => {
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      address: doctor.address,
      birthDay: doctor.birthDay
        ? format(new Date(doctor.birthDay), "yyyy-MM-dd")
        : undefined,
      gender: doctor.gender,
      consultationFee: doctor.consultationFee,
      licenseNumber: doctor.licenseNumber,
      yearsOfExperience: doctor.yearsOfExperience,
      degree: doctor.degree,
      position: doctor.position,
      specialtyId: doctor.specialty?.id,
    });
  }, [doctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Type-safe value
    let val: string | number | boolean | undefined = value;

    if (type === "checkbox") {
      val = value === "true"; // boolean
    } else if (type === "number") {
      val = value === "" ? undefined : Number(value); // number | undefined
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-lg font-semibold mb-6">
          Chỉnh sửa thông tin bác sĩ
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Họ tên</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập họ tên..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập email..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập số điện thoại..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Địa chỉ</label>
            <input
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập địa chỉ..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Ngày sinh
            </label>
            <input
              type="date"
              name="birthDay"
              value={formData.birthDay || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Giới tính
            </label>
            <select
              name="gender"
              value={
                formData.gender !== undefined ? String(formData.gender) : ""
              }
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Chọn giới tính</option>
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Học vị / Bằng cấp
            </label>
            <input
              name="degree"
              value={formData.degree || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập học vị..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Chức vụ</label>
            <input
              name="position"
              value={formData.position || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập chức vụ..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Phí khám
            </label>
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập phí khám..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Số giấy phép
            </label>
            <input
              name="licenseNumber"
              value={formData.licenseNumber || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập số giấy phép..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Số năm kinh nghiệm
            </label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Nhập số năm kinh nghiệm..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Chuyên khoa
            </label>
            <select
              name="specialtyId"
              value={formData.specialtyId || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Chọn chuyên khoa</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Nút hành động spanning cả 3 cột */}
          <div className="col-span-3 flex justify-end mt-4 gap-2">
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
export default EditDoctorModel;
