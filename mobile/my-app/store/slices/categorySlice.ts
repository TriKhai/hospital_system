import categoryService from "@/services/categoryApi";
import { CategoryReponse, CategoryRequest } from "@/types/api/categoryType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  data: CategoryReponse[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const data = await categoryService.getAll();
    return data;
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (payload: CategoryRequest) => {
    const data = await categoryService.create(payload);
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }: { id: number; data: CategoryRequest }) => {
    const updated = await categoryService.update(id, data);
    return updated;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number) => {
    await categoryService.delete(id);
    return id;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.data = [...action.payload].reverse();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải dữ liệu";
      })

      // ADD
      .addCase(createCategory.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]; // thêm ở đầu
      })

      // UPDATE
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.data.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;