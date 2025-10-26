import authService from "@/services/authApi";
import { LoginRequest, LoginResponse, Role } from "@/types/api/authType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { username: string; role: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      const res = await authService.login(data);

      // Lưu token
      await AsyncStorage.setItem("token", res.token);
      await AsyncStorage.setItem("role", res.role);
      await AsyncStorage.setItem("username", res.username);

      // const check = await AsyncStorage.getItem("token");
      // console.log("Đã lưu token, đọc lại được:", check);

      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.multiRemove(["token", "role", "username"]);
});

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const token = await AsyncStorage.getItem("token");
  const role = await AsyncStorage.getItem("role");
  const username = await AsyncStorage.getItem("username");

  if (token && role && username) {
    return { token, role, username };
  }
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = {
          username: action.payload.username,
          role: action.payload.role,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = {
            username: action.payload.username,
            role: action.payload.role,
          };
        } else {
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
        }
      });
  },
});

export default authSlice.reducer;
