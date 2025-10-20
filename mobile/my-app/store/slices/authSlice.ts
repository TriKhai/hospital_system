import { LoginResponse } from "@/types/api/authType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
//   id: string;
//   name: string;
//   role: "patient" | "doctor" | "admin";
//   token: string;
// }

interface AuthState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
