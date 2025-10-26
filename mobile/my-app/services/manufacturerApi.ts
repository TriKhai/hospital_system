import { ResponseData } from "@/types/api/apiType";
import { ManufacturerRequest, ManufacturerResponse } from "@/types/api/medicineType";
import axiosClient from "./axiosClient";

const BASE_URL = "/manufacturer";

const manufacturerService = {
  getAll: async (): Promise<ManufacturerResponse[]> => {
    const res = await axiosClient.get<ResponseData<ManufacturerResponse[]>>(BASE_URL);
    return res.data.data;
  },

  create: async (data: ManufacturerRequest): Promise<ManufacturerResponse> => {
    const res = await axiosClient.post<ResponseData<ManufacturerResponse>>(
      BASE_URL,
      data
    );
    return res.data.data;
  },

  update: async (
    id: number,
    data: ManufacturerRequest
  ): Promise<ManufacturerResponse> => {
    const res = await axiosClient.put<ResponseData<ManufacturerResponse>>(
      `${BASE_URL}/${id}`,
      data
    );
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`${BASE_URL}/${id}`);
  },

  getCount: async (): Promise<number> => {
    const res = await axiosClient.get(`${BASE_URL}/count`);
    return res.data.data;
  }
};

export default manufacturerService;
