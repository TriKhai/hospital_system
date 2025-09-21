// Dùng khi tạo mới hoặc update department
export interface DepartmentRequest {
  name: string;
  description?: string;
}

// Dữ liệu trả về từ backend
export interface DepartmentResponse {
  id: number;
  name: string;
  description?: string;
  createdAt: string; // ISO string từ backend
}
