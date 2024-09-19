import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import {
  // Equipe, Joueur, 
  LoginResponse,
  //  User,
} from '../../@types/user';
// import { getUserDataFromLocalStorage } from '../../utils/user';

interface UserState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
  };
  pseudo: string;
  token: {
    token:string,
    // user: User,
    // joueur:Joueur
  };
  errorLogin: string | null;
  isLoading: boolean;
  // filteredEquipes: Equipe[];
}
// const userData = getUserDataFromLocalStorage();

export const initialState: UserState = {
  logged: false,
  pseudo: '',
  token: {
    token: '',
    // user: {
    //   created_at: '',
    //   date_creation: 1,
    //   email: '',
    //   last_activity: '',
    //   equipes: [
    //     {
    //       id: 1,
    //       nom: '',
    //       logo: '',
    //       statut: '',
    //       categorie_id: 1,
    //       created_at: '',
    //       joueurs: [
    //         {
    //           id: 1,
    //           nom: '',
    //           prenom: '',
    //           email: '',
    //           derniere_activite: '',
    //           created_at: 0,
    //           categorie_id: 1,
    //           tel: 1,
    //           date_creation: '',
    //           equipe: [],
    //           statut: '',
    //           logo: '',
    //           role: '',
    //           age: 1,
    //           etat: '',
    //           equipe_id: 0,
    //           password: '',
    //           updated_at: 1,
    //         },
    //       ],
    //       seances: [],
    //       categories: {
    //         id: '1',
    //         nom: '',
    //         tranche_age: '',
    //         nombre_total: 0,
    //       },
    //       coaches_equipes: {
    //         created_at: '',
    //         updated_at: '',
    //         coach_id: 1,
    //         equipe_id: 1,
    //       },
    //     },
    //   ],
    //   nom: '',
    //   password: '',
    //   logo: '',
    //   prenom: '',
    //   banniere: '',
    //   role: '',
    //   statut: '',
    //   tel: '',
    //   updated_at: '',
    //   id: 0,
    //   session_id: null,
    // },
    // joueur: {
    //   age: 20,
    //   categorie_id: 3,
    //   created_at: '',
    //   derniere_activite: '',
    //   email: '',
    //   equipe_id: 44,
    //   id: 0,
    //   logo: '',
    //   nom: '',
    //   password: '',
    //   prenom: '',
    //   statut: '',
    //   tel: 1,
    //   updated_at: 0,
    //   date_creation: '',
    //   equipe: [],
    //   role: '',
    //   etat: '',
    // },
  },
  // filteredEquipes: [],
  errorLogin: null,
  isLoading: false,
  credentials: {
    email: 'jeandupont@exemple.com',
    password: 'motdepasse1',
  },
  // ...userData,
};

export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const { email, password } = state.user.credentials;
    const { data } = await axiosInstance.post('/login', {
      email,
      password,
    });

    // Pour sauvegarde mes informations, je transforme mon objet en chaine de caractère
    // Je stocke cette chaine de caractère dans le localStorage
    // localStorage.setItem('user', JSON.stringify(data));

    // Je type les données que je renvoie pour que le type soit transmis
    // dans la fonction de reducer
    return data as LoginResponse;
  },
);

export const changeCredentialsField = createAction<{
  value:string;
  field: keyof UserState['credentials']
}>('user/CHANGE_CREDENTIALS_FIELD');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.logged = action.payload.logged;
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;

      state.credentials.email = '';
      state.credentials.password = '';
      state.isLoading = false;
    });
});
export default userReducer;
