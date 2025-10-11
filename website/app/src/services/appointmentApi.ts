import axiosClient from "../config/axios";
import type { AppointmentRequest, AppointmentResponse } from "../types/appointmentType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/appointment";

const appointmentService = {

  create: async (data: AppointmentRequest): Promise<void> => {
    const res = await axiosClient.post<ResponseData<void>>(BASE_URL, data);
    return res.data.data;
  },
  getAll: async (): Promise<AppointmentResponse[]> => {
    const res = await axiosClient.get<ResponseData<AppointmentResponse[]>>(BASE_URL);
    console.log(res)
    return res.data.data;
  },
  getForPatient: async ():Promise<AppointmentResponse[]> => {
    const res = await axiosClient.get<ResponseData<AppointmentResponse[]>>(`${BASE_URL}/patient`);
    return res.data.data;
  },
  updateStatus: async (id: number, status: string): Promise<void> => {
    const res = await axiosClient.put<ResponseData<void>>(`${BASE_URL}/${id}/status`, status);
    return res.data.data;
  },
  cancelByPatient: async (id: number): Promise<void> => {
    const res = await axiosClient.patch<ResponseData<void>>(`${BASE_URL}/${id}/cancel-by-patient`);
    return res.data.data;
  }
};

export default appointmentService;
