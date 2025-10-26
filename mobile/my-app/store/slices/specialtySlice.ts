import specialtyService from "@/services/specialtyApi";
import { SpecialtyRequest, SpecialtyResponse } from "@/types/api/specialtyType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SpecialtyState {
  data: SpecialtyResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: SpecialtyState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSpecialties = createAsyncThunk(
  "specialty/fetchSpecialties",
  async () => {
    const departments = await specialtyService.getAll();
    return departments;
  }
);

export const createSpecialty = createAsyncThunk(
  "specialty/createSpecialty",
  async (payload: SpecialtyRequest) => {
    const department = await specialtyService.create(payload);
    return department;
  }
);

export const updateSpecialty = createAsyncThunk(
  "specialty/updateSpecialty",
  async ({ id, data }: { id: number; data: SpecialtyRequest }) => {
    const updated = await specialtyService.update(id, data);
    return updated;
  }
);

export const deleteSpecialty = createAsyncThunk(
  "specialty/deleteSpecialty",
  async (id: number) => {
    await specialtyService.delete(id);
    return id;
  }
);

const specialtySlice = createSlice({
  name: "specialties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.data = [...action.payload].reverse();
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải specialties";
      })

      // ADD
      .addCase(createSpecialty.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]; // thêm ở đầu
      })

      // UPDATE
      .addCase(updateSpecialty.fulfilled, (state, action) => {
        const index = state.data.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteSpecialty.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload);
      });
  },
});

export default specialtySlice.reducer;
