import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
    videosData: [],
    loading: false,
    error: null,
    selectedVideo: null,
};

export const getAllVideos = createAsyncThunk("video/getAll", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("/video");
        return res.data.data.docs;
    } catch (error) {
        console.log(error);
        console.log(error.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const getVideoById = createAsyncThunk(
    "video/getById",
    async (videoId, { rejectWithValue, dispatch }) => {
        try {
            const response = axiosInstance.get(`/video/v/${videoId}`);
            const res = await response;
            toast.promise(response, {
                loading: "Loading video data...",
                success: "Video loaded successfully",
                error: "Failed to get video",
            });
            
            // Dispatch getAllVideos directly here
            const allVideosResponse = await dispatch(getAllVideos());
            
            return { video: res.data.data[0], allVideos: allVideosResponse.payload };
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

// Reducer
const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videosData = action.payload;
            })
            .addCase(getAllVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getVideoById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedVideo = action.payload;
            })
            .addCase(getVideoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default videoSlice.reducer;
