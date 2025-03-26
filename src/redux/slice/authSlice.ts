import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Thay bằng API thực tế của bạn

// Định nghĩa kiểu dữ liệu cho user
interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  token?: string;
}

// Định nghĩa kiểu dữ liệu cho state của authSlice
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// **Tạo action registerUser (Đăng ký)**
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đăng ký thất bại");
    }
  }
);

// **Tạo action loginUser (Đăng nhập)**
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      console.log({ response });
      return response.data; // Giả sử API trả về { user, token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đăng nhập thất bại");
    }
  }
);

// **Tạo authSlice**
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // **Action logout (Đăng xuất)**
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Xóa token khỏi localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // **Xử lý registerUser**
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // **Xử lý loginUser**
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token || null;
        localStorage.setItem("token", action.payload.token || ""); // Lưu token vào localStorage
        //  window.location.href = `${window.location.origin}`
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
