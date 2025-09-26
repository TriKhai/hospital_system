import type { DoctorType } from "./doctorType";

export type DoctorSchedule = {
  id: number;
  name: string;
  specialtyId: number;
  specialtyName: string;
};

export type StaffScheduleRes = {
  id: number;
  workDate: string;    // "2025-09-24"
  startTime: string;   // "08:00"
  endTime: string;     // "12:00"
  status: "ACTIVE" | "INACTIVE" | "CANCELLED" | "COMPLETED" ;
  doctor: DoctorType;
};

export type StaffScheduleReq = {
  doctorId: string;
  workDate: string; // yyyy-MM-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: string;
}

export type ScheduleEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  status: string;
  doctorId: number;
};