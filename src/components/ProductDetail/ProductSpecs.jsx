import PropTypes from "prop-types";
import { getPricingLabel } from "../utils/pricingLabel";

const ProductSpecs = ({ product }) => {
  console.log(product);
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold text-center text-primary mb-2">
        Caractéristiques techniques
      </h2>
      <ul className="text-sm">
        <li>
          <strong>Modèle tarifaire :</strong>{" "}
          {getPricingLabel(product.pricingModel)}
        </li>
        <li>
          <strong>Marque :</strong> {product.brand}
        </li>
        <li>
          <strong>ID Stripe :</strong> {product.priceId}
        </li>
      </ul>
    </div>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.shape({
    pricingModel: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    priceId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductSpecs;
