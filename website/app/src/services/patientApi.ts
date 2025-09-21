import axiosClient from "../config/axios";
import type { PatientResponse } from "../types/patientType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/patient";

const patientService = {
  getAll: async (): Promise<PatientResponse[]> => {
    const res = await axiosClient.get<ResponseData<PatientResponse[]>>(BASE_URL);
    console.log(res)
    return res.data.data;
  },
  getCount: async (): Promise<number> => {
    const res = await axiosClient.get(`${BASE_URL}/count`);
    return res.data.data;
  }


};

export default patientService;
