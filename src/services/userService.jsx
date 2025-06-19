import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/auth/authStorage";

/**
 * Récupère les informations d’un utilisateur par son ID.
 * @param {number|string} userId
 * @returns {Promise<Object>}
 */
export const getUserById = async () => {
  const token = getToken();
  const decoded = jwtDecode(token);
  const userId = decoded.jti;

  const response = await axios.get(API_ROUTES.USER.BY_ID(userId), {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

/**
 * Met à jour les informations du profil utilisateur.
 * @param {number|string} userId
 * @param {Object} updates
 * @returns {Promise<Object>}
 */
export const updateProfile = async (userId, updates) => {
  const token = getToken();
  console.log("[SERVICE] PATCH data to:", API_ROUTES.USER.PATCH(userId));
  console.log("[SERVICE] payload:", updates);

  const response = await axios.patch(API_ROUTES.USER.PATCH(userId), updates, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

/**
 * Modifie le mot de passe d’un utilisateur.
 * @param {number|string} userId
 * @param {Object} payload - { currentPassword, newPassword }
 * @returns {Promise<Object>}
 */
export const updatePassword = async (userId, payload) => {
  const response = await axios.patch(
    API_ROUTES.USER.UPDATE_PASSWORD(userId),
    payload
  );
  return response.data;
};

/**
 * Upload de l'image de profil.
 * @param {number|string} userId
 * @param {File} file
 * @returns {Promise<Object>}
 */
export const uploadProfileImage = async (userId, file) => {
  const token = getToken();
  const formData = new FormData();
  formData.append("profile", file);

  const response = await axios.patch(
    API_ROUTES.USER.UPLOAD_PROFILE(userId),
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * Supprimer un utilisateur par son ID.
 * @param {number|string} userId
 */
export const deleteUserProfile = async (userId) => {
  const token = getToken();
  await axios.delete(API_ROUTES.USER.DELETE(userId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
