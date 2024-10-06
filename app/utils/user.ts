"use client";

import { LoginResponse } from '../@types/user';
import { jwtDecode } from 'jwt-decode'; // Assure-toi d'avoir installé cette librairie: npm install jwt-decode

// Fonction pour récupérer les données utilisateur du localStorage
export const getUserDataFromLocalStorage = (): LoginResponse | null => {
  if (typeof window === 'undefined') {
    // localStorage n'est accessible que côté client, on vérifie si on est bien côté client
    return null;
  }

  const userDataStr = localStorage.getItem('token'); // Récupère le token depuis localStorage
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

// Fonction pour supprimer les données utilisateur du localStorage
export const removeUserDataFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    localStorage.clear(); // Facultatif : Supprime tout ce qui est stocké dans localStorage
  }
};

// Fonction pour enregistrer les données utilisateur dans localStorage
export const setUserDataToLocalStorage = (userData: LoginResponse): void => {
  if (typeof window !== 'undefined') {
    try {
      // Sauvegarde les données utilisateur dans localStorage après les avoir converties en chaîne JSON
      localStorage.setItem('token', JSON.stringify(userData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données utilisateur:', error);
    }
  }
};

// Fonction pour décoder un token JWT et en extraire les informations utilisateur
export const decodeToken = (token: string): any => {
  try {
    return jwtDecode(token); // Décode le token JWT pour extraire les données (ex: userId, email, etc.)
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return null;
  }
};
