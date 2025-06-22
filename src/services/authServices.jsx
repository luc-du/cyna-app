import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/auth/authStorage";

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

  /**
   * Change the user password, en exigeant l'ancien mot de passe.
   * @param {{
   * userId: number|string,
   * oldPassword: string,
   * newPassword: string }} payload
   * @returns {Promise<void>}
   */

  changePassword: async (payload) => {
    const token = getToken();
    const url = API_ROUTES.AUTH.CHANGE_PASSWORD();
    // Validation supplémentaire
    if (!payload.userId || !payload.oldPassword || !payload.newPassword) {
      throw new Error("Tous les champs sont obligatoires");
    }

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },
};

/**
 * Envoie un lien de réinitialisation de mot de passe au backend.
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @returns {Promise<void>}
 */
export const resetPassword = async (email) => {
  const url = `${API_ROUTES.AUTH.PASSWORD_FORGOT(email)}`;
  return await axios.get(url);
};
