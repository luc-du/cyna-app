import { useToast } from "@hooks/useToast";
import { addToCart } from "@slices/cartSlice";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../ui/ConfirmModal";
const ProductCTA = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();
  const [showModal, setShowModal] = useState(false);

  if (!product) return null;
  const isAvailable = product.active === true;

  const handleAddToCartAndAsk = () => {
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
    setShowModal(true);
  };

  const handleGoToCart = () => {
    setShowModal(false);
    navigate("/cart");
  };

  return (
    <div className="flex items-center justify-center mt-6 relative">
      <button
        type="button"
        disabled={!isAvailable}
        onClick={handleAddToCartAndAsk}
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
          onConfirm={handleGoToCart}
          confirmLabel="Aller au panier"
          cancelLabel="Continuer"
          confirmClass="bg-primary text-white px-4 py-2 rounded-md "
          cancelClass="underline text-gray-700 dark:text-white hover:text-gray-500 dark:hover:text-gray-300"
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
