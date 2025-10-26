import doctorService from "@/services/doctorApi";
import { DoctorType } from "@/types/api/doctorType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DoctorAccountState {
  data: DoctorType[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorAccountState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDoctorAccounts = createAsyncThunk(
  "doctorAccount/fetchDoctorAccounts",
  async () => {
    const res = await doctorService.getAll();
    return res;
  }
);

const doctorAccountSlice = createSlice({
  name: "doctorAccounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDoctorAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Không thể tải danh sách tài khoản bác sĩ";
      });
  },
});

export default doctorAccountSlice.reducer;
