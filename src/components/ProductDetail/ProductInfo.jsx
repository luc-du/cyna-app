import PropTypes from "prop-types";

const ProductInfo = ({ product }) => {
  return (
    <div className="mt-6 text-center">
      <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <span className="block mt-4 text-2xl font-semibold text-green-600">
        {product.amount ? `${product.amount / 100}€` : ""}
      </span>
      <span
        className={`block mt-2 text-sm font-semibold ${
          product.status === "AVAILABLE" ? "text-green-500" : "text-red-500"
        }`}
      >
        {product.status === "AVAILABLE"
          ? "Disponible immédiatement"
          : "Indisponible"}
      </span>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductInfo;
