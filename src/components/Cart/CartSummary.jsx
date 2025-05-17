import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";
import { formatStripePrice } from "../utils/formatStripePrice";

const CartSummary = ({ total, cartLength }) => {
  return (
    <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Résumé de la commande</h3>
      <p className="flex justify-between text-lg">
        <span>Nombre d’articles :</span> <span>{cartLength}</span>
      </p>
      <p className="flex justify-between text-lg">
        <span>Montant H.T :</span>{" "}
        {/* <span>{(total / 1.196 / 1000).toFixed(2)}€</span> */}
        <span>{formatStripePrice(total / 1.196)}</span>
      </p>
      <p className="flex justify-between text-lg">
        <span>TVA (19.6%) :</span>{" "}
        <span>{formatStripePrice(total - total / 1.196)}</span>{" "}
      </p>
      <p className="flex justify-between text-xl font-bold mt-2">
        <span>Total T.T.C :</span>
        <span>{formatStripePrice(total)}</span>{" "}
      </p>

      {/* ✅ Code promo */}
      <div className="mt-4">
        <label className="block font-medium text-gray-700">
          Saisir un code promo :
        </label>
        <input
          type="text"
          className="w-full border rounded-lg px-4 py-2 mt-2 mb-4 text-sm"
          placeholder="Entrez votre code promo"
        />
      </div>

      <CTAButton label="Passer à la caisse" link="" style="w-full mt-6" />
    </div>
  );
};

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default CartSummary;
