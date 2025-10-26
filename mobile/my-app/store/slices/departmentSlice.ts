import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DepartmentRequest, DepartmentResponse } from "@/types/api/departmentType";
import departmentService from "@/services/departmentApi";

interface DepartmentState {
  data: DepartmentResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDepartments = createAsyncThunk(
  "department/fetchDepartments",
  async () => {
    const departments = await departmentService.getAll();
    return departments;
  }
);

export const createDepartment = createAsyncThunk(
  "department/createDepartment",
  async (payload: DepartmentRequest) => {
    const department = await departmentService.create(payload);
    return department;
  }
);

export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async ({ id, data }: { id: number; data: DepartmentRequest }) => {
    const updated = await departmentService.update(id, data);
    return updated;
  }
);

export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (id: number) => {
    await departmentService.delete(id);
    return id;
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
         state.data = [...action.payload].reverse();
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải departments";
      })

      // ADD  
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]; // thêm ở đầu
      })

      // UPDATE
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (d) => d.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload);
      });
  },
});

export default departmentSlice.reducer;
