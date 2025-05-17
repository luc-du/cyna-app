import PropTypes from "prop-types";
import { formatStripePrice } from "../utils/formatstripePrice";

const ProductInfo = ({ product }) => {
  const isAvailable = product.active;

  return (
    <div className="mt-6 text-center">
      <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <span className="block mt-4 text-2xl font-semibold text-green-600">
        {product.amount ? `${formatStripePrice(product.amount)}` : ""}
      </span>
      <span
        className={`block mt-2 text-sm font-semibold ${
          product.active ? "text-green-500" : "text-red-500"
        }`}
      >
        {isAvailable ? "Disponible immédiatement" : "Indisponible"}
      </span>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number,
    pricingModel: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProductInfo;
