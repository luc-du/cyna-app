const API_BASE = "/api/v1";

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
    CREATE: () => `${API_BASE}/address`,
    DELETE: (id) => `${API_BASE}/address/${id}`,
    BY_USER: (userId) => `${API_BASE}/address?user_id=${userId}`,
  },
  CARD: {
    BY_USER: (userId) => `${API_BASE}/card?user_id=${userId}`,
  },
};
