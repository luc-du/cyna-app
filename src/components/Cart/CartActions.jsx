import CTAButton from "@shared/buttons/CTAButton";
import { clearCart } from "@slices/cartSlice";
import { useDispatch } from "react-redux";

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
      <CTAButton
        type="button"
        handleClick={() => dispatch(clearCart())}
        className="text-red-500 dark:text-red-400 underline px-6 py-3 rounded-md font-semibold hover:text-red-600 dark:hover:text-red-300 transition-colors duration-200"
        aria-label="Vider tous les articles du panier"
        label={"Vider le panier"}
      />
    </div>
  );
};

export default CartActions;
