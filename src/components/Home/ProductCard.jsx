import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPromo } from "../utils/getMockData";

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

  // Gestion des images - adapter selon le format du BE
  const image = (() => {
    if (product.imageUrl) {
      return product.imageUrl;
    }

    if (Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      if (typeof firstImage === "string") {
        return firstImage;
      }
      // Si c'est un objet avec url
      if (firstImage?.url) {
        return firstImage.url;
      }
    }

    return "/assets/images/default-product.jpg";
  })();

  // S'assurer que l'ID est une string pour l'URL
  const productId = String(product.id);
  const promotion = product.promo || getPromo(product.id);

  return (
    <Link
      to={`/products/${productId}`}
      className="block shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
      aria-label={`Voir les détails de ${product.name}`}
    >
      <img
        src={image}
        alt={product.name}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.target.src = "/assets/images/default-product.jpg";
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        {promotion && (
          <div
            id="promo"
            className="w-full flex items-center justify-center mt-2"
          >
            <p className="block text-sm font-semibold text-center text-violet-600">
              {promotion}
            </p>
          </div>
        )}

        <p className="text-gray-600">
          {typeof product.amount === "number" && product.amount > 0
            ? `${product.amount.toFixed(2)} €`
            : "Prix sur demande"}
        </p>
        {product.brand && (
          <p className="text-sm text-gray-500 mt-1">Marque: {product.brand}</p>
        )}
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    promo: PropTypes.bool,
    brand: PropTypes.string,
    imageUrl: PropTypes.string,
    images: PropTypes.array,
    amount: PropTypes.number,
  }),
};

export default ProductCard;
