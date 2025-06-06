import { placeHolder } from "../../assets/indexImages";

/**
 * Récupère l'URL de la première image d'un élément.
 * Si l'élément n'a pas d'images, retourne une image par défaut.
 *
 * @param {Object} element - L'élément dont on veut récupérer l'image.
 * @returns {string} L'URL de la première image ou une image par défaut.
 */

export const getImageSrc = (element) => {
  // Vérifie si element est un objet et a une propriété images
  if (element && typeof element === "object" && Array.isArray(element.images)) {
    return element.images[0]?.url || placeHolder;
  }
  return placeHolder;
};
