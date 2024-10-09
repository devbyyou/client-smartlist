"use client";
import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from './user';

// Je créer une instance d'axios me permettant d'enregistrer
// une configuration de base
// const baseURL = 'http://localhost:3002/';
const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3002/';
// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL,
});



axiosInstance.interceptors.request.use((config) => {
  // Je récupère les données utilisateur
  const userData = getUserDataFromLocalStorage();

  // Si mon utilisateur est connecté, je lui ajoute un header Authorization
  const token = userData ? userData.access_token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


