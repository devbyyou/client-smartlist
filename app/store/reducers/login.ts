import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
import { getUserDataFromLocalStorage, setUserDataToLocalStorage } from '../../utils/user';

interface LoginState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
    name: string
  };
  userId: number
  //   pseudo: string;
  //   token: { token:string };
  errorLogin: null | string;
  //   isLoading: boolean;
}
const userData = getUserDataFromLocalStorage();

export const initialState: LoginState = {
  logged: false,
  //   pseudo: '',
  //   token: { token: '' },
  errorLogin: null,
  //   isLoading: false,
  credentials: {
    email: '',
    password: '',
    name: '',
  },
  userId: 0,
  ...userData,

};

export const login = createAppAsyncThunk(
  'login/LOGIN',
  async (_, thunkAPI) => {
    try {

      const state = thunkAPI.getState();
      const {
        email, password,
      } = state.login.credentials;
      const response = await axiosInstance.post('auth/login', {
        email,
        password,
      });

      setUserDataToLocalStorage(response.data); // Stocke les données après login

      // localStorage.setItem('user', JSON.stringify(response.data));

      return response.data as LoginResponse;
    } catch (error) {
      console.log('error catch', error);

    }
  },
);

export const changeCredentialsField = createAction<{
  value: string;
  field: keyof LoginState['credentials']
}>('login/CHANGE_CREDENTIALS_FIELD');

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        // state.errorLogin = action.payload;
        state.logged = action.payload.logged;
      }
      // state.pseudo = action.payload.pseudo;
      // state.token = action.payload.token;

      state.credentials.email = '';
      state.credentials.password = '';
      // state.isLoading = false;



    })
    .addCase(login.rejected, (state, action) => {
      // state.errorLogin = action.error.message;

      console.error(Error);
    })
});
export default loginReducer;
