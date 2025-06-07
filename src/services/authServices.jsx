import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import {
  AUTH_ACCOUNT_VALIDATION_ERROR,
  AUTH_EMAIL_VERIFICATION_FAILED,
  AUTH_FORGOT_PASSWORD_ERROR,
  AUTH_INVALID_CREDENTIALS_ERROR,
  AUTH_LOGIN_ERROR,
  AUTH_SIGNUP_ERROR,
} from "../components/utils/errorMessages";

/**
 * Connexion utilisateur
 * @param {Object} credentials { email, password }
 * @returns {Promise<Object>}
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(API_ROUTES.AUTH.SIGNIN, credentials);
    return response.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error(AUTH_INVALID_CREDENTIALS_ERROR);
    }
    throw new Error(AUTH_LOGIN_ERROR);
  }
};

/**
 * Inscription utilisateur
 * @param {Object} payload { email, password, confirmPassword, etc. }
 * @returns {Promise<Object>}
 */
export const register = async (payload) => {
  try {
    const response = await axios.post(API_ROUTES.AUTH.SIGNUP, payload);
    return response.data;
  } catch (err) {
    throw new Error(AUTH_SIGNUP_ERROR, err);
  }
};

/**
 * Vérification du token JWT (appel sur route protégée)
 * @returns {Promise<Object>}
 */
export const validateToken = async () => {
  try {
    const response = await axios.get(API_ROUTES.AUTH.VALIDATE);
    return response.data;
  } catch (err) {
    throw new Error(AUTH_ACCOUNT_VALIDATION_ERROR, err);
  }
};

/**
 * Requête de réinitialisation de mot de passe par email
 * @param {string} email
 * @returns {Promise<void>}
 */
export const forgotPassword = async (email) => {
  try {
    await axios.post(API_ROUTES.AUTH.PASSWORD_FORGOT_BY_EMAIL(email));
  } catch (err) {
    throw new Error(AUTH_FORGOT_PASSWORD_ERROR, err);
  }
};

/**
 * Validation de compte (token envoyé par mail)
 * @param {string} email
 * @returns {Promise<Object>}
 */
export const validateAccount = async (email) => {
  try {
    const response = await axios.get(API_ROUTES.AUTH.VALIDATE_ACCOUNT(email));
    return response.data;
  } catch (err) {
    throw new Error(AUTH_EMAIL_VERIFICATION_FAILED, err);
  }
};
