import drugTypeService from "@/services/typeMedicineApi";
import { DrugTypeRequest, DrugTypeResponse } from "@/types/api/medicineType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DrugTypeState {
  data: DrugTypeResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: DrugTypeState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDrugTypes = createAsyncThunk(
  "drugType/fetchDrugTypes",
  async () => {
    const data = await drugTypeService.getAll();
    return data;
  }
);

export const createDrugType = createAsyncThunk(
  "drugType/createDrugType",
  async (payload: DrugTypeRequest) => {
    const data = await drugTypeService.create(payload);
    return data;
  }
);

export const updateDrugType = createAsyncThunk(
  "drugType/updateDrugType",
  async ({ id, data }: { id: number; data: DrugTypeRequest }) => {
    const updated = await drugTypeService.update(id, data);
    return updated;
  }
);

export const deleteDrugType = createAsyncThunk(
  "drugType/deleteDrugType",
  async (id: number) => {
    await drugTypeService.delete(id);
    return id;
  }
);

const drugTypeSlice = createSlice({
  name: "drugTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchDrugTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrugTypes.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.data = [...action.payload].reverse();
      })
      .addCase(fetchDrugTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải loại thuốc";
      })

      // ADD
      .addCase(createDrugType.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]; // thêm ở đầu
      })

      // UPDATE
      .addCase(updateDrugType.fulfilled, (state, action) => {
        const index = state.data.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteDrugType.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload);
      });
  },
});

export default drugTypeSlice.reducer;