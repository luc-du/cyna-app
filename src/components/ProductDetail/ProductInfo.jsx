import PropTypes from "prop-types";
import { getPromo } from "../utils/getMockData";
import { setStripePrice } from "../utils/stripe/stripeUtils";

/**
 * Affiche les informations principales d’un produit.
 * Titre, description, promotion, prix, disponibilité.
 */
const ProductInfo = ({ product }) => {
  const isAvailable = Boolean(product.active);
  const promotion = product.promo || getPromo(product.id);

  return (
    <div className="w-full mt-6 mx-auto  p-4 rounded-md bg-gray-100 dark:bg-gray-800 shadow-sm text-center space-y-4">
      <h1 className="text-3xl font-bold text-primary dark:text-white">
        {product?.name || "Produit sans nom"}
      </h1>

      <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
        {product?.description || "Aucune description disponible"}
      </p>

      {promotion && (
        <p className="w-full items-center justify-center text-sm font-medium text-green-500">
          🎉 Promotion{promotion}
        </p>
      )}

      <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
        {setStripePrice(product.amount)}
      </p>

      <p
        className={`text-sm font-semibold ${
          isAvailable
            ? "text-green-500 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
      >
        {isAvailable ? "Disponible immédiatement" : "Indisponible"}
      </p>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number,
    promo: PropTypes.bool,
    defaultPricing: PropTypes.number,
    pricingModel: PropTypes.string,
    active: PropTypes.bool,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProductInfo;
