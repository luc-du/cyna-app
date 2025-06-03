export const getApiUrl = (baseUrl, path = "") =>
  `${baseUrl}${import.meta.env.VITE_API_BASE_PATH}${path}`;
