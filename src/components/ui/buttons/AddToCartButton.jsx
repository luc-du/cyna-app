import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slice/cartSlice";

const AddToCartButton = ({ product, pricingOption }) => {
  // 1.State
  // 2.Function
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart(
        addToCart({
          serviceId: product.id,
          categoryId: product.categoryId,
          pricingId: pricingOption.id,
          name: product.name,
          price: pricingOption.price,
          duration: pricingOption.name,
        })
      )
    );
    console.log("Ajout au panier :", product, pricingOption);
  };
  // 3.Others

  // 4.Render
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={handleAddToCart}
        disabled={!product?.available}
        className={`flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md text-white font-semibold transition ${
          product?.available && pricingOption?.available
            ? "bg-primary hover:bg-CTAHover"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {" "}
        <FaCartPlus /> <span className="ml-2">Ajouter au panier</span>
      </button>
    </div>
  );
};

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.number,
    available: PropTypes.bool,
    name: PropTypes.string.isRequired,
  }),
  pricingOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    available: PropTypes.bool,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
};
export default AddToCartButton;
