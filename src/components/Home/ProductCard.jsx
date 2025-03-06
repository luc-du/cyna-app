import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log(product);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
        <Link
          to={product.link}
          className="mt-2 inline-block text-blue-500 font-semibold hover:underline hover:text-blue-700 transition"
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
