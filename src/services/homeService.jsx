// src/api/homeService.js
import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
/**
 * Récupère les éléments du carousel (héros).
 * -> GET /carousel?limits=…
 */
export const fetchCarouselSlides = () => {
  return axios
    .get(API_ROUTES.CAROUSEL.ALL(/* facultatif : nombre de slides */))
    .then((res) => res.data);
};

/**
 * Récupère la liste des catégories à afficher (pour CategoriesGrid).
 * -> GET /categories
 */
export const fetchCategories = () => {
  return axios.get(API_ROUTES.CATEGORIES.ALL).then((res) => res.data);
};

/**
 * Récupère les "Top Products du moment" (pour TopProductsGrid).
 * -> GET /products/top-products?top=…
 */
export const fetchTopProducts = (
  options = { top: 10, promo: true, active: true }
) => {
  const { top, promo, active } = options;
  return axios
    .get(API_ROUTES.PRODUCTS.GET_TOP_PRODUCTS({ top, promo, active }))
    .then((res) => res.data);
};

/**
 * Récupère les promotions (par exemple : produits en promo).
 * -> Sur ton API, on n’a pas d’endpoint "promo only", mais on peut faire :
 *    GET /products/pagination?promoOnly=true&page=0&size=…
 * À adapter si tu as un endpoint spécifique pour les promos.
 */
export const fetchPromoProducts = (options = { page: 0, size: 6 }) => {
  const { page, size } = options;
  return axios
    .get(API_ROUTES.PRODUCTS.PAGINATION({ page, size, promoOnly: true }))
    .then((res) => res.data.products /* selon le format Pagination */);
};
