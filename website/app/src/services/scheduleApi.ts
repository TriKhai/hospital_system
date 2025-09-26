import axiosClient from "../config/axios";
import type { ResponseData } from "../types/resType";
import type { ScheduleReq, ScheduleRes } from "../types/scheduleType";

const BASE_URL = "/staff-schedule";

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

  //   update: async (
  //     id: number,
  //     data: SupplierRequest
  //   ): Promise<SupplierResponse> => {
  //     const res = await axiosClient.put<ResponseData<SupplierResponse>>(
  //       `${BASE_URL}/${id}`,
  //       data
  //     );
  //     return res.data.data;
  //   },

    delete: async (id: number): Promise<void> => {
      await axiosClient.delete(`${BASE_URL}/${id}`);
    },
};

export default scheduleService;
