import accountService from "@/services/accountApi";
import patientService from "@/services/patientApi";
import { AccountResponse } from "@/types/api/accountType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AccountState {
    data: AccountResponse[];
    loading: boolean;
    error: string | null;
}

const initialState: AccountState = {
    data: [],
    loading: false,
    error: null
}

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async () => {
    const res = await accountService.getAll();
    return res;
  }
);

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể tải danh sách tài khoản";
      });
  },
});

export default accountSlice.reducer;