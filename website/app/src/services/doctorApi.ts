import axiosClient from "../config/axios";
import type {
  DoctorLite,
  DoctorType,
  DoctorUpdateRequest,
  DoctorWorkResponse,
} from "../types/doctorType";
import type { ResponseData } from "../types/resType";
import type { ScheduleRes } from "../types/scheduleType";

const BASE_URL = "/doctor";

const doctorService = {
  getAll: async (): Promise<DoctorType[]> => {
    const res = await axiosClient.get<ResponseData<DoctorType[]>>(BASE_URL);
    console.log(res);
    return res.data.data;
  },

  getBySpecialty: async (id?: number): Promise<DoctorLite[]> => {
    if (!id) return [];
    const res = await axiosClient.get<ResponseData<DoctorLite[]>>(
      BASE_URL + "/specialty",
      {
        params: { id },
      }
    );
    console.log("doc: ", res.data.data);
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
    if (!imageName) return "/default-doctor.png"; // ảnh mặc định
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/avatar/${imageName}`,
        {
          responseType: "blob",
        }
      );
      return URL.createObjectURL(response.data); // chuyển blob → objectURL
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      return "/default-doctor.png";
    }
  },

  getProfile: async (): Promise<DoctorType> => {
    const res = await axiosClient.get(`${BASE_URL}/profile`);
    return res.data.data;
  },
  updateAvatar: async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("image", file);
    await axiosClient.put<ResponseData<void>>(`${BASE_URL}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateProfile: async (data: Partial<DoctorUpdateRequest>):Promise<void> => {
      await axiosClient.put(`${BASE_URL}/infor`, data);
    },

    getSchedule: async (): Promise<ScheduleRes[]> => {
    const res = await axiosClient.get<ResponseData<ScheduleRes[]>>(`${BASE_URL}/schedule`);
    return res.data.data;
  },

};

export default doctorService;
