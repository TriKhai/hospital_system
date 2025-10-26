import type { DoctorType, SlotType } from "./doctorType";
import type { PatientResponse } from "./patientType";

export type AppointmentStatus =
  | "PENDING"               // Chờ duyệt
  | "PENDING_VERIFICATION"  // Đã duyệt, chờ xác minh
  | "CONFIRMED"             // Đã xác nhận
  | "CANCELLED_BY_PATIENT"  // Bệnh nhân hủy
  | "CANCELLED_BY_DOCTOR"   // Bác sĩ hủy
  | "REJECTED";             // Từ chối


export interface AppointmentRequest {
  usernamePatient: string;
  slotId: number;
  note: string;
}

export interface AppointmentResponse {
  id: number;
  note: string;
  status: string;
  patient: PatientResponse;
  doctor: DoctorType;
  slot: SlotType;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}