import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import profileReducer from "./slice/profileSlice";
import videosReducer from "./slice/videoSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    videos : videosReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
