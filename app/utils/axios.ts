import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from './user';

// Je créer une instance d'axios me permettant d'enregistrer
// une configuration de base
// const baseURL = 'http://localhost:3000/api';
const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3002/api';
// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL,
});
// Intercepteur pour gérer les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    // Si la réponse a un statut 440, le token est probablement expiré
    if (status === 440) {
      // removeUserDataFromLocalStorage();
      // eslint-disable-next-line no-alert
      setTimeout(() => {
        alert('Token expiré. Déconnexion de l\'utilisateur.');
        // document.location.href = 'http://localhost:5173';
        // window.location.href = 'http://localhost:5173';
        // window.location.replace = 'http://localhost:5173';
        window.location.reload();
      }, 0);
    }

    // Propagez l'erreur pour que le code appelant puisse également la gérer
    return Promise.reject(error);
  },
);
// Je peu agir avant qu'une requête soit envoyé
axiosInstance.interceptors.request.use((config) => {
  // Je récupère les données utilisateur
  // const userData = getUserDataFromLocalStorage();

  // Si mon utilisateur est connecté, je lui ajoute un header Authorization
  // const token = userData ? userData.token : null;

  // console.log('Token:', userData.token.token);
  //   eslint-disable-next-line no-param-reassign
  // config.headers.Authorization = userData ? `Bearer ${userData.token.token}` : null;

  return config;
});
