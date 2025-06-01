import { jwtDecode } from "jwt-decode";

let memoryToken = null;

/**
 * Stocke le token en mémoire et dans sessionStorage (fallback en cas de F5)
 * @param {string} token
 */
export const setToken = (token) => {
  memoryToken = token;
  if (typeof window !== "undefined") {
    sessionStorage.setItem("token", token);
  }
};

/**
 * Récupère le token depuis la mémoire ou sessionStorage
 * @returns {string|null}
 */
/**
 * Récupère le jeton d'authentification depuis la mémoire ou le sessionStorage.
 *
 * @returns {string|null} Le jeton d'authentification s'il existe, sinon null.
 */
export const getToken = () => {
  if (memoryToken) return memoryToken;
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) memoryToken = token;
    return token;
  }
  return null;
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Token invalide :", error);
    return null;
  }
};

/**
 * Supprime le token des deux stockages
 */
export const clearToken = () => {
  memoryToken = null;
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("token");
  }
};
