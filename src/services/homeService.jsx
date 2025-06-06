import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";

/**
 * Récupère les éléments du carousel (héros).
 * → GET /carousel?limits=…
 */
export const getCarouselSlides = (limits = 10) => {
  return axios.get(API_ROUTES.CAROUSEL.ALL(limits)).then((res) => res.data);
};

/**
 * Récupère la liste des catégories à afficher (pour CategoriesGrid).
 * → GET /categories
 */
export const getHomeCategories = () => {
  return axios.get(API_ROUTES.CATEGORIES.ALL).then((res) => res.data);
};

/**
 * Récupère les "Top Products du moment" (pour TopProductsGrid).
 * → GET /products/top-products?top=…
 */
export const getTopProducts = (
  options = { top: 10, promo: true, active: true }
) => {
  const { top, promo, active } = options;
  return axios
    .get(API_ROUTES.PRODUCTS.GET_TOP_PRODUCTS({ top, promo, active }))
    .then((res) => res.data);
};

/**
 * Récupère les promotions (par exemple : produits en promo).
 * → GET /products/pagination?page=…&size=…&promoOnly=true
 */
export const getPromoProducts = (options = { page: 0, size: 6 }) => {
  const { page, size } = options;
  return axios
    .get(API_ROUTES.PRODUCTS.PAGINATION({ page, size, promoOnly: true }))
    .then((res) => res.data.products);
};
