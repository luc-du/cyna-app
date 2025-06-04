import PropTypes from "prop-types";
import { getPricingModel } from "../utils/getMockData.jsx";
import { getPricingLabel } from "../utils/pricingLabel";

const ProductSpecs = ({ product }) => {
  return (
    <>
      <section
        className="mt-6 p-4 bg-gray-100 rounded-lg"
        aria-labelledby="product-specs-heading"
        tabIndex={-1}
      >
        <h2
          id="product-specs-heading"
          className="text-xl font-bold text-center text-primary mb-2"
        >
          Caractéristiques techniques
        </h2>
        <ul className="text-sm" aria-label="Spécifications du produit">
          <li>
            <strong>Modèle tarifaire :</strong>{" "}
            {product.pricingModel
              ? getPricingLabel(product.pricingModel)
              : getPricingModel(product.defaultPricing)}
          </li>
          <li>
            <strong>Marque :</strong> {product.brand ? product.brand : "Cyna"}
          </li>
        </ul>
      </section>
    </>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.shape({
    pricingModel: PropTypes.string.isRequired,
    defaultPricing: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    priceId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductSpecs;
