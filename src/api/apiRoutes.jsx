const PROTOCOL = "http";
const HOST = "localhost";
const API_BASE = "/api/v1";

const PORT_ADDRESS = 8082;
const PORT_CATEGORIES = 8082;
const PORT_CAROUSEL = 8082;
const PORT_PRODUCTS = 8082;

export const API_ROUTES = {
  AUTH: {
    SIGNIN: `http://localhost:8081/api/v1/auth/signin`,
    SIGNUP: `http://localhost:8081/api/v1/auth/signup`,
    VALIDATE: `http://localhost:8081/api/v1/auth/validate`,
  },

  USER: {
    BY_ID: (id) => `${API_BASE}/user/${id}`,
    ALL: `${API_BASE}/user`,
    SEARCH: (query) => `${API_BASE}/user/search?name=${query}`,
    DELETE: (id) => `${API_BASE}/user/${id}`,
    PATCH: (id) => `http://localhost:8081/api/v1/user/${id}`,
    UPLOAD_PROFILE: (id) => `http://localhost:8081/api/v1/user/${id}/profiles`,
  },

  ADDRESS: {
    POST: `${PROTOCOL}://${HOST}:${PORT_ADDRESS}${API_BASE}/address`,
    PATCH: (id) =>
      `${PROTOCOL}://${HOST}:${PORT_ADDRESS}${API_BASE}/address/${id}`,
    DELETE: (id) =>
      `${PROTOCOL}://${HOST}:${PORT_ADDRESS}${API_BASE}/address/${id}`,
    BY_USER: (userId) =>
      `${PROTOCOL}://${HOST}:${PORT_ADDRESS}${API_BASE}/address?user_id=${userId}`,
  },

  CARD: {
    BY_USER: (userId) => `${API_BASE}/card?user_id=${userId}`,
  },

  CAROUSEL: {
    GET: `${PROTOCOL}://${HOST}:${PORT_CAROUSEL}${API_BASE}/carousel`,
  },
  CATEGORIES: {
    GET: `${PROTOCOL}://${HOST}:${PORT_CATEGORIES}${API_BASE}/categories`,
    GET_BY_ID: (id) =>
      `${PROTOCOL}://${HOST}:${PORT_CATEGORIES}${API_BASE}/categories/${id}`,
  },
  PRODUCTS: {
    GET: `${PROTOCOL}://${HOST}:${PORT_PRODUCTS}${API_BASE}/products`,
  },
};
