import { LoginRequest, LoginResponse } from "@/types/api/authType";
import axiosClient from "./axiosClient";
import { ResponseData } from "@/types/api/apiType";

const BASE_URL = "/auth";

const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await axiosClient.post<ResponseData<LoginResponse>>(
      `${BASE_URL}/login`,
      data
    );
    console.log(res.data);
    return res.data.data;
  },
};

export default authService;