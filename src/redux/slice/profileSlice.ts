import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mapService } from "../../services/profileServices";

// Định nghĩa kiểu dữ liệu cho user
export interface User {
  id?: number;
  username: string;
  email: string;
  avatar?: string;
  token?: string;
}

// Định nghĩa kiểu dữ liệu cho state của authSlice
interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

// **Tạo action loginUser (Đăng nhập)**
export const profileUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "profileUser",
  async (_, { rejectWithValue }) => {
    try {
      const response: User = await mapService.getUserInfo({});
      console.log({ response });
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred");
    }
  }
);


// **Tạo profileSlice**
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // **Xử lý loginUser**
      .addCase(profileUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;        //  window.location.href = `${window.location.origin}`
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
