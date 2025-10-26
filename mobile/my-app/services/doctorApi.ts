import { ResponseData } from "@/types/api/apiType";
import axiosClient from "./axiosClient";
import { DoctorType, DoctorWorkResponse } from "@/types/api/doctorType";

const BASE_URL = "/doctor";

const doctorService = {

  getAll: async (): Promise<DoctorType[]> => {
    const res = await axiosClient.get<ResponseData<DoctorType[]>>(BASE_URL);
    console.log(res);
    return res.data.data;
  },

  getCount: async (): Promise<number> => {
    const res = await axiosClient.get(`${BASE_URL}/count`);
    return res.data.data;
  },
  getDoctorWorks: async (
    specialtyId?: number
  ): Promise<DoctorWorkResponse[]> => {
    const url = specialtyId
      ? `${BASE_URL}/doctor-work?specialtyId=${specialtyId}`
      : `${BASE_URL}/doctor-work`;

    const res = await axiosClient.get<ResponseData<DoctorWorkResponse[]>>(url);
    console.log(res.data.data);
    return res.data.data;
  },
  loadImage: async (imageName?: string): Promise<string> => {
    if (!imageName) return "";

    try {
      const res = await axiosClient.get(`${BASE_URL}/avatar/${imageName}`, {
        responseType: "arraybuffer",
      });

      const base64 = btoa(String.fromCharCode(...new Uint8Array(res.data)));
      return `data:image/png;base64,${base64}`;
    } catch (error) {
      console.error("Lỗi tải ảnh:", error);
      return "";
    }
  },
};

export default doctorService;
