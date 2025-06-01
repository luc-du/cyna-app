import axios from "axios";
import { getToken } from "../components/utils/authStorage";

// Création d'une instance axios centralisée
/**
 * @constant
 * @name apiClient
 * @description
 * Instance Axios préconfigurée pour effectuer des requêtes HTTP vers l'API principale de l'application.
 *
 * - Utilise l'URL de base définie dans la variable d'environnement `VITE_API_BASE_URL`.
 * - Définit l'en-tête `Content-Type` à `application/json` pour toutes les requêtes.
 *
 * @access public
 *
 * @example
 * // Exemple d'utilisation :
 * apiClient.get('/utilisateurs')
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour attacher automatiquement le token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
