import { useToast } from "@hooks/useToast";
import { syncCartWithServer } from "@services/cartService";
import CTAButton from "@shared/buttons/CTAButton";
import { updateQuantity } from "@slices/cartSlice";
import { ShoppingCartIcon } from "@utils/indexImages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartActions from "./CartActions";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

/**
 * Composant principal pour la page Panier.
 * Gère l’affichage dynamique, la synchro avec le backend, le fallback offline, et les messages d’état.
 */
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const { showToast, ToastComponent } = useToast();

  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const fetchAndSync = async () => {
      if (cart.length === 0) return;
      setIsSyncing(true);
      try {
        const updatedItems = await syncCartWithServer(cart);
        updatedItems.forEach((newItem) => {
          const original = cart.find(
            (item) =>
              item.id === newItem.id &&
              item.pricingModel === newItem.pricingModel
          );
          if (original) {
            if (newItem.price !== original.price) {
              dispatch(
                updateQuantity({
                  id: newItem.id,
                  pricingModel: newItem.pricingModel,
                  quantity: newItem.quantity,
                })
              );
            }
            if (newItem.active === false && original.price !== newItem.price) {
              showToast(
                `⚠️ Le prix de ${newItem.name} a été mis à jour`,
                "warning"
              );
            }
          }
        });
      } catch (err) {
        console.warn("🛑 Mode offline actif pour le panier", err);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchAndSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);

  return (
    <div
      data-testid="cart-page"
      role="main"
      aria-labelledby="cart-title"
      className="container mx-auto px-4 py-8 relative"
    >
      <ToastComponent />
      <h2
        id="cart-title"
        className="text-3xl text-center font-bold mb-6 text-gray-900 dark:text-white"
      >
        Mon Panier
      </h2>

      {isSyncing && (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-gray-600 dark:text-gray-400 mb-4"
        >
          Synchronisation du panier…
        </p>
      )}

      {cart.length === 0 && !isSyncing ? (
        <section className="flex flex-col mt-6 gap-6 justify-center items-center h-64 text-gray-700 dark:text-gray-200">
          <div className="flex justify-center items-center mt-6">
            <ShoppingCartIcon className="w-16 h-16 text-gray-500 dark:text-white" />
          </div>
          <h3 className="text-xl font-semibold">Votre panier est vide.</h3>
          <p className="text-lg text-center text-gray-500 dark:text-gray-400">
            Ajoutez des articles pour commencer vos achats.
          </p>
          <div className="mt-2">
            <CTAButton label="Commencer vos achats" link="/products" />
          </div>
        </section>
      ) : (
        <>
          {/* En-tête (Desktop uniquement) */}
          <div className="hidden md:grid grid-cols-6 gap-4 font-semibold border-b pb-2 mb-4 text-gray-700 dark:text-gray-300">
            <span>Service</span>
            <span>Durée</span>
            <span>Quantité</span>
            <span>Prix unitaire</span>
            <span></span>
            <span>Total</span>
            <span></span>
          </div>

          {/* Liste des articles */}
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem
                key={`${item.id}-${item.pricingModel}`}
                item={item}
                showToast={showToast}
              />
            ))}
          </div>

          {/* Résumé commande + CTA */}
          <CartSummary total={total} cartLength={cart.length} />
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 mt-6 pt-4 pb-6 px-4 z-10 flex justify-end">
            <CartActions />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
