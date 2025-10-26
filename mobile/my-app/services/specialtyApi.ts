import { ResponseData } from "@/types/api/apiType";
import { SpecialtyRequest, SpecialtyResponse } from "@/types/api/specialtyType";
import axiosClient from "./axiosClient";

const BASE_URL = "/specialty";

const specialtyService = {
  getAll: async (): Promise<SpecialtyResponse[]> => {
    const res = await axiosClient.get<ResponseData<SpecialtyResponse[]>>(BASE_URL);
    return res.data.data;
  },

  create: async (data: SpecialtyRequest): Promise<SpecialtyResponse> => {
    const res = await axiosClient.post<ResponseData<SpecialtyResponse>>(
      BASE_URL,
      data
    );
    return res.data.data;
  },

  update: async (
    id: number,
    data: SpecialtyRequest
  ): Promise<SpecialtyResponse> => {
    const res = await axiosClient.put<ResponseData<SpecialtyResponse>>(
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

export default specialtyService;
