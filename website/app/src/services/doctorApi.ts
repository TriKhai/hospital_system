import axiosClient from "../config/axios";
import type {
  DoctorLite,
  DoctorType,
  DoctorWorkResponse,
} from "../types/doctorType";
import type { ResponseData } from "../types/resType";

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

  // create: async (formData: FormData): Promise<DoctorType> => {
  //   const res = await axiosClient.post<ResponseData<DoctorType>>(
  //     BASE_URL,
  //     formData,
  //     {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     }
  //   );
  //   return res.data.data;
  // },

  // update: async (
  //   id: number,
  //   doctor: Partial<DoctorType>,
  //   file?: File
  // ): Promise<DoctorType> => {
  //   const formData = new FormData();
  //   formData.append(
  //     "doctor",
  //     new Blob([JSON.stringify(doctor)], { type: "application/json" })
  //   );
  //   if (file) {
  //     formData.append("file", file);
  //   }

  //   const res = await axiosClient.put<ResponseData<DoctorType>>(
  //     `${BASE_URL}/${id}`,
  //     formData,
  //     { headers: { "Content-Type": "multipart/form-data" } }
  //   );
  //   return res.data.data;
  // },

  // delete: async (id: number): Promise<void> => {
  //   await axiosClient.delete(`${BASE_URL}/${id}`);
  // },
};

export default doctorService;
