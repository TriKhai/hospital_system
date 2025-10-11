import type { DoctorType, SlotType } from "./doctorType";
import type { PatientResponse } from "./patientType";

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