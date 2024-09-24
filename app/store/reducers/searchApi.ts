/* eslint-disable no-console */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { createAppAsyncThunk } from '@/app/utils/redux';

interface SearchApiState {
    dataApi: any
    loading: any,
    error: any,
};

export const initialState: SearchApiState = {
    dataApi: [{
        generic_name: ''
    }],
    loading: false,
    error: null,
};

export const searchApi = createAppAsyncThunk(
    'searchApi/SEARCH',
    async ({
        stateInput,
    }: {
        stateInput: any;
    }, thunkAPI) => {
        try {
            // const state = thunkAPI.getState();
            // const {
            //     dataApi,
            // } = state.searchApi;
            // console.log('stateInput --------->', stateInput);
            const response = await axiosInstance.get(`search?search_terms=${stateInput}&json=true`
                // ,
                // { dataApi }
            );
            // console.log('response ------->', response.data);
            // localStorage.setItem('user', JSON.stringify(data));
            return response.data;
            // as LoginResponse
        } catch (error) {
            console.log('log error l33 searchAPI.ts', error);
        }
    },
);

const searchApiReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(searchApi.pending, (state) => {
            // state.loading = true;
            // state.error = null;
        })
        .addCase(searchApi.fulfilled, (state, action) => {
            // state.loading = false;
            state.dataApi = action.payload;
            console.log("searchApiReducer action.payload  -------->l48  ", action.payload);
        })
        .addCase(searchApi.rejected, (state) => {
            // state.loading = false;
        });
});

export default searchApiReducer;
