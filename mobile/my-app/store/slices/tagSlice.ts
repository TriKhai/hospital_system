import tagService from "@/services/tagApi";
import { TagResponse } from "@/types/api/tagType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TagState {
  data: TagResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTags = createAsyncThunk("tag/fetchTags", async () => {
  const data = await tagService.getAll();
  return data;
});

// export const createSupplier = createAsyncThunk(
//   "supplier/createSupplier",
//   async (payload: SupplierRequest) => {
//     const data = await supplierService.create(payload);
//     return data;
//   }
// );

// export const updateSupplier = createAsyncThunk(
//   "supplier/updateSupplier",
//   async ({ id, data }: { id: number; data: SupplierRequest }) => {
//     const updated = await supplierService.update(id, data);
//     return updated;
//   }
// );

// export const deleteSupplier = createAsyncThunk(
//   "supplier/deleteSupplier",
//   async (id: number) => {
//     await supplierService.delete(id);
//     return id;
//   }
// );

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.data = [...action.payload].reverse();
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải dữ liệu";
      });

    //   // ADD
    //   .addCase(createSupplier.fulfilled, (state, action) => {
    //     state.data = [action.payload, ...state.data]; // thêm ở đầu
    //   })

    //   // UPDATE
    //   .addCase(updateSupplier.fulfilled, (state, action) => {
    //     const index = state.data.findIndex((d) => d.id === action.payload.id);
    //     if (index !== -1) {
    //       state.data[index] = action.payload;
    //     }
    //   })

    //   // DELETE
    //   .addCase(deleteSupplier.fulfilled, (state, action) => {
    //     state.data = state.data.filter((d) => d.id !== action.payload);
    //   });
  },
});

export default tagSlice.reducer;
