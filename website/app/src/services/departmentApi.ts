import axiosClient from "../config/axios";
import type {
  DepartmentRequest,
  DepartmentResponse,
} from "../types/departmentType";
import type { ResponseData } from "../types/resType";

const departmentService = {
  getAll: async (): Promise<DepartmentResponse[]> => {
    const res = await axiosClient.get<ResponseData<DepartmentResponse[]>>(
      "/department"
    );
    return res.data.data;
  },

  create: async (data: DepartmentRequest): Promise<DepartmentResponse> => {
    const res = await axiosClient.post<ResponseData<DepartmentResponse>>(
      "/department",
      data
    );
    return res.data.data;
  },

  update: async (
    id: number,
    data: DepartmentRequest
  ): Promise<DepartmentResponse> => {
    const res = await axiosClient.put<ResponseData<DepartmentResponse>>(
      `/department/${id}`,
      data
    );
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/department/${id}`);
  },
};

export default departmentService;
