import { ResponseData } from "@/types/api/apiType";
import axiosClient from "./axiosClient";
import { TagResponse } from "@/types/api/tagType";

const BASE_URL = "/tag";

const tagService = {
  getAll: async (): Promise<TagResponse[]> => {
    const res = await axiosClient.get<ResponseData<TagResponse[]>>(BASE_URL);
    return res.data.data;
  },

//   create: async (data: DrugTypeRequest): Promise<DrugTypeResponse> => {
//     const res = await axiosClient.post<ResponseData<DrugTypeResponse>>(
//       BASE_URL,
//       data
//     );
//     return res.data.data;
//   },

//   update: async (
//     id: number,
//     data: DrugTypeRequest
//   ): Promise<DrugTypeResponse> => {
//     const res = await axiosClient.put<ResponseData<DrugTypeResponse>>(
//       `${BASE_URL}/${id}`,
//       data
//     );
//     return res.data.data;
//   },

//   delete: async (id: number): Promise<void> => {
//     await axiosClient.delete(`${BASE_URL}/${id}`);
//   },

//   getCount: async (): Promise<number> => {
//     const res = await axiosClient.get(`${BASE_URL}/count`);
//     return res.data.data;
//   }
};

export default tagService;