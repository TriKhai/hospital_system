import manufacturerService from "@/services/manufacturerApi";
import { ManufacturerRequest, ManufacturerResponse } from "@/types/api/medicineType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Manufacturer {
  data: ManufacturerResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: Manufacturer = {
  data: [],
  loading: false,
  error: null,
};

export const fetchManufacturers = createAsyncThunk(
  "manufacturer/fetchManufacturers",
  async () => {
    const data = await manufacturerService.getAll();
    return data;
  }
);

export const createManufacturer = createAsyncThunk(
  "manufacturer/createManufacturer",
  async (payload: ManufacturerRequest) => {
    const data = await manufacturerService.create(payload);
    return data;
  }
);

export const updateManufacturer = createAsyncThunk(
  "manufacturer/updateManufacturer",
  async ({ id, data }: { id: number; data: ManufacturerRequest }) => {
    const updated = await manufacturerService.update(id, data);
    return updated;
  }
);

export const deleteManufacturer = createAsyncThunk(
  "manufacturer/deleteManufacturer",
  async (id: number) => {
    await manufacturerService.delete(id);
    return id;
  }
);

const manufacturerSlice = createSlice({
  name: "manufacturers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchManufacturers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.data = [...action.payload].reverse();
      })
      .addCase(fetchManufacturers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải hãng sản xuất";
      })

      // ADD
      .addCase(createManufacturer.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]; // thêm ở đầu
      })

      // UPDATE
      .addCase(updateManufacturer.fulfilled, (state, action) => {
        const index = state.data.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteManufacturer.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload);
      });
  },
});

export default manufacturerSlice.reducer;