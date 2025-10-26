import { ResponseData } from "@/types/api/apiType";
import axiosClient from "./axiosClient";
import { Blog } from "@/types/api/blogType";

const BASE_URL = "/blog";

const blogService = {
  getBlogs: async (): Promise<Blog[]> => {
    const res = await axiosClient.get<ResponseData<Blog[]>>(
      `${BASE_URL}/public`
    );
    return res.data.data;
  },
  getBlogById: async (id: number): Promise<Blog> => {
    const res = await axiosClient.get<ResponseData<Blog>>(`/blog/${id}`);
    return res.data.data;
  },
};

export default blogService;