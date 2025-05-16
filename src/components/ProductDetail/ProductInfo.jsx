import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        imageUrl: product.images?.[0]?.url,
        price: product.amount,
        duration: product.pricingModel,
      })
    );
  };

  const isAvailable = product.status === "AVAILABLE";

  return (
    <div className="mt-6 text-center">
      <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <span className="block mt-4 text-2xl font-semibold text-green-600">
        {product.amount ? `${product.amount / 100}€` : ""}
      </span>
      <span
        className={`block mt-2 text-sm font-semibold ${
          isAvailable ? "text-green-500" : "text-red-500"
        }`}
      >
        {isAvailable ? "Disponible immédiatement" : "Indisponible"}
      </span>

      {/* 🔽 Ajout bouton discret sous le prix */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`flex items-center px-4 py-2 rounded text-white font-medium transition ${
            isAvailable
              ? "bg-primary hover:bg-CTAHover"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <FaCartPlus className="mr-2" />
          Ajouter au panier
        </button>
      </div>
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
    status: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProductInfo;
