import axiosClient from "../config/axios";
import type { DoctorScheduleRes } from "../types/doctorScheduleType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/doctor-schedule";

const doctorScheduleService = {
  getAll: async (): Promise<DoctorScheduleRes[]> => {
    const res = await axiosClient.get<ResponseData<DoctorScheduleRes[]>>(BASE_URL);
    return res.data.data;
  },
  approve: async (doctorId: number, scheduleId: number, shift: string): Promise<DoctorScheduleRes> => {
    const res = await axiosClient.patch<ResponseData<DoctorScheduleRes>>(
      `${BASE_URL}/${doctorId}/${scheduleId}/${shift}/approve`
    );
    return res.data.data;
  },
  cancel: async (doctorId: number, scheduleId: number, shift: string, reason?: string): Promise<void> => {
    await axiosClient.patch(`${BASE_URL}/${doctorId}/${scheduleId}/${shift}/cancel`, {
      reason: reason ?? "Admin đã hủy lịch này.",
    });
  },
};

export default doctorScheduleService;
