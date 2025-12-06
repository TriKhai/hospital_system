import axiosClient from "../config/axios";
import type {
    AppointmentStatusStats,
  DashboardSummary,
  WeeklyAppointment,
} from "../types/dashboardType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/dashboard";

const dashboardService = {
  getSummary: async (): Promise<DashboardSummary> => {
    const res = await axiosClient.get<ResponseData<DashboardSummary>>(
      BASE_URL + "/summary"
    );
    return res.data.data;
  },

  getWeeklyAppointments: async (): Promise<WeeklyAppointment> => {
    const res = await axiosClient.get<ResponseData<WeeklyAppointment>>(
      BASE_URL + "/appointments/week"
    );
    return res.data.data;
  },

  getStatusStats: async () => {
    const res = await axiosClient.get<ResponseData<AppointmentStatusStats[]>>(
      BASE_URL + "/appointments/status"
    );
    console.log("hello: ")
    return res.data.data;
  },
};

export default dashboardService;
