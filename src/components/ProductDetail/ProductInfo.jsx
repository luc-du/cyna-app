import PropTypes from "prop-types";
import { getPromo } from "../utils/getMockData.jsx";

const ProductInfo = ({ product }) => {
  const isAvailable = product.active;
  const promotion = product.promo || getPromo(product.id);

  return (
    <div className="mt-6 text-center">
      <h1 className="text-3xl font-bold text-primary">
        {product?.name || "Produit sans nom"}
      </h1>
      <p className="mt-4 text-gray-600">
        {product?.description || "Aucune description disponible"}
      </p>
      <p className="mt-4 text-gray-600">{promotion}</p>
      <span className="block mt-4 text-2xl font-semibold text-green-600">
        {product.amount + "€"}{" "}
        {/*classic price
        {/* {product.amount
          ? `${formatStripePrice(product.amount)}`
          : `${getMockPricing(product.defaultPricing)}`} */}{" "}
        {/* formatted price */}
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
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number,
    promo: PropTypes.bool.isRequired,
    defaultPricing: PropTypes.number,
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
