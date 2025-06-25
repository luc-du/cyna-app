import { placeHolder } from "@utils/indexImages";

/**
 * Récupère l'URL de la première image d'un élément (backend ou mock).
 * @param {Object} element - L'élément dont on veut l'image.
 * @returns {string} L'URL de l'image ou une image par défaut.
 */
export const getImageSrc = (element) => {
  if (!element || typeof element !== "object") return placeHolder;

  // Cas : mock → imageUrl (string)
  if (element.imageUrl && typeof element.imageUrl === "string") {
    return element.imageUrl;
  }

  // Cas : backend → images[] avec { url }
  if (Array.isArray(element.images)) {
    const imageUrl = element.images[0]?.url;
    if (typeof imageUrl === "string") {
      if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) {
        return imageUrl;
      }
      return imageUrl;
    }
  }

  return placeHolder;
};
