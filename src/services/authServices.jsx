import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/authStorage";
import apiClient from "./axiosConfig";

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
   * Récupération des infos du profil utilisateur
   * @returns {Promise<object>}
   */
  fetchProfile: async () => {
    const token = getToken();
    const decoded = jwtDecode(token);
    const userId = decoded.jti;

    return axios.get(API_ROUTES.USER.BY_ID(userId), {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Mise à jour du profil utilisateur
   * @param {string} userId
   * @param {object} data
   * @returns {Promise<object>}
   */
  updateProfile: async (userId, data) => {
    const token = getToken();
    return axios.patch(API_ROUTES.USER.PATCH(userId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  /**
   * Upload d’un avatar utilisateur
   * @param {string} userId
   * @param {File} file
   */
  // uploadAvatar: async (userId, file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   return apiClient.patch(API_ROUTES.USER.PATCH(userId), formData, {
  //     // headers: {
  //     //   "Content-Type": "multipart/form-data",
  //     // },
  //   });
  // },

  uploadAvatar: async (userId, file) => {
    const formData = new FormData();
    formData.append("profile", file); // nom du champ conforme au DTO Java

    return apiClient.post(API_ROUTES.USER.UPLOAD_PROFILE(userId), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
