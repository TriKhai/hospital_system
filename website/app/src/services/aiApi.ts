import axiosClient from "../config/axios";
import type { GradcamResult, PredictionResult } from "../types/aiType";
import type { ResponseData } from "../types/resType";

const BASE_URL = "/ai-pneumonia";

const aiService = {
  predict: async (file: File): Promise<PredictionResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post<ResponseData<PredictionResult>>(BASE_URL + "/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.data; // PredictionResult
  },

  gradcam: async (
    file: File
  ): Promise<GradcamResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post<
      ResponseData<GradcamResult>
    >(BASE_URL + "/gradcam", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.data;
    console.log(res.data.data)
  },
  
};

export default aiService;
