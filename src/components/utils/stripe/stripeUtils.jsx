/**
 * Convertit un montant Stripe (en centimes) en string formaté en euros.
 *
 * @param {number} amount - Le montant en centimes à convertir.
 * @returns {string}
 *   Montant formaté en euros (ex : "10.00 €"), ou "Sur demande" si la valeur n’est pas un nombre.
 */
export const setStripePrice = (amount) => {
  return typeof amount === "number"
    ? (amount / 100).toFixed(2) + " €"
    : "Sur demande";
};

/**
 * Formate la date de création d’une souscription Stripe.
 *
 * @param {Object} subscription - Objet Subscription récupéré depuis l’API.
 * @param {number} subscription.createdAt - Timestamp de création en millisecondes.
 * @returns {string}
 *   Date localisée (ex : "19/06/2025") ou "—" si le timestamp est absent ou invalide.
 */
export const setMappedDate = (subscription) => {
  const timeStamp = subscription.createdAt;
  // Vérifie qu’on a bien un nombre et que ce n’est pas NaN
  if (typeof timeStamp === "number" && !Number.isNaN(timeStamp)) {
    return new Date(timeStamp).toLocaleDateString();
  }
  return "—";
};

/**
 * Rend un indicateur visuel du statut d’abonnement.
 *
 * @param {"active"|"incomplete"|"canceled"} status - Statut renvoyé par Stripe.
 * @returns {JSX.Element}
 *   Un paragraphe coloré avec une pastille et un label pour l’accessibilité.
 */
export const renderSubscriptionStatus = (status) => {
  const isActive = status === "active";

  return isActive ? (
    <p className="text-green-500" aria-live="polite">
      <span aria-hidden="true">🟢</span>
      <span className="sr-only">Statut : </span>
      Actif
    </p>
  ) : (
    <p className="text-red-500" aria-live="polite">
      <span aria-hidden="true">🔴</span>{" "}
      <span className="sr-only">Statut : </span>
      Inactif
    </p>
  );
};

export default {
  setStripePrice,
  setMappedDate,
  renderSubscriptionStatus,
};
