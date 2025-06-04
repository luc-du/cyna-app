import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * ProductCard
 * Affiche une carte produit/service avec image, nom et prix.
 * Protège contre les objets incomplets ou mal formés.
 */
const ProductCard = ({ product }) => {
  if (!product || !product.id || !product.name) {
    console.warn("ProductCard – product mal formé :", product);
    return null;
  }

  const image =
    product.imageUrl ||
    product.images?.[0]?.url ||
    "/assets/images/default-product.jpg";

  return (
    <Link
      to={`/products/${product.id}`}
      className="block shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
    >
      <img
        src={image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">
          {typeof product.amount === "number"
            ? `${product.amount} €`
            : "Prix sur demande"}
        </p>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    images: PropTypes.array,
    amount: PropTypes.number,
  }),
};

export default ProductCard;
