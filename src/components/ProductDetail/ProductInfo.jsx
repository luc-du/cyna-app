import PropTypes from "prop-types";

const ProductInfo = ({ product }) => {
  // 1.State :
  // 2.Functions:
  // 3. Others
  // Render
  return (
    <div className="mt-6 text-center">
      <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <span className="block mt-4 text-2xl font-semibold text-green-600">
        {product.price ? product.price : "Free"}€
      </span>
      <span
        className={`block mt-2 text-sm font-semibold ${
          product.available ? "text-green-500" : "text-red-500"
        }`}
      >
        {product.available ? "available immédiatement" : "Indisponible"}
      </span>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProductInfo;
