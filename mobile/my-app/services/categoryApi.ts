import { ResponseData } from "@/types/api/apiType";
import axiosClient from "./axiosClient";
import {
  CategoryReponse,
  CategoryRequest,
} from "@/types/api/categoryType";

const BASE_URL = "/category";

const categoryService = {
  getAll: async (): Promise<CategoryReponse[]> => {
    const res =
      await axiosClient.get<ResponseData<CategoryReponse[]>>(BASE_URL);
    return res.data.data;
  },

  create: async (data: CategoryRequest): Promise<CategoryReponse> => {
    const res = await axiosClient.post<ResponseData<CategoryReponse>>(
      BASE_URL,
      data
    );
    return res.data.data;
  },

  update: async (
    id: number,
    data: CategoryRequest
  ): Promise<CategoryReponse> => {
    const res = await axiosClient.put<ResponseData<CategoryReponse>>(
      `${BASE_URL}/${id}`,
      data
    );
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`${BASE_URL}/${id}`);
  },

  //   getCount: async (): Promise<number> => {
  //     const res = await axiosClient.get(`${BASE_URL}/count`);
  //     return res.data.data;
  //   }
};

export default categoryService;
