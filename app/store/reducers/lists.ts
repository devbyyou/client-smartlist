/* eslint-disable no-console */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
// import { User } from '../../@types/user';
import { createAppAsyncThunk } from '../../utils/redux';

interface ListsState {
  // user: User,
  credentials: {
    email: string;
    password: string;
    prenom:string;
    nom:string;
    tel:string;
    role:string;
    logo:string;
    banniere:string;
  };
}
const initialState: ListsState = {
  // user: {
  //   email: '',
  //   password: '',
  //   prenom: '',
  //   nom: '',
  //   tel: '',
  //   role: '',
  //   logo: '',
  //   created_at: '',
  //   date_creation: 0,
  //   last_activity: '',
  //   equipes: [],
  //   banniere: '',
  //   statut: '',
  //   updated_at: '',
  //   id: 0,
  //   session_id: null,
  // },
  credentials: {
    email: '',
    password: '',
    prenom: '',
    nom: '',
    tel: '',
    role: '',
    logo: '',
    banniere: '',

  },
};
export const updateList = createAppAsyncThunk(
  'list/UPDATE_LIST',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const userId = state.user.token.user.id;
    const {
      email, password, prenom,
      nom,
      tel,
      role,
      logo,
      banniere,
    } = state.lists.credentials;
    const { data } = await axiosInstance.put(`/coaches/${userId}`, {
      email,
      password,
      prenom,
      nom,
      tel,
      role,
      logo,
      banniere,
    });

    return data;
  },
);
export const updateCoacheBanniere = createAppAsyncThunk(
  'coaches/UPDATE_COACHE_BANNIERE',
  async ({ labanniere } : { labanniere:string }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user.token.user.id;
    const { data } = await axiosInstance.put(`/coaches/${userId}/banniere`, { labanniere });
    return data;
  },
);
export const updateCoacheLogo = createAppAsyncThunk(
  'coaches/UPDATE_COACHE_LOGO',
  async ({ lelogo } :{ lelogo:string }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user.token.user.id;
    const { data } = await axiosInstance.put(`/coaches/${userId}/logo`, { lelogo });
    return data;
  },
);
export const fetchCoaches = createAppAsyncThunk(
  'coaches/GET_COACHE',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const userId = state.user.token.user.id;

    const { data } = await axiosInstance.get(`/coaches/${userId}`);

    return data;
  },
);
export const changeCredentialsField = createAction<{
  field:keyof UserState['credentials'];
  value: string
}>('coaches/CHANGE_CREDENTIALS_FIELD');
const listsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateList.pending, () => {

    })
    .addCase(updateList.fulfilled, (state, action) => {
      // state.user = action.payload;
      alert('Mise à jour réussi');
      state.credentials = {
        email: '',
        password: '',
        prenom: '',
        nom: '',
        tel: '',
        role: '',
        logo: '',
        banniere: '',
      };
    })
    .addCase(updateList.rejected, () => {
      // state.error = action.error.message;
    })
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      // state.error = action.error.message;
      state.credentials[field] = value;
    })
    .addCase(fetchCoaches.fulfilled, (state, action) => {
      // state.user = action.payload;
      // state.user.nom = action.payload;
      // alert('Mise à jour réussi');
    })
    .addCase(updateCoacheBanniere.fulfilled, (state, action) => {
      // state.user = action.payload;
      // state.user.nom = action.payload;
      alert('Mise à jour réussi');
      state.credentials = {
        email: '',
        password: '',
        prenom: '',
        nom: '',
        tel: '',
        role: '',
        logo: '',
        banniere: '',
      };
    })
    .addCase(updateCoacheLogo.fulfilled, (state, action) => {
      // state.user = action.payload;
      // state.user.nom = action.payload;
      alert('Mise à jour réussi');
      state.credentials = {
        email: '',
        password: '',
        prenom: '',
        nom: '',
        tel: '',
        role: '',
        logo: '',
        banniere: '',
      };
    });
});

export default listsReducer;
