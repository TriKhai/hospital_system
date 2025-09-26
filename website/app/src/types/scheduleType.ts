export type Shift = "MORNING" | "AFTERNOON" | "EVENING";
export type Repeat = "DAILY" | "WEEKLY";
export type Status = "ACTIVE" | "INACTIVE";

export interface ScheduleReq {
  doctorId: number;
  workDate: string;
  shift: Shift;
  slotMinutes: number;
  repeat: Repeat;
  repeatCount: number;
  status: Status;
}

export interface ScheduleRes {
  id: string;          // Bắt buộc để FullCalendar quản lý event
  title: string;       // Hiển thị trên calendar
  start: string;       // ISO string: ngày giờ bắt đầu
  end: string;         // ISO string: ngày giờ kết thúc
  status?: "ACTIVE" | "INACTIVE"; // tuỳ chọn, dùng để hiển thị màu sắc hoặc trạng thái
  doctorId: number
};
