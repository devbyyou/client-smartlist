import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
import { decodeToken, getUserDataFromLocalStorage } from '@/app/utils/user';
// import { getUserDataFromLocalStorage } from '../../utils/user';

interface categorieState {
  categorie: [{
    image: string
    nom: string
    id: string;
  }]
}

export const initialState: categorieState = {
  categorie: [{
    image: '',
    nom: '',
    id: ''
  }]
};


export const getCategorie = createAppAsyncThunk(
  'categorie/LIST_DE_CATEGORIE',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`categorie`);
      return response.data;
    } catch {
      throw new Error
    }
  },
);


const categorieReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCategorie.fulfilled, (state, action) => {
    // state.logged = action.payload.logged;
    // state.pseudo = action.payload.pseudo;
    // state.token = action.payload.token;
    // state.credentials.email = '';
    // state.credentials.password = '';
    // state.credentials.name = '';
    // state.isLoading = false;
    // state.errorLogin = action.payload.error;
    state.categorie = action.payload;
    // state.errorLogin = action.payload.error;
    // if (!action.payload.error) {
    //     state.isproduits = true;
    // }

  })
});
export default categorieReducer;
