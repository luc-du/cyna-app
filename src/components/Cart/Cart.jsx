import { useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slice/cartSlice";
import GridCart from "./GridCart";
import ResumeCart from "./ResumeCArt";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Mon Panier</h2>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          {/* Disposition en Grid*/}
          <GridCart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
          {/* Résumé du panier */}
          <ResumeCart cart={cart} total={total} />
        </>
      )}
    </div>
  );
};

export default Cart;
