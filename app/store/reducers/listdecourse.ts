import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
import { decodeToken, getUserDataFromLocalStorage } from '../..//utils/user';
// import { getUserDataFromLocalStorage } from '../../utils/user';

interface ListDeCourseState {
    isproduits: boolean;
    credentials: {
        id: any
        userId: any
        produits: any[]
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
        produits: []
    },
    //   ...userData,
};


export const listDecourse = createAppAsyncThunk(
    'listDecourse/LIST_DE_COURSE',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const userData = getUserDataFromLocalStorage();
            if (!userData || !userData.access_token) {
                throw new Error('Utilisateur non authentifié');
            }
            const decodedToken = decodeToken(userData.access_token);
            const userId = decodedToken.sub;
            // const userId = 1; 
            const response = await axiosInstance.get(`listes-de-courses/${userId}`);

            // localStorage.setItem('user', JSON.stringify(data));
            return response.data;
            // as LoginResponse
        } catch {
            throw new Error
        }
    },
);
export const removeListDeCourse = createAppAsyncThunk(
    'listDecourse/REMOVE_LIST_DE_COURSE',
    async ({
        listDeCourseId,
        id,
    }: {
        id: string;
        listDeCourseId: string;
    }, thunkAPI) => {
        try {


            const response = await axiosInstance.delete(`listes-de-courses/${id}/${listDeCourseId}`);
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
            state.credentials.produits = action.payload.produits;
            // state.errorLogin = action.payload.error;
            // if (!action.payload.error) {
            //     state.isproduits = true;
            // }

        })
        .addCase(removeListDeCourse.fulfilled, (state, action) => {
            // state.logged = action.payload.logged;
            // state.pseudo = action.payload.pseudo;
            // state.token = action.payload.token;
            // state.credentials.email = '';
            // state.credentials.password = '';
            // state.credentials.name = '';
            // state.isLoading = false;
            // state.errorLogin = action.payload.error;
            state.credentials.produits = action.payload.produits;
            // state.errorLogin = action.payload.error;
            // if (!action.payload.error) {
            //     state.isproduits = true;
            // }

        }).addCase(listDecourse.rejected, (state, action) => {
            // state.errorLogin = action.error.message;
            // state.errorLogin = action.error.message;
            console.error('error prodiot POST---->', Error, 'le msg >>', action.error.message);
        })
});
export default listDecourseReducer;
