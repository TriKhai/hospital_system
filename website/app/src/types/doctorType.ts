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
  createdAt: Date;
  updatedAt: Date;
}
