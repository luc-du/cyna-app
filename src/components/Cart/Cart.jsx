import { useSelector } from "react-redux";
import CartItem from "./CarItem";
import CartActions from "./CartActions";
import CartSummary from "./CartSummary";

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
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <CartItem
                key={`${item.serviceId}-${item.pricingId}`}
                item={item}
              />
            ))}
          </div>
          <CartActions />
          <CartSummary total={total} cartLength={cart.length} />{" "}
        </>
      )}
    </div>
  );
};

export default Cart;
