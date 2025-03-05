import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";

const CartActions = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-6 flex justify-center">
      <button
        className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition"
        onClick={() => dispatch(clearCart())}
      >
        Vider le panier
      </button>
    </div>
  );
};

export default CartActions;
