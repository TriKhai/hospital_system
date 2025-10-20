import { useState } from "react";
import { toast } from "react-toastify";
import type { ScheduleDocReq } from "../../../types/scheduleType";
import scheduleService from "../../../services/scheduleApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface AddScheduleByDoctorProps {
  doctorId: number;
  onSuccess?: () => void;
}

const AddScheduleByDoctor: React.FC<AddScheduleByDoctorProps> = ({
  doctorId,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ScheduleDocReq>({
    doctorId,
    workDate: "",
    shift: "",
    slotMinutes: 30,
    repeat: "NONE",
    repeatCount: 0,
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "slotMinutes" || name === "repeatCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: ScheduleDocReq = { ...form };
      await scheduleService.createByDoctor(payload);
      toast.success("Đã gửi yêu cầu thêm lịch (chờ admin duyệt)");
      setOpen(false);
      if (onSuccess) onSuccess();
      // reset form
      setForm({
        doctorId,
        workDate: "",
        shift: "",
        slotMinutes: 30,
        repeat: "NONE",
        repeatCount: 0,
        note: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm lịch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      {/* Nút mở modal */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-[#0E8DA1] text-white rounded-lg hover:bg-[#355a5f] transition"
      >
        Thêm lịch làm việc
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            {/* Nút đóng */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
                <FontAwesomeIcon icon={faTimesCircle} className="w-5 h-5" />
              
            </button>

            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Thêm lịch làm việc
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ngày làm việc</label>
                <input
                  type="date"
                  name="workDate"
                  value={form.workDate}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ca làm</label>
                <select
                  name="shift"
                  value={form.shift}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">-- Chọn ca --</option>
                  <option value="MORNING">Sáng</option>
                  <option value="AFTERNOON">Chiều</option>
                  <option value="EVENING">Tối</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Thời lượng mỗi slot (phút)
                </label>
                <input
                  type="number"
                  name="slotMinutes"
                  value={form.slotMinutes}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  min={5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Lặp lại</label>
                <select
                  name="repeat"
                  value={form.repeat}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="NONE">Không lặp</option>
                  <option value="DAILY">Hàng ngày</option>
                  <option value="WEEKLY">Hàng tuần</option>
                </select>
              </div>

              {form.repeat !== "NONE" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Số lần lặp</label>
                  <input
                    type="number"
                    name="repeatCount"
                    value={form.repeatCount}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    min={1}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Ghi chú</label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  rows={3}
                  placeholder="Ví dụ: trực phòng 2, ưu tiên khám nhi"
                />
              </div>

              <div className="flex justify-between gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0E8DA1] text-white py-2 rounded-lg hover:bg-[#85c7d1] transition"
                >
                  {loading ? "Đang gửi..." : "Xác nhận"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddScheduleByDoctor;
