import type { DepartmentResponse } from "./departmentType";

export interface SpecialtyResponse {
    id:          number;
    name:        string;
    description: string;
    createdAt:  string
    department?: DepartmentResponse;
}

export interface SpecialtyRequest {
    name:         string;
    description:  string;
    departmentId: number;
}