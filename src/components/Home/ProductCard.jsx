import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * ProductCard
 * Affiche une carte produit/service avec image, nom et prix.
 * Protège contre les objets incomplets ou mal formés.
 */
const ProductCard = ({ item }) => {
  if (!item || !item.id || !item.name) {
    console.warn("ProductCard – item mal formé :", item);
    return null;
  }

  const image =
    item.imageUrl ||
    item.images?.[0]?.url ||
    "/assets/images/default-product.jpg";

  return (
    <Link
      to={`/products/${item.id}`}
      className="block shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
    >
      <img src={image} alt={item.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">
          {typeof item.amount === "number"
            ? `${item.amount} €`
            : "Prix sur demande"}
        </p>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    images: PropTypes.array,
    amount: PropTypes.number,
  }),
};

export default ProductCard;
