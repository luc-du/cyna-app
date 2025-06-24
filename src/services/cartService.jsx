import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";

/**
 * Service pour gérer la synchronisation du panier entre le localStorage/Redux et le backend.
 *
 * Ce fichier expose deux fonctions principales :
 *  1. syncCartWithServer(items) : récupère pour chaque item du panier les dernières données
 *     depuis l’API produit (prix, disponibilité, image, pricingModel, etc.) et retourne
 *     un tableau d’items mis à jour.
 *  2. clearCartOnServer(userId) : vide le panier côté backend pour l’utilisateur spécifié.
 *     (Si votre API offre un endpoint dédié au panier.)
 *
 * Chaque fonction gère gracieusement les erreurs réseau en mode offline :
 * si l’API n’est pas joignable ou renvoie une erreur, on reste sur les données locales.
 */

/**
 * Pour chaque item du panier passé en argument, on interroge l’API produit afin de récupérer
 * l’objet produit à jour. On met ensuite à jour, si besoin, les champs suivants :
 *  - price        (amount reçu depuis l’API)
 *  - pricingModel (valeur reçue depuis l’API ou conservée si absente)
 *  - active       (pour vérifier la disponibilité)
 *  - imageUrl     (on prend la première image retournée, ou la valeur locale si aucune image)
 *
 * @param {Array<Object>} items
 *   - items est un tableau d’objets de la forme :
 *     {
 *       id: number,
 *       pricingModel: string,
 *       quantity: number,
 *       price: number,
 *       name?: string,
 *       imageUrl?: string,
 *       active?: boolean
 *     }
 *
 * @returns {Promise<Array<Object>>}
 *   - Promesse qui résout en un tableau d’items identiques à ceux passés en argument,
 *     mais potentiellement mis à jour avec les dernières données reçues depuis l’API.
 *
 * @example
 * const localCart = [
 *   { id: 1, pricingModel: "standard", quantity: 2, price: 19999, name: "Produit A", imageUrl: "/img/a.jpg", active: true },
 *   { id: 2, pricingModel: "premium",  quantity: 1, price: 29999, name: "Produit B", imageUrl: "/img/b.jpg", active: true }
 * ];
 *
 * const updated = await syncCartWithServer(localCart);
 * // updated = [
 * //   { id: 1, pricingModel: "standard", quantity: 2, price: 18999, name: "Produit A", imageUrl: "/img/a-new.jpg", active: true },
 * //   { id: 2, pricingModel: "premium",  quantity: 1, price: 29999, name: "Produit B", imageUrl: "/img/b.jpg", active: false }
 * // ];
 */
export const syncCartWithServer = async (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const updatedItems = await Promise.all(
    items.map(async (item) => {
      try {
        const url = API_ROUTES.PRODUCTS.BY_ID(item.id);
        const response = await axios.get(url);
        const data = response.data;

        return {
          id: item.id,
          name: data.name ?? item.name,
          pricingModel: data.pricingModel ?? item.pricingModel,
          price: typeof data.amount === "number" ? data.amount : item.price,
          quantity: item.quantity,
          active: typeof data.active === "boolean" ? data.active : item.active,
          imageUrl:
            (Array.isArray(data.images) &&
              data.images.length > 0 &&
              data.images[0].url) ||
            item.imageUrl ||
            "/assets/images/default-product.jpg",
        };
      } catch (err) {
        console.warn(
          `[cartService] Impossible de synchroniser l'item ${item.id} :`,
          err.message || err
        );
        return { ...item };
      }
    })
  );

  return updatedItems;
};

/**
 * Vide le panier côté backend pour un utilisateur donné.
 * Nécessite que l’API expose un endpoint DELETE /api/v1/cart/{userId}.
 *
 * @param {string|number} userId
 * @returns {Promise<void>}
 *   - Promesse résolue quand l’opération est terminée (succès ou échec).
 *     En cas d’erreur, on affiche un warning mais on ne rejette pas pour éviter de bloquer l’UX.
 *
 * @example
 * await clearCartOnServer("12345");
 */
export const clearCartOnServer = async (userId) => {
  if (!userId) {
    console.warn("[cartService] clearCartOnServer appelé sans userId");
    return;
  }

  try {
    const CART_HOST = import.meta.env.VITE_API_HOST_CART;
    if (!CART_HOST) {
      console.warn(
        "[cartService] VITE_API_HOST_CART non défini, clearCartOnServer ignoré"
      );
      return;
    }

    const url = `${CART_HOST}/api/v1/cart/${userId}`;
    await axios.delete(url);
    console.info(
      `[cartService] Panier vidé côté serveur pour l'utilisateur ${userId}`
    );
  } catch (err) {
    console.warn(
      `[cartService] Impossible de vider le panier côté serveur pour l'utilisateur ${userId} :`,
      err.message || err
    );
  }
};
