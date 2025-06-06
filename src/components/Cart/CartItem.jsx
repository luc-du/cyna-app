import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slice/cartSlice";
import { getImageSrc } from "../utils/getImageSrc";
import { getPricingLabel } from "../utils/pricingLabel";

/**
 * Affiche une ligne d'article dans le panier.
 *
 * @param {Object} props
 * @param {Object} props.item - Item du panier
 * @param {Function} props.showToast - Fonction pour afficher un toast
 * @returns {JSX.Element}
 */
const CartItem = ({ item, showToast }) => {
  const dispatch = useDispatch();

  /**
   * Met à jour la quantité du produit dans le panier.
   * Plante si la quantité est inférieure à 1 (protégé par le bouton).
   *
   * @param {number} newQuantity - Nouvelle quantité souhaitée
   * @returns {void}
   */
  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      updateQuantity({
        id: item.id,
        pricingModel: item.pricingModel || "default",
        quantity: newQuantity,
      })
    );
    showToast(
      `Quantité mise à jour (${newQuantity}) pour ${item.name}`,
      "success"
    );
  };

  const imageSrc = getImageSrc(item);
  /**
   * Supprime l'article du panier.
   * @returns {void}
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
      className="relative grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-white shadow-md p-4 rounded-lg"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Image + détails */}
      <div className="flex items-center space-x-4 col-span-1">
        <img
          src={imageSrc}
          alt={`Image de ${item.name}`}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="text-left font-semibold sm:text-base text-sm">
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-gray-500">{getPricingLabel(item.pricingModel)}</p>
          <p className="text-gray-700">
            {/* 📌Prix unitaire : {formatStripePrice(item.price)}  */}{" "}
            {/*StripePrice*/}
            Prix unitaire : {item.price + " €"}
          </p>
        </div>
      </div>

      {/* Quantité */}
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
          className="px-4 py-2 border rounded-lg"
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

      {/* Supprimer */}
      <div className="col-span-1 flex justify-center">
        <button
          type="button"
          className="text-red-600 underline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          onClick={handleRemove}
          aria-label={`Supprimer ${item.name} du panier`}
        >
          Supprimer
        </button>
      </div>

      {/* Total ligne */}
      <div className="text-right font-semibold sm:text-base text-sm">
        <span aria-label={`Total pour ${item.name}`}>
          {/* {formatStripePrice(item.price * item.quantity)} */}
          {item.price * item.quantity + " €"}
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
