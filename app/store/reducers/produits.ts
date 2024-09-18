/* eslint-disable no-console */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';

export const fetchApi = createAsyncThunk('api/fetchApi', async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initialState = {
  coaches: [],
  loading: false,
  error: null,
};

const produitsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchApi.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchApi.fulfilled, (state, action) => {
      state.loading = false;
      state.coaches = action.payload;
    })
    .addCase(fetchApi.rejected, (state) => {
      state.loading = false;
    });
});

export default produitsReducer;
