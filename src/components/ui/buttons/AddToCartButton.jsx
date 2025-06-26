import { addToCart } from "@slices/cartSlice";
import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

const AddToCartButton = ({ product, pricing }) => {
  // 1.State
  const dispatch = useDispatch();
  // 2.Function
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl: product.images?.[0]?.url,
        pricingModel: product.pricingModel,
        price: product.amount,
      })
    );
    console.log(`Ajouté : ${product.name} (${pricing.name}) au panier`);
  };

  // 3.Others
  if (!product || !pricing) {
    return null;
  }
  // 4.Render
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={handleAddToCart}
        disabled={!product.available}
        className={`flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md text-white font-semibold transition ${
          product.available
            ? "bg-primary hover:bg-CTAHover"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        <FaCartPlus /> <span className="ml-2">Ajouter au panier</span>
      </button>
    </div>
  );
};

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    pricingModel: PropTypes.string,
    amount: PropTypes.number,
    available: PropTypes.bool,
  }).isRequired,
  pricing: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default AddToCartButton;
