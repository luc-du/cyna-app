import { placeHolder } from "../../../public/indexImages";

/**
 * Récupère l'URL de la première image d'un élément.
 * Si l'élément n'a pas d'images, retourne une image par défaut.
 *
 * @param {Object} element - L'élément dont on veut récupérer l'image.
 * @returns {string} L'URL de la première image ou une image par défaut.
 */

export const getImageSrc = (element) => {
  if (element && typeof element === "object" && Array.isArray(element.images)) {
    const imageUrl = element.images[0]?.url;
    if (imageUrl && typeof imageUrl === "string") {
      if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) {
        return imageUrl;
      }
      // Sinon on suppose un import statique (obj Vite/Webpack)
      return typeof imageUrl === "string" ? imageUrl : placeHolder;
    }
  }
  return placeHolder;
};
