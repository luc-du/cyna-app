import PropTypes from "prop-types";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { addToCart } from "../../redux/slice/cartSlice";
import ConfirmModal from "../ui/ConfirmModal";

/**
 * Bouton CTA pour ajouter un produit au panier avec confirmation.
 *
 * @param {Object} props
 * @param {Object} props.product - Produit à ajouter.
 * @returns {JSX.Element|null}
 */
const ProductCTA = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();
  const [showModal, setShowModal] = useState(false);

  if (!product) return null;
  const isAvailable = product.active === true;

  /** Gère le click principal sur le CTA */
  const handleClick = () => {
    if (isAvailable) setShowModal(true);
  };

  /** Ajoute le produit au panier (sans redirection) */
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

  /** Ajoute puis redirige vers /cart */
  const handleAddAndGoToCart = () => {
    handleAddToCart();
    setShowModal(false);
    navigate("/cart");
  };

  return (
    <div className="flex items-center justify-center mt-6 relative">
      <button
        type="button"
        disabled={!isAvailable}
        onClick={handleClick}
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
      >
        <FaCartPlus aria-hidden="true" />
        <span className="ml-2">
          {isAvailable ? "Ajouter au panier" : "Indisponible"}
        </span>
      </button>

      <ToastComponent />

      {showModal && (
        <ConfirmModal
          title="Produit ajouté au panier"
          message="Souhaitez-vous continuer vos achats ou aller au panier ?"
          onCancel={() => setShowModal(false)}
          onConfirm={handleAddAndGoToCart}
          confirmLabel="Aller au panier"
          cancelLabel="Continuer"
          confirmClass="bg-primary text-white px-4 py-2 rounded-md"
          cancelClass="underline text-gray-700"
        />
      )}
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
