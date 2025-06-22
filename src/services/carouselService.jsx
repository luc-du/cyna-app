import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
/**
 * Récupère les éléments du carrousel (héros) via l'API.
 * @param {number} [limits=10] Nombre max d'éléments à récupérer
 * @returns {Promise<Array>} Tableau de slides bruts (avant formatage)
 */
export const getCarouselSlides = (limits = 10) => {
  return axios.get(API_ROUTES.CAROUSEL.ALL(limits)).then((res) => res.data);
};
