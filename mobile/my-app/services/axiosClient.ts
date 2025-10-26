import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Đặt URL backend — bạn có thể tạo file .env giống web
const API_URL = process.env.EXPO_PUBLIC_API_URL; // Expo dùng prefix EXPO_PUBLIC_

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

// Request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Token: ", token)

    // Debug log
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      // data: config.data,
    });

    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    const fullUrl = `${response.config.baseURL ?? ""}${response.config.url ?? ""}`;
    console.log("[Axios Response]", {
      url: fullUrl,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    // Nếu không có phản hồi (network error)
    if (!error.response) {
      console.log("[Axios Network Error]:", error.message);
    } else {
      const fullUrl = `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`;
      console.log("[Axios Response Error]", {
        url: fullUrl,
        status: error.response?.status,
        data: error.response?.data,
      });

      // Xử lý token hết hạn
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem("token");
        console.log("Token hết hạn - cần logout");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
