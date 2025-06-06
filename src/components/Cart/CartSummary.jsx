import PropTypes from "prop-types";
import CTAButton from "../shared/buttons/CTAButton";

/**
 * Composant affichant le résumé de la commande : nombre d’articles, montant HT, TVA, TTC, et zone de code promo.
 *
 * @param {Object} props
 * @param {number} props.total - Montant total TTC (en euros)
 * @param {number} props.cartLength - Nombre d’articles dans le panier
 * @returns {JSX.Element}
 */
const CartSummary = ({ total, cartLength }) => {
  // Calcul HT et TVA (19.6%)
  const montantHT = total / 1.196;
  const tva = total - montantHT;

  return (
    <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Résumé de la commande</h3>
      <p className="flex justify-between text-lg">
        <span>Nombre d’articles :</span> <span>{cartLength}</span>
      </p>
      <p className="flex justify-between text-lg">
        <span>Montant H.T :</span>{" "}
        <span aria-label={`Montant hors taxe : ${montantHT.toFixed(2)} euros`}>
          {/* {formatStripePrice(montantHT)} */}
          {montantHT.toFixed(2)} €
        </span>
      </p>
      <p className="flex justify-between text-lg">
        <span>TVA (19.6%) :</span>{" "}
        <span aria-label={`Montant de la TVA : ${tva.toFixed(2)} euros`}>
          {/* {formatStripePrice(tva)} */}
          {tva.toFixed(2)} €
        </span>
      </p>
      <p className="flex justify-between text-xl font-bold mt-2">
        <span>Total T.T.C :</span>
        <span
          aria-label={`Total toutes taxes comprises : ${total.toFixed(
            2
          )} euros`}
        >
          {/* {formatStripePrice(total)} */}
          {total.toFixed(2)} €
        </span>
      </p>

      {/* Section Code promo */}
      <div className="mt-4">
        <label htmlFor="promo-code" className="block font-medium text-gray-700">
          Saisir un code promo :
        </label>
        <input
          id="promo-code"
          type="text"
          className="w-full border rounded-lg px-4 py-2 mt-2 mb-4 text-sm"
          placeholder="Entrez votre code promo"
          aria-describedby="promo-help"
        />
        <p id="promo-help" className="text-xs mb-6 text-gray-500">
          Votre code sera appliqué à la validation du panier.
        </p>
      </div>

      <div id="cart-actions" className="flex justify-end">
        {/* Bouton de passage à la caisse */}
        <CTAButton
          label="Passer à la caisse"
          link="/checkout"
          style="w-full mt-6"
        />
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default CartSummary;
