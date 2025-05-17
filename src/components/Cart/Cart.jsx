import { useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast"; // adapte le chemin si besoin
import CartActions from "./CartActions";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const { showToast, ToastComponent } = useToast();

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <ToastComponent /> {/* ✅ visible en permanence dans la page */}
      <h2 className="text-3xl text-center font-bold mb-6">Mon Panier</h2>
      {cart.length === 0 ? (
        <p className="text-lg text-center text-gray-500">
          Votre panier est vide.
        </p>
      ) : (
        <>
          {/* En-tête (Desktop) */}
          <div className="hidden md:grid grid-cols-6 gap-4 font-semibold border-b pb-2 mb-4 text-gray-700">
            <span>Service</span>
            <span>Durée</span>
            <span>Quantité</span>
            <span>Prix unitaire</span>
            <span></span>
            <span>Total</span>
            <span></span>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem
                key={`${item.id}-${item.pricingModel}`}
                item={item}
                showToast={showToast} // ✅ ici
              />
            ))}
          </div>

          {/* Résumé & CTA */}
          <CartSummary total={total} cartLength={cart.length} />
          <div className="sticky bottom-0 bg-white border-t mt-6 pt-4 pb-6 px-4 z-10 flex justify-end">
            <CartActions />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
