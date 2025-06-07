import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import {
  AUTH_ACCOUNT_DELETION_ERROR,
  AUTH_PASSWORD_UPDATE_ERROR,
  AUTH_PROFILE_UPDATE_ERROR,
  AUTH_PROFILE_UPLOAD_ERROR,
  AUTH_USER_NOT_FOUND_ERROR,
} from "../components/utils/errorMessages";

/**
 * Récupérer les infos d’un utilisateur par son ID
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export const getUserById = async (id) => {
  try {
    const response = await axios.get(API_ROUTES.USER.BY_ID(id));
    return response.data;
  } catch (err) {
    throw new Error(AUTH_USER_NOT_FOUND_ERROR, err);
  }
};

/**
 * Mise à jour des informations utilisateur (nom, prénom, etc.)
 * @param {string|number} id
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export const updateUser = async (id, payload) => {
  try {
    const response = await axios.patch(API_ROUTES.USER.PATCH(id), payload);
    return response.data;
  } catch (err) {
    throw new Error(AUTH_PROFILE_UPDATE_ERROR, err);
  }
};

/**
 * Mise à jour du mot de passe
 * @param {string|number} id
 * @param {Object} payload
 * @returns {Promise<void>}
 */
export const updatePassword = async (id, payload) => {
  try {
    await axios.patch(API_ROUTES.USER.UPDATE_PASSWORD(id), payload);
  } catch (err) {
    throw new Error(AUTH_PASSWORD_UPDATE_ERROR, err);
  }
};

/**
 * Suppression du compte utilisateur
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export const deleteUserAccount = async (id) => {
  try {
    await axios.delete(API_ROUTES.USER.DELETE(id));
  } catch (err) {
    throw new Error(AUTH_ACCOUNT_DELETION_ERROR, err);
  }
};

/**
 * Envoi de l’avatar utilisateur (formData multipart)
 * @param {string|number} id
 * @param {FormData} formData
 * @returns {Promise<Object>}
 */
export const uploadAvatar = async (id, formData) => {
  try {
    const response = await axios.post(
      API_ROUTES.USER.UPLOAD_PROFILE(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(AUTH_PROFILE_UPLOAD_ERROR, err);
  }
};
