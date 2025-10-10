import axiosClient from "../config/axios";
import type { PatientResponse, PatientUpdateRequest } from "../types/patientType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/patient";

const patientService = {
  getAll: async (): Promise<PatientResponse[]> => {
    const res = await axiosClient.get<ResponseData<PatientResponse[]>>(BASE_URL);
    // console.log(res)
    return res.data.data;
  },
  getCount: async (): Promise<number> => {
    const res = await axiosClient.get(`${BASE_URL}/count`);
    return res.data.data;
  },
  getProfile: async ():Promise<PatientResponse> => {
    const res = await axiosClient.get<ResponseData<PatientResponse>>(`${BASE_URL}/profile`);
    return res.data.data;
  },
  loadImage: async (imageName?: string): Promise<string> => {
    if (!imageName) return "/default-patient.png"; // ảnh mặc định
    try {
      const response = await axiosClient.get(`${BASE_URL}/avatar/${imageName}`, {
        responseType: "blob", 
      });
      return URL.createObjectURL(response.data); // chuyển blob → objectURL
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      return "/default-patient.png";
    }
  },
  updateAvatar: async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("image", file);
    await axiosClient.put<ResponseData<void>>(`${BASE_URL}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  updateProfile: async (data: Partial<PatientUpdateRequest>):Promise<void> => {
    await axiosClient.put(`${BASE_URL}/infor`, data);
  },

};

export default patientService;
