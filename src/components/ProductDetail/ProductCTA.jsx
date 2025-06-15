import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/useToast";
import { addToCart } from "../../redux/slice/cartSlice";

/**
 * Composant CTA pour ajouter un produit au panier.
 *
 * @param {Object} props
 * @param {Object} props.product - Objet produit, shape : { id, name, brand, amount, pricingModel, active, images }
 * @returns {JSX.Element|null}
 */
const ProductCTA = ({ product }) => {
  const dispatch = useDispatch();
  const { showToast, ToastComponent } = useToast();

  if (!product) return null;

  // Vérifier la disponibilité du produit
  const isAvailable = product.active === true;

  /**
   * Ajoute l'article au panier Redux et affiche un toast de confirmation.
   * @returns {void}
   */
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl:
          product.images?.[0]?.url || "/assets/images/default-product.jpg",
        pricingModel: product.pricingModel || "default",
        price: typeof product.amount === "number" ? product.amount : 0,
      })
    );
    showToast(`✔️ ${product.name} ajouté au panier`, "success");
  };

  return (
    <div className="flex items-center justify-center mt-6 relative">
      <button
        type="button"
        disabled={!isAvailable}
        aria-label={
          isAvailable
            ? `Ajouter au panier : ${product.name}`
            : `Produit indisponible : ${product.name}`
        }
        className={`flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md text-white font-semibold transition 
  ${
    isAvailable
      ? "bg-primary hover:bg-CTAHover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-primary dark:hover:bg-indigo-600 dark:focus:ring-white dark:focus:ring-offset-gray-900 shadow-md hover:shadow-lg"
      : "bg-gray-400 cursor-not-allowed"
  }`}
        onClick={handleAddToCart}
      >
        <FaCartPlus aria-hidden="true" />{" "}
        <span className="ml-2">
          {isAvailable ? "Ajouter au panier" : "Indisponible"}
        </span>
      </button>

      <ToastComponent />
    </div>
  );
};

ProductCTA.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    pricingModel: PropTypes.string,
    amount: PropTypes.number,
    active: PropTypes.bool,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProductCTA;
