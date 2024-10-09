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
  clickedCards: {
    [key: string]: boolean; 
  };
}

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
  clickedCards: {}
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
export const toggleCardClick = createAction<any>('produits/TOGGLE_CARD_CLICKED');

const produitsReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCredentialsField, (state, action) => {
    const { field, value } = action.payload;
    state.credentials[field] = value;
  })
    .addCase(toggleCardClick, (state, action) => {
      const cardId = action.payload
      state.clickedCards[cardId] = !state.clickedCards[cardId];

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
      // state.isClicked = !state.isClicked;

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
