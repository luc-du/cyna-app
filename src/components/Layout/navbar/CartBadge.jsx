import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartBadge() {
  const cartItemCount = useSelector((state) => state.cart.items.length);

  return (
    <Link
      to="/cart"
      className="relative text-white hover:text-gray-400 flex items-center"
    >
      <FaShoppingCart className="text-xl" />
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
          {cartItemCount}
        </span>
      )}
    </Link>
  );
}
