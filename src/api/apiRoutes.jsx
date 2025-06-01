const API_BASE = "/api/v1";

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
    POST: `http://localhost:8081/api/v1/address`,
    PATCH: (id) => `http://localhost:8081/api/v1/address/${id}`,
    DELETE: (id) => `http://localhost:8081/api/v1/address/${id}`,
    BY_USER: (userId) => `${API_BASE}/address?user_id=${userId}`,
  },
  CARD: {
    BY_USER: (userId) => `${API_BASE}/card?user_id=${userId}`,
  },

  /* HOMEPAGE */
  CAROUSEL: {
    GET: `http://localhost:8082/api/v1/carousel`,
  },
  CATEGORIES: {
    GET: `http://localhost:8082/api/v1/categories`,
  },
  PRODUCTS: {
    TOP_PRODUCTS: `http://localhost:8082/api/v1/products/top-products`,
  },
};
