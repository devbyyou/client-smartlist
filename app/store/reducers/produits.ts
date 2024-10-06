import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
// import { getUserDataFromLocalStorage } from '../../utils/user';

interface produitsState {
  isproduits: boolean;
  credentials: {
    id: any
    userId: any
    produits: [{
      image: string
      nom: string
    }]
  };
  //   pseudo: string;
  //   token: { token:string };
  errorLogin: undefined | null | string;
  //   isLoading: boolean;
}
// const userData = getUserDataFromLocalStorage();

export const initialState: produitsState = {
  isproduits: false,
  //   pseudo: '',
  //   token: { token: '' },
  errorLogin: null,
  //   isLoading: false,
  credentials: {
    id: 0,
    userId: 0,
    produits: [{
      image: '',
      nom: ''
    }]
  },
  //   ...userData,
};

export const postProduits = createAppAsyncThunk(
  'produits/PRODUITS',
  async ({
    userId,
    produitId,


  }: {
    userId: any;

    produitId: any;
  }, thunkAPI) => {
    try {

      const response = await axiosInstance.post('produits/add-to-list', {
        userId,
        produitId,
      });

      // localStorage.setItem('user', JSON.stringify(data));
      return response.data;
      // as LoginResponse
    } catch {
      throw new Error
    }
  },
);

export const getProduits = createAppAsyncThunk(
  'getProduits/GET_PRODUITS',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('produits');
      return response.data;
    } catch {
      throw new Error
    }
  },
);

export const changeCredentialsField = createAction<{
  value: string;
  field: keyof produitsState['credentials']
}>('produits/CHANGE_CREDENTIALS_FIELD');

const produitsReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCredentialsField, (state, action) => {
    const { field, value } = action.payload;
    state.credentials[field] = value;
  }).addCase(postProduits.fulfilled, (state, action) => {
    // state.logged = action.payload.logged;
    // state.pseudo = action.payload.pseudo;
    // state.token = action.payload.token;
    // state.credentials.email = '';
    // state.credentials.password = '';
    // state.credentials.name = '';
    // state.isLoading = false;
    // state.errorLogin = action.payload.error;
    // state.errorLogin = action.payload.error;
    // if (!action.payload.error) {
    //     state.isproduits = true;
    // }

  }).addCase(getProduits.fulfilled, (state, action) => {
    // state.logged = action.payload.logged;
    // state.pseudo = action.payload.pseudo;
    // state.token = action.payload.token;
    // state.credentials.email = '';
    // state.credentials.password = '';
    // state.credentials.name = '';
    // state.isLoading = false;
    // state.errorLogin = action.payload.error;
    state.credentials.produits = action.payload;


    // state.errorLogin = action.payload.error;
    // if (!action.payload.error) {
    //     state.isproduits = true;
    // }

  }).addCase(postProduits.rejected, (state, action) => {
    // state.errorLogin = action.error.message;
    // state.errorLogin = action.error.message;
    console.error('error prodiot POST---->', Error, 'le msg >>', action.error.message);
  })
});
export default produitsReducer;
