import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mapService } from "../../services/videoServices";
import { Comment } from "../../components/Video/DetailVideo";

// Định nghĩa kiểu dữ liệu cho videos
export interface Videos {
  id?: number;
  title: string;
  thumbnail: string;
  view?: number;
}
export interface VideosDetail {
  id?: number;
  title: string;
  thumbnail: string;
  view?: number;
  url?: string;
  comments: Array<Comment>;
  likes:number
}
// Định nghĩa kiểu dữ liệu cho state của authSlice
interface VideosState {
  data: Videos[] | null;
  loading: boolean;
  error: string | null;
  activeRow: VideosDetail | object;
}

const initialState: VideosState = {
  data: [],
  loading: false,
  error: null,
  activeRow: {},
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
export const detailVideo = createAsyncThunk(
  "detailVideo",
  async (id: number, { rejectWithValue }) => {
    try {
      const response: VideosDetail = await mapService.getDetailVideos({ id });
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
  reducers: {
    // **Action reset
    reset: (state) => {
      state.data = [];
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // **Xử lý get list**
      .addCase(listVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listVideo.fulfilled,
        (state, action: PayloadAction<Videos[]>) => {
          state.loading = false;
          state.data = action.payload; //  window.location.href = `${window.location.origin}`
        }
      )
      .addCase(listVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // **Xử lý get detail video**
      .addCase(detailVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        detailVideo.fulfilled,
        (state, action: PayloadAction<VideosDetail>) => {
          state.loading = false;
          state.activeRow = action.payload; //  window.location.href = `${window.location.origin}`
        }
      )
      .addCase(detailVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { reset } = videoSlice.actions;
export default videoSlice.reducer;
