import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { placeHolder } from "../../assets/indexImages";
import { getPromo } from "../utils/getMockData";
/**
 * ProductCard
 * Affiche une carte produit/service avec image, nom, prix et marque.
 * Ne s’affiche pas si le produit est mal formé (sans id ou sans nom).
 * La carte prend 100 % de la hauteur disponible (pour homogénéiser dans un grid/flex parent).
 */
const ProductCard = ({ product }) => {
  if (!product || !product.id || !product.name) {
    console.warn("ProductCard – product mal formé :", product);
    return null;
  }

  // Récupération de l'URL de l'image selon le format renvoyé par le BE
  const imageSrc =
    (Array.isArray(product.images) && product.images[0]?.url) || placeHolder;

  // On force l’ID en string pour la construction de l’URL
  const productId = String(product.id);
  const promotion = getPromo(product.id);

  return (
    <Link
      to={`/products/${productId}`}
      className="
        block
        shadow-md
        rounded-lg
        overflow-hidden
        hover:shadow-xl
        transition
        h-full            
        flex
        flex-col
      "
      aria-label={`Voir les détails de ${product.name}`}
    >
      <div className="w-full">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover flex-shrink-0"
        />
      </div>

      <div className="flex flex-col flex-1 justify-between gap-2 p-4">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <h4 className="mb-4 text-center text-green-500 font-medium">
            {promotion}
          </h4>
          <p className="text-gray-600">
            {typeof product.amount === "number" && product.amount > 0
              ? `${product.amount.toFixed(2)} €`
              : "Prix sur demande"}
          </p>
        </div>
        {product.brand && (
          <p className="text-sm text-gray-500 mt-1">Marque : {product.brand}</p>
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
