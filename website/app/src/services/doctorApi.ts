import axiosClient from "../config/axios";
import type { DoctorType } from "../types/doctorType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/doctor";

const doctorService = {
  getAll: async (): Promise<DoctorType[]> => {
    const res = await axiosClient.get<ResponseData<DoctorType[]>>(BASE_URL);
    console.log(res)
    return res.data.data;
  },
  getCount: async (): Promise<number> => {
    const res = await axiosClient.get(`${BASE_URL}/count`);
    return res.data.data;
  }


};

export default doctorService;
