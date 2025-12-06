import axiosClient from "../config/axios";
import type { PredictionResult } from "../types/aiType";
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

  
};

export default aiService;
