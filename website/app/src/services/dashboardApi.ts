import axiosClient from "../config/axios";
import type { AppointmentResponse } from "../types/appointmentType";
import type {
  AppointmentChart,
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
    return res.data.data;
  },

  getHourlyStats: async (date: string, shift: string) => {
    const res = await axiosClient.get<ResponseData<AppointmentChart[]>>(
      BASE_URL + "/appointments/hour",
    {
      params: {
        date: date,
        shift: shift,
      },
    }
    );
    return res.data.data;
  },

  getWeekdayStats: async (date: string) => {
    const res = await axiosClient.get<ResponseData<AppointmentChart[]>>(
      BASE_URL + "/appointments/weekday",
      { params: { date } }
    );
    return res.data.data;
  },

  getWeeklyStats: async (month: number, year: number) => {
    const res = await axiosClient.get<ResponseData<AppointmentChart[]>>(
      BASE_URL + `/appointments/week-of-month?month=${month}&year=${year}`
    );
    return res.data.data;
  },

  getMonthDayStats: async (month: number, year: number) => {
    const res = await axiosClient.get<ResponseData<AppointmentChart[]>>(
      BASE_URL + "/appointments/day-of-month",
      { params: { month, year } }
    );
    return res.data.data;
  },

  getStatsYearMonth: async (year: number) => {
    const res = await axiosClient.get<ResponseData<AppointmentChart[]>>(
      BASE_URL + "/appointments/month-of-year",
      { params: { year } }
    );
    return res.data.data;
  },

  getLatestAppointments: async (limit: number = 5) => {
    const res = await axiosClient.get<ResponseData<AppointmentResponse[]>>(
      BASE_URL + `/appointments/latest`,
      { params: { limit } }
    );
    return res.data.data;
  },
};

export default dashboardService;
