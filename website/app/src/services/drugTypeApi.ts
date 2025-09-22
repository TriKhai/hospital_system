import axiosClient from "../config/axios";
import type { DrugTypeRequest, DrugTypeResponse } from "../types/drugType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/drug-type";

const drugTypeService = {
  getAll: async (): Promise<DrugTypeResponse[]> => {
    const res = await axiosClient.get<ResponseData<DrugTypeResponse[]>>(BASE_URL);
    return res.data.data;
  },

  create: async (data: DrugTypeRequest): Promise<DrugTypeResponse> => {
    const res = await axiosClient.post<ResponseData<DrugTypeResponse>>(
      BASE_URL,
      data
    );
    return res.data.data;
  },

  update: async (
    id: number,
    data: DrugTypeRequest
  ): Promise<DrugTypeResponse> => {
    const res = await axiosClient.put<ResponseData<DrugTypeResponse>>(
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

export default drugTypeService;
