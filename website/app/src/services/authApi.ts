import axiosClient from "../config/axios";
import type { LoginForm, RegisterForm, RegisterResponse, TokenResponse } from "../types/authType";
import type { ResponseData } from "../types/resType";


export async function loginApi(
  data: LoginForm
): Promise<TokenResponse | null> {
  try {
    const res = await axiosClient.post<ResponseData<TokenResponse>>(
      "auth/login",
      data
    );

    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (err) {
    console.error("Login API error:", err);
    return null;
  }
}

export async function registerApi(
  data: RegisterForm
): Promise<RegisterResponse | null> {
  try {
    const res = await axiosClient.post<ResponseData<RegisterResponse>>(
      "auth/register",
      data
    );

    console.log(res)
    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (err) {
    console.error("Login API error:", err);
    return null;
  }
}
