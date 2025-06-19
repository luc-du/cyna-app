import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/auth/authStorage";

/**
 * Crée une nouvelle adresse utilisateur.
 * @param {Object} payload - Les données de l'adresse, incluant userId.
 * @returns {Promise<Object>}
 */
export const createAddress = async (payload) => {
  const token = getToken();
  const response = await axios.post(API_ROUTES.ADDRESS.CREATE, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/*
 * Récupérer toutes les addresses de l'utilisateur
 *
 *
 */

export const fetchUserAddresses = async (userId) => {
  const token = getToken();
  const response = await axios.get(API_ROUTES.ADDRESS.GET_BY_USER(userId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Met à jour une adresse existante.
 * @param {string|number} addressId
 * @param {Object} payload - Données mises à jour.
 * @returns {Promise<Object>}
 */
export const updateAddress = async (addressId, payload) => {
  const token = getToken();
  const response = await axios.patch(
    API_ROUTES.ADDRESS.PATCH(addressId),
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Supprime une adresse par son ID.
 * @param {string|number} addressId
 * @returns {Promise<Object>}
 */
export const deleteAddress = async (addressId) => {
  const token = getToken();
  const response = await axios.delete(API_ROUTES.ADDRESS.DELETE(addressId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
