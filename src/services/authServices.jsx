import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/authStorage";

export const AuthService = {
  /**
   * Inscription d’un nouvel utilisateur
   * @param {object} userData
   * @returns {Promise<object>}
   */
  register: async (userData) => {
    const response = await axios.post(API_ROUTES.AUTH.SIGNUP, userData);
    return response.data;
  },

  /**
   * Connexion utilisateur (login)
   * @param {object} credentials
   * @returns {Promise<object>}
   */
  login: async (credentials) => {
    const response = await axios.post(API_ROUTES.AUTH.SIGNIN, credentials);
    return response.data;
  },

  /**
   * Validation de la session (token)
   * @returns {Promise<object>}
   */
  validate: async () => {
    const token = getToken();
    return axios.post(API_ROUTES.AUTH.VALIDATE, { token });
  },
};
