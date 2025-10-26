import patientService from "@/services/patientApi";
import { PatientResponse } from "@/types/api/patientType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PatientState {
    data: PatientResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: PatientState = {
    data: null,
    loading: false,
    error: null
}

export const fetchPatientProfile = createAsyncThunk(
  "patient/fetchProfile",
  async () => {
    const res = await patientService.getProfile();
    return res;
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch pròile
      .addCase(fetchPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải thông tin bệnh nhân";
      });
  },
});

export default patientSlice.reducer;