import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";

/**
 * Bouton d'action pour vider le panier.
 * Utilise Redux pour réinitialiser le state cart.
 *
 * @returns {JSX.Element}
 */
const CartActions = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-6 flex">
      <button
        type="button"
        onClick={() => dispatch(clearCart())}
        className="text-red-500 dark:text-red-400 underline px-6 py-3 rounded-md font-semibold hover:text-red-600 dark:hover:text-red-300 transition-colors duration-200"
        aria-label="Vider tous les articles du panier"
      >
        Vider le panier
      </button>
    </div>
  );
};

export default CartActions;
