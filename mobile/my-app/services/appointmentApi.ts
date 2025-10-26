import { ResponseData } from "@/types/api/apiType";
import {
  AppointmentRequest,
  AppointmentResponse,
} from "@/types/api/appointmentType";
import axiosClient from "./axiosClient";

const BASE_URL = "/appointment";

const appointmentService = {
  create: async (data: AppointmentRequest): Promise<void> => {
    const res = await axiosClient.post<ResponseData<void>>(BASE_URL, data);
    return res.data.data;
  },
  getAll: async (): Promise<AppointmentResponse[]> => {
    const res =
      await axiosClient.get<ResponseData<AppointmentResponse[]>>(BASE_URL);
    console.log(res);
    return res.data.data;
  },
  getForPatient: async (): Promise<AppointmentResponse[]> => {
    const res = await axiosClient.get<ResponseData<AppointmentResponse[]>>(
      `${BASE_URL}/patient`
    );
    return res.data.data;
  },
  getForDoctor: async (): Promise<AppointmentResponse[]> => {
    const res = await axiosClient.get<ResponseData<AppointmentResponse[]>>(
      `${BASE_URL}/doctor`
    );
    return res.data.data;
  },
  updateStatus: async (id: number, status: string): Promise<void> => {
    const res = await axiosClient.put<ResponseData<void>>(
      `${BASE_URL}/${id}/status`,
      status
    );
    return res.data.data;
  },
  cancelByPatient: async (id: number): Promise<void> => {
    const res = await axiosClient.patch<ResponseData<void>>(
      `${BASE_URL}/${id}/cancel-by-patient`
    );
    return res.data.data;
  },
  cancelByDoctor: async (id: number): Promise<void> => {
    const res = await axiosClient.patch<ResponseData<void>>(
      `${BASE_URL}/${id}/cancel-by-doctor`
    );
    return res.data.data;
  },
  confirmByDoctor: async (id: number): Promise<void> => {
    const res = await axiosClient.patch<ResponseData<void>>(
      `${BASE_URL}/${id}/confirm-by-doctor`
    );
    return res.data.data;
  },
};

export default appointmentService;
