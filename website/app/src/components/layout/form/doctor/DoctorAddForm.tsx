import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import type { AccountDoctorRequest } from "../../../../types/doctorType";
import { registerDoctor } from "../../../../services/authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import type { SpecialtyResponse } from "../../../../types/specialtyType";

const validationSchema = Yup.object({
  username: Yup.string().required("Bắt buộc"),
  password: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Bắt buộc"),
  name: Yup.string().required("Bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  phone: Yup.string().required("Bắt buộc"),
  address: Yup.string().required("Bắt buộc"),
  birthDay: Yup.string().required("Bắt buộc"),
  gender: Yup.string().oneOf(["true", "false"]).required("Bắt buộc"),
  specialtyId: Yup.string().required("Bắt buộc"),
});

// Tạo type riêng cho form
interface DoctorFormValues extends Omit<AccountDoctorRequest, "gender"> {
  gender: string; // "true" | "false"
}

const initialValues: DoctorFormValues = {
  username: "",
  password: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  birthDay: "",
  gender: "true", // mặc định string
  image: undefined,
  consultationFee: 0,
  workingHours: "",
  licenseNumber: "",
  yearsOfExperience: 0,
  degree: "",
  position: "",
  specialtyId: "",
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  specialties: SpecialtyResponse[];
};

export default function FormAddDoctor({ isOpen, onClose, specialties }: Props) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (values: DoctorFormValues) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        gender: values.gender === "true",
        specialtyId: Number(values.specialtyId),
      } as AccountDoctorRequest;

      console.log(payload)

      const res = await registerDoctor(payload);
      
      if(res) {
        onClose()
      }
    } catch (error) {
      console.error("Error when adding doctor:", error);
      alert("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Thêm thuốc</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <hr className="mt-2 mb-4" />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-2 gap-6">
              {/* Cột 1 */}
              <div className="space-y-4">
                <div>
                  <label>Tên đăng nhập</label>
                  <Field
                    name="username"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label>Mật khẩu</label>
                  <Field
                    type="password"
                    name="password"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label>Họ tên</label>
                  <Field name="name" className="border p-2 w-full rounded" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label>Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label>Số điện thoại</label>
                  <Field name="phone" className="border p-2 w-full rounded" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label>Địa chỉ</label>
                  <Field name="address" className="border p-2 w-full rounded" />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="font-medium">Chuyên khoa</label>
                  <Field
                    as="select"
                    name="specialtyId"
                    className="border p-2 w-full rounded mt-1"
                  >
                    <option value="">-- Chọn chuyên khoa --</option>
                    {specialties.map((sp) => (
                      <option key={sp.id} value={String(sp.id)}>
                        {sp.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="specialtyId"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Cột 2 */}
              <div className="space-y-4">
                <div>
                  <label>Ngày sinh</label>
                  <Field
                    type="date"
                    name="birthDay"
                    className="border p-2 w-full rounded"
                  />
                </div>

                <div>
                  <label>Giới tính</label>
                  <Field
                    as="select"
                    name="gender"
                    className="border p-2 w-full rounded"
                  >
                    <option value={"true"}>Nam</option>
                    <option value={"false"}>Nữ</option>
                  </Field>
                </div>

                <div>
                  <label>Ảnh đại diện</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      setFieldValue("image", file);
                    }}
                    className="block"
                  />
                </div>

                <div>
                  <label>Phí khám</label>
                  <Field
                    type="number"
                    name="consultationFee"
                    className="border p-2 w-full rounded"
                  />
                </div>

                <div>
                  <label>Giờ làm việc</label>
                  <Field
                    type="time"
                    name="workingHours"
                    className="border p-2 w-full rounded"
                  />
                </div>

                <div>
                  <label>Số giấy phép</label>
                  <Field
                    name="licenseNumber"
                    className="border p-2 w-full rounded"
                  />
                </div>

                <div>
                  <label>Kinh nghiệm (năm)</label>
                  <Field
                    type="number"
                    name="yearsOfExperience"
                    className="border p-2 w-full rounded"
                  />
                </div>

                <div>
                  <label>Bằng cấp</label>
                  <Field name="degree" className="border p-2 w-full rounded" />
                </div>

                <div>
                  <label>Chức vụ</label>
                  <Field
                    name="position"
                    className="border p-2 w-full rounded"
                  />
                </div>
              </div>

              {/* Nút submit full width */}
              <div className="col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  {loading ? "Đang lưu..." : "Thêm bác sĩ"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
