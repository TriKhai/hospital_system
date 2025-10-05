import { Formik, Form } from "formik";
import {
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import dayjs from "dayjs";
import type { ScheduleReq } from "../../../types/scheduleType";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function AddScheduleDialog({
  open,
  onClose,
  doctors,
  onSubmit,
  defaultDate,
  mode,
  initalData,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleReq) => void | Promise<void>;
  doctors: { id: number; name: string }[];
  defaultDate: string;
  mode?: "create" | "edit";
  initalData?: ScheduleReq;
}) {
  const initialValues: ScheduleReq = initalData || {
    doctorId: 0,
    workDate: defaultDate,
    shift: "MORNING",
    slotMinutes: 30,
    repeat: "NONE",
    repeatCount: 0,
    status: "AVAILABLE",
  };

  const handleSubmit = async (values: ScheduleReq) => {
    if (values.doctorId === 0) {
      toast.error("Đã xảy ra lỗi, không tìm thấy bác sĩ nào.");
      return;
    }

    // kiểm tra ngày
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(values.workDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate <= today && mode !== "edit") {
      toast.error("Ngày làm việc phải từ ngày mai trở đi.");
      return;
    }

    await onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === "create" ? "Thêm lịch làm việc" : "Cập nhật lịch làm việc"}
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form>
              {doctors.length === 0 ? (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Bác sĩ"
                  value="Không có bác sĩ"
                  InputProps={{ readOnly: true }}
                />
              ) : (
                <TextField
                  select
                  fullWidth
                  margin="normal"
                  label="Bác sĩ"
                  name="doctorId"
                  value={values.doctorId}
                  onChange={handleChange}
                >
                  {doctors.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              <TextField
                fullWidth
                margin="normal"
                label="Ngày làm việc"
                type="date"
                name="workDate"
                // value={dayjs(values.workDate).format("YYYY-MM-DD")}
                value={dayjs(values.workDate).format("YYYY-MM-DD")}
                // value={values.workDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                fullWidth
                margin="normal"
                label="Ca làm việc"
                name="shift"
                value={values.shift}
                onChange={handleChange}
              >
                <MenuItem value="MORNING">Sáng</MenuItem>
                <MenuItem value="AFTERNOON">Chiều</MenuItem>
                <MenuItem value="EVENING">Tối</MenuItem>
              </TextField>
              <TextField
                fullWidth
                margin="normal"
                label="Thời lượng slot (phút)"
                type="number"
                name="slotMinutes"
                value={values.slotMinutes}
                onChange={handleChange}
              />
              <TextField
                select
                fullWidth
                margin="normal"
                label="Repeat"
                name="repeat"
                value={values.repeat}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value === "NONE") {
                    values.repeatCount = 0; // reset khi chọn NONE
                  }
                }}
              >
                <MenuItem value="NONE">Không lặp</MenuItem>
                <MenuItem value="DAILY">Hằng ngày</MenuItem>
                <MenuItem value="WEEKLY">Hằng tuần</MenuItem>
                <MenuItem value="MONTHLY">Hằng tháng</MenuItem>
              </TextField>
              {values.repeat !== "NONE" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Repeat Count"
                  type="number"
                  name="repeatCount"
                  value={values.repeatCount}
                  onChange={handleChange}
                />
              )}
              <TextField
                select
                fullWidth
                margin="normal"
                label="Trạng thái"
                name="status"
                value={values.status}
                onChange={handleChange}
              >
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
                {/* <MenuItem value="CONFIRMED">Pending</MenuItem> */}
              </TextField>
              <Button type="submit" variant="contained" color="primary">
                {mode === "edit" ? "Cập nhật" : "Lưu"}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
