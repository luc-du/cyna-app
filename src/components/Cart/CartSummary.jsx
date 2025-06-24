import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { setStripePrice } from "../utils/stripe/stripeUtils";

/**
 * Composant affichant le résumé de la commande : nombre d’articles, montant HT, TVA, TTC, et zone de code promo.
 *
 * @param {Object} props
 * @param {number} props.total - Montant total TTC (en euros)
 * @param {number} props.cartLength - Nombre d’articles dans le panier
 * @returns {JSX.Element}
 */
const CartSummary = ({ total, cartLength }) => {
  const totalEuros = total / 100;
  const montantHT = totalEuros / 1.196;
  const tva = totalEuros - montantHT;

  return (
    <section
      className="mt-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md p-6 rounded-lg border border-gray-200 dark:border-gray-700"
      role="region"
      aria-labelledby="summary-title"
    >
      <h3 id="summary-title" className="text-xl font-bold mb-4">
        Résumé de la commande
      </h3>

      <div className="space-y-2 text-lg">
        <p className="flex justify-between">
          <span>Nombre d’articles :</span>
          <span>{cartLength}</span>
        </p>
        <p className="flex justify-between">
          <span>Montant H.T :</span>
          <span
            aria-label={`Montant hors taxe : ${setStripePrice(
              montantHT
            )} euros`}
          >
            {montantHT.toFixed(2)} €
          </span>
        </p>
        <p className="flex justify-between">
          <span>TVA (19.6%) :</span>
          <span aria-label={`Montant de la TVA : ${tva.toFixed(2)} euros`}>
            {tva.toFixed(2)} €
          </span>
        </p>
        <p className="flex justify-between text-xl font-bold mt-2">
          <span>Total T.T.C :</span>
          <span aria-label={`Total TTC : ${setStripePrice(total)} euros`}>
            {setStripePrice(total)}
          </span>
        </p>
      </div>

      <div className="my-6">
        <label htmlFor="promo-code" className="block font-medium mb-1">
          Saisir un code promo :
        </label>
        <input
          id="promo-code"
          type="text"
          placeholder="Entrez votre code promo"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          aria-describedby="promo-help"
        />
        <p
          id="promo-help"
          className="text-xs mt-1 text-gray-500 dark:text-gray-400"
        >
          Votre code sera appliqué à la validation du panier.
        </p>
      </div>

      <div id="cart-actions" className="mt-6 flex justify-end">
        <CTAButton label="Procéder au paiement" link="/checkout" />
      </div>
    </section>
  );
};

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default CartSummary;
