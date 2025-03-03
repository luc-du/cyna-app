import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slice/cartSlice";

const AddToCartButton = ({ product }) => {
  // 1.State
  // 2.Function
  const dispatch = useDispatch();
  // 3.Others

  // 4.Render
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={() => dispatch(addToCart(product))}
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
    available: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default AddToCartButton;
