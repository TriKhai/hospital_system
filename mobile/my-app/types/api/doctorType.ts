import { SpecialtyResponse } from "./specialtyType";

export interface SlotType {
    id:        number;
    status:    string;
    startTime: string;
    endTime:   string;
    workDate:  Date;
}

export interface DoctorWorkResponse {
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
  slots: SlotType[];
}

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
