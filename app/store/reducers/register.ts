import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
// import { getUserDataFromLocalStorage } from '../../utils/user';

interface RegisterState {
    isRegister: boolean;
    credentials: {
        email: string;
        password: string;
        name: string

    };
    //   pseudo: string;
    //   token: { token:string };
    errorLogin: undefined | null | string;
    //   isLoading: boolean;
}
// const userData = getUserDataFromLocalStorage();

export const initialState: RegisterState = {
    isRegister: false,
    //   pseudo: '',
    //   token: { token: '' },
    errorLogin: null,
    //   isLoading: false,
    credentials: {
        email: '',
        password: '',
        name: '',

    },
    //   ...userData,
};

export const register = createAppAsyncThunk(
    'register/RESGISTER',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const {
                email, password, name,
            } = state.register.credentials;
            const response = await axiosInstance.post('auth/register', {
                email,
                password,
                name,
            });

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
    field: keyof RegisterState['credentials']
}>('register/CHANGE_CREDENTIALS_FIELD');

const registerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCredentialsField, (state, action) => {
            const { field, value } = action.payload;
            state.credentials[field] = value;
        })
        .addCase(register.fulfilled, (state, action) => {
            // state.logged = action.payload.logged;
            // state.pseudo = action.payload.pseudo;
            // state.token = action.payload.token;
            state.credentials.email = '';
            state.credentials.password = '';
            state.credentials.name = '';
            // state.isLoading = false;
            // state.errorLogin = action.payload.error;

            state.errorLogin = action.payload.error;
            if (!action.payload.error) {
                state.isRegister = true;
            }

        })
        .addCase(register.rejected, (state, action) => {
            state.errorLogin = action.error.message;
            // state.errorLogin = action.error.message;
            // console.log('register.rejected >',register.rejected);
            console.error(Error);
        })
});
export default registerReducer;
