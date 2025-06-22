import PropTypes from "prop-types";
import { getPricingLabel } from "../utils/getPricingLabel";

/**
 * Affiche les spécifications techniques du produit (modèle tarifaire, marque...).
 */
const ProductSpecs = ({ product }) => {
  const pricingText = getPricingLabel(product.pricingModel);

  return (
    <section
      className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-300"
      aria-labelledby="product-specs-heading"
      tabIndex={-1}
    >
      <h2
        id="product-specs-heading"
        className="text-xl font-bold text-primary dark:text-white text-center mb-4"
      >
        Caractéristiques techniques
      </h2>

      <ul
        className="text-sm text-gray-800 dark:text-gray-200 space-y-2 max-w-md mx-auto"
        aria-label="Spécifications techniques"
      >
        <li>
          <span className="font-semibold">Modèle tarifaire :</span>{" "}
          <span>{pricingText}</span>
        </li>
        <li>
          <span className="font-semibold">Marque :</span>{" "}
          <span>{product.brand || "Cyna"}</span>
        </li>
        {/* D'autres spécifications peuvent être ajoutées ici si dispo */}
      </ul>
    </section>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    pricingModel: PropTypes.string,
    defaultPricing: PropTypes.number,
    brand: PropTypes.string,
    priceId: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default ProductSpecs;
