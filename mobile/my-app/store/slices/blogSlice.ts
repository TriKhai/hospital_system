import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "@/services/blogApi";
import type { Blog } from "@/types/api/blogType";

interface BlogState {
  data: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    const blogs = await blogService.getBlogs();
    return blogs; // Blog[]
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải blogs";
      });
  },
});

export default blogSlice.reducer;
