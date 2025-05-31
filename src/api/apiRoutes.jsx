const PROTOCOL = "http";
const HOST = "localhost";
const API_BASE = "/api/v1";

const PORT_ADDRESS = 8082;
const PORT_CATEGORIES = 8082;
const PORT_CAROUSEL = 8082;
const PORT_PRODUCTS = 8082;

export const API_ROUTES = {
  AUTH: {
    SIGNUP: `${API_BASE}/auth/signup`,
    SIGNIN: `${API_BASE}/auth/signin`,
    VALIDATE: `${API_BASE}/auth/validate`,
  },

  USER: {
    BY_ID: (id) => `${API_BASE}/user/${id}`,
    ALL: `${API_BASE}/user`,
    SEARCH: (query) => `${API_BASE}/user/search?name=${query}`,
    DELETE: (id) => `${API_BASE}/user/${id}`,
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
