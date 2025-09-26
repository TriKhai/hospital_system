import type { FormValue } from "../services/authApi";
import type { SpecialtyResponse } from "./specialtyType";

export interface DoctorType {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDay: Date;          
  gender: boolean;        
  imageUrl: string;
  consultationFee?: number; 
  workingHours?: Date;      
  licenseNumber?: string;
  yearsOfExperience?: number;
  degree?: string;
  position?: string;
  specialty: SpecialtyResponse;
  createdAt: Date;
  updatedAt: Date;
}

// export interface AccountDoctorRequest {
//   username: string;
//   password: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   birthDay: string; // yyyy-MM-dd
//   gender: boolean;
//   image?: File;
//   consultationFee?: number;
//   workingHours?: string; // HH:mm
//   licenseNumber?: string;
//   yearsOfExperience?: number;
//   degree?: string;
//   position?: string;
// }

export interface AccountDoctorRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDay: string;   // yyyy-MM-dd
  gender: boolean;
  image?: File;
  consultationFee?: number;
  workingHours?: string; // HH:mm
  licenseNumber?: string;
  yearsOfExperience?: number;
  degree?: string;
  position?: string;
  specialtyId: number;
  [key: string]: FormValue; 
}


export interface AccountDoctorResponse {
  id: number;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  doctor: DoctorType;
}

export type DoctorSchedule = {
  id: number;
  name: string;
  specialtyId: number;
  specialtyName: string;
};

export interface DoctorLite {
  id: number;
  name: string;
}