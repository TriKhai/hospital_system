import { AccountResponse } from "@/types/api/accountType";
import { ResponseData } from "@/types/api/apiType";
import axiosClient from "./axiosClient";

const BASE_URL = "/account";

const accountService = {
  getAll: async (): Promise<AccountResponse[]> => {
    const res = await axiosClient.get<ResponseData<AccountResponse[]>>(BASE_URL);
    return res.data.data;
  },
  getCount: async (): Promise<number> => {
    const res = await axiosClient.get(`${BASE_URL}/count`);
    return res.data.data;
  }

};

export default accountService;
