import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mapService } from "../../services/videoServices";

// Định nghĩa kiểu dữ liệu cho videos
export interface Videos {
  id?: number;
  title: string;
  thumbnail: string;
  view?: number;
}

// Định nghĩa kiểu dữ liệu cho state của authSlice
interface VideosState {
  data: Videos[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: VideosState = {
  data: [],
  loading: false,
  error: null,
};
export const listVideo = createAsyncThunk(
    "listVideo",
    async (_, { rejectWithValue }) => {
      try {
        const response = await mapService.getListVideos();
        return response; // Trả về Videos[]
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "An error occurred"
        );
      }
    }
  );
// **Tạo profileSlice**
const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **Xử lý loginUser**
      .addCase(listVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listVideo.fulfilled, (state, action: PayloadAction<Videos[]>) => {
        state.loading = false;
        state.data = action.payload; //  window.location.href = `${window.location.origin}`
      })
      .addCase(listVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default videoSlice.reducer;
