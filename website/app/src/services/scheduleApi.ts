import axiosClient from "../config/axios";
import type { ResponseData } from "../types/resType";
import type { ScheduleDocReq, ScheduleReq, ScheduleRes } from "../types/scheduleType";

const BASE_URL = "/schedule";

const scheduleService = {
  getAll: async (specialtyID?: number): Promise<ScheduleRes[]> => {
    const res = await axiosClient.get<ResponseData<ScheduleRes[]>>(BASE_URL, {
      params: specialtyID ? { specialtyID } : {},
    });
    return res.data.data;
  },

  create: async (data: ScheduleReq): Promise<void> => {
    const res = await axiosClient.post<ResponseData<void>>(BASE_URL, data);
    return res.data.data;
  },

  update: async (data: ScheduleReq): Promise<void> => {
    const res = await axiosClient.put<ResponseData<void>>(BASE_URL, data);
    return res.data.data;
  },

  delete: async (doctorId: number, scheduleId: number): Promise<void> => {
    await axiosClient.delete(`${BASE_URL}/${doctorId}/${scheduleId}`);
  }, 
  createByDoctor: async (data: ScheduleDocReq): Promise<void> => {
    const res = await axiosClient.post<ResponseData<void>>(`${BASE_URL}/doctor`, data);
    return res.data.data;
  },
    
};

export default scheduleService;
