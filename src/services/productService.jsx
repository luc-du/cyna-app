import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";

/**
 * Récupère la liste complète des produits depuis l'API.
 * @returns {Promise<AxiosResponse>}
 */
const getAllProducts = () => {
  return axios.get(API_ROUTES.PRODUCTS.ALL);
};

/**
 * Récupère un produit unique depuis l'API à partir de son productId.
 * @param {string|number} productId
 * @returns {Promise<AxiosResponse>}
 */
const getProductById = (productId) => {
  return axios.get(API_ROUTES.PRODUCTS.BY_ID(productId));
};

/**
 * Recherche des produits par mot-clé avec pagination.
 * @param {{ keyword?: string, page?: number, size?: number }} params
 * @returns {Promise<AxiosResponse>}
 */
const searchProducts = ({ keyword = "", page = 0, size = 6 } = {}) => {
  return axios.get(API_ROUTES.PRODUCTS.SEARCH({ keyword, page, size }));
};

export default {
  getAllProducts,
  getProductById,
  searchProducts,
};
