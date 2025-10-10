export interface PatientResponse {
    id:        number;
    name:      string;
    birthDate: string;
    gender:    boolean;
    address:   string;
    email:     string;
    phone:     string;
    imageUrl:  string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PatientUpdateRequest {
  name?: string;         
  birthDate?: string;     
  gender?: boolean;     
  address?: string;
  email?: string;
  phone?: string;
}
