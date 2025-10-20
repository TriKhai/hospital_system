export type Shift = "MORNING" | "AFTERNOON" | "EVENING";
export type Repeat =  "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";
export type Status =
  | "AVAILABLE"
  | "BOOKED"
  | "CANCELLED"
  | "PENDING"
  | "COMPLETED"
  | "ABSENT"
  | "MEETING";

export interface ScheduleReq {
  doctorId: number;
  workDate: string;
  shift: string;
  slotMinutes: number;
  repeat?: string;
  repeatCount?: number;
  status: string;
  scheduleId: number;
  note: string;
}

export interface ScheduleDocReq {
  doctorId: number;
  workDate: string;
  shift: string;
  slotMinutes: number;
  repeat?: string;
  repeatCount?: number;
  note: string;
}


export interface ScheduleRes {
  id: string; // Bắt buộc để FullCalendar quản lý event
  title: string; // Hiển thị trên calendar
  start: string; // ISO string: ngày giờ bắt đầu
  end: string; // ISO string: ngày giờ kết thúc
  status?: Status; // tuỳ chọn, dùng để hiển thị màu sắc hoặc trạng thái
  doctorId: number;
  scheduleId: number;
  note: string;
}
