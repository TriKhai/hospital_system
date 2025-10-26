import medicineService from "@/services/drugApi";
import { DrugResponse } from "@/types/api/medicineType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MedicineState {
  data: DrugResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: MedicineState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDrugs = createAsyncThunk(
  "drug/fetchDrugs",
  async () => {
    const data = await medicineService.getAll();
    return data;
  }
);

export const createDrug = createAsyncThunk(
  "drug/createDrug",
  async (payload: FormData) => {
    const department = await medicineService.create(payload);
    return department;
  }
);

export const updateDrug = createAsyncThunk(
  "drug/updateDrug",
  async ({ id, data }: { id: number; data: FormData }) => {
    const updated = await medicineService.update(id, data);
    return updated;
  }
);

export const deleteDrug = createAsyncThunk(
  "drug/deleteDrug",
  async (id: number) => {
    await medicineService.delete(id);
    return id;
  }
);

const drugSlice = createSlice({
  name: "drugs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchDrugs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrugs.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.data = [...action.payload].reverse();
      })
      .addCase(fetchDrugs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải thuốc";
      })

      // ADD
      .addCase(createDrug.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]; // thêm ở đầu
      })

      // UPDATE
      .addCase(updateDrug.fulfilled, (state, action) => {
        const index = state.data.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteDrug.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload);
      });
  },
});

export default drugSlice.reducer;