import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { decodeToken, getUserDataFromLocalStorage } from '@/app/utils/user';
// import {
// Equipe, Joueur, 
//   LoginResponse,
//  User,
// } from '../../@types/user';
// import { getUserDataFromLocalStorage } from '../../utils/user';

interface UserState {
    logged: boolean;
    credentials: {
        id: number
        email: string
        password: string
        name: string
        listesCourses: [{
            createdAt: '',
            id: number,
            produits: [{
                image: string
                nom: string
            }],
            updatedAt: '',
            userId: number,
        }]
    }
};

// const userData = getUserDataFromLocalStorage();

export const initialState: UserState = {
    logged: false,
    credentials: {
        id: 0,
        email: '',
        password: '',
        name: '',
        listesCourses: [{
            createdAt: '',
            id: 0,
            produits: [{
                image: '',
                nom: ''
            }],
            updatedAt: '',
            userId: 0
        }]
    },
    // ...userData,
};

export const getuser = createAppAsyncThunk(
    'user/GET_USER',
    async (_, thunkAPI) => {
        // On va aller récupérer depuis le state les credentials
        // Je récupère mon email et mon mot de passe
        const userData = getUserDataFromLocalStorage();
        if (!userData || !userData.access_token) {
            throw new Error('Utilisateur non authentifié');
        }
        const decodedToken = decodeToken(userData.access_token); // Décoder le token
        const id = decodedToken.sub;

        const { data } = await axiosInstance.get(`/utilisateur/${id}`);

        // Pour sauvegarde mes informations, je transforme mon objet en chaine de caractère
        // Je stocke cette chaine de caractère dans le localStorage
        // localStorage.setItem('user', JSON.stringify(data));
        // Je type les données que je renvoie pour que le type soit transmis
        // dans la fonction de reducer
        return data;
        // as LoginResponse;
    },
);

export const changeCredentialsField = createAction<{
    value: never;
    field: keyof UserState['credentials']
}>('user/CHANGE_CREDENTIALS_FIELD');

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCredentialsField, (state, action) => {
            const { field, value } = action.payload;
            state.credentials[field] = value;
        })
        .addCase(getuser.fulfilled, (state, action) => {
            // state.logged = action.payload;
            state.credentials.listesCourses = action.payload.listesCourses
            // state.credentials.listesCourses.map(prod => prod.produits = action.payload.listesCourses.map(prod.produits))
            state.credentials.email = action.payload.email
            state.credentials.name = action.payload.name
        });
});
export default userReducer;
