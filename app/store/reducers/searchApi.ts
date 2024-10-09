/* eslint-disable no-console */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { createAppAsyncThunk } from '@/app/utils/redux';

interface SearchApiState {
    dataApi: any[]
    dataApiByCat: [{
        product_name: string
        image_url: string
        _id: string
    }]
    loading: any,
    error: any,
    isClicked: boolean,
};

export const initialState: SearchApiState = {
    dataApi: [{
        generic_name: ''
    }],
    loading: false,
    error: null,
    dataApiByCat: [{
        product_name: '',
        image_url: '',
        _id: ''
    }],
    isClicked: false
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
            const response = await axiosInstance.get(`search?search_terms=${stateInput}&json=true`
                // ,
                // { dataApi }
            );
            // localStorage.setItem('user', JSON.stringify(data));
            return response.data;
            // as LoginResponse
        } catch (error) {
            console.log('log error l33 searchAPI.ts', error);
        }
    },
);
export const searchByCategories = createAppAsyncThunk(
    'searchApi/SEARCH_BY_CATEGORY',
    async ({
        categoryId,
    }: {
        categoryId: any;
    }, thunkAPI) => {
        try {
            // const state = thunkAPI.getState();
            // const {
            //     dataApi,
            // } = state.searchApi;
            const response = await axiosInstance.get(`search/by-category?categoryId=${categoryId}`
                // ,
                // { dataApi }
            );
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
        })
        .addCase(searchByCategories.fulfilled, (state, action) => {



            state.loading = false;
            // console.log('action ----->', action.payload);

            state.dataApiByCat = action.payload;
            // state.loading = true;
        }).addCase(searchByCategories.pending, (state) => {
            // state.loading = false;
            state.loading = true;
            // state.error = null;
        })
        .addCase(searchByCategories.rejected, (state) => {
            state.loading = true;
        })
        .addCase(searchApi.rejected, (state) => {
            // state.loading = false;
        });
});

export default searchApiReducer;
