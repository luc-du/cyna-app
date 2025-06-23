import {
  AmericanExpressIcon,
  FaCcJcb,
  MastercardIcon,
  VisaIcon,
} from "@utils/indexImages";

const CARD_ICONS = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  amex: AmericanExpressIcon,
  default: FaCcJcb,
};

/**
 * Retourne le composant d'icône de carte correspondant au type donné,
 * en se basant sur une correspondance partielle du nom.
 * @param {string} type - Le type de la carte (ex: "Visa", "Mastercard", "American Express", etc.).
 * @returns {React.Component} Le composant d'icône React de la carte.
 */
const setCardIcon = (type) => {
  let brandIcon;
  const normalizedType = type?.toLowerCase(type);

  if (normalizedType?.includes("visa")) {
    brandIcon = CARD_ICONS.visa;
  } else if (normalizedType?.includes("master")) {
    brandIcon = CARD_ICONS.mastercard;
  } else if (
    normalizedType?.includes("amex") ||
    normalizedType?.includes("american express")
  ) {
    brandIcon = CARD_ICONS.amex;
  } else {
    brandIcon = CARD_ICONS.default;
  }

  return brandIcon;
};

export default setCardIcon;
