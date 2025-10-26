import { ResponseData } from "@/types/api/apiType";
import axiosClient from "./axiosClient";
import { PatientResponse, PatientUpdateRequest } from "@/types/api/patientType";

const BASE_URL = "/patient";

const patientService = {
  getAll: async (): Promise<PatientResponse[]> => {
    const res =
      await axiosClient.get<ResponseData<PatientResponse[]>>(BASE_URL);
    return res.data.data;
  },
  getCount: async (): Promise<number> => {
    const res = await axiosClient.get(`${BASE_URL}/count`);
    return res.data.data;
  },

  getProfile: async (): Promise<PatientResponse> => {
    const res = await axiosClient.get<ResponseData<PatientResponse>>(
      `${BASE_URL}/profile`
    );
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

  updateProfile: async (data: Partial<PatientUpdateRequest>): Promise<void> => {
    await axiosClient.put(`${BASE_URL}/infor`, data);
  },
};

export default patientService;
