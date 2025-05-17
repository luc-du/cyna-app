import { useSelector } from "react-redux";
import CartActions from "./CartActions";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl text-center font-bold mb-6">Mon Panier</h2>

      {cart.length === 0 ? (
        <p className="text-lg text-center text-gray-500">
          Votre panier est vide.
        </p>
      ) : (
        <>
          {/* Entête du tableau (Desktop uniquement) */}
          <div className="hidden md:grid grid-cols-6 gap-4 font-semibold border-b pb-2 mb-4 text-gray-700">
            <span>Service</span>
            <span>Durée</span>
            <span>Quantité</span>
            <span>Prix unitaire</span>
            <span></span>
            <span>Total</span>
            <span></span> {/* pour le bouton de suppression */}
          </div>

          {/* Liste des items */}
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem key={`${item.id}-${item.pricingId}`} item={item} />
            ))}
          </div>

          {/* Résumé panier */}
          <CartSummary total={total} cartLength={cart.length} />

          {/* CTA sticky */}
          <div className="sticky bottom-0 bg-white border-t mt-6 pt-4 pb-6 px-4 z-10 flex justify-end">
            <CartActions />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
