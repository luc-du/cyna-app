import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slice/cartSlice";

const AddToCartButton = ({ product, pricing }) => {
  // 1.State
  const dispatch = useDispatch();
  // 2.Function
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        serviceId: product.id,
        categoryId: product.categoryId,
        pricingId: pricing.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: pricing.price,
        duration: pricing.name,
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
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  pricing: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddToCartButton;
