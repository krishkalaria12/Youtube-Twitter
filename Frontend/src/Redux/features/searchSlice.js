import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
    searchData: [],
    isLoading: false,
    isError: null,
};

// Thunk for searching searches
export const getAllsearchs = createAsyncThunk(
    "search/search",
    async ({ query, sortBy, sortType }, { rejectWithValue }) => {
        try {
            const response = axiosInstance.get("/video/", { params: { sortBy, sortType, query } });
            const res = await response;
            toast.promise(response, {
                loading: "Searching searches...",
                success: "Search results loaded successfully",
                error: "Failed to search searches",
            });
            return res.data.data.docs;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

// Reducer
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllsearchs.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllsearchs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchData = action.payload;
            })
            .addCase(getAllsearchs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            });
    },
});

export default searchSlice.reducer;
