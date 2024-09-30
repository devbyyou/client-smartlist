import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
// import { getUserDataFromLocalStorage } from '../../utils/user';

interface ListDeCourseState {
    isproduits: boolean;
    credentials: {
        id: any
        userId: any
        produits: [{
            nom: string
            image: string
        }]
    };
    //   pseudo: string;
    //   token: { token:string };
    errorLogin: undefined | null | string;
    //   isLoading: boolean;
}
// const userData = getUserDataFromLocalStorage();

export const initialState: ListDeCourseState = {
    isproduits: false,
    //   pseudo: '',
    //   token: { token: '' },
    errorLogin: null,
    //   isLoading: false,
    credentials: {
        id: 0,
        userId: 0,
        produits: [{
            nom: '',
            image: ''
        }]
    },
    //   ...userData,
};


export const listDecourse = createAppAsyncThunk(
    'listDecourse/LIST_DE_COURSE',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            // const {
            //     userId            
            // } = state.listDecourse.credentials;
            const userId = 1;
            const response = await axiosInstance.get(`listes-de-courses/${userId}`);

            // localStorage.setItem('user', JSON.stringify(data));
            return response.data;
            // as LoginResponse
        } catch {
            throw new Error
        }
    },
);

export const changeCredentialsField = createAction<{
    value: string;
    field: keyof ListDeCourseState['credentials']
}>('listDecourse/CHANGE_CREDENTIALS_FIELD');

const listDecourseReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCredentialsField, (state, action) => {
            const { field, value } = action.payload;
            state.credentials[field] = value;
        })
        .addCase(listDecourse.fulfilled, (state, action) => {
            // state.logged = action.payload.logged;
            // state.pseudo = action.payload.pseudo;
            // state.token = action.payload.token;
            // state.credentials.email = '';
            // state.credentials.password = '';
            // state.credentials.name = '';
            // state.isLoading = false;
            // state.errorLogin = action.payload.error;
            console.log('action.payload >>>>>', action.payload);
            state.credentials = action.payload
            // state.errorLogin = action.payload.error;
            // if (!action.payload.error) {
            //     state.isproduits = true;
            // }

        })
        .addCase(listDecourse.rejected, (state, action) => {
            // state.errorLogin = action.error.message;
            // state.errorLogin = action.error.message;
            // console.log('listDecourse.rejected >', listDecourse.rejected);
            console.error('error prodiot POST---->', Error, 'le msg >>', action.error.message);
        })
});
export default listDecourseReducer;
