import patientService from "@/services/patientApi";
import { PatientResponse } from "@/types/api/patientType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PatientAccountState {
  data: PatientResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: PatientAccountState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPatientAccounts = createAsyncThunk(
  "patientAccount/fetchPatientAccounts",
  async () => {
    const res = await patientService.getAll();
    return res;
  }
);

const patientAccountSlice = createSlice({
  name: "patientAccounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatientAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Không thể tải danh sách tài khoản bệnh nhân";
      });
  },
});

export default patientAccountSlice.reducer;
