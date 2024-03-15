import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import VideoSlice from "./features/VideoSlice";
import searchSlice from "./features/searchSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        video: VideoSlice,
        search: searchSlice,
    },
});

export default store;
