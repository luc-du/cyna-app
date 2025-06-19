import { MOCK_PRICING_OPTIONS, MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";
import setStripePrice from "./stripe/stripeUtils";

/**
 * Renvoie une chaîne prête à l’affichage :
 *  • Si l’option existe et que .price est un nombre, on le formate.
 *  • Si .price est déjà une chaîne (ex. "Sur demande"), on la renvoie brute.
 *  • Sinon (pas d’option trouvée), on renvoie un fallback (ici "—").
 */
export const getMockPricing = (pricingId) => {
  const option = MOCK_PRICING_OPTIONS.find((o) => o.id === pricingId);

  if (!option) {
    return "—";
  }

  // Si c’est un nombre, on formate. Sinon "Sur demande", on renvoie directement.
  if (typeof option.price === "number") {
    return setStripePrice(option.price);
  } else {
    return option.price;
  }
};

export const getPricingModel = (pricingId) => {
  const option = MOCK_PRICING_OPTIONS.find((o) => o.id === pricingId);

  if (!option) {
    return "_";
  }
  if (typeof option.name === "string") {
    return option.name;
  } else {
    return option.price;
  }
};

/**
 * Retourne le message de promotion si le produit correspondant est en promo.
 * @param {number|string} productId - ID du produit
 * @returns {string|null}
 */
export const getPromo = (productId) => {
  const product = MOCK_TOP_PRODUCTS.find(
    (p) => String(p.id) === String(productId)
  );
  return product.promo && "🎉Promotion en cours";
};
