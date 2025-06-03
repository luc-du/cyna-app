import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageSrc =
    product.imageUrl ||
    (Array.isArray(product.images) &&
      product.images.length > 0 &&
      product.images[0].url) ||
    "/assets/images/placeholder-product.jpg";

  const productLink =
    product.link ||
    (typeof product.id === "number" || typeof product.id === "string"
      ? `/products/${product.id}`
      : "#");

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      role="region"
      aria-label={`Carte du produit ${product.name}`}
      tabIndex={0}
    >
      <img
        src={imageSrc}
        alt={product.name}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-4 text-center">
        <h3 className="text-md font-semibold text-gray-800" tabIndex={0}>
          {product.name}
        </h3>
        <Link
          to={productLink}
          className="mt-2 inline-block text-blue-500 font-semibold hover:underline hover:text-blue-700 transition"
          aria-label={`Voir le produit ${product.name}`}
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
    link: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
