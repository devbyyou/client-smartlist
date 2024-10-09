"use client";

import { LoginResponse } from '../@types/user';
import { jwtDecode } from 'jwt-decode'; 

// Fonction pour récupérer les données utilisateur du localStorage
export const getUserDataFromLocalStorage = (): LoginResponse | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const userDataStr = localStorage.getItem('token'); 
  if (!userDataStr) return null;

  try {
    // Parse le token pour en extraire les données utilisateur
    const userData = JSON.parse(userDataStr) as LoginResponse;
    return userData;
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    return null;
  }
};

export const removeUserDataFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token'); 
    localStorage.clear(); 
  }
};

export const setUserDataToLocalStorage = (userData: LoginResponse): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('token', JSON.stringify(userData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données utilisateur:', error);
    }
  }
};

export const decodeToken = (token: string): any => {
  try {
    return jwtDecode(token); // Décode le token JWT pour extraire les données 
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return null;
  }
};
