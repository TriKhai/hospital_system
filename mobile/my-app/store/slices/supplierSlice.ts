import supplierService from "@/services/supplierApi";
import { SupplierRequest, SupplierResponse } from "@/types/api/medicineType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SupplierState {
  data: SupplierResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSuppliers = createAsyncThunk(
  "supplier/fetchSuppliers",
  async () => {
    const data = await supplierService.getAll();
    return data;
  }
);

export const createSupplier = createAsyncThunk(
  "supplier/createSupplier",
  async (payload: SupplierRequest) => {
    const data = await supplierService.create(payload);
    return data;
  }
);

export const updateSupplier = createAsyncThunk(
  "supplier/updateSupplier",
  async ({ id, data }: { id: number; data: SupplierRequest }) => {
    const updated = await supplierService.update(id, data);
    return updated;
  }
);

export const deleteSupplier = createAsyncThunk(
  "supplier/deleteSupplier",
  async (id: number) => {
    await supplierService.delete(id);
    return id;
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.data = [...action.payload].reverse();
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải nhà cung cấp";
      })

      // ADD
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]; // thêm ở đầu
      })

      // UPDATE
      .addCase(updateSupplier.fulfilled, (state, action) => {
        const index = state.data.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload);
      });
  },
});

export default supplierSlice.reducer;