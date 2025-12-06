import axiosClient from "../config/axios";
import type { Blog, BlogFormRequest } from "../types/blogType";
import type { ResponseData } from "../types/resType";

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
  getBlogByDoctor: async (): Promise<Blog[]> => {
    const res = await axiosClient.get<ResponseData<Blog[]>>(`${BASE_URL}/doctor`);
    return res.data.data;
  },
  createBlogByDoctor: async (form: BlogFormRequest): Promise<Blog> => {
    const res = await axiosClient.post<ResponseData<Blog>>(`${BASE_URL}/doctor`, form);
    return res.data.data;
  },
};

export default blogService;