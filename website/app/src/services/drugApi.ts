import axiosClient from "../config/axios";
import type { DrugResponse } from "../types/drugType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/drug";

const drugService = {
  getAll: async (): Promise<DrugResponse[]> => {
    const res = await axiosClient.get<ResponseData<DrugResponse[]>>(BASE_URL);
    return res.data.data;
  },

  create: async (formData: FormData): Promise<DrugResponse> => {
    const res = await axiosClient.post<ResponseData<DrugResponse>>(
      BASE_URL,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data.data;
  },

  update: async (id: number, formData: FormData): Promise<DrugResponse> => {
    const res = await axiosClient.put<ResponseData<DrugResponse>>(
      `${BASE_URL}/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`${BASE_URL}/${id}`);
  },

  getCount: async (): Promise<number> => {
    const res = await axiosClient.get(`${BASE_URL}/count`);
    return res.data.data;
  },
};

export default drugService;
