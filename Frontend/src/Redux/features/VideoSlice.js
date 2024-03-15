import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
    videosData: [],
    loading: false,
    error: null,
};

export const getAllVideos = createAsyncThunk("video/getAll", async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get("/video");
        const res = await response
        toast.promise(response, {
            loading: "Loading videos data...",
            success: "Videos loaded successfully",
            error: "Failed to get videos",
        });
        return res.data.data.docs;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

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
    },
});

export default videoSlice.reducer;
