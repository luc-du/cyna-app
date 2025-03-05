import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";

const CartActions = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-6 flex">
      <button
        className="text-red-500 underline px-6 py-3 rounded-md font-semibold hover:text-red-600 transition"
        onClick={() => dispatch(clearCart())}
      >
        Vider le panier
      </button>
    </div>
  );
};

export default CartActions;
