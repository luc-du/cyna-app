import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slice/cartSlice";
import CTAButton from "../ui/buttons/CTAButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Mon Panier</h2>

      {cart.length === 0 ? (
        <p className="text-lg text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          {/* Liste des articles */}
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
              >
                {/* Image du produit */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-500">{item.duration}</p>
                    {item.quantity > 0 ? (
                      <p className="text-gray-700">Prix : {item.price}€</p>
                    ) : (
                      <p className="text-red-500 font-semibold">
                        Produit indisponible
                      </p>
                    )}
                  </div>
                </div>

                {/* Sélection de quantité */}
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-purple-600 text-white px-3 py-2 rounded-lg"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border rounded-lg">
                    {item.quantity}
                  </span>
                  <button
                    className="bg-purple-600 text-white px-3 py-2 rounded-lg"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  {item.quantity === 0 ? (
                    <button className="text-purple-600 underline">
                      Remplacer le produit
                    </button>
                  ) : (
                    <button
                      className="text-red-600 underline"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Résumé du panier */}
          <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Résumé de la commande</h3>
            <p className="flex justify-between text-lg">
              <span>Nombre d’articles :</span> <span>{cart.length}</span>
            </p>
            <p className="flex justify-between text-lg">
              <span>Montant H.T :</span>{" "}
              <span>{(total / 1.196).toFixed(2)}€</span>
            </p>
            <p className="flex justify-between text-lg">
              <span>TVA (19.6%) :</span>{" "}
              <span>{(total - total / 1.196).toFixed(2)}€</span>
            </p>
            <p className="flex justify-between text-xl font-bold mt-2">
              <span>Total T.T.C :</span> <span>{total.toFixed(2)}€</span>
            </p>

            {/* Code promo */}
            <div className="mt-4">
              <label className="block font-medium text-gray-700">
                Saisir un code promo :
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg mt-2"
                placeholder="Entrez votre code promo"
              />
            </div>

            {/* CTA - Passer à la caisse */}
            <CTAButton
              style={"w-full flex items-center"}
              label="Passer à la caisse"
              link=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
