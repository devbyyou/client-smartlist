import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
// import { getUserDataFromLocalStorage } from '../../utils/user';

interface LoginState {
    logged: boolean;
  credentials: {
    email: string;
    password: string;
    name:string

  };
  //   pseudo: string;
  //   token: { token:string };
  errorLogin: undefined | null | string;
  //   isLoading: boolean;
}
// const userData = getUserDataFromLocalStorage();

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
  //   ...userData,
};

export const login = createAppAsyncThunk(
  'login/LOGIN',
  async (_, thunkAPI) => {
    try {

      const state = thunkAPI.getState();
      const {
        email, password,
      } = state.login.credentials;
      // console.log('test');
      const response = await axiosInstance.post('auth/login', {
        email,
        password,
      });
     

      // localStorage.setItem('user', JSON.stringify(data));

      return response.data;
      // as LoginResponse
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
      state.logged = action.payload.logged;
      // state.pseudo = action.payload.pseudo;
      // state.token = action.payload.token;
// console.log('action.payload.logged > ', action.payload.logged);

      state.credentials.email = '';
      state.credentials.password = '';
      // state.isLoading = false;

      state.errorLogin = action.payload.error;
})
  .addCase(login.rejected, (state, action) => {
    state.errorLogin = action.error.message;
    // console.log('login.rejected >',login.rejected);

    console.error(Error);
  })
});
export default loginReducer;
