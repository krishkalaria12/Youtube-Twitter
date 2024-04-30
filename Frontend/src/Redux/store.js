import { configureStore } from "@reduxjs/toolkit";
import VideoSlice from "./features/VideoSlice";
import searchSlice from "./features/searchSlice";

const store = configureStore({
    reducer: {
        video: VideoSlice,
        search: searchSlice,
    },
});

export default store;
