import axiosClient from "../config/axios";
import type {
  LoginForm,
  RegisterForm,
  RegisterResponse,
  TokenResponse,
} from "../types/authType";
import type {
  AccountDoctorRequest,
  AccountDoctorResponse,
} from "../types/doctorType";
import type { ResponseData } from "../types/resType";

export async function loginApi(data: LoginForm): Promise<TokenResponse | null> {
  try {
    const res = await axiosClient.post<ResponseData<TokenResponse>>(
      "auth/login",
      data
    );

    if (res.data.success) {
      console.log(res.data);
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

    console.log(res);
    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (err) {
    console.error("Login API error:", err);
    return null;
  }
}

// register bác sĩ

export type FormValue = string | number | boolean | File | null | undefined;

// generic cho phép truyền bất kỳ object nào có key string
export function buildFormData<T extends Record<string, FormValue>>(data: T): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
}


export async function registerDoctor(
  data: AccountDoctorRequest
): Promise<AccountDoctorResponse | null> {
  try {
    const formData = buildFormData(data); // giờ type-safe cho AccountDoctorRequest

    const res = await axiosClient.post<ResponseData<AccountDoctorResponse>>(
      "auth/register-doctor",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (err) {
    console.error("Register Doctor API error:", err);
    return null;
  }
}
