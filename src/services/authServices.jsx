import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/authStorage";

/**
 * Envoie les identifiants pour authentification.
 *
 * @param {{ email: string, password: string }} credentials - Identifiants de connexion
 * @returns {Promise<Object>} - Données utilisateur + token JWT
 */
export const login = async (credentials) => {
  const response = await axios.post(API_ROUTES.AUTH.SIGNIN, credentials);
  return response.data;
};

/**
 * Enregistre un nouvel utilisateur.
 *
 * @param {Object} data - Données d'inscription
 * @returns {Promise<Object>} - Réponse de confirmation ou message
 */
export const register = async (data) => {
  const response = await axios.post(API_ROUTES.AUTH.SIGNUP, data);
  return response.data;
};

/**
 * Valide le token JWT stocké côté client.
 * Envoie un header Authorization avec le token.
 *
 * @returns {Promise<Object>} - Données de session si valide
 */
export const validateToken = async () => {
  const token = getToken();
  const response = await axios.get(API_ROUTES.AUTH.VALIDATE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Envoie une demande de réinitialisation de mot de passe.
 *
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise<Object>} - Message de succès ou d'erreur
 */
export const forgotPassword = async (email) => {
  const response = await axios.post(API_ROUTES.AUTH.PASSWORD_FORGOT(email));
  return response.data;
};

/**
 * Vérifie si un email est déjà utilisé.
 *
 * @param {string} email - Email à vérifier
 * @returns {Promise<Object>} - Disponibilité ou non
 */
export const verifyEmail = async (email) => {
  const response = await axios.get(API_ROUTES.AUTH.VERIFY_EMAIL(email));
  return response.data;
};
