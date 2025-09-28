import axiosClient from "../config/axios";
import type { AppointmentRequest } from "../types/appointmentType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/appointment";

const appointmentService = {

  create: async (data: AppointmentRequest): Promise<void> => {
    const res = await axiosClient.post<ResponseData<void>>(BASE_URL, data);
    return res.data.data;
  },

};

export default appointmentService;
