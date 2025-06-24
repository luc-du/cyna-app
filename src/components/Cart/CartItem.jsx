import { removeFromCart, updateQuantity } from "@slices/cartSlice";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getImageSrc } from "../utils/getImageSrc";
import { getPricingLabel } from "../utils/getPricingLabel";
import { setStripePrice } from "../utils/stripe/stripeUtils";

/**
 * CartItem
 * Affiche une ligne d'article dans le panier avec contrôle de quantité et suppression.
 */
const CartItem = ({ item, showToast }) => {
  const dispatch = useDispatch();

  const imageSrc = getImageSrc(item);

  /**
   * Met à jour la quantité d’un article
   */
  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      updateQuantity({
        id: item.id,
        pricingModel: item.pricingModel,
        quantity: newQuantity,
      })
    );
    showToast(
      `Quantité mise à jour (${newQuantity}) pour ${item.name}`,
      "success"
    );
  };

  /**
   * Supprime l’article du panier
   */
  const handleRemove = () => {
    dispatch(
      removeFromCart({
        id: item.id,
        pricingModel: item.pricingModel,
      })
    );
    showToast(`${item.name} supprimé du panier`, "error");
  };

  return (
    <div
      className="relative grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-white dark:bg-gray-800 dark:text-white shadow-md p-4 rounded-lg transition-colors duration-300"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Image + Info produit */}
      <div className="flex items-center space-x-4 col-span-1">
        <img
          src={item.imageUrl || imageSrc}
          alt={`Image de ${item.name}`}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="text-left font-semibold sm:text-base text-sm">
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-gray-500 dark:text-gray-400">
            {getPricingLabel(item.pricingModel)}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Prix unitaire : {setStripePrice(item.price)}
          </p>
        </div>
      </div>

      {/* Contrôle Quantité */}
      <div className="flex items-center space-x-2 col-span-1 justify-end sm:justify-center">
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            item.quantity > 1 && handleUpdateQuantity(item.quantity - 1)
          }
          disabled={item.quantity <= 1}
          aria-label={`Diminuer quantité de ${item.name}`}
        >
          –
        </button>
        <span
          className="px-4 py-2 border rounded-lg dark:border-gray-600"
          aria-live="polite"
          aria-atomic="true"
        >
          {item.quantity}
        </span>
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
          aria-label={`Augmenter quantité de ${item.name}`}
        >
          +
        </button>
      </div>

      {/* Bouton Supprimer */}
      <div className="col-span-1 flex justify-center">
        <button
          type="button"
          className="text-red-600 dark:text-red-400 underline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 dark:focus:ring-red-400"
          onClick={handleRemove}
          aria-label={`Supprimer ${item.name} du panier`}
        >
          Supprimer
        </button>
      </div>

      {/* Total de la ligne */}
      <div className="text-right font-semibold sm:text-base text-sm">
        <span aria-label={`Total pour ${item.name}`}>
          {setStripePrice(item.price * item.quantity)}
        </span>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    pricingModel: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  showToast: PropTypes.func.isRequired,
};

export default CartItem;
