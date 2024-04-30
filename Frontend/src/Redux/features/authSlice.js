import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helper/axiosInstance';
import CheckTokenExpiration  from '../../Hooks/TokenExpiration'; // Adjust path as per your project structure
import { useDispatch } from 'react-redux';

// Initial authentication status based on token expiration

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('users/login', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    let res = await axiosInstance.post("/users/logout");
    return res?.data;
  } catch (error) {
    toast.error(error.message);
    return rejectWithValue(error.response.data); // Adjust error handling
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const response = await axiosInstance.post('users/refresh-token');
  return response.data.accessToken;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    status: 'idle',
    error: null,
    isAuthenticated: false, // Initialize as false, will be updated by useTokenExpiration hook
  },
  reducers: {},
  extraReducers: (builder) => {
    builder 
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken = action.payload.data.refreshToken;
      state.status = 'succeeded';
      // Store tokens in local storage
      localStorage.setItem('accessToken', action.payload.data.accessToken);
      localStorage.setItem('refreshToken', action.payload.data.refreshToken);
    })
    .addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
      state.isAuthenticated = false;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.isAuthenticated = false;
      // Clear tokens from local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    })
    .addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      // Update access token in local storage
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    })
  },
});

export default authSlice.reducer;

