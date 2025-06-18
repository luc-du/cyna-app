import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";

/**
 * Récupère toutes les catégories depuis l'API.
 * @returns {Promise<AxiosResponse>}
 */
export const getAllCategories = () => {
  return axios.get(API_ROUTES.CATEGORIES.ALL);
};

/**
 * Recherche des catégories par nom sur l'API.
 * @param {string} name Le nom (ou portion de nom) à chercher
 * @returns {Promise<AxiosResponse>}
 */
export const searchCategories = (name) => {
  return axios.get(API_ROUTES.CATEGORIES.SEARCH(name));
};

/**
 * Récupère une catégorie par son ID.
 * @param {string|number} id L'identifiant de la catégorie
 * @returns {Promise<AxiosResponse>} axios.get response
 */
export const getCategoryById = (id) => {
  return axios.get(API_ROUTES.CATEGORIES.BY_ID(id));
};

export default {
  getAllCategories,
  searchCategories,
  getCategoryById,
};
