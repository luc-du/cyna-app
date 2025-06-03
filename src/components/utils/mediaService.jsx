const MEDIA_BASE_URL = import.meta.env.VITE_PUBLIC_MEDIA_URL;

export const getProductImageUrl = (filename) => {
  if (!filename) return `${MEDIA_BASE_URL}/products/placeholder.jpg`;
  return `${MEDIA_BASE_URL}/products/${filename}`;
};

export const getCategoryImageUrl = (filename) => {
  if (!filename) return `${MEDIA_BASE_URL}/categories/placeholder.jpg`;
  return `${MEDIA_BASE_URL}/categories/${filename}`;
};
