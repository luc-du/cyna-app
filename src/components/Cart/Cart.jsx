import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import { updateQuantity } from "../../redux/slice/cartSlice";
import { syncCartWithServer } from "../../services/cartService";
import CartActions from "./CartActions";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

/**
 * Composant affichant la page panier.
 * Synchronise le panier local avec le back-end si possible.
 * Affiche les items ou le message « panier vide ».
 *
 * @returns {JSX.Element}
 */
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const { showToast, ToastComponent } = useToast();

  // Local state pour indiquer qu'on synchronise
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // À chaque monté du composant ou quand cart change, tenter de sync en ligne
    const fetchAndSync = async () => {
      if (cart.length === 0) return;
      setIsSyncing(true);
      try {
        const updatedItems = await syncCartWithServer(cart);
        // Pour chaque item mis à jour, on met à jour le state Redux si nécessaire
        updatedItems.forEach((newItem) => {
          // Si le prix a changé, on met à jour la quantité pour recalculer total
          const original = cart.find(
            (i) =>
              i.id === newItem.id && i.pricingModel === newItem.pricingModel
          );
          if (original) {
            // Si prix différent → dispatch updateQuantity avec même quantité pour forcer recalcul
            if (newItem.price !== original.price) {
              dispatch(
                updateQuantity({
                  id: newItem.id,
                  pricingModel: newItem.pricingModel || "default",
                  quantity: newItem.quantity,
                })
              );
            }
            // Si statut active=false → on peut montrer toast produit indisponible
            if (newItem.active === false && original.price !== newItem.price) {
              showToast(
                `⚠️ Le prix de ${newItem.name} a été mis à jour`,
                "warning"
              );
            }
          }
        });
      } catch (err) {
        // En offline, on ne fait rien, on reste sur le fallback mocks/local
        console.warn("Pas de connexion, mode offline panier", err);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchAndSync();
    // on ne veut exécuter qu’à la première montée ou quand length change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <ToastComponent />
      <h2 className="text-3xl text-center font-bold mb-6">Mon Panier</h2>

      {isSyncing && (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-gray-600 mb-4"
        >
          Synchronisation du panier…
        </p>
      )}

      {cart.length === 0 && !isSyncing ? (
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
                showToast={showToast}
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
