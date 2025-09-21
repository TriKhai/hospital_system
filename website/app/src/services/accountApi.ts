import axiosClient from "../config/axios";
import type { AccountResponse } from "../types/accountType";

import type { ResponseData } from "../types/resType";

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
