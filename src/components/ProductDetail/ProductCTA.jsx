import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/useToast";
import { addToCart } from "../../redux/slice/cartSlice";

const ProductCTA = ({ product }) => {
  const dispatch = useDispatch();
  const { showToast, ToastComponent } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl:
          product.images?.[0]?.url || "/assets/images/default-product.jpg",
        pricingModel: product.pricingModel,
        price: product.amount,
      })
    );

    showToast(`✔️ ${product.name} ajouté au panier`);
  };

  const isAvailable = (product.active = true);

  return (
    <div className="flex items-center justify-center mt-6 relative">
      <button
        disabled={!isAvailable}
        className={`flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md text-white font-semibold transition ${
          isAvailable
            ? "bg-primary hover:bg-CTAHover"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleAddToCart}
      >
        <FaCartPlus /> <span className="ml-2">Ajouter au panier</span>
      </button>

      <ToastComponent />
    </div>
  );
};

ProductCTA.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    pricingModel: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProductCTA;
